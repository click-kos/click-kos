# Payment API Documentation

This API manages payments and integrates with Stripe for checkout and webhook handling. It consists of three Next.js API routes and one Supabase Edge Function.

 1. POST /payments

## Description

Creates a new payment record in Supabase and initializes a Stripe Checkout Session. Returns the payment row and a redirect URL for the client.

**Request**

***POST*** /payments
Content-Type: application/json

{
  "order_id": "12345",
  "amount": 199.99,
  "email": "customer@example.com"
}

**Response**

{
  "payment": {
    "payment_id": "uuid",
    "order_id": "12345",
    "amount": 199.99,
    "method": "stripe",
    "status": "pending"
  },

  "redirectUrl": "https://checkout.stripe.com/pay/cs_test_..."
}

Uses NEXT_PUBLIC_PUBLISHABLE_STRIPE_KEY on frontend to load Stripe.js..

Uses STRIPE_SECRET_KEY on backend to create Checkout Session.

Payment row is created with status pending.

2. GET /payments/:id

## Description
Fetches a single payment record by its payment_id.

**Request**

***GET*** /payments/uuid

**Response**

{
  "payment_id": "uuid",
  "order_id": "12345",
  "amount": 199.99,
  "method": "stripe",
  "status": "pending"
}

Returns 404 if payment not found.

Useful for frontend polling to check payment status.

3. PUT /payments/:id/status

## Description

Webhook handler for Stripe events. Verifies the Stripe signature, updates the payment row, and updates the related order.

**Request**

Stripe sends signed webhook events to this endpoint.

Example event: checkout.session.completed, payment_intent.payment_failed.

**Response**

{ "received": true }

Requires STRIPE_WEBHOOK_SECRET to verify authenticity.

Updates payment.status = success / failed.

On success, also updates order.status = paid.

4. Supabase Edge Function: stripe-webhook

## Description

Serverless function that receives Stripe webhook events directly from Stripe. This is the recommended production webhook handler

Flow
Stripe → sends event to deployed Edge Function URL.

Function verifies signature with STRIPE_WEBHOOK_SECRET.

Updates Supabase payment and order tables via REST API.

Example Event Handling
checkout.session.completed = mark payment success, order paid.

payment_intent.payment_failed = mark payment failed.

**Response**

{ "received": true }
🔐 Security & Compliance

Secrets:

NEXT_PUBLIC_PUBLISHABLE_STRIPE_KEY = frontend only.

STRIPE_SECRET_KEY = backend only (API routes, Edge Functions).

STRIPE_WEBHOOK_SECRET = Edge Function only.

Compliance:

No sensitive card data is stored.

Only store minimal metadata (order_id, amount, status).

Aligns with POPIA by avoiding unnecessary personal data storage.


### End-to-End Flow

Client calls POST /payments → gets redirectUrl.

Client redirects user to Stripe Checkout.

Stripe processes payment → calls webhook (PUT /payments/:id/status or Supabase Edge Function).

Webhook verifies + updates DB.

Client polls GET /payments/:id to confirm status.