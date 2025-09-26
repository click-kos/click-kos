import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil" as any,
});

export async function PUT(req: NextRequest) {
  const supabase = await createClient();

  try {
    const sig = req.headers.get("stripe-signature");
    const rawBody = await req.text();

    if (!sig) {
      return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
    }

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

    // --- Handle events ---
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const paymentId = session.metadata?.payment_id;
      const orderId = session.metadata?.order_id;

      if (!paymentId || !orderId) {
        console.warn("Missing metadata for checkout.session.completed", event.id);
        return NextResponse.json({ received: true });
      }

      await supabase.from("payment").update({ status: "success" }).eq("payment_id", paymentId);
      await supabase.from("order").update({ status: "paid" }).eq("order_id", orderId);

      console.log(`Payment ${paymentId} succeeded. Order ${orderId} marked as paid.`);
    }

    if (event.type === "payment_intent.payment_failed") {
      const intent = event.data.object as Stripe.PaymentIntent;
      const paymentId = intent.metadata?.payment_id;
      const orderId = intent.metadata?.order_id;

      if (!paymentId || !orderId) {
        console.warn("Missing metadata for payment_intent.payment_failed", event.id);
        return NextResponse.json({ received: true });
      }

      await supabase.from("payment").update({ status: "failed" }).eq("payment_id", paymentId);
      await supabase.from("order").update({ status: "unpaid" }).eq("order_id", orderId);

      console.log(`Payment ${paymentId} failed. Order ${orderId} marked as unpaid.`);
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session;
      const paymentId = session.metadata?.payment_id;
      const orderId = session.metadata?.order_id;

      if (!paymentId || !orderId) {
        console.warn("Missing metadata for checkout.session.expired", event.id);
        return NextResponse.json({ received: true });
      }

      await supabase.from("payment").update({ status: "expired" }).eq("payment_id", paymentId);
      await supabase.from("order").update({ status: "unpaid" }).eq("order_id", orderId);

      console.log(`Checkout session expired for order ${orderId}.`);
    }


    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
