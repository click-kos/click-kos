# Notifications

### Add a notification

`POST /notifications`

Create a notification

**Body Parameters:**

- `token (optional)` → session token, needed if a notification is meant for the session user, by default, the notification is sent to every registered user
- `type` → alert, confirmation, payment...
- `message` → message of the notification

**Response**

```json
{
  "message": "Notification created successfully",
  "data": {
    "notification_id": "e1b49c6a-f38a-4dc2-90d3-29f87d8e1f23",
    "user_id": "9900e01b-4f9d-4ffd-ac58-7f6c3a1e0977",
    "type": "alert",
    "message": "Order payment successful.",
    "created_at": "2025-09-02T22:18:37.069009"
  }
}
```

---

### List Notifications

`GET /notifications`

Fetch all notifications for the authenticated user.

**Query Parameters (optional):**

- `limit` → number of notifications per page (default: 20)
- `page` → page number for pagination (default: 1)

**Response:**

```json
{
  "message": "Notifications fetched successfully",
  "data": [
    {
      "notification_id": "5d9afe99-2b46-40ae-a2fd-e3f998ca196f",
      "user_id": "9900e01b-4f9d-4ffd-ac58-7f6c3a1e0977",
      "type": "confirmation",
      "message": "Your order has been placed",
      "created_at": "2025-09-02T22:16:20.813769"
    },
    {
      "notification_id": "7dfc8be6-fd3a-49b7-8099-62a903dee553",
      "user_id": "9900e01b-4f9d-4ffd-ac58-7f6c3a1e0977",
      "type": "alert",
      "message": "Your order is ready to be picked up.",
      "created_at": "2025-09-02T22:17:07.398626"
    },
    {
      "notification_id": "b21fb709-69c8-4840-b6f7-0e0b09d54a3e",
      "user_id": null,
      "type": "alert",
      "message": "Change your password in 5 days from now",
      "created_at": "2025-08-30T19:21:09.225696"
    }
  ]
}
```

---

### Update a notification

> ⚠️ **Not available in current version**

`PATCH /notifications/:id?read=true`

Mark a specific notification as **read**.

**Path Parameter:**

- `id` → notification ID

**Response:**

```json
{
  "notification_id": "e1b49c6a-f38a-4dc2-90d3-29f87d8e1f23",
  "user_id": "9900e01b-4f9d-4ffd-ac58-7f6c3a1e0977",
  "type": "alert",
  "message": "Order payment successful.",
  "created_at": "2025-09-02T22:18:37.069009"
}
```

---

### Delete Notification

`DELETE /notifications/?id=xxxxx`

Delete a notification.

**Response:**

```json
{
  "message": "Notification deleted successfully."
}
```

---

## Error Handling

All errors return this structure:

```json
{
  "error": true,
  "message": "Notification not found"
}
```

| Code | Meaning                |
| ---- | ---------------------- |
| 400  | Bad Request            |
| 401  | Unauthorized           |
| 404  | Notification not found |
| 500  | Internal Server Error  |
