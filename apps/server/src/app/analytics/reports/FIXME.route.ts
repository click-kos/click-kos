// app/api/analytics/reports/route.ts
import { NextResponse } from "next/server";
import { createClient, getAuthorization } from "@/utils/supabase/server";
import PDFDocument from "pdfkit";




export async function GET(req: Request) {
  try {
    const supabase = await createClient();

    // ✅ Auth check
    const {user, error} = await getAuthorization(req, supabase);
    if (!user) {
      return NextResponse.json({ status: "401", message: "Unauthorized" }, { status: 401 });
    }

    const { data: roles } = await supabase
      .from("user")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (!roles || (roles.role !== "staff" && roles.role !== "admin")) {
      return NextResponse.json({ status: "403", message: "Forbidden" }, { status: 403 });
    }

    // ✅ Generate PDF dynamically
    const doc = new PDFDocument();
    doc.text("Analytics Report", { align: "center" });
    doc.moveDown();
    doc.text("This is a sample analytics report generated as PDF.");
    doc.end();

    const buffer = doc.read();
    const base64 = buffer.toString("base64");

    return NextResponse.json({
      status: "200",
      message: "Report generated successfully",
      data: { file: base64 }
    });
  } catch (err) {
    return NextResponse.json({ status: "500", message: "Internal Server Error", error: err }, { status: 500 });
  }
}
