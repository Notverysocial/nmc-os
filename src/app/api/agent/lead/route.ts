import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { supabaseAdmin } from "@/lib/supabase";
import type { NovaMessage, NovaBusinessContext } from "@/lib/types/nova";

export const runtime = "nodejs";

interface LeadRequest {
  session_id: string;
  email?: string;
  messages?: NovaMessage[];
  business_context?: NovaBusinessContext;
  booked?: boolean;
}

interface LeadResponse {
  ok: boolean;
  session_id?: string;
  error?: string;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function computeIpHash(request: NextRequest): string {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (!xForwardedFor) {
    return "";
  }
  const firstIp = xForwardedFor.split(",")[0].trim();
  return createHash("sha256").update(firstIp).digest("hex");
}

export async function POST(request: NextRequest): Promise<NextResponse<LeadResponse>> {
  try {
    const body = (await request.json()) as LeadRequest;

    // Validate session_id
    if (!body.session_id || typeof body.session_id !== "string") {
      return NextResponse.json(
        { ok: false, error: "Missing or invalid session_id" },
        { status: 400 }
      );
    }

    // Validate email if provided
    if (body.email && typeof body.email === "string" && body.email.trim().length > 0) {
      if (!validateEmail(body.email)) {
        return NextResponse.json(
          { ok: false, error: "Invalid email format" },
          { status: 400 }
        );
      }
    }

    // Check if Supabase is configured
    if (!supabaseAdmin) {
      console.warn("[Nova Lead] Supabase not configured; skipping persistence");
      return NextResponse.json(
        { ok: true, session_id: body.session_id },
        { status: 503 }
      );
    }

    const ipHash = computeIpHash(request);
    const userAgent = request.headers.get("user-agent") || null;
    const now = new Date().toISOString();

    // Check if session already exists
    const { data: existing, error: selectError } = await supabaseAdmin
      .from("nova_sessions")
      .select("session_id")
      .eq("session_id", body.session_id)
      .single();

    if (selectError && selectError.code !== "PGRST116") {
      // PGRST116 = no rows found (expected on first insert)
      console.error("[Nova Lead] Database select error:", selectError);
      return NextResponse.json(
        { ok: false, error: "Database error" },
        { status: 500 }
      );
    }

    const isUpdate = !!existing;

    if (isUpdate) {
      // Upsert (update)
      const updatePayload: Record<string, unknown> = {
        updated_at: now,
      };

      if (body.email !== undefined) {
        updatePayload.email = body.email || null;
      }
      if (body.messages) {
        updatePayload.messages = body.messages;
      }
      if (body.business_context !== undefined) {
        updatePayload.business_context = body.business_context || null;
      }
      if (body.booked !== undefined) {
        updatePayload.booked = body.booked;
        if (body.booked) {
          updatePayload.completed_at = now;
        }
      }

      const { error: updateError } = await supabaseAdmin
        .from("nova_sessions")
        .update(updatePayload)
        .eq("session_id", body.session_id);

      if (updateError) {
        console.error("[Nova Lead] Database update error:", updateError);
        return NextResponse.json(
          { ok: false, error: "Failed to update session" },
          { status: 500 }
        );
      }
    } else {
      // Insert
      const insertPayload: Record<string, unknown> = {
        session_id: body.session_id,
        started_at: now,
        created_at: now,
        updated_at: now,
        messages: body.messages || [],
        email: body.email || null,
        booked: body.booked || false,
        business_context: body.business_context || null,
        user_agent: userAgent,
        ip_hash: ipHash,
      };

      const { error: insertError } = await supabaseAdmin
        .from("nova_sessions")
        .insert([insertPayload]);

      if (insertError) {
        console.error("[Nova Lead] Database insert error:", insertError);
        return NextResponse.json(
          { ok: false, error: "Failed to create session" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { ok: true, session_id: body.session_id },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Nova Lead] Unexpected error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
