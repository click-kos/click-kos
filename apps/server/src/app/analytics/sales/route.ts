// apps/server/src/app/analytics/sales/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  try {
    const supabase = await createClient();

    // Authentication check (pseudo)
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ status: "401", message: "Unauthorized" }, { status: 401 });

    // Fetch all orders
    const { data: orders, error } = await supabase
      .from("orders")
      .select("id,total_amount,created_at")
      .order("created_at");

    if (error) throw error;

    // Total orders
    const total_orders = orders.length;

    // Average order value
    const avg_order_value = total_orders > 0
      ? orders.reduce((sum, o) => sum + o.total_amount, 0) / total_orders
      : 0;

    // Sales trend: date, revenue, number of orders
    const trendMap: Record<string, { total: number; count: number }> = {};
    orders.forEach((o: any) => {
      const date = new Date(o.created_at).toISOString().slice(0, 10);
      if (!trendMap[date]) trendMap[date] = { total: 0, count: 0 };
      trendMap[date].total += o.total_amount;
      trendMap[date].count += 1;
    });
    const sales_trend = Object.entries(trendMap).map(([date, v]) => ({
      date,
      total_sales: v.total,
      orders: v.count
    }));

    return NextResponse.json({
      status: "200",
      message: "Sales analytics fetched successfully",
      data: { total_orders, avg_order_value, sales_trend }
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ status: "500", message: "Error fetching sales analytics" }, { status: 500 });
  }
}
