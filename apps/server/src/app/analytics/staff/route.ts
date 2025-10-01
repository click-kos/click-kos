// apps/server/src/app/analytics/staff/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  try {
    const supabase = await createClient();

    const { data: staffOrders, error } = await supabase
      .from("orders")
      .select("staff_id")
      .limit(1000);

    if (error) throw error;

    const staffMap: Record<string, number> = {};
    staffOrders.forEach((o: any) => {
      if (!staffMap[o.staff_id]) staffMap[o.staff_id] = 0;
      staffMap[o.staff_id]++;
    });

    const data = Object.entries(staffMap).map(([staff_id, orders]) => ({ staff_id, orders }));

    return NextResponse.json({
      status: "200",
      message: "Staff analytics fetched successfully",
      data
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ status: "500", message: "Error fetching staff analytics" }, { status: 500 });
  }
}
