import { createClient } from "@/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {

  //this is how you will be working on the apis
  //this one just creates a user based on a given email  and returns the user data

  //always initiate supabase client at the start of the function
  const supabase = await createClient();

  //get the email from the request if available, otherwise generate a random email
  const email = request.nextUrl.searchParams.get("email") || Math.random().toString(36).substring(2, 15) + "@example.com";

  //then perform the operation you want
  const {data: user, error} = await supabase.auth.signUp({
    email: email,
    password: "password",
  });

  //then return the response
  //make sure to handle errors properly
  if (!error) {
    return NextResponse.json({ message: "User signed up successfully", user }, { status: 200 });
  }
  else{
    return NextResponse.json({ message: "Error signing up", error }, { status: 500 });
  }
}
