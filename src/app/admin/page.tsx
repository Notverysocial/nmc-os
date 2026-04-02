"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users, TrendingUp, DollarSign, BarChart3,
  Bot, Zap, FileText, Target, ChevronRight,
  AlertCircle, CheckCircle2, Activity,
} from "lucide-react";
import type { Lead, TierInterest } from "@/lib/supabase";

const TIER_MRR: Record<TierInterest, number> = { Foundation: 499, Growth: 999, Enterprise: 2500 };

const STATUS_COLORS: Record<string, string> = {
  New: "#8B5CF6",
  Contacted: "#A78BFA",
  Qualified: "#C4B5FD",
  Proposal: "#7C3AED",
  "Closed Won": "#6D28D9",
  "Closed Lost": "#3F3F46",
};

const AGENT_FEED = [
  { agent: "Lead Scout", action: "Found 12 new prospects in SaaS vertical", time: "2m ago", icon: Target, color: "#8B5CF6" },
  { agent: "Content Writer", action: "Drafted 3 follow-up email sequences", time: "8m ago", icon: FileText, color: "#A78BFA" },
  { agent: "Outreach Agent", action: "Sent 7 personalized intro messages", time: "15m ago", icon: Zap, color: "#7C3AED" },
  { agent: "Lead Scout", action: "Qualified 2 Enterprise leads from LinkedIn", time: "31m ago", icon: Target, color: "#8B5CF6" },
  { agent: "Content Writer", action: "Published weekly intelligence brief", time: "1h ago", icon: FileText, color: "#A78BFA" },
  { agent: "Outreach Agent", action: "Re-engaged 4 stale pipeline contacts", time: "2h ago", icon: Zap, color: "#7C3AED" },
];

const AGENTS = [
  { name: "Lead Scout", role: "Prospecting & Discovery", tasks: 34, budget: 72 },
  { name: "Content Writer", role: "Drafting & Publishing", tasks: 18, budget: 45 },
  { name: "Outreach Agent", role: "Engagement & Follow-up", tasks: 27, budget: 61 },
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
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#chartGrad)" />
      <path d={pathD} stroke="#8B5CF6" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {pts.map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r="2" fill="#8B5CF6" opacity="0.6" />
      ))}
    </svg>
  );
}

