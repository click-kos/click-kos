# Analytics API Documentation

## Base URL

```
http://localhost:3000/app/analytics
```

---

## 1. Sales Analytics

**GET** `/sales`

**Description:** Returns total orders, avg order value, and sales trend data.

**Response:**

```json
{
  "status": "200",
  "message": "Sales analytics fetched successfully",
  "data": {
    "total_orders": 1234,
    "avg_order_value": 56.78,
    "sales_trend": [
      { "date": "2025-09-01", "total_sales": 12345.67, "orders": 25 }
    ]
  }
}
```

---

## 2. Items Analytics

**GET** `/items`

**Description:** Returns item counts, ordered by popularity.

**Response:**

```json
{
  "status": "200",
  "message": "Items analytics fetched successfully",
  "data": [
    { "item_id": "item1", "item_name": "Product A", "count": 50 },
    { "item_id": "item2", "item_name": "Product B", "count": 30 }
  ]
}
```

---

## 3. Staff Analytics

**GET** `/staff`

**Description:** Returns number of orders handled per staff.

**Response:**

```json
{
  "status": "200",
  "message": "Staff analytics fetched successfully",
  "data": [
    { "staff_id": "staff1", "orders": 120 },
    { "staff_id": "staff2", "orders": 80 }
  ]
}
```

---

## 4. Reports

**GET** `/reports`

**Description:** Generates a PDF report including sales and staff data. Returns as base64.

**Response:**

```json
{
  "status": "200",
  "message": "Report generated successfully",
  "data": {
    "report_name": "analytics_report.pdf",
    "base64_pdf": "<base64-encoded-pdf>"
  }
}
```

---

## 5. Peak Hours

**GET** `/peak-hours`

**Description:** Returns order counts per hour for peak-hour analysis.

**Response:**

```json
{
  "status": "200",
  "message": "Peak hours data fetched successfully",
  "data": [
    { "hour": 0, "orders": 5 },
    { "hour": 12, "orders": 34 },
    { "hour": 18, "orders": 56 }
  ]
}
```

---

## Notes

* All endpoints require authentication with a staff/admin access token (Bearer Token in the `Authorization` header).
* `sales` endpoint provides data for sales trend charts including date, revenue, and number of orders.
* `peak-hours` endpoint provides data for peak-hour charts.
* `reports` returns a minimal base64 PDF for now; can be replaced with a fully formatted PDF generator later.
