"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users, TrendingUp, DollarSign, BarChart3,
  Bot, Zap, FileText, Target, ChevronRight,
  AlertCircle, CheckCircle2, Clock, Activity,
} from "lucide-react";
import type { Lead, TierInterest } from "@/lib/supabase";

const TIER_MRR: Record<TierInterest, number> = { Foundation: 499, Growth: 999, Enterprise: 2500 };

const STATUS_COLORS: Record<string, string> = {
  New: "#3B82F6",
  Contacted: "#8B5CF6",
  Qualified: "#F59E0B",
  Proposal: "#EC4899",
  "Closed Won": "#10B981",
  "Closed Lost": "#EF4444",
};

const AGENT_FEED = [
  { agent: "Lead Scout", action: "Found 12 new prospects in SaaS vertical", time: "2m ago", icon: Target, color: "#3B82F6" },
  { agent: "Content Writer", action: "Drafted 3 follow-up email sequences", time: "8m ago", icon: FileText, color: "#8B5CF6" },
  { agent: "Outreach Agent", action: "Sent 7 personalized intro messages", time: "15m ago", icon: Zap, color: "#F59E0B" },
  { agent: "Lead Scout", action: "Qualified 2 Enterprise leads from LinkedIn", time: "31m ago", icon: Target, color: "#3B82F6" },
  { agent: "Content Writer", action: "Published weekly intelligence brief", time: "1h ago", icon: FileText, color: "#8B5CF6" },
  { agent: "Outreach Agent", action: "Re-engaged 4 stale pipeline contacts", time: "2h ago", icon: Zap, color: "#F59E0B" },
];

const AGENTS = [
  { name: "Lead Scout", role: "Prospecting & Discovery", status: "active", tasks: 34, budget: 72, color: "#3B82F6" },
  { name: "Content Writer", role: "Drafting & Publishing", status: "active", tasks: 18, budget: 45, color: "#8B5CF6" },
  { name: "Outreach Agent", role: "Engagement & Follow-up", status: "active", tasks: 27, budget: 61, color: "#F59E0B" },
];

function SparklineChart({ data }: { data: number[] }) {
  if (data.length === 0) return null;
  const max = Math.max(...data, 1);
  const w = 400;
  const h = 80;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - (v / max) * (h - 10) - 5,
  }));

  const pathD = pts.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x},${pt.y}`;
    const prev = pts[i - 1];
    const cpX = (prev.x + pt.x) / 2;
    return `${acc} C ${cpX},${prev.y} ${cpX},${pt.y} ${pt.x},${pt.y}`;
  }, "");

  const areaD = `${pathD} L ${pts[pts.length - 1].x},${h} L 0,${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#chartGrad)" />
      <path d={pathD} stroke="#8B5CF6" strokeWidth="2" fill="none" strokeLinecap="round" />
      {pts.map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r="2.5" fill="#8B5CF6" />
      ))}
    </svg>
  );
}

