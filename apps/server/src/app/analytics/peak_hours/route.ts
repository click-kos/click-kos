// apps/server/src/app/analytics/peak-hours/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  try {
    const supabase = await createClient();
    const { data: orders, error } = await supabase
      .from("orders")
      .select("id,created_at");

    if (error) throw error;

    const hoursMap: Record<number, number> = {};
    for (let i = 0; i < 24; i++) hoursMap[i] = 0;

    orders.forEach((o: any) => {
      const hour = new Date(o.created_at).getHours();
      hoursMap[hour]++;
    });

    const data = Object.entries(hoursMap).map(([hour, orders]) => ({ hour: Number(hour), orders }));

    return NextResponse.json({
      status: "200",
      message: "Peak hours data fetched successfully",
      data
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ status: "500", message: "Error fetching peak hours data" }, { status: 500 });
  }
}
