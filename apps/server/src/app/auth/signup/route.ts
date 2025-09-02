import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'; // ✅ Using your existing Supabase utility

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
        userId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
