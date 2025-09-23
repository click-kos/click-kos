// app/api/analytics/items/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  try {
    const supabase = await createClient();

    // ✅ Auth check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ status: "401", message: "Unauthorized" }, { status: 401 });
    }

    const { data: roles } = await supabase
      .from("user")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (!roles || (roles.role !== "staff" && roles.role !== "admin")) {
      return NextResponse.json({ status: "403", message: "Forbidden" }, { status: 403 });
    }

    // ✅ Query: count items ordered (popularity)
    const { data, error } = await supabase
      .from("order_items")
      .select("item_id");

    if (error) {
      return NextResponse.json({ status: "500", message: error.message }, { status: 500 });
    }

    // Count popularity
    const counts: Record<string, number> = {};
    data.forEach(item => {
      counts[item.item_id] = (counts[item.item_id] || 0) + 1;
    });

    // Sort by popularity
    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([item_id, count]) => ({ item_id, count }));

    return NextResponse.json({
      status: "200",
      message: "Item analytics fetched successfully",
      data: sorted
    });
  } catch (err) {
    return NextResponse.json({ status: "500", message: "Internal Server Error" }, { status: 500 });
  }
}
