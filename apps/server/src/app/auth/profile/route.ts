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

    // Fetch the user row (with potential student relationship if exists)
    const { data: userData, error: userTableError } = await supabase
      .from("user")
      .select("user_id, email, first_name, last_name, role, profile_image_url, student(*)")
      .eq("user_id", user.id)
      .single();

    if (userTableError || !userData) 
    {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Return the user info (with student if applicable)
    return NextResponse.json({ user: userData }, { status: 200 });
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












