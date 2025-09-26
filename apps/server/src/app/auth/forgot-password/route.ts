import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = body || {}

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }
    // Initialize Supabase client
    const supabase = await createClient()

    // Check if user exists
    const { data: userData, error: userError } = await supabase
      .from("user")
      .select("user_id, email")
      .eq("email", email)
      .single()

    if (userError || !userData) {
      // For security reasons, don't reveal if email exists or not
      return NextResponse.json(
        { message: 'If an account with this email exists, password reset instructions have been sent.' },
        { status: 200 }
      )
    }

    // Use Supabase's built-in password reset email
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/auth/reset-password`,
    })

    if (resetError) {
      console.error('Password reset error:', resetError)
      return NextResponse.json(
        { error: 'Failed to send password reset email' },
        { status: 500 }
      )
    }
    console.log(`Password reset email sent via Supabase to: ${email}`)

    return NextResponse.json(
      { message: 'Password reset instructions have been sent to your email.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
