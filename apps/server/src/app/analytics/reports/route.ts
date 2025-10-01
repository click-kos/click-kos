// /apps/server/src/app/analytics/reports/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server"; // your existing Supabase helper
import { generatePDFBase64 } from "../utils/pdf"; // relative import to helper

export async function GET(req: Request) {
  try {
    const supabase = await createClient();

    // Fetch orders
    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select("*")
      .limit(1000);

    if (ordersError) {
      console.error("Orders fetch error:", ordersError);
      return NextResponse.json({ status: "500", message: "Error fetching orders" }, { status: 500 });
    }

    // Fetch staff
    const { data: staff, error: staffError } = await supabase
      .from("staff")
      .select("*")
      .limit(1000);

    if (staffError) {
      console.error("Staff fetch error:", staffError);
      return NextResponse.json({ status: "500", message: "Error fetching staff" }, { status: 500 });
    }

    // Generate base64 PDF (minimal placeholder)
    const pdfBase64 = await generatePDFBase64({ orders, staff });

    return NextResponse.json({
      status: "200",
      message: "Report generated successfully",
      data: {
        report_name: "analytics_report.pdf",
        base64_pdf: pdfBase64
      }
    });
  } catch (err: unknown) {
    console.error("Report route error:", err);
    return NextResponse.json({ status: "500", message: "Internal server error" }, { status: 500 });
  }
}
