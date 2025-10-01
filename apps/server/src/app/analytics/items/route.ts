// app/api/analytics/items/route.ts
import { NextResponse } from "next/server";
import { createClient, getAuthorization } from "@/utils/supabase/server";

export async function GET(req: Request) {
  try {
    const supabase = await createClient();

    const {user, error: authError} = await getAuthorization(req, supabase);

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
      .from("order_item")
      .select("menu_item_id, menu_item(*)");

    if (error) {
      return NextResponse.json({ status: "500", message: error.message }, { status: 500 });
    }

    // Count popularity
    const popularity: Record<string, { count: number; item: any }> = {};
    data.forEach(orderItem => {
      const itemId = orderItem.menu_item_id;
      if (!popularity[itemId]) {
        popularity[itemId] = {
          count: 0,
          item: orderItem.menu_item,
        };
      }
      popularity[itemId].count += 1;
    });

    // Sort by popularity
    const sorted = Object.values(popularity)
      .sort((a, b) => b.count - a.count)
      .map(data => ({
        ...data.item,
        count: data.count,
      }));

    return NextResponse.json({
      status: "200",
      message: "Item analytics fetched successfully",
      data: sorted
    });
  } catch (err) {
    return NextResponse.json({ status: "500", message: "Internal Server Error" }, { status: 500 });
  }
}
