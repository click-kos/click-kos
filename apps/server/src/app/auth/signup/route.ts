import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const body = await req.json();

    const {
      email,
      password,
      first_name,
      last_name,
      role,
      student_number,
      faculty,
      year_of_study,
    } = body;

    // ✅ Validate required fields
    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid or missing email' }, { status: 400 });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
    }

    if (!first_name || typeof first_name !== 'string') {
      return NextResponse.json({ error: 'First name is required' }, { status: 400 });
    }

    if (!last_name || typeof last_name !== 'string') {
      return NextResponse.json({ error: 'Last name is required' }, { status: 400 });
    }

    if (!role || typeof role !== 'string') {
      return NextResponse.json({ error: 'Role is required' }, { status: 400 });
    }

    // ✅ If role is student, validate student-specific fields
    if (role === 'student') {
      if (!student_number || typeof student_number !== 'string') {
        return NextResponse.json({ error: 'Student number is required for students' }, { status: 400 });
      }
      if (!faculty || typeof faculty !== 'string') {
        return NextResponse.json({ error: 'Faculty is required for students' }, { status: 400 });
      }
      if (!year_of_study || typeof year_of_study !== 'number') {
        return NextResponse.json({ error: 'Year of study must be a number for students' }, { status: 400 });
      }
    }

    // ✅ 1. Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const userId = authData.user?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Failed to retrieve user ID' }, { status: 500 });
    }

    // ✅ 2. Insert into user table
    const { error: userError } = await supabase.from('user').insert([
      {
        user_id: userId,
        email,
        first_name,
        last_name,
        role,
      },
    ]);

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 400 });
    }

    // ✅ 3. If role = student, insert into student table
    if (role === 'student') {
      const { error: studentError } = await supabase.from('student').insert([
        {
          student_number,
          user_id: userId,
          faculty,
          year_of_study,
        },
      ]);

      if (studentError) {
        return NextResponse.json({ error: studentError.message }, { status: 400 });
      }
    }

    return NextResponse.json(
      {
        message: 'Signup successful',
        authData, // ✅ Return full authData instead of just userId
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
