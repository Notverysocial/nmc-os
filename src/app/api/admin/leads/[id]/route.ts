import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { SAMPLE_LEADS } from "@/lib/sample-data";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const { status, notes } = body;

  if (!isSupabaseConfigured || !supabase) {
    // Return mock updated lead from sample data
    const lead = SAMPLE_LEADS.find((l) => l.id === id);
    if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const updated = {
      ...lead,
      ...(status !== undefined && { status }),
      ...(notes !== undefined && { notes }),
      updated_at: new Date().toISOString(),
    };
    return NextResponse.json({ lead: updated });
  }

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (status !== undefined) updates.status = status;
  if (notes !== undefined) updates.notes = notes;

  const { data, error } = await supabase
    .from("leads")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[admin/leads/[id]] Update error:", error);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }

  return NextResponse.json({ lead: data });
}
