import { NextRequest, NextResponse } from "next/server";
import { createClient, getAuthorization } from "@/utils/supabase/server";

// GET /orders/:id -> get order details with items
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createClient();

  try {
    const { user, error: userError } = await getAuthorization(req, supabase);
    if (userError || !user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = params;
    const { data: order, error } = await supabase
      .from("order")
      .select("*, order_item(*)")
      .eq("id", id)
      .single();
    if (error || !order)
      return NextResponse.json({ error: "Order not found" }, { status: 404 });

    // Ensure user owns the order or is staff/admin
    const { data: dbUser } = await supabase
      .from("user")
      .select("role")
      .eq("id", user.id)
      .single();
    const isStaff = dbUser?.role === "staff" || dbUser?.role === "admin";
    if (!isStaff && order.user_id !== user.id)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    return NextResponse.json({ order });
  } catch (err: any) {
    console.error("Order fetch error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT /orders/:id -> update status + notify user
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createClient();

  try {
    const { user, error: userError } = await getAuthorization(req, supabase);
    if (userError || !user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = params;
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    if (!status)
      return NextResponse.json({ error: "Status required" }, { status: 400 });

    const { data: dbUser } = await supabase
      .from("user")
      .select("role")
      .eq("id", user.id)
      .single();
    const isStaff = dbUser?.role === "staff" || dbUser?.role === "admin";
    if (!isStaff)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { data: order, error } = await supabase
      .from("order")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;

    // Notify user
    await supabase.from("notifications").insert({
      user_id: order.user_id,
      message: `Your order #${order.id} is now ${status}`,
      is_read: false,
    });

    return NextResponse.json({ order });
  } catch (err: any) {
    console.error("Update order error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
