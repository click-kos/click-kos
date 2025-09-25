import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// Validation function
function validateMenuItem(data: any) {
    const errors: Record<string, string> = {};

    if (!data.name || typeof data.name !== "string")
        errors.name = "Name is required and must be a string.";
    if (data.price === undefined || typeof data.price !== "number" || data.price < 0)
        errors.price = "Price is required and must be a non-negative number.";
    if (!data.description || typeof data.description !== "string")
        errors.description = "Description is required and must be a string.";
    if (data.available !== undefined && typeof data.available !== "boolean")
        errors.available = "Available must be a boolean.";
    if (!data.category || typeof data.category !== "string")
        errors.category = "Category is required and must be a string.";

    return Object.keys(errors).length > 0 ? errors : null;
}

// GET /api/menu/:id
export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("menu_item")
        .select(`
            *,
            item_image(url)
        `)
        .eq("item_id", id)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json({ message: "Menu item fetched successfully", data }, { status: 200 });
}

// PUT /api/menu/:id
// PUT /api/menu/:id
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const supabase = await createClient();
  const body = await req.json();

  // Pull imageUrl out separately; rest goes to menu_item
  const { imageUrl, ...updateFields } = body;

  // Validate the item fields (not imageUrl)
  const validationErrors = validateMenuItem(updateFields);
  if (validationErrors) {
    return NextResponse.json({ error: validationErrors }, { status: 400 });
  }

  // Update the menu_item record
  const { data: itemData, error: itemError } = await supabase
    .from("menu_item")
    .update(updateFields)
    .eq("item_id", id)
    .select()
    .single();

  if (itemError) {
    return NextResponse.json({ error: itemError.message }, { status: 500 });
  }

  //  If imageUrl is provided, insert or update the related item_image record
 // 2Handle image update if provided
let imageRecord = null;
if (imageUrl) {
  // Check if an image already exists for this menu item
  const { data: existing, error: fetchError } = await supabase
    .from("item_image")
    .select("img_id")       // use your actual primary key
    .eq("item_id", id)
    .maybeSingle();

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  if (existing) {
    // Update the existing image URL
    const { data: updatedImage, error: updateError } = await supabase
      .from("item_image")
      .update({ url: imageUrl })
      .eq("item_id", id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }
    imageRecord = updatedImage;
  } else {
    // Insert a new record if none exists
    const { data: newImage, error: insertError } = await supabase
      .from("item_image")
      .insert([{ item_id: id, url: imageUrl }])
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
    imageRecord = newImage;
  }
}


  return NextResponse.json(
    {
      message: "Menu item updated successfully",
      data: { ...itemData, image: imageRecord },
    },
    { status: 200 }
  );
}

// DELETE /api/menu/:id
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const supabase = await createClient();

    const { error } = await supabase.from("menu_item").delete().eq("item_id", id);

    if (error)
        return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ message: "Menu item deleted successfully" }, { status: 200 });
}

// POST /api/menu/:id/images
export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const supabase = await createClient();

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file)
        return NextResponse.json({ error: "File is required" }, { status: 400 });

    // Upload to Supabase Storage
    const filename = `${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage
        .from("menu_images")
        .upload(filename, file);

    if (uploadError)
        return NextResponse.json({ error: uploadError.message }, { status: 500 });

    // Get public URL
    const publicUrl = supabase
        .storage
        .from("menu_images")
        .getPublicUrl(filename).data.publicUrl;

    // Insert into item_image table
    const { data: insertedImage, error: insertError } = await supabase
        .from("item_image")
        .insert([{ item_id: id, url: publicUrl }])
        .select();

    if (insertError)
        return NextResponse.json({ error: insertError.message }, { status: 500 });

    return NextResponse.json(
        { message: "Image uploaded successfully", url: publicUrl, data: insertedImage },
        { status: 201 }
    );
}
