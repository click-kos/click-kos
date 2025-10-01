// apps/server/src/app/analytics/items/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  try {
    const supabase = await createClient();

    const { data: items, error } = await supabase
      .from("order_items")
      .select("item_id,item_name,count")
      .order("count", { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      status: "200",
      message: "Items analytics fetched successfully",
      data: items
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ status: "500", message: "Error fetching items analytics" }, { status: 500 });
  }
}
