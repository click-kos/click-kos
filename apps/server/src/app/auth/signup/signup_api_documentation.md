# Signup API Documentation  

## Endpoint  
**POST** `/signup`  

---

## Description  
This endpoint allows a new user to register. It creates an account in Supabase Auth and stores user details in the `user` table. If the role is `student`, it also saves additional student information in the `student` table.  

---

## Request Body  
```json
{
  "email": "student@example.com",
  "password": "strongpassword",
  "first_name": "John",
  "last_name": "Doe",
  "role": "student",
  "student_number": "ST123456",
  "faculty": "Engineering",
  "year_of_study": 2
}
```

### Field Requirements  
- `email` *(string, required)* → Must be a valid email format  
- `password` *(string, required)* → Minimum 6 characters  
- `first_name` *(string, required)*  
- `last_name` *(string, required)*  
- `role` *(string, required)* → e.g., `"student"`, `"coach"`, `"admin"`  
- If `role = student`:  
  - `student_number` *(string, required)*  
  - `faculty` *(string, required)*  
  - `year_of_study` *(number, required)*  

---

## Response Examples  

### ✅ Success Response (201 Created)  
```json
{
  "status": "201",
  "message": "Signup successful",
  "data": {
    "user": {
      "id": "8c4e9a5b-9e92-44a5-9f14-d3a85e2a4f56",
      "email": "student@example.com"
    },
    "session": {
      "access_token": "eyJhbGciOiJIUzI1...",
      "refresh_token": "abc123..."
    }
  }
}
```

---

### ❌ Error Responses  

**400 (Bad Request - Validation Errors)**  
```json
{
  "status": "400",
  "message": "Invalid or missing email"
}
```
```json
{
  "status": "400",
  "message": "Password must be at least 6 characters long"
}
```
```json
{
  "status": "400",
  "message": "First name is required"
}
```
```json
{
  "status": "400",
  "message": "Student number is required for students"
}
```

**500 (Internal Server Error)**  
```json
{
  "status": "500",
  "message": "Internal Server Error"
}
```

---

## Usage Example in Next.js  

```tsx
// app/api-example/page.tsx
export default async function ApiExample() {
  const res = await fetch("https://api-click-kos.netlify.app/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    cache: "no-store",
    body: JSON.stringify({
      email: "student@example.com",
      password: "strongpassword",
      first_name: "John",
      last_name: "Doe",
      role: "student",
      student_number: "ST123456",
      faculty: "Engineering",
      year_of_study: 2
    })
  });

  const data = await res.json();

  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
}
```
