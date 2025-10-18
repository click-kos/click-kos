import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-08-27.basil" as any,
  });

  try {
    const { amount, email, cart_items, user_id } = await req.json(); 
    const supabase = await createClient();

    // Determine app URL
    const fallbackOrigin = req.nextUrl.origin;
    const configuredWebUrl =
      process.env.WEB_APP_URL ||
      process.env.NEXT_PUBLIC_WEB_URL ||
      process.env.APP_URL;
    const appUrl =
      configuredWebUrl && /^(http|https):\/\//i.test(configuredWebUrl)
        ? configuredWebUrl
        : fallbackOrigin;

    // Insert payment row first
    const { data: payment, error } = await supabase
      .from("payment")
      .insert([
        {
          amount,
          method: "stripe",
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Convert cart items to Stripe line items
    const line_items = (cart_items || []).map((item: any) => ({
      price_data: {
        currency: "zar",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : undefined,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items,
      mode: "payment",
      success_url: `${appUrl}/payments/success?payment_id=${payment.payment_id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/payments/cancel`,
      metadata: { payment_id: payment.payment_id, user_id, cart_items: JSON.stringify(cart_items),
       },
    });

    return NextResponse.json({ payment, redirectUrl: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
