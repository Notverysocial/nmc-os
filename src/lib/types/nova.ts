/**
 * Nova Session Types
 * Defines interfaces for Nova chat sessions and their data structures
 */

export interface NovaMessage {
  role: "user" | "assistant";
  content: string;
}

export interface NovaBusinessContext {
  industry?: string;
  revenue_range?: string;
  tools?: string[];
  pain_points?: string[];
}

export interface NovaSession {
  id: string;
  session_id: string;
  started_at: string;
  completed_at: string | null;
  messages: NovaMessage[];
  email: string | null;
  booked: boolean;
  business_context: NovaBusinessContext | null;
  user_agent: string | null;
  ip_hash: string | null;
  created_at: string;
  updated_at: string;
}

export interface NovaSessionInsert {
  session_id: string;
  messages?: NovaMessage[];
  email?: string | null;
  booked?: boolean;
  business_context?: NovaBusinessContext | null;
  user_agent?: string | null;
  ip_hash?: string | null;
}

export interface NovaSessionUpdate {
  session_id?: string;
  completed_at?: string | null;
  messages?: NovaMessage[];
  email?: string | null;
  booked?: boolean;
  business_context?: NovaBusinessContext | null;
  user_agent?: string | null;
  ip_hash?: string | null;
}
