import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import type { NovaSession } from "@/lib/types/nova";

export async function GET(req: NextRequest) {
  // Verify cron secret
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization") || "";

  if (!cronSecret || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.slice(7);
  if (token !== cronSecret) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase not configured", sent_to: null, metrics: null },
      { status: 503 }
    );
  }

  try {
    // Get sessions from last 24 hours
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

    const { data: sessions, error } = await supabaseAdmin
      .from("nova_sessions")
      .select("*")
      .gte("created_at", `${yesterday}T00:00:00Z`)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Compute metrics
    const typedSessions = sessions as NovaSession[];
    const totalSessions = typedSessions.length;
    const sessionsWithEmail = typedSessions.filter((s) => s.email).length;
    const bookedSessions = typedSessions.filter((s) => s.booked).length;
    const conversionRate =
      sessionsWithEmail > 0
        ? Math.round((bookedSessions / sessionsWithEmail) * 100)
        : 0;
    const avgMessages =
      totalSessions > 0
        ? Math.round(
            typedSessions.reduce((sum, s) => sum + (s.messages?.length || 0), 0) /
              totalSessions
          )
        : 0;

    // Top industries
    const industryMap = new Map<string, number>();
    typedSessions.forEach((s) => {
      const industry = s.business_context?.industry || "Unknown";
      industryMap.set(industry, (industryMap.get(industry) || 0) + 1);
    });
    const topIndustries = Array.from(industryMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([industry, count]) => ({ industry, count }));

    // Top pain points
    const painPointMap = new Map<string, number>();
    typedSessions.forEach((s) => {
      (s.business_context?.pain_points || []).forEach((point) => {
        painPointMap.set(point, (painPointMap.get(point) || 0) + 1);
      });
    });
    const topPainPoints = Array.from(painPointMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([point, count]) => ({ point, count }));

    const metrics = {
      total_sessions: totalSessions,
      with_email: sessionsWithEmail,
      booked: bookedSessions,
      conversion_rate: conversionRate,
      avg_messages: avgMessages,
      top_industries: topIndustries,
      top_pain_points: topPainPoints,
    };

    // Send email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = "artemisexecutiveclub@gmail.com";

    if (!resendApiKey) {
      console.warn("[nova-digest] RESEND_API_KEY not configured");
      return NextResponse.json({
        ok: true,
        sent_to: null,
        metrics,
        warning: "Email not sent: RESEND_API_KEY not configured",
      });
    }

    const today = new Date().toISOString().slice(0, 10);
    const subject = `Nova Digest — ${today} — ${totalSessions} sessions, ${bookedSessions} booked`;

    const htmlBody = generateEmailHTML(
      today,
      metrics,
      typedSessions.slice(0, 5)
    );

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Nova Digest <nova@nmc-os.vercel.app>",
        to: recipientEmail,
        subject,
        html: htmlBody,
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      console.error("[nova-digest] Resend error:", resendError);
      return NextResponse.json(
        {
          ok: false,
          error: "Failed to send email",
          sent_to: null,
          metrics,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      sent_to: recipientEmail,
      metrics,
    });
  } catch (err) {
    console.error("[nova-digest] Error:", err);
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "Unknown error",
        sent_to: null,
        metrics: null,
      },
      { status: 500 }
    );
  }
}

