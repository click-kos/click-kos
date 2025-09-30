import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createClient } from "@/utils/supabase/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
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
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("files").getPublicUrl(`item_images/${fileName}`);

  // Insert into item_image
  const { data: imageData, error: imageError } = await supabase
    .from("item_image")
    .insert([{ item_id: id, url: publicUrl }])
    .select()
    .single();

  if (imageError) {
    return NextResponse.json({ error: imageError.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Image uploaded successfully", data: imageData },
    { status: 201 }
  );
}
