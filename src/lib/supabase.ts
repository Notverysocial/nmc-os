import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = !!(url && key);

export const supabase = isSupabaseConfigured
  ? createClient(url!, key!)
  : null;

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
