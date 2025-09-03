// Import Next.js request/response types and Supabase client creator
import { NextRequest, NextResponse } from "next/server";  
import { createClient} from "@/utils/supabase/server";

// Define the GET handler for an API route
export async function GET(req: NextRequest) {
  try {
    
    // Extract the token from the Authorization header (format: "Bearer <token>")

    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Missing access token"}, { status: 401});
    }
    
    // Create a Supabase client instance (server-side)

    const supabase = await createClient();

    // Verify the token and get the user
    const { data: {user}, error: userError} = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json({error: "Invalid or expired token"}, {status: 401});
    }

    return NextResponse.json({ user }, { status: 200});
} catch (err) {
  console.error("Profile fetch error:", err);
  return NextResponse.json({ error: "Internal server error"}, { status: 500})
}
  }











