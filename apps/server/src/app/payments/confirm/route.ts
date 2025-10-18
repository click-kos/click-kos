import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";


// Confirms a payment by verifying the Stripe Checkout Session and updating DB
export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil" as any,
});

    const { session_id, payment_id } = await req.json();

    if (!session_id && !payment_id) {
      return NextResponse.json({ error: "session_id or payment_id is required" }, { status: 400 });
    }

    const supabase = await createClient();

    // Retrieve session from Stripe to determine final status
    let session: Stripe.Checkout.Session | null = null;
    if (session_id) {
      session = await stripe.checkout.sessions.retrieve(session_id);
    } else if (payment_id) {
      return NextResponse.json({ status: "pending" }, { status: 202 });
    }

    if (!session) {
      return NextResponse.json({ error: "Checkout Session not found" }, { status: 404 });
    }

    const status = session.payment_status; // "paid" | "unpaid" | "no_payment_required"
    const metaPaymentId = (session.metadata?.payment_id as string | undefined) ?? payment_id;
    const metaOrderId = session.metadata?.order_id as string | undefined;

    if (!metaPaymentId) {
      return NextResponse.json({ error: "Missing payment_id in session metadata" }, { status: 400 });
    }

    if (status === "paid" || status === "no_payment_required") {
      await supabase.from("payment").update({ status: "success" }).eq("payment_id", metaPaymentId);
      if (metaOrderId) {
        await supabase
          .from("order")
          .update({ status: "paid" })
          .or(`id.eq.${metaOrderId},order_id.eq.${metaOrderId}`)
          .eq("status", "pending");
      }
      return NextResponse.json({ status: "success" });
    }

    if (status === "unpaid") {
      await supabase.from("payment").update({ status: "failed" }).eq("payment_id", metaPaymentId);
      if (metaOrderId) {
        await supabase
          .from("order")
          .update({ status: "unpaid" })
          .or(`id.eq.${metaOrderId},order_id.eq.${metaOrderId}`);
      }
      return NextResponse.json({ status: "failed" });
    }

    return NextResponse.json({ status: "pending" }, { status: 202 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


