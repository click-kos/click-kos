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
  const {data: notifications, error} = await supabase.from("notification").select("*");
  if(error){
    return NextResponse.json({ message: "Error fetching notifications", error }, { status: 500 });
  }
  //no error
  if(!notifications.length){
    return NextResponse.json({ message: "No notifications found" , notifications}, { status: 200 });
  }
  
  //we have notifications as an array
  return NextResponse.json({message: "Notifications fetched successfully",notifications}, {status: 200});


}

export async function POST(request: NextRequest) {
    const supabase = await createClient();

    const {type, message} = await request.json();
    if(!type || !message){
        return NextResponse.json({ message: "Type and message are required" }, { status: 400 });
    }

    const {data: notification, error} = await supabase.from("notification").insert({type, message}).select().single();
    if(error){
        return NextResponse.json({ message: "Error creating notification", error }, { status: 500 });
    }

    return NextResponse.json({ message: "Notification created successfully", notification }, { status: 200 });
}