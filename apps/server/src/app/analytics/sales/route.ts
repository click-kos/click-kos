// app/api/analytics/sales/route.ts
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

    // ✅ Fetch orders (aggregate sales by date)
    const { data, error } = await supabase
      .from("orders")
      .select("order_date, total_amount");

    if (error) {
      return NextResponse.json({ status: "500", message: error.message }, { status: 500 });
    }

    // Group sales by date
    const grouped: Record<string, number> = {};
    data.forEach(order => {
      const date = order.order_date.split("T")[0];
      grouped[date] = (grouped[date] || 0) + order.total_amount;
    });

    return NextResponse.json({
      status: "200",
      message: "Sales analytics fetched successfully",
      data: grouped
    });
  } catch (err) {
    return NextResponse.json({ status: "500", message: "Internal Server Error" }, { status: 500 });
  }
}
