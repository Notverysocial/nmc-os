"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Search, Filter, ChevronDown, X, Plus, Clock,
  Mail, Phone, Building2, Tag, Star, SlidersHorizontal,
  ArrowUpDown, ChevronRight,
} from "lucide-react";
import type { Lead, LeadStatus, Note } from "@/lib/supabase";

const STATUSES: LeadStatus[] = ["New", "Contacted", "Qualified", "Proposal", "Closed Won", "Closed Lost"];
const TIERS = ["Foundation", "Growth", "Enterprise"];

const STATUS_COLORS: Record<string, string> = {
  New: "#3B82F6",
  Contacted: "#8B5CF6",
  Qualified: "#F59E0B",
  Proposal: "#EC4899",
  "Closed Won": "#10B981",
  "Closed Lost": "#EF4444",
};

const TIER_COLORS: Record<string, string> = {
  Foundation: "#6B7280",
  Growth: "#3B82F6",
  Enterprise: "#D4A853",
};

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? "#10B981" : score >= 60 ? "#F59E0B" : "#6B7280";
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
      style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
    >
      {score}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const color = STATUS_COLORS[status] || "#6B7280";
  return (
    <span
      className="text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap"
      style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
    >
      {status}
    </span>
  );
}

function LeadDetail({
  lead,
  onClose,
  onUpdate,
}: {
  lead: Lead;
  onClose: () => void;
  onUpdate: (updated: Lead) => void;
}) {
  const [noteText, setNoteText] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [localNotes, setLocalNotes] = useState<Note[]>(lead.notes || []);

  const updateStatus = async (newStatus: LeadStatus) => {
    setStatus(newStatus);
    const res = await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      const { lead: updated } = await res.json();
      onUpdate({ ...lead, ...updated, status: newStatus });
    }
  };

  const addNote = async () => {
    if (!noteText.trim()) return;
    setSaving(true);
    const newNote: Note = {
      id: crypto.randomUUID(),
      text: noteText.trim(),
      author: "Admin",
      created_at: new Date().toISOString(),
    };
    const updated = [...localNotes, newNote];
    setLocalNotes(updated);
    setNoteText("");

    await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: updated }),
    }).then(async (r) => {
      if (r.ok) {
        const { lead: up } = await r.json();
        onUpdate({ ...lead, notes: updated, status, ...(up || {}) });
      }
    });
    setSaving(false);
  };

  const timeSince = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  return (
    <div
      className="fixed inset-y-0 right-0 w-full max-w-md z-40 overflow-y-auto"
      style={{ background: "#0D1117", borderLeft: "1px solid rgba(30,58,138,0.25)" }}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white"
              style={{ background: "#1A2B50" }}
            >
              {lead.name[0]}
            </div>
            <div>
              <h2 className="text-white font-bold" style={{ fontFamily: "var(--font-syne)" }}>{lead.name}</h2>
              <p className="text-slate-500 text-xs">{lead.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score + Status */}
        <div className="flex items-center gap-3 mb-5">
          <ScoreBadge score={lead.score} />
          <div className="text-xs text-slate-500">Score</div>
          <div className="ml-auto">
            <select
              value={status}
              onChange={(e) => updateStatus(e.target.value as LeadStatus)}
              className="text-xs rounded-lg px-3 py-2 text-white focus:outline-none cursor-pointer"
              style={{
                background: `${STATUS_COLORS[status] || "#6B7280"}18`,
                border: `1px solid ${STATUS_COLORS[status] || "#6B7280"}40`,
                color: STATUS_COLORS[status] || "#6B7280",
              }}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s} style={{ background: "#0D1117", color: "#fff" }}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Details */}
        <div
          className="rounded-xl p-4 space-y-3 mb-5"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          {lead.company && (
            <div className="flex items-center gap-2 text-sm">
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-300">{lead.company}</span>
            </div>
          )}
          {lead.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-300">{lead.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-300">{lead.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Tag className="w-3.5 h-3.5 text-slate-500" />
            <span style={{ color: TIER_COLORS[lead.tier_interest] }}>{lead.tier_interest} Plan</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-400 text-xs">{new Date(lead.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        {lead.message && (
          <div className="mb-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Message</p>
            <p className="text-sm text-slate-300 leading-relaxed">{lead.message}</p>
          </div>
        )}

        {/* Notes */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Notes & Follow-ups</p>
          <div className="space-y-2 mb-3">
            {localNotes.length === 0 && (
              <p className="text-xs text-slate-600 text-center py-4">No notes yet.</p>
            )}
            {localNotes.map((note) => (
              <div
                key={note.id}
                className="rounded-xl p-3"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <p className="text-sm text-slate-300 leading-relaxed">{note.text}</p>
                <p className="text-[10px] text-slate-600 mt-1.5">
                  {note.author} · {timeSince(note.created_at)}
                </p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && addNote()}
              placeholder="Add a note..."
              className="flex-1 px-3 py-2 text-sm text-white placeholder-slate-600 rounded-xl focus:outline-none transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            />
            <button
              onClick={addNote}
              disabled={saving || !noteText.trim()}
              className="px-3 py-2 rounded-xl transition-all disabled:opacity-40"
              style={{ background: "#1A2B50" }}
            >
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterTier, setFilterTier] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [scoreMin, setScoreMin] = useState("");
  const [scoreMax, setScoreMax] = useState("");
  const [sortBy, setSortBy] = useState<"created_at" | "score">("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const fetchLeads = useCallback(async () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (filterStatus) params.set("status", filterStatus);
    if (filterTier) params.set("tier", filterTier);
    if (scoreMin) params.set("scoreMin", scoreMin);
    if (scoreMax) params.set("scoreMax", scoreMax);

    const res = await fetch(`/api/admin/leads?${params}`);
    const { leads: data } = await res.json();
    let sorted = (data || []) as Lead[];
    sorted = sorted.sort((a, b) => {
      if (sortBy === "score") {
        return sortDir === "desc" ? b.score - a.score : a.score - b.score;
      }
      const ta = new Date(a.created_at).getTime();
      const tb = new Date(b.created_at).getTime();
      return sortDir === "desc" ? tb - ta : ta - tb;
    });
    setLeads(sorted);
    setLoading(false);
  }, [search, filterStatus, filterTier, scoreMin, scoreMax, sortBy, sortDir]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(fetchLeads, 300);
    return () => clearTimeout(t);
  }, [fetchLeads]);

  const updateLead = (updated: Lead) => {
    setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    if (selectedLead?.id === updated.id) setSelectedLead(updated);
  };

  const toggleSort = (col: "created_at" | "score") => {
    if (sortBy === col) setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    else { setSortBy(col); setSortDir("desc"); }
  };

  const clearFilters = () => {
    setFilterStatus(""); setFilterTier(""); setScoreMin(""); setScoreMax("");
  };

  const hasFilters = !!(filterStatus || filterTier || scoreMin || scoreMax);

  return (
    <div className="max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>Leads CRM</h1>
          <p className="text-slate-500 text-sm mt-1">{leads.length} lead{leads.length !== 1 ? "s" : ""} total</p>
        </div>
      </div>

      {/* Search + Filter bar */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex-1 min-w-48 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, company..."
            className="w-full pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 rounded-xl focus:outline-none transition-all"
            style={{ background: "#0D1117", border: "1px solid rgba(30,58,138,0.25)" }}
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 text-sm rounded-xl focus:outline-none cursor-pointer"
          style={{
            background: "#0D1117",
            border: "1px solid rgba(30,58,138,0.25)",
            color: filterStatus ? "#fff" : "#6b7280",
          }}
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <select
          value={filterTier}
          onChange={(e) => setFilterTier(e.target.value)}
          className="px-4 py-2.5 text-sm rounded-xl focus:outline-none cursor-pointer"
          style={{
            background: "#0D1117",
            border: "1px solid rgba(30,58,138,0.25)",
            color: filterTier ? "#fff" : "#6b7280",
          }}
        >
          <option value="">All Tiers</option>
          {TIERS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-xl transition-all relative"
          style={{
            background: showFilters || hasFilters ? "rgba(26,43,80,0.5)" : "#0D1117",
            border: `1px solid ${hasFilters ? "rgba(59,130,246,0.4)" : "rgba(30,58,138,0.25)"}`,
            color: hasFilters ? "#3B82F6" : "#6b7280",
          }}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Score Range
          {hasFilters && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 absolute top-1.5 right-1.5" />}
        </button>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-2.5 text-xs text-red-400 rounded-xl transition-all"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      {showFilters && (
        <div
          className="flex gap-4 mb-4 p-4 rounded-xl"
          style={{ background: "#0D1117", border: "1px solid rgba(30,58,138,0.25)" }}
        >
          <div>
            <label className="text-xs text-slate-500 block mb-1">Score Min</label>
            <input
              type="number" min="0" max="100"
              value={scoreMin}
              onChange={(e) => setScoreMin(e.target.value)}
              placeholder="0"
              className="w-24 px-3 py-1.5 text-sm text-white rounded-lg focus:outline-none"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1">Score Max</label>
            <input
              type="number" min="0" max="100"
              value={scoreMax}
              onChange={(e) => setScoreMax(e.target.value)}
              placeholder="100"
              className="w-24 px-3 py-1.5 text-sm text-white rounded-lg focus:outline-none"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "#0D1117", border: "1px solid rgba(30,58,138,0.25)" }}>
        {/* Header */}
        <div
          className="grid text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3 border-b"
          style={{
            gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr auto",
            borderColor: "rgba(30,58,138,0.15)",
          }}
        >
          <span>Lead</span>
          <span>Company / Tier</span>
          <button
            className="flex items-center gap-1 hover:text-slate-300 transition-colors text-left"
            onClick={() => toggleSort("score")}
          >
            Score <ArrowUpDown className="w-3 h-3" />
          </button>
          <span>Status</span>
          <button
            className="flex items-center gap-1 hover:text-slate-300 transition-colors text-left"
            onClick={() => toggleSort("created_at")}
          >
            Date <ArrowUpDown className="w-3 h-3" />
          </button>
          <span />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500 text-sm">No leads found.</p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "rgba(30,58,138,0.1)" }}>
            {leads.map((lead) => (
              <div
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className="grid items-center px-5 py-3.5 cursor-pointer transition-colors hover:bg-white/[0.02]"
                style={{ gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr auto" }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: "#1A2B50" }}
                  >
                    {lead.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{lead.name}</p>
                    <p className="text-slate-500 text-xs truncate">{lead.email}</p>
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="text-slate-300 text-sm truncate">{lead.company || "—"}</p>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-md font-medium"
                    style={{
                      color: TIER_COLORS[lead.tier_interest],
                      background: `${TIER_COLORS[lead.tier_interest]}15`,
                    }}
                  >
                    {lead.tier_interest}
                  </span>
                </div>

                <ScoreBadge score={lead.score} />

                <StatusPill status={lead.status} />

                <span className="text-xs text-slate-500">
                  {new Date(lead.created_at).toLocaleDateString()}
                </span>

                <ChevronRight className="w-4 h-4 text-slate-600" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lead detail slide-out */}
      {selectedLead && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-30"
            onClick={() => setSelectedLead(null)}
          />
          <LeadDetail
            lead={selectedLead}
            onClose={() => setSelectedLead(null)}
            onUpdate={updateLead}
          />
        </>
      )}
    </div>
  );
}
