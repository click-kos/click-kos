import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// details with items
export async function GET(_: NextRequest, { params }: any) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("order")
      .select("*, order_item(*)")
      .eq("id", params.id)
      .single();

    if (error) throw error;

    return NextResponse.json({ order: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

//update status + notify user
export async function PUT(req: NextRequest, { params }: any) {
  const supabase = await createClient();

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    const { data: order, error } = await supabase
      .from("order")
      .update({ status })
      .eq("id", params.id)
      .select()
      .single();

    if (error) throw error;

    // notify order owner
    await supabase.from("notifications").insert({
      user_id: order.user_id,
      message: `Your order #${order.id} is now ${status}`,
      is_read: false,
    });

    return NextResponse.json({ order });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /orders/:id -> cancel only if pending
export async function DELETE(_: NextRequest, { params }: any) {
  const supabase = await createClient();

  try {
    const { data: order, error } = await supabase
      .from("order")
      .select()
      .eq("id", params.id)
      .single();

    if (error) throw error;

    if (order.status !== "pending") {
      return NextResponse.json({ error: "Only pending orders can be cancelled" }, { status: 400 });
    }

    await supabase.from("order_item").delete().eq("order_id", order.id);
    await supabase.from("order").delete().eq("id", order.id);

    await supabase.from("notifications").insert({
      user_id: order.user_id,
      message: `Your order #${order.id} was cancelled.`,
      is_read: false,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}