function StatCard({
  label, value, sub, icon: Icon, accent,
}: {
  label: string; value: string; sub: string; icon: any; accent: string;
}) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
        >
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <span className="text-xs text-slate-500 font-medium">{sub}</span>
      </div>
      <div>
        <p className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>{value}</p>
        <p className="text-xs text-slate-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((r) => r.json())
      .then(({ leads }) => {
        setLeads(leads || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 86400000);
  const totalLeads = leads.length;
  const newThisWeek = leads.filter((l) => new Date(l.created_at) > weekAgo).length;
  const closedWon = leads.filter((l) => l.status === "Closed Won");
  const convRate = totalLeads > 0 ? Math.round((closedWon.length / totalLeads) * 100) : 0;
  const mrr = closedWon.reduce((sum, l) => sum + (TIER_MRR[l.tier_interest] || 0), 0);

  // Build 30-day chart data
  const days30: number[] = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(now.getTime() - (29 - i) * 86400000);
    const next = new Date(d.getTime() + 86400000);
    return leads.filter((l) => {
      const t = new Date(l.created_at);
      return t >= d && t < next;
    }).length;
  });

  const pipelineSummary = [
    "New", "Contacted", "Qualified", "Proposal", "Closed Won", "Closed Lost",
  ].map((s) => ({ status: s, count: leads.filter((l) => l.status === s).length }));

  const recentLeads = [...leads].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ).slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>Operations Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Your AI-powered business OS at a glance.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Leads" value={String(totalLeads)} sub="All time" icon={Users} accent="#8B5CF6" />
        <StatCard label="New This Week" value={String(newThisWeek)} sub="Last 7 days" icon={TrendingUp} accent="#10B981" />
        <StatCard label="Conversion Rate" value={`${convRate}%`} sub="Closed Won / Total" icon={BarChart3} accent="#A78BFA" />
        <StatCard label="MRR" value={`$${mrr.toLocaleString()}`} sub="From closed deals" icon={DollarSign} accent="#8B5CF6" />
      </div>

      {/* Agent Status + Activity Feed */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Active Agents */}
        <div className="rounded-2xl p-5" style={{ background: "#0D1117", border: "1px solid rgba(30,58,138,0.25)" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-violet-400" />
              <h2 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>Active Agents</h2>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)" }}>
              3 running
            </span>
          </div>
          <div className="space-y-3">
            {AGENTS.map((agent) => (
              <div
                key={agent.name}
                className="rounded-xl p-4"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <p className="text-white text-sm font-semibold">{agent.name}</p>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5">{agent.role}</p>
                  </div>
                  <span className="text-xs text-slate-400">{agent.tasks} tasks</span>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Capacity used</span>
                    <span>{agent.budget}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${agent.budget}%`, background: agent.color }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="rounded-2xl p-5" style={{ background: "#0D1117", border: "1px solid rgba(30,58,138,0.25)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-purple-400" />
            <h2 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>Agent Activity</h2>
          </div>
          <div className="space-y-1">
            {AGENT_FEED.map((event, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl transition-colors hover:bg-white/[0.02]"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${event.color}15`, border: `1px solid ${event.color}25` }}
                >
                  <event.icon className="w-3.5 h-3.5" style={{ color: event.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-300 text-xs leading-relaxed">{event.action}</p>
                  <p className="text-slate-600 text-[10px] mt-0.5">
                    <span style={{ color: event.color }} className="font-medium">{event.agent}</span> · {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lead Activity Chart */}
      <div className="rounded-2xl p-5" style={{ background: "#0D1117", border: "1px solid rgba(30,58,138,0.25)" }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>Lead Activity</h2>
            <p className="text-xs text-slate-500 mt-0.5">New leads per day — last 30 days</p>
          </div>
          <span className="text-xs text-violet-400 font-medium">{totalLeads} total</span>
        </div>
        <SparklineChart data={days30} />
        <div className="flex justify-between mt-2 text-xs text-slate-600">
          <span>30 days ago</span>
          <span>Today</span>
        </div>
      </div>

      {/* Bottom row: recent leads + pipeline */}
      <div className="grid lg:grid-cols-5 gap-4">
        {/* Recent leads */}
        <div className="lg:col-span-3 rounded-2xl p-5" style={{ background: "#0D1117", border: "1px solid rgba(30,58,138,0.25)" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>Recent Leads</h2>
            <Link href="/admin/leads" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {recentLeads.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-8">No leads yet.</p>
            ) : (
              recentLeads.map((lead) => (
                <Link
                  key={lead.id}
                  href="/admin/leads"
                  className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-white/[0.03]"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: "rgba(139,92,246,0.15)" }}
                  >
                    {lead.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{lead.name}</p>
                    <p className="text-slate-500 text-xs truncate">{lead.company || lead.email}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: `${STATUS_COLORS[lead.status] || "#6b7280"}18`,
                        color: STATUS_COLORS[lead.status] || "#6b7280",
                        border: `1px solid ${STATUS_COLORS[lead.status] || "#6b7280"}30`,
                      }}
                    >
                      {lead.tier_interest}
                    </span>
                    <span className="text-xs text-slate-500 w-6 text-right">{lead.score}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Pipeline summary */}
        <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: "#0D1117", border: "1px solid rgba(30,58,138,0.25)" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>Pipeline</h2>
            <Link href="/admin/pipeline" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
              Board <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {pipelineSummary.map(({ status, count }) => (
              <div key={status} className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: STATUS_COLORS[status] || "#6b7280" }}
                />
                <span className="text-sm text-slate-400 flex-1">{status}</span>
                <span className="text-sm font-semibold text-white">{count}</span>
                <div className="w-16 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: totalLeads > 0 ? `${(count / totalLeads) * 100}%` : "0%",
                      background: STATUS_COLORS[status] || "#6b7280",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* System health */}
          <div className="mt-5 pt-5 border-t space-y-2" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">System Health</p>
            {[
              { label: "API Response", status: "ok" },
              { label: "Database", status: "ok" },
              { label: "Agent Runtime", status: "ok" },
            ].map(({ label, status }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{label}</span>
                {status === "ok" ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