function StatCard({
  label, value, sub, icon: Icon,
}: {
  label: string; value: string; sub: string; icon: React.ElementType;
}) {
  return (
    <div className="admin-card rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.12)" }}
        >
          <Icon className="w-4 h-4" style={{ color: "#8B5CF6" }} />
        </div>
        <span className="text-xs" style={{ color: "#52525B" }}>{sub}</span>
      </div>
      <div>
        <p
          className="text-2xl font-bold text-white"
          style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.03em" }}
        >
          {value}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "#52525B" }}>{label}</p>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.06)",
};

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

  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: "rgba(139,92,246,0.3)", borderTopColor: "#8B5CF6" }} />
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-7xl">
      <div className="mb-2">
        <h1 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.03em" }}>Operations Dashboard</h1>
        <p className="text-xs mt-1" style={{ color: "#52525B" }}>Your AI-powered business OS at a glance.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <StatCard label="Total Leads" value={String(totalLeads)} sub="All time" icon={Users} />
        <StatCard label="New This Week" value={String(newThisWeek)} sub="Last 7 days" icon={TrendingUp} />
        <StatCard label="Conversion Rate" value={`${convRate}%`} sub="Closed Won / Total" icon={BarChart3} />
        <StatCard label="MRR" value={`$${mrr.toLocaleString()}`} sub="From closed deals" icon={DollarSign} />
      </div>

      {/* Agent Status + Activity Feed */}
      <div className="grid lg:grid-cols-2 gap-3">
        <div className="rounded-2xl p-5" style={cardStyle}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4" style={{ color: "#8B5CF6" }} />
              <h2 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}>Active Agents</h2>
            </div>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: "rgba(139,92,246,0.1)", color: "#A78BFA", border: "1px solid rgba(139,92,246,0.15)" }}
            >
              3 running
            </span>
          </div>
          <div className="space-y-2.5">
            {AGENTS.map((agent) => (
              <div
                key={agent.name}
                className="rounded-xl p-4"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#8B5CF6", animation: "pulseDot 2s ease-in-out infinite" }} />
                      <p className="text-white text-sm font-semibold">{agent.name}</p>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "#52525B" }}>{agent.role}</p>
                  </div>
                  <span className="text-xs" style={{ color: "#52525B" }}>{agent.tasks} tasks</span>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5" style={{ color: "#52525B" }}>
                    <span>Capacity</span>
                    <span>{agent.budget}%</span>
                  </div>
                  <div className="h-px rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${agent.budget}%`, background: "linear-gradient(90deg, #8B5CF6, #A78BFA)" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-5" style={cardStyle}>
          <div className="flex items-center gap-2 mb-5">
            <Activity className="w-4 h-4" style={{ color: "#8B5CF6" }} />
            <h2 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}>Agent Activity</h2>
          </div>
          <div className="space-y-0.5">
            {AGENT_FEED.map((event, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl transition-colors cursor-default"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${event.color}12`, border: `1px solid ${event.color}20` }}
                >
                  <event.icon className="w-3.5 h-3.5" style={{ color: event.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs leading-relaxed" style={{ color: "#A1A1AA" }}>{event.action}</p>
                  <p className="text-[10px] mt-0.5">
                    <span style={{ color: event.color }} className="font-medium">{event.agent}</span>
                    <span style={{ color: "#52525B" }}> · {event.time}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lead Activity Chart */}
      <div className="rounded-2xl p-5" style={cardStyle}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}>Lead Activity</h2>
            <p className="text-xs mt-0.5" style={{ color: "#52525B" }}>New leads per day — last 30 days</p>
          </div>
          <span className="text-xs font-medium" style={{ color: "#8B5CF6" }}>{totalLeads} total</span>
        </div>
        <SparklineChart data={days30} />
        <div className="flex justify-between mt-2 text-xs" style={{ color: "#3F3F46" }}>
          <span>30 days ago</span>
          <span>Today</span>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-5 gap-3">
        <div className="lg:col-span-3 rounded-2xl p-5" style={cardStyle}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}>Recent Leads</h2>
            <Link href="/admin/leads" className="text-xs flex items-center gap-1" style={{ color: "#8B5CF6" }}>
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-1.5">
            {recentLeads.length === 0 ? (
              <p className="text-xs text-center py-8" style={{ color: "#52525B" }}>No leads yet.</p>
            ) : (
              recentLeads.map((lead) => (
                <Link
                  key={lead.id}
                  href="/admin/leads"
                  className="flex items-center gap-3 p-3 rounded-xl transition-colors"
                  style={{ color: "inherit" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.2)" }}
                  >
                    {lead.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{lead.name}</p>
                    <p className="text-xs truncate" style={{ color: "#52525B" }}>{lead.company || lead.email}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(139,92,246,0.08)", color: "#A78BFA", border: "1px solid rgba(139,92,246,0.12)" }}
                    >
                      {lead.tier_interest}
                    </span>
                    <span className="text-xs w-6 text-right font-medium" style={{ color: "#71717A" }}>{lead.score}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-2 rounded-2xl p-5" style={cardStyle}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}>Pipeline</h2>
            <Link href="/admin/pipeline" className="text-xs flex items-center gap-1" style={{ color: "#8B5CF6" }}>
              Board <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2.5">
            {pipelineSummary.map(({ status, count }) => (
              <div key={status} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: STATUS_COLORS[status] || "#3F3F46" }} />
                <span className="text-sm flex-1" style={{ color: "#71717A" }}>{status}</span>
                <span className="text-sm font-semibold text-white">{count}</span>
                <div className="w-14 h-px rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: totalLeads > 0 ? `${(count / totalLeads) * 100}%` : "0%",
                      background: STATUS_COLORS[status] || "#3F3F46",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 space-y-2" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#3F3F46" }}>System Health</p>
            {[
              { label: "API Response", status: "ok" },
              { label: "Database", status: "ok" },
              { label: "Agent Runtime", status: "ok" },
            ].map(({ label, status }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "#52525B" }}>{label}</span>
                {status === "ok"
                  ? <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#8B5CF6" }} />
                  : <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
