# LOGIN API DOCUMENTATION

## Endpoint

**POST** 'auth/login'

---

## Purpose

This API handles user authentication using Supabase. It validates the user's email and password, then attempts to sign them in via Supabase's signInWithPassword method.

---

## Method

post

---

## Content-Type

application/json

---

## Expected Request Body

{
  "email": "user@example.com",
  "password": "yourPassword123"
}

----

## Validation Logic

Before attempting authentication, the API performs several checks:

Presence Check: Ensures both email and password are provided.

Email Format: Uses a regular expression to confirm the email is valid.

Password Length: Requires a minimum of 6 characters.

If any of these validations fail, the API returns a 400 Bad Request with a relevant error message.

---

## Authentication Flow

Once inputs are validated:

A Supabase client is initialized via createClient().

The API calls supabase.auth.signInWithPassword({ email, password }).

If authentication fails, it returns a 401 Unauthorized with the error message.

If successful, it returns the authenticated user's data and session.

---

## Response Structure


**Success (200 OK)**

{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "created_at": "2025-09-03T12:34:56Z",
    "...": "other user fields"
  },
  "session": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token",
    "expires_in": 3600,
    "token_type": "bearer"
  }
}


---

## Client Errors


**Missing fields or invalid format (400):**


{ "error": "Email and password are required" }


{ "error": "Invalid email format" }


{ "error": "Password must be at least 6 characters long" }

----

**Authentication failure (401):**


{ "error": "Invalid login credentials" }

---

**Server Error (500)**

{ "error": "Internal server error" }