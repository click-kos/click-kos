# API: Get Authenticated User Profile

## Endpoint

**GET** /api/profile
Purpose
Securely retrieves the authenticated user's profile from Supabase, including any related student data if applicable.

**Authentication**
This endpoint requires a valid Supabase access token provided via the Authorization header.
Header Format:
Authorization: Bearer <access_token>
If the token is missing, invalid, or expired, the request will be rejected with a  response.

**Request**
Method: GET
Headers: Authorization, Required(yes), Description(Supabase JWT token in Bearer<token> format)


**Response**
Success: 200 OK
    Returns the user's profile data, including student relationship if present

{
  "user": {
    "user_id": "uuid",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "student",
    "profile_image_url": "https://...",
    "student": {
      // Student-specific fields
    }
  }
}

**Error Responses**
Status   Message                    Description
401      Missing access token       No token provided in the request header
401      Invalid or expired token   Token is invalid or session has expired
404      User not found             No matching user record in the database
500      Internal server error      Unexpected server-side error during processing


## Internal Logic Summary

**Token Extraction**
Parses the  header to extract the JWT.

**Supabase Client Initialization**
Creates a server-side Supabase client using a custom utility.

**Token Verification**
Validates the token and retrieves the authenticated user via supabase.auth.getUser(token).

**User Data Fetch**
Queries the  table for profile fields and includes related  data.

**Error Handling**
Handles missing tokens, invalid sessions, missing user records, and unexpected failures gracefully