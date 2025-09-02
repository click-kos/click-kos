// app/api/menu/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextResponse,NextRequest } from "next/server";


// GET /api/menu?available=true&category=drinks
export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams}= new URL(request.url);
  let query=supabase.from("menu_item").select("*");

  // Optional filters
  if (searchParams.get("available")){
    query=query.eq("available",searchParams.get("available")=="true");

  }
  if (searchParams.get("category")){
    query=query.eq("category",searchParams.get("category"));
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({message:"Menu items fetched successfully", data}, { status: 200 });
}

// POST /api/menu
export async function POST(request: Request) {
  const supabase =await createClient();
  const body = await request.json();
  const { name, price, description, available, category } = body;

  const { data, error } = await supabase
    .from("menu_item")
    .insert([{ name, price, description, available, category }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Menu item added successfully", data },
    { status: 201 }
  );
}
