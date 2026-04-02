import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured, calculateScore } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, tier_interest, message } = body;

    if (!name || !email || !tier_interest) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const score = calculateScore(tier_interest, company, phone);
    const leadData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      company: company?.trim() || null,
      tier_interest,
      message: message?.trim() || null,
      score,
      status: "New",
      notes: [],
    };

    if (!isSupabaseConfigured || !supabase) {
      // No Supabase configured — still return success so the form works
      console.log("[contact] Supabase not configured. Lead would have been saved:", leadData);
      return NextResponse.json({ success: true, lead: { id: "demo", ...leadData } });
    }

    const { data, error } = await supabase
      .from("leads")
      .insert([leadData])
      .select()
      .single();

    if (error) {
      console.error("[contact] Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
    }

    return NextResponse.json({ success: true, lead: data });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
