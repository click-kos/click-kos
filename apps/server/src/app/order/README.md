# Order API Documentation

A secure, scalable order management API built with Next.js and Supabase. Supports authenticated order placement, item tracking, status updates, and real-time notifications for users and staff.

 ## Features

• 	Authenticated order creation
• 	Itemized order tracking
• 	Subtotal and total calculations
• 	Notification system
• 	Role-based access (user vs staff)
• 	Realtime frontend support via Supabase channels

## Endpoints

**POST** /order

Create a new order with items.

**Request**
{
  "items": [
    { "product_id": "uuid", "quantity": 2, "price": 100 }
  ]
}

**Response**
{
  "order": { ... },
  "orderItems": [ ... ]
}
Inserts into order, order_item, and notifications.

**GET** /order

**Retrieve orders based on role**

    Staff: Sees all pending orders.
    User: Sees only their own orders.

**Response**

{
  "orders": [
    {
      "id": "uuid",
      "status": "pending",
      "order_item": [ ... ]
    }
  ]

}

**GET** /orders/:id
Get detailed order info including items.
Response
{
  "order": {
    "id": "uuid",
    "order_item": [ ... ]
  }
}

**PUT** /orders/:id?status=pending|confirmed|shipped|cancelled

Update order status and notify user.
Response
{
  "order": { ... }
}

**DELETE** /orders/:id

Cancel a pending order.
Response
{ "success": true }
Only orders with  can be cancelled.

## Notifications

Notifications are inserted into the notifications table for:
    Order placement
    Status updates
    Cancellations

**Each notification includes:**
{
  user_id: string,
  message: string,
  is_read: boolean
}


**Tech Stack**
    Framework: Next.js (App Router)
    Backend: Supabase (Postgres + Auth + Realtime)
    Auth: Supabase Session-based
    Notifications: Table-driven, Realtime-compatible

{
  user_id: string,
  message: string,
  is_read: boolean
}

**Best Practices**
    Validate item data before sending to POST /orders.
    Use Realtime subscriptions to avoid polling.

    Filter subscriptions by user_id to prevent data leaks.

    Index order.created_at and notifications.user_id for performance.