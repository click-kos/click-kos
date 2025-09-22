# Menu Service API

Manage menu items and their images.  
Built with **Next.js API Routes** + **Supabase**.

Base URL (local example):
http:localhost:3002/api/menu

## Add a Menu Item

'POST /menu'

Create a new menu item

**Body parameters:**

name-string-required(yes)-Description(Name of the menu item)
price-number-required(yes)-Description(Non-negative price)
description-string-required(yes)-Description(Short description)
category-string-required(yes)-Description(Category such as drinks, food)

**Response 201**
example url - http://localhost:3002/menu

then select Body-raw-json 
example of how to add

PASTE THE CODE BELOW
{
  "name": "Burger",
  "price": 49.99,
  "description": "Beef burger with cheese",
  "available": false,
  "category": "food"
}

expected output:

```json
{
  "message": "Menu item added successfully",
  "data": [
    {
      "item_id": "b9a27b0d-86ff-4e4c-9a27-738e6acfd5f1",
      "name": "Burger",
      "price": 49.99,
      "description": "Beef burger with cheese",
      "available": false,
      "category": "food",
    }
  ]
}

GET/menu
Fetch all menu items, with optional filters
example base url- http://localhost:3002/menu
Query Parameters

 Name       | Type    | Description                                        
----------- | ------- | -------------------------------------------------- 
`available` | boolean | Filter by availability. Example: `?available=true` 
 `category` | string | Filter by category. Example: `?category=drinks`    

Response 200
 {
  "message": "Menu items fetched successfully",
    "data": [
        {
            "item_id": "a41c3772-6831-4fc5-b837-21b3aa7d4432",
            "name": "Cheeseburger",
            "price": 79.99,
            "description": "Juicy beef burger with cheese",
            "available": true,
            "category": "food"
        },      
    ]
}

Get Single Menu Item
GET /menu/:id
example url - http://localhost:3002/menu/4dd95f20-342f-407b-ac6b-c945e23aab62
Retrieve one menu item by its ID

Path Parameter:
-id-menu item UUID
{
  "message": "Menu item fetched successfully",
  "data":[ {
    
    "item_id": "e1b49c6a-f38a-4dc2-90d3-29f87d8e1f23",
    "name": "Burger",
    "price": 49.99,
    "description": "Beef burger with cheese",
    "available": true,
    "category": "food", 
    
  }
  ]
}
GET BY FILTERS
GET /menu/?available=false/true
GET /menu/?category=food/drinks

example url -http://localhost:3002/menu/?available=false

expected output:
{
    "message": "Menu items fetched successfully",
    "data": [
        {
            "item_id": "4dd95f20-342f-407b-ac6b-c945e23aab62",
            "name": "Cheesy Chicken Wrap",
            "price": 79.99,
            "description": "Juicy beef burger with cheese",
            "available": false,
            "category": "food"
        },
        {
            "item_id": "1ebb2886-f4e2-46ec-a573-1363efe91c5c",
            "name": "Burger",
            "price": 49.99,
            "description": "Beef burger with cheese",
            "available": false,
            "category": "food"
        }
    ]
}
example url-http://localhost:3002/menu/?category=food
{
    "message": "Menu items fetched successfully",
    "data": [
        {
            "item_id": "a41c3772-6831-4fc5-b837-21b3aa7d4432",
            "name": "Cheeseburger",
            "price": 79.99,
            "description": "Juicy beef burger with cheese",
            "available": true,
            "category": "food"
        },
        {
            "item_id": "4dd95f20-342f-407b-ac6b-c945e23aab62",
            "name": "Cheesy Chicken Wrap",
            "price": 79.99,
            "description": "Juicy beef burger with cheese",
            "available": false,
            "category": "food"
        },
        {
            "item_id": "1ebb2886-f4e2-46ec-a573-1363efe91c5c",
            "name": "Burger",
            "price": 49.99,
            "description": "Beef burger with cheese",
            "available": false,
            "category": "food"
        }
    ]
}

Update a Menu item
PUT /menu/:id
example url- http://localhost:3002/menu/1ebb2886-f4e2-46ec-a573-1363efe91c5c
Body-raw-json
PASTE THE CODE
{
  "name": "Burger Deluxe",
  "price": 55.00,
  "description": "Bigger beef burger with cheese",
  "available": true,
  "category": "food"
}
Expected output:
Update a menu item by ID
{
  "message": "Menu item updated successfully",
  "data": [
    {
      "item_id": "e1b49c6a-f38a-4dc2-90d3-29f87d8e1f23",
      "name": "Burger Deluxe",
      "price": 55.00,
      "description": "Bigger beef burger with cheese",
      "available": true,
      "category": "food"
    }
  ]
}

DELETE a Menu Item
DELETE /menu/:id

Delete a menu item by ID
example url -http://localhost:3002/menu/1ebb2886-f4e2-46ec-a573-1363efe91c5c
Path Parameter:
id-menu item UUID
{
  "message": "Menu item deleted successfully"
}

Uppload item image

POST /menu/:id/images

Upload an image for a specific menu item
example url-http://localhost:3000/menu/a41c3772-6831-4fc5-b837-21b3aa7d4432

Path parameter:
-id- menu item UUID
NOTE: The follow key and Type must be exactly"file"

 Key  | Type | Required | Description          
 ---- | ---- | -------- | -------------------- 
 file | file | Yes      | Image file to upload 

{
    "message": "Image uploaded successfully",
    "url": "https://sdwplnwvxpiwjotdnpvo.supabase.co/storage/v1/object/public/menu_images/1758549006684_Smashburger-recipe-120219.webp",
    "data": [
        {
            "img_id": "0ba4c3ff-54a1-44fe-ba50-01f31784f775",
            "item_id": "a41c3772-6831-4fc5-b837-21b3aa7d4432",
            "url": "https://sdwplnwvxpiwjotdnpvo.supabase.co/storage/v1/object/public/menu_images/1758549006684_Smashburger-recipe-120219.webp"
        }
    ]
}

ERROR HANDLING

{
  "error": true,
  "message": "Description of what went wrong"//specific error
}

 Code| Meaning                         
---- | ------------------------------- 
400  | Validation failed / Bad Request 
404  | Menu item not found             
500  | Internal server error           






