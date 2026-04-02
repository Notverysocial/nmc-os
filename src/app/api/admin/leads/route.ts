import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { SAMPLE_LEADS } from "@/lib/sample-data";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const status = searchParams.get("status");
  const tier = searchParams.get("tier");
  const search = searchParams.get("search");
  const scoreMin = searchParams.get("scoreMin");
  const scoreMax = searchParams.get("scoreMax");
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");

  if (!isSupabaseConfigured || !supabase) {
    // Return filtered sample data
    let leads = [...SAMPLE_LEADS];
    if (status) leads = leads.filter((l) => l.status === status);
    if (tier) leads = leads.filter((l) => l.tier_interest === tier);
    if (search) {
      const q = search.toLowerCase();
      leads = leads.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          (l.company || "").toLowerCase().includes(q)
      );
    }
    if (scoreMin) leads = leads.filter((l) => l.score >= parseInt(scoreMin));
    if (scoreMax) leads = leads.filter((l) => l.score <= parseInt(scoreMax));
    if (dateFrom) leads = leads.filter((l) => l.created_at >= dateFrom);
    if (dateTo) leads = leads.filter((l) => l.created_at <= dateTo);
    leads.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return NextResponse.json({ leads });
  }

  let query = supabase.from("leads").select("*").order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);
  if (tier) query = query.eq("tier_interest", tier);
  if (search) {
    query = query.or(
      `name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%`
    );
  }
  if (scoreMin) query = query.gte("score", parseInt(scoreMin));
  if (scoreMax) query = query.lte("score", parseInt(scoreMax));
  if (dateFrom) query = query.gte("created_at", dateFrom);
  if (dateTo) query = query.lte("created_at", dateTo);

  const { data, error } = await query;

  if (error) {
    console.error("[admin/leads] Query error:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }

  return NextResponse.json({ leads: data || [] });
}
