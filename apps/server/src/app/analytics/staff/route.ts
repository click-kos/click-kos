// app/api/analytics/staff/route.ts
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

    // ✅ Example: staff assignment stats
    const { data, error } = await supabase
      .from("assignments")
      .select("staff_id");

    if (error) {
      return NextResponse.json({ status: "500", message: error.message }, { status: 500 });
    }

    // Count assignments per staff
    const counts: Record<string, number> = {};
    data.forEach(a => {
      counts[a.staff_id] = (counts[a.staff_id] || 0) + 1;
    });

    const result = Object.entries(counts).map(([staff_id, count]) => ({ staff_id, assignments: count }));

    return NextResponse.json({
      status: "200",
      message: "Staff analytics fetched successfully",
      data: result
    });
  } catch (err) {
    return NextResponse.json({ status: "500", message: "Internal Server Error" }, { status: 500 });
  }
}
