# GET /students/me

## Description
Fetch the student profile linked to the currently logged-in user.

## Authentication
Required: (user must be logged in).

## Allowed Roles:
student

## Request Parameters
None (the student is resolved automatically from the logged-in user_id).

**Response Example (200 OK)**

```json
{
  "id": "uuid-of-student-row",
  "user_id": "uuid-of-auth-user",
  "student_number": "20231234",
  "faculty": "Engineering",
  "year_of_study": 3
}
```

## Error Responses

**401 Unauthorized**
```json
{ "error": "Not logged in" }
```

**404 Not Found**
```json
{ "error": "Student profile not found" }
```


# POST /students/me

## Description
Insert or update the student profile for the currently logged-in user.

## Authentication
Required (user must be logged in).

## Allowed Roles:
student

## Request Body

```json
{
  "student_number": "20231234",   // required, must be unique
  "faculty": "Engineering",       // required
  "year_of_study": 3              // required, integer
}
```

## Response Example (200 OK)
```json
{
  "message": "Student profile updated successfully",
  "student": {
    "id": "uuid-of-student-row",
    "user_id": "uuid-of-auth-user",
    "student_number": "20231234",
    "faculty": "Engineering",
    "year_of_study": 3
  }
}
```

## Error Responses

**401 Unauthorized**
```json
{ "error": "Not logged in" }
```

**409 Conflict**
```json
{ "error": "Student number already exists" }
```

**500 Internal Server Error**
```json
{ "error": "Database insert/update failed" }
```

## Notes

student_number is enforced as unique in the database (and validated in API).

Restricted by RLS (Row-Level Security): only the owner (logged-in student) can access/update their record