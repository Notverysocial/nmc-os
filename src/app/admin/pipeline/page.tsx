"use client";

import { useEffect, useState } from "react";
import type { Lead, LeadStatus } from "@/lib/supabase";

const COLUMNS: { status: LeadStatus; color: string; label: string }[] = [
  { status: "New", color: "#3B82F6", label: "New" },
  { status: "Contacted", color: "#8B5CF6", label: "Contacted" },
  { status: "Qualified", color: "#F59E0B", label: "Qualified" },
  { status: "Proposal", color: "#EC4899", label: "Proposal" },
  { status: "Closed Won", color: "#10B981", label: "Closed Won" },
  { status: "Closed Lost", color: "#EF4444", label: "Closed Lost" },
];

const TIER_COLORS: Record<string, string> = {
  Foundation: "#6B7280",
  Growth: "#3B82F6",
  Enterprise: "#D4A853",
};

function daysInStage(lead: Lead): number {
  return Math.floor((Date.now() - new Date(lead.updated_at).getTime()) / 86400000);
}

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<LeadStatus | null>(null);

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((r) => r.json())
      .then(({ leads }) => { setLeads(leads || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.effectAllowed = "move";
    setDragId(id);
  };

  const handleDragOver = (e: React.DragEvent, status: LeadStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOver(status);
  };

  const handleDrop = async (e: React.DragEvent, targetStatus: LeadStatus) => {
    e.preventDefault();
    setDragOver(null);
    if (!dragId) return;

    const lead = leads.find((l) => l.id === dragId);
    if (!lead || lead.status === targetStatus) { setDragId(null); return; }

    // Optimistic update
    setLeads((prev) =>
      prev.map((l) =>
        l.id === dragId ? { ...l, status: targetStatus, updated_at: new Date().toISOString() } : l
      )
    );
    setDragId(null);

    await fetch(`/api/admin/leads/${dragId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: targetStatus }),
    });
  };

  const handleDragEnd = () => { setDragId(null); setDragOver(null); };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>Pipeline Board</h1>
        <p className="text-slate-500 text-sm mt-1">Drag cards between columns to update status.</p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4" style={{ minHeight: "calc(100vh - 200px)" }}>
        {COLUMNS.map(({ status, color, label }) => {
          const colLeads = leads.filter((l) => l.status === status);
          const isOver = dragOver === status;

          return (
            <div
              key={status}
              className="flex flex-col shrink-0 w-64 rounded-2xl overflow-hidden transition-all"
              style={{
                background: isOver ? `${color}08` : "#0D1117",
                border: `1px solid ${isOver ? `${color}40` : "rgba(30,58,138,0.2)"}`,
              }}
              onDragOver={(e) => handleDragOver(e, status)}
              onDrop={(e) => handleDrop(e, status)}
              onDragLeave={() => setDragOver(null)}
            >
              {/* Column header */}
              <div
                className="px-4 py-3 border-b flex items-center justify-between"
                style={{ borderColor: "rgba(30,58,138,0.15)", borderLeft: `3px solid ${color}` }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="text-sm font-semibold text-white">{label}</span>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: `${color}18`, color }}
                >
                  {colLeads.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                {colLeads.length === 0 && (
                  <div
                    className="rounded-xl border-2 border-dashed py-8 text-center transition-all"
                    style={{ borderColor: isOver ? `${color}40` : "rgba(255,255,255,0.05)" }}
                  >
                    <p className="text-xs text-slate-600">Drop here</p>
                  </div>
                )}
                {colLeads.map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead.id)}
                    onDragEnd={handleDragEnd}
                    className="rounded-xl p-3 cursor-grab active:cursor-grabbing transition-all select-none"
                    style={{
                      background: dragId === lead.id ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${dragId === lead.id ? `${color}40` : "rgba(255,255,255,0.07)"}`,
                      opacity: dragId === lead.id ? 0.5 : 1,
                      transform: dragId === lead.id ? "rotate(2deg) scale(0.98)" : "none",
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                          style={{ background: "#1A2B50" }}
                        >
                          {lead.name[0]}
                        </div>
                        <span className="text-white text-xs font-semibold truncate max-w-[120px]">{lead.name}</span>
                      </div>
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
                        style={{
                          background: lead.score >= 80 ? "rgba(16,185,129,0.15)" : lead.score >= 60 ? "rgba(245,158,11,0.15)" : "rgba(107,114,128,0.15)",
                          color: lead.score >= 80 ? "#10B981" : lead.score >= 60 ? "#F59E0B" : "#9CA3AF",
                        }}
                      >
                        {lead.score}
                      </span>
                    </div>

                    {lead.company && (
                      <p className="text-slate-500 text-[11px] truncate mb-2">{lead.company}</p>
                    )}

                    <div className="flex items-center justify-between">
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                        style={{
                          background: `${TIER_COLORS[lead.tier_interest]}15`,
                          color: TIER_COLORS[lead.tier_interest],
                        }}
                      >
                        {lead.tier_interest}
                      </span>
                      <span className="text-[10px] text-slate-600">
                        {daysInStage(lead)}d in stage
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
