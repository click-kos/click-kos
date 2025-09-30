import { NextRequest, NextResponse } from "next/server";
import { createClient, getAuthorization } from "@/utils/supabase/server";

//POST: insert order + items + notification
export async function POST(req: NextRequest) {
  const supabase = await createClient();

  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // get user from session
    const {user, error: userError} = await getAuthorization(req, supabase);

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // calculate subtotals + total (casting to any[])
    const orderItems = (items as any[]).map((i) => ({
      product_id: i.product_id,
      quantity: i.quantity,
      price: i.price,
      subtotal: i.price * i.quantity,
    }));

    const total_amount = orderItems.reduce(
      (sum: number, i) => sum + (i.subtotal as number),
      0
    );

    // insert order
    const { data: order, error: orderError } = await supabase
      .from("order")
      .insert({ user_id: user.id, total_amount, status: "pending" })
      .select()
      .single();

    if (orderError) throw orderError;

    // insert items
    const withOrderId = orderItems.map((i) => ({
      ...i,
      order_id: order.id,
    }));

    const { error: itemsError } = await supabase.from("order_item").insert(withOrderId);
    if (itemsError) throw itemsError;

    // insert notification
    await supabase.from("notifications").insert({
      user_id: user.id,
      message: `Order #${order.id} placed successfully.`,
      is_read: false,
    });

    return NextResponse.json({ order, orderItems: withOrderId });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET: staff sees new orders, user sees their own
export async function GET(req: NextRequest) {
  const supabase = await createClient();

  try {
    const {user, error: userError} = await getAuthorization(req, supabase);

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isStaff = user.user_metadata?.role === "staff";

    let query = supabase.from("order").select("*, order_item(*)");

    if (isStaff) {
      query = query.eq("status", "pending");
    } else {
      query = query.eq("user_id", user.id);
    }

    const { data: orders, error } = await query.order("created_at", { ascending: false });
    if (error) throw error;

    return NextResponse.json({ orders });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}