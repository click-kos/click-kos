import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil" as any,
});

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createClient();

  try {
    const sig = req.headers.get("stripe-signature");
    const rawBody = await req.text();

    if (!sig) {
      return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
    }

    // Verify webhook event
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

    // Handle event types
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const paymentId = session.metadata?.payment_id;
      const orderId = session.metadata?.order_id;

      // Update payment row
      await supabase
        .from("payment")
        .update({ status: "success" })
        .eq("payment_id", paymentId);

      // Update order row
      await supabase
        .from("order")
        .update({ status: "paid" })
        .eq("order_id", orderId);
    }

    if (event.type === "payment_intent.payment_failed") {
      const intent = event.data.object as Stripe.PaymentIntent;
      const paymentId = intent.metadata?.payment_id;

      await supabase
        .from("payment")
        .update({ status: "failed" })
        .eq("payment_id", paymentId);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
