import { createClient } from "@/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";


// ------------------------------GET----------------------------

export async function GET(req: NextRequest) {
  const supabase = await createClient();

  // Get the logged-in user
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const userId = authData.user.id;

  // Fetch the student row for this user
  const { data: student, error: fetchError } = await supabase
    .from("students")
    .select("id, student_number, faculty, year_of_study") // select only relevant fields
    .eq("user_id", userId)
    .single();

  if (fetchError) {
    if (fetchError.code === "PGRST116") {
      // No row found for this user, PGRST116 = “no rows found”
      return NextResponse.json({ student: null }, { status: 200 });
    }
    return NextResponse.json({ error: fetchError.message }, { status: 400 });
  }

  return NextResponse.json({ student }, { status: 200 });
}
// -------------------------------------------------------------


// ----------------------------Post-----------------------------
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const userId = authData.user.id;
  const body = await req.json();
  const { student_number, faculty, year_of_study } = body;

  if (!student_number || !faculty || !year_of_study) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // --- check if student_number exists for another user ---
  const { data: existingNumber, error: existingNumberError } = await supabase
    .from("students")
    .select("id, user_id")
    .eq("student_number", student_number)
    .single();

  if (existingNumberError && existingNumberError.code !== "PGRST116") {
    // No row found for this user, PGRST116 = “no rows found”
    return NextResponse.json({ error: existingNumberError.message }, { status: 400 });
  }

  if (existingNumber && existingNumber.user_id !== userId) {
    return NextResponse.json(
      { error: "student_number already exists for another user" },
      { status: 400 }
    );
  }

  // --- check if this user already has a row ---
  const { data: existing, error: existingError } = await supabase
    .from("students")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (existingError && existingError.code !== "PGRST116") {
    return NextResponse.json({ error: existingError.message }, { status: 400 });
  }

  if (existing) {
    // Update existing row
    const { data: updated, error: updateError } = await supabase
      .from("students")
      .update({ student_number, faculty, year_of_study })
      .eq("user_id", userId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    return NextResponse.json({ student: updated }, { status: 200 });
  } else {
    // Insert new row
    const { data: inserted, error: insertError } = await supabase
      .from("students")
      .insert([{ user_id: userId, student_number, faculty, year_of_study }]);

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    return NextResponse.json({ student: inserted }, { status: 201 });
  }
}
// -------------------------------------------------------------
