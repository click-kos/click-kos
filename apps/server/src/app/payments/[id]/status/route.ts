import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";

export async function PUT(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-08-27.basil" as any,
  });
  const supabase = await createClient();

  try {
    const sig = req.headers.get("stripe-signature");
    const rawBody = await req.text();

    if (!sig)
      return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err: any) {
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const paymentId = session.metadata?.payment_id;

      if (!paymentId) return NextResponse.json({ received: true });

      // 1Mark payment as successful
      const { data: payment } = await supabase
        .from("payment")
        .update({ status: "success" })
        .eq("payment_id", paymentId)
        .select()
        .single();

      // 2Create order now that payment succeeded
      const user_id = session.customer_email; // Replace if you store user differently
      const total_amount = payment.amount;

      const { data: order } = await supabase
        .from("order")
        .insert([
          {
            user_id,
            total_amount,
            status: "paid",
            payment_id: payment.payment_id,
            ordered_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      // Optionally create order items if you store cart in session metadata
      if (session.metadata?.cart_items) {
        const cartItems = JSON.parse(session.metadata.cart_items);
        const orderItems = cartItems.map((item: any) => ({
          order_id: order.order_id,
          menu_item_id: item.menu_item_id,
          quantity: item.quantity,
          subtotal: item.price * item.quantity,
          ordered_at: new Date().toISOString(),
        }));

        await supabase.from("order_item").insert(orderItems);
      }

      console.log(`✅ Payment success. Order ${order.order_id} created.`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
