import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { session_id, booked } = body;

    if (!session_id || typeof booked !== "boolean") {
      return NextResponse.json(
        { error: "Missing or invalid session_id or booked" },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("nova_sessions")
      .update({ booked })
      .eq("id", session_id);

    if (error) {
      console.error("[nova-update] Error updating session:", error);
      return NextResponse.json(
        { error: "Failed to update session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, booked });
  } catch (err) {
    console.error("[nova-update] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
