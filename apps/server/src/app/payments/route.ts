import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil" as any,
});

export async function POST(req: NextRequest) {
  try {
    const { order_id, amount, email } = await req.json();
    const supabase = await createClient();

    // Insert payment row
    const { data: payment, error } = await supabase
      .from("payment")
      .insert([
        {
          order_id,
          amount,
          method: "stripe",
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "zar", //South African Rand
            product_data: { name: `Order ${order_id}` },
            unit_amount: Math.round(amount * 100), // cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      //Include payment_id in success URL for frontend lookup
      success_url: `${process.env.APP_URL}/payments/success?payment_id=${payment.payment_id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}/payments/cancel`,
      metadata: { payment_id: payment.payment_id, order_id },
    });

    return NextResponse.json({ payment, redirectUrl: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
