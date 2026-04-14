import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, company, tier, message } = data;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const payload = {
      name,
      email,
      company,
      tier,
      message,
      timestamp: new Date().toISOString(),
      sourcePagePath: "/",
      environment: process.env.NODE_ENV || "unknown"
    };

    // 1. VERCEL PRODUCTION LOGGING (Safe, persistent via Datadog/Vercel Logs)
    console.log("[NEXUS_LEAD_CAPTURE_SUCCESS]", JSON.stringify(payload));

    // 2. EXTERNAL WEBHOOK (If configured in Vercel Environment Variables)
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        console.log(`[NEXUS_WEBHOOK_DISPATCHED] Lead forwarded to ${webhookUrl}`);
      } catch (webhookErr) {
        console.error("[NEXUS_WEBHOOK_FAILED] Failed to forward lead:", webhookErr);
        // Do not throw; we already caught the lead in stdout and want to return success to the UI.
      }
    } else {
      console.warn("[NEXUS_SYSTEM_WARNING] No LEAD_WEBHOOK_URL configured. Lead exists in Vercel runtime logs only.");
    }

    return NextResponse.json({ success: true, message: "Lead captured successfully." });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
