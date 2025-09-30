import { createClient, getAuthorization } from "@/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {

  //this is how you will be working on the apis
  //this one just creates a user based on a given email  and returns the user data

  //always initiate supabase client at the start of the function
  const supabase = await createClient();

  const {user, error} = await getAuthorization(request, supabase);

  console.log(user);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ user });
}
