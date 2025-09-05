import { createClient } from "@/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  
  const supabase = await createClient();

  //then perform the operation you want
  const {data: notifications, error} = await supabase.from("notification").select("*");
  if(error){
    return NextResponse.json({ message: "Error fetching notifications", error }, { status: 500 });
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