function generateEmailHTML(
  date: string,
  metrics: {
    total_sessions: number;
    with_email: number;
    booked: number;
    conversion_rate: number;
    avg_messages: number;
    top_industries: Array<{ industry: string; count: number }>;
    top_pain_points: Array<{ point: string; count: number }>;
  },
  topSessions: any[]
): string {
  const baseUrl = "https://nmc-os.vercel.app";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #f5f5f5;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .header {
      background: #0a0a0b;
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
      border-bottom: 1px solid rgba(139,92,246,0.3);
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .header p {
      margin: 8px 0 0 0;
      font-size: 14px;
      color: #999;
    }
    .content {
      padding: 30px 20px;
    }
    .metrics-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 30px;
    }
    .metric-card {
      background: #f9f9f9;
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 15px;
      text-align: center;
    }
    .metric-value {
      font-size: 28px;
      font-weight: 700;
      color: #8b5cf6;
      margin: 0;
    }
    .metric-label {
      font-size: 12px;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 8px 0 0 0;
    }
    .section {
      margin-bottom: 25px;
    }
    .section h2 {
      font-size: 16px;
      font-weight: 700;
      color: #000;
      margin: 0 0 12px 0;
      padding-bottom: 8px;
      border-bottom: 2px solid #8b5cf6;
      display: inline-block;
    }
    .list {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .list li {
      padding: 8px 0;
      font-size: 14px;
      color: #333;
      border-bottom: 1px solid #f0f0f0;
    }
    .list li:last-child {
      border-bottom: none;
    }
    .list-count {
      font-weight: 700;
      color: #8b5cf6;
    }
    .sessions-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }
    .sessions-table th {
      background: #f9f9f9;
      padding: 10px;
      text-align: left;
      font-size: 12px;
      font-weight: 700;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid #ddd;
    }
    .sessions-table td {
      padding: 10px;
      font-size: 13px;
      color: #333;
      border-bottom: 1px solid #eee;
    }
    .session-link {
      color: #8b5cf6;
      text-decoration: none;
      font-weight: 600;
    }
    .session-link:hover {
      text-decoration: underline;
    }
    .footer {
      background: #f9f9f9;
      padding: 20px;
      text-align: center;
      border-top: 1px solid #eee;
      font-size: 12px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nova Digest</h1>
      <p>${date}</p>
    </div>
    <div class="content">
      <div class="metrics-grid">
        <div class="metric-card">
          <p class="metric-value">${metrics.total_sessions}</p>
          <p class="metric-label">Total Sessions</p>
        </div>
        <div class="metric-card">
          <p class="metric-value">${metrics.booked}</p>
          <p class="metric-label">Booked</p>
        </div>
        <div class="metric-card">
          <p class="metric-value">${metrics.with_email}</p>
          <p class="metric-label">With Email</p>
        </div>
        <div class="metric-card">
          <p class="metric-value">${metrics.conversion_rate}%</p>
          <p class="metric-label">Conversion Rate</p>
        </div>
      </div>

      <div class="section">
        <h2>Key Stats</h2>
        <ul class="list">
          <li>Average messages per session: <span class="list-count">${metrics.avg_messages}</span></li>
          <li>Sessions with email captured: <span class="list-count">${metrics.with_email} of ${metrics.total_sessions}</span></li>
          <li>Booking rate: <span class="list-count">${metrics.conversion_rate}%</span></li>
        </ul>
      </div>

      ${
        metrics.top_industries.length > 0
          ? `
      <div class="section">
        <h2>Top Industries</h2>
        <ul class="list">
          ${metrics.top_industries
            .map(
              (item) =>
                `<li>${item.industry}: <span class="list-count">${item.count}</span></li>`
            )
            .join("")}
        </ul>
      </div>
      `
          : ""
      }

      ${
        metrics.top_pain_points.length > 0
          ? `
      <div class="section">
        <h2>Top Pain Points</h2>
        <ul class="list">
          ${metrics.top_pain_points
            .map(
              (item) =>
                `<li>${item.point}: <span class="list-count">${item.count}</span></li>`
            )
            .join("")}
        </ul>
      </div>
      `
          : ""
      }

      ${
        topSessions.length > 0
          ? `
      <div class="section">
        <h2>Recent Sessions</h2>
        <table class="sessions-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Industry</th>
              <th>Booked</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${topSessions
              .map(
                (session) =>
                  `
            <tr>
              <td>${session.email || "—"}</td>
              <td>${session.business_context?.industry || "—"}</td>
              <td>${session.booked ? "✓" : "—"}</td>
              <td><a href="${baseUrl}/admin/nova/${session.id}" class="session-link">View</a></td>
            </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
      `
          : ""
      }
    </div>
    <div class="footer">
      <p>Nova Digest • Automated daily summary<br/>
      <a href="${baseUrl}/admin/nova" style="color: #8b5cf6; text-decoration: none;">View in admin</a></p>
    </div>
  </div>
</body>
</html>
  `;
}
