import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  // Fetch all feedback
  const { data: feedback, error } = await supabase
    .from("feedback")
    .select("feedback_id, order_id, rating, comment, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Manual avg calculation//
  let avg_rating = 0;
  if (feedback && feedback.length > 0) {
    const sum = feedback.reduce((acc, row) => acc + row.rating, 0);
    avg_rating = sum / feedback.length;
  }

  // Return the response
  return NextResponse.json({
    avg_rating,
    feedback: feedback ?? [],
  });
}

