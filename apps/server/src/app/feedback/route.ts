import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";


//POST /feedback (insert with order_id, rating, comment; validate rating 1-5),
export async function POST(req: Request) {
  const supabase = await createClient();
  const { order_id, rating, comment } = await req.json();

  // Validate rating
  if (!order_id || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // Ensure order belongs to user and is completed 
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("id, status, user_id")
    .eq("id", order_id)
    .single();

  if (orderError || !order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.status !== "completed") {
    return NextResponse.json({ error: "Only completed orders can be reviewed" }, { status: 403 });
  }

  // Insert feedback
  const { data, error } = await supabase
    .from("feedback")
    .insert([{ order_id, rating, comment,created_at: new Date().toISOString() }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data, { status: 201 });
}


//GET /feedback (users)
export async function GET(req: Request) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("feedback")
    .select("*")
    

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}



