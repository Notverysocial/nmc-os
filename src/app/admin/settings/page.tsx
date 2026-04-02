"use client";

import { Settings2, Database, Bot, Bell, Shield, ExternalLink } from "lucide-react";

const SECTIONS = [
  {
    icon: Database,
    title: "Database",
    description: "Supabase connection and schema management.",
    color: "#3B82F6",
    fields: [
      { label: "NEXT_PUBLIC_SUPABASE_URL", placeholder: "https://xxxx.supabase.co", type: "text" },
      { label: "NEXT_PUBLIC_SUPABASE_ANON_KEY", placeholder: "eyJhbGci...", type: "password" },
    ],
  },
  {
    icon: Bot,
    title: "Agent Configuration",
    description: "Configure your active AI agents and their parameters.",
    color: "#8B5CF6",
    fields: [
      { label: "Lead Scout — Cadence", placeholder: "Daily at 9am", type: "text" },
      { label: "Content Writer — Tone", placeholder: "Professional, authoritative", type: "text" },
      { label: "Outreach Agent — Max per day", placeholder: "25", type: "number" },
    ],
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Alert settings for new leads and status changes.",
    color: "#F59E0B",
    fields: [
      { label: "Alert Email", placeholder: "team@yourcompany.com", type: "email" },
      { label: "Slack Webhook URL", placeholder: "https://hooks.slack.com/...", type: "url" },
    ],
  },
  {
    icon: Shield,
    title: "Security",
    description: "Admin access and authentication settings.",
    color: "#10B981",
    fields: [
      { label: "Admin Passphrase", placeholder: "Change default password", type: "password" },
    ],
  },
];

function FieldInput({ label, placeholder, type }: { label: string; placeholder: string; type: string }) {
  return (
    <div>
      <label className="block text-xs text-slate-500 mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        readOnly
        className="w-full px-3 py-2.5 text-sm text-slate-400 rounded-xl placeholder-slate-600 cursor-not-allowed"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
      />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Platform configuration — managed via environment variables.</p>
      </div>

      <div
        className="flex items-start gap-3 p-4 rounded-xl mb-6"
        style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}
      >
        <Settings2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-blue-300 text-sm font-medium">Configuration is managed via environment variables</p>
          <p className="text-slate-500 text-xs mt-1">
            Set these in your <code className="text-slate-400">.env.local</code> file or Vercel dashboard. A full settings UI is coming in the next release.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {SECTIONS.map(({ icon: Icon, title, description, color, fields }) => (
          <div
            key={title}
            className="rounded-2xl p-5"
            style={{ background: "#0D1117", border: "1px solid rgba(30,58,138,0.25)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: `${color}15`, border: `1px solid ${color}25` }}
              >
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>{title}</h2>
                <p className="text-xs text-slate-500">{description}</p>
              </div>
            </div>
            <div className="space-y-3">
              {fields.map((f) => (
                <FieldInput key={f.label} {...f} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-5 rounded-2xl p-5"
        style={{ background: "#0D1117", border: "1px solid rgba(30,58,138,0.25)" }}
      >
        <h2 className="text-sm font-bold text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>Required Database Schema</h2>
        <p className="text-xs text-slate-500 mb-3">Run this SQL in your Supabase dashboard to create the leads table:</p>
        <pre
          className="text-xs p-4 rounded-xl overflow-x-auto text-slate-300 leading-relaxed"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >{`create table leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  company text,
  tier_interest text not null,
  message text,
  score integer default 0,
  status text default 'New',
  notes jsonb default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table leads enable row level security;

-- Allow anon inserts (for contact form)
create policy "Allow insert" on leads
  for insert with check (true);

-- Allow authenticated reads/updates (for admin)
create policy "Allow all for authenticated" on leads
  for all using (auth.role() = 'authenticated');`}</pre>
        <a
          href="https://supabase.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 text-xs text-blue-400 hover:text-blue-300 transition-colors"
        >
          Open Supabase Dashboard <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
