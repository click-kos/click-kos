// Import Next.js request/response types and Supabase client creator
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) 
{
  try 
  {
  
    // Extract the token from the Authorization header (format: "Bearer <token>")
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) 
    {
      return NextResponse.json(
        { error: "Missing access token" },
        { status: 401 }
      );
    }

    // Create a Supabase client instance (server-side)
    const supabase = await createClient();

    // Verify the token and get the authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) 
    {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Fetch the user row
    const { data: userData, error: userTableError } = await supabase
      .from("user")
      .select("user_id, email, first_name, last_name, role, profile_image_url")
      .eq("user_id", user.id)
      .single();

    if (userTableError || !userData) 
    {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Fetch student data if user has role "student"
    let studentData = null;
    if (userData.role === "student") {
      const { data: student, error: studentError } = await supabase
        .from("student")
        .select("*")
        .eq("user_id", user.id)
        .single();
      
      if (!studentError && student) {
        studentData = student;
      }
    }

    // Return the user info (with student if applicable)
    return NextResponse.json({ user: { ...userData, student: studentData } }, { status: 200 });
  } 
  catch (err) 
  {
    console.error("Profile fetch error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { faculty, year_of_study } = body;

    // Extract the token from the Authorization header
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json(
        { error: "Missing access token" },
        { status: 401 }
      );
    }

    // Create a Supabase client instance
    const supabase = await createClient();

    // Verify the token and get the authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Validate input
    if (!faculty || year_of_study === undefined) {
      return NextResponse.json(
        { error: "Faculty and year of study are required" },
        { status: 400 }
      );
    }

    // Update student data
    const { error: updateError } = await supabase
      .from("student")
      .update({
        faculty,
        year_of_study: parseInt(year_of_study)
      })
      .eq("user_id", user.id);

    if (updateError) {
      console.error("Student update error:", updateError);
      return NextResponse.json(
        { error: "Failed to update student data" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}












