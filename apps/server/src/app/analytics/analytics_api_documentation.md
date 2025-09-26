# 📊 Analytics API Documentation

## 1. Sales Analytics  
**Endpoint:**  
`GET /analytics/sales`  

**Description:**  
Retrieves total sales amounts aggregated by date.  

**Authentication:**  
Restricted to **staff** and **admin** roles.  

**Query Parameters:**  
- None (future extensions may include date range).  

**Request Body:**  
- None.  

**Response 200 (Success):**  
```json
{
  "status": "200",
  "message": "Sales analytics fetched successfully",
  "data": [
    {
      "date": "2025-09-15",
      "total_sales": 12345.67
    },
    {
      "date": "2025-09-16",
      "total_sales": 9876.54
    }
  ]
}
```  

**Error Response:**  
```json
{
  "status": "500",
  "message": "Error fetching sales analytics"
}
```  

**Usage Example in Next.js:**  
```tsx
export default async function SalesAnalytics() {
  const res = await fetch("/analytics/sales", {
    method: "GET",
    cache: "no-store"
  });
  const data = await res.json();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```  

---

## 2. Items Analytics  
**Endpoint:**  
`GET /analytics/items`  

**Description:**  
Retrieves items sorted by popularity (most frequently sold).  

**Authentication:**  
Restricted to **staff** and **admin** roles.  

**Query Parameters:**  
- None.  

**Request Body:**  
- None.  

**Response 200 (Success):**  
```json
{
  "status": "200",
  "message": "Items analytics fetched successfully",
  "data": [
    {
      "item_id": "A123",
      "item_name": "Cappuccino",
      "total_orders": 150
    },
    {
      "item_id": "B456",
      "item_name": "Latte",
      "total_orders": 120
    }
  ]
}
```  

**Error Response:**  
```json
{
  "status": "500",
  "message": "Error fetching items analytics"
}
```  

**Usage Example in Next.js:**  
```tsx
export default async function ItemsAnalytics() {
  const res = await fetch("/analytics/items", {
    method: "GET",
    cache: "no-store"
  });
  const data = await res.json();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```  

---

## 3. Staff Analytics  
**Endpoint:**  
`GET /analytics/staff`  

**Description:**  
Retrieves staff activity data (e.g., orders handled or assignments completed).  

**Authentication:**  
Restricted to **staff** and **admin** roles.  

**Query Parameters:**  
- None.  

**Request Body:**  
- None.  

**Response 200 (Success):**  
```json
{
  "status": "200",
  "message": "Staff analytics fetched successfully",
  "data": [
    {
      "staff_id": "S001",
      "staff_name": "Alice Johnson",
      "orders_handled": 230
    },
    {
      "staff_id": "S002",
      "staff_name": "Bob Smith",
      "orders_handled": 180
    }
  ]
}
```  

**Error Response:**  
```json
{
  "status": "500",
  "message": "Error fetching staff analytics"
}
```  

**Usage Example in Next.js:**  
```tsx
export default async function StaffAnalytics() {
  const res = await fetch("/analytics/staff", {
    method: "GET",
    cache: "no-store"
  });
  const data = await res.json();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```  

---

## 4. Reports Analytics (PDF Generator)  
**Endpoint:**  
`GET /analytics/reports`  

**Description:**  
Generates a PDF report (sales, items, staff) and returns it as a **Base64 string**.  

**Authentication:**  
Restricted to **staff** and **admin** roles.  

**Query Parameters:**  
- None.  

**Request Body:**  
- None.  

**Response 200 (Success):**  
```json
{
  "status": "200",
  "message": "Report generated successfully",
  "data": {
    "report_name": "analytics_report_2025-09-15.pdf",
    "base64_pdf": "JVBERi0xLjQKJeLjz9MNCjEgMCBvYmo..."
  }
}
```  

**Error Response:**  
```json
{
  "status": "500",
  "message": "Error generating report"
}
```  

**Usage Example in Next.js (Download PDF):**  
```tsx
export default async function ReportsAnalytics() {
  const res = await fetch("/analytics/reports", {
    method: "GET",
    cache: "no-store"
  });
  const data = await res.json();

  // Convert Base64 back to PDF
  if (data.data?.base64_pdf) {
    const link = document.createElement("a");
    link.href = "data:application/pdf;base64," + data.data.base64_pdf;
    link.download = data.data.report_name;
    link.click();
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```  
