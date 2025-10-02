// app/api/analytics/sales/route.ts
import { NextResponse } from "next/server";
import { createClient, getAuthorization } from "@/utils/supabase/server";
import { getOrders, getPeakHours, getTotalUsers } from "../lib/core";

export async function GET(req: Request) {
  try {
    const supabase = await createClient();

    // ✅ Auth check
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

    // ✅ Fetch orders (aggregate sales by date)
    const { data, error } = await supabase
      .from("order")
      .select("ordered_at, total_amount");

    if (error) {
      return NextResponse.json({ status: "500", message: error.message }, { status: 500 });
    }

    // Group sales by date
    const grouped: Record<string, number> = {};
    data.forEach(order => {
      const date = order.ordered_at.split("T")[0];
      grouped[date] = (grouped[date] || 0) + order.total_amount;
    });

    const orders = await getOrders(supabase);

    return NextResponse.json({
      status: "200",
      message: "Sales analytics fetched successfully",
      data: grouped,
      peakHours: await getPeakHours(supabase),
      totalOrders: orders.length,
      avgOrderValue: orders.map((order: { total_amount: any; }) => order.total_amount).reduce((a: any, b: any) => a + b, 0) / orders.length,
      totalUsers: await getTotalUsers(supabase),
    });
  } catch (err) {
    return NextResponse.json({ status: "500", message: "Internal Server Error" }, { status: 500 });
  }
}
