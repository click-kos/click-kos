import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createClient } from "@/utils/supabase/server";

export async function POST(
  request: Request,
  { params }: any 
) {
  const supabase = await createClient();
  const id = params.id;

  // Parse the multipart form-data
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Convert file to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Generate unique name
  const fileName = `${randomUUID()}-${file.name}`;

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from("files")
    .upload(`item_images/${fileName}`, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: true, // overwrite if same path
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("files").getPublicUrl(`item_images/${fileName}`);

  // Check if item already has an image
  const { data: existing } = await supabase
    .from("item_image")
    .select("img_id")
    .eq("item_id", id)
    .maybeSingle();

  let imageData;
  if (existing) {
    // Update existing image
    const { data, error } = await supabase
      .from("item_image")
      .update({ url: publicUrl })
      .eq("item_id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    imageData = data;
  } else {
    // Insert new image
    const { data, error } = await supabase
      .from("item_image")
      .insert([{ item_id: id, url: publicUrl }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    imageData = data;
  }

  return NextResponse.json(
    { message: "Image uploaded successfully", data: imageData },
    { status: 201 }
  );
}

