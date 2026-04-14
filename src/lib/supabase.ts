import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = !!(url && anonKey);

// Anonymous client (read-only, RLS enforced)
export const supabaseAnon = isSupabaseConfigured
  ? createClient(url!, anonKey!)
  : null;

// Back-compat alias — existing admin/leads routes import `supabase`.
// Keep this export so those routes don't break after the Nova refactor.
export const supabase = supabaseAnon;

// Admin client (server-only, uses service role key, bypasses RLS)
export function getSupabaseAdmin() {
  if (!url || !serviceRoleKey) {
    console.warn("[Supabase] Admin client not configured: missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return null;
  }
  return createClient(url, serviceRoleKey);
}

export const supabaseAdmin = getSupabaseAdmin();

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Proposal"
  | "Closed Won"
  | "Closed Lost";

export type TierInterest = "Foundation" | "Growth" | "Enterprise";

export type Note = {
  id: string;
  text: string;
  author: string;
  created_at: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  tier_interest: TierInterest;
  message?: string;
  score: number;
  status: LeadStatus;
  notes: Note[];
  created_at: string;
  updated_at: string;
};

export function calculateScore(
  tier: string,
  company?: string,
  phone?: string
): number {
  let score = 0;
  if (tier === "Enterprise") score = 80;
  else if (tier === "Growth") score = 60;
  else if (tier === "Foundation") score = 40;
  if (company && company.trim()) score += 10;
  if (phone && phone.trim()) score += 10;
  return Math.min(score, 100);
}

export const TIER_MRR: Record<TierInterest, number> = {
  Foundation: 499,
  Growth: 999,
  Enterprise: 2500,
};
