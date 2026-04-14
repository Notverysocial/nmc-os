"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabaseAnon } from "@/lib/supabase";
import type { NovaSession } from "@/lib/types/nova";
import { ArrowLeft, Loader, Check } from "lucide-react";

interface DetailPageProps {
  params: Promise<{ session_id: string }>;
}

export default function NovaSessionDetailPage({ params }: DetailPageProps) {
  const [session, setSession] = useState<NovaSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    (async () => {
      const p = await params;
      setSessionId(p.session_id);
    })();
  }, [params]);

  useEffect(() => {
    if (!sessionId) return;
    fetchSession();
  }, [sessionId]);

  async function fetchSession() {
    try {
      if (!supabaseAnon) {
        throw new Error("Supabase not configured");
      }
      const { data, error } = await supabaseAnon
        .from("nova_sessions")
        .select("*")
        .eq("id", sessionId)
        .single();

      if (error) throw error;
      setSession(data);
    } catch (err) {
      console.error("Error fetching session:", err);
    } finally {
      setLoading(false);
    }
  }

  async function toggleBooked() {
    if (!session) return;
    setUpdating(true);
    try {
      const response = await fetch("/api/admin/nova-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          booked: !session.booked,
        }),
      });

      if (response.ok) {
        setSession({ ...session, booked: !session.booked });
      }
    } catch (err) {
      console.error("Error updating session:", err);
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="w-6 h-6 text-purple-400 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="space-y-4">
        <Link
          href="/admin/nova"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sessions
        </Link>
        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
          }}
        >
          <p className="text-slate-400">Session not found.</p>
        </div>
      </div>
    );
  }

  const startDate = new Date(session.created_at);
  const completedDate = session.completed_at
    ? new Date(session.completed_at)
    : null;

  return (
    <div className="space-y-6 max-w-7xl">
      <Link
        href="/admin/nova"
        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to sessions
      </Link>

      <div>
        <h1
          className="text-2xl font-bold text-white"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Session {session.session_id.substring(0, 12)}
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Started {startDate.toLocaleString()}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Transcript */}
        <div className="lg:col-span-2 space-y-4">
          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(10,14,26,0.4)",
              border: "1px solid rgba(59,130,246,0.25)",
              backdropFilter: "blur(12px)",
            }}
          >
            <h2
              className="text-lg font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Transcript
            </h2>

            <div className="space-y-4">
              {session.messages && session.messages.length > 0 ? (
                session.messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-lg ${
                      msg.role === "user"
                        ? "ml-auto bg-blue-500/10 border border-blue-500/25 text-blue-50 max-w-xs"
                        : "mr-auto bg-slate-700/20 border border-slate-600/25 text-slate-200 max-w-xl"
                    }`}
                  >
                    <p className="text-xs opacity-75 mb-1 uppercase font-semibold">
                      {msg.role}
                    </p>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-center py-8">
                  No messages in this session.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Metadata panel */}
        <div className="space-y-4">
          {/* Status card */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(10,14,26,0.4)",
              border: "1px solid rgba(59,130,246,0.25)",
              backdropFilter: "blur(12px)",
            }}
          >
            <h3
              className="text-sm font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Status
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                  Booked
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white font-semibold">
                    {session.booked ? "Yes" : "No"}
                  </span>
                  <button
                    onClick={toggleBooked}
                    disabled={updating}
                    className="px-3 py-1 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                    style={{
                      background: session.booked
                        ? "rgba(239,68,68,0.15)"
                        : "rgba(59,130,246,0.15)",
                      color: session.booked ? "#fca5a5" : "#60a5fa",
                    }}
                  >
                    {updating ? (
                      <Loader className="w-3 h-3 animate-spin" />
                    ) : session.booked ? (
                      "Unbook"
                    ) : (
                      "Book"
                    )}
                  </button>
                </div>
              </div>

              {completedDate && (
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                    Completed
                  </p>
                  <p className="text-sm text-slate-300">
                    {completedDate.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Business context */}
          {session.business_context && (
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(10,14,26,0.4)",
                border: "1px solid rgba(59,130,246,0.25)",
                backdropFilter: "blur(12px)",
              }}
            >
              <h3
                className="text-sm font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Business Context
              </h3>
              <div className="space-y-3 text-sm">
                {session.business_context.industry && (
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                      Industry
                    </p>
                    <p className="text-slate-300">
                      {session.business_context.industry}
                    </p>
                  </div>
                )}
                {session.business_context.revenue_range && (
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                      Revenue Range
                    </p>
                    <p className="text-slate-300">
                      {session.business_context.revenue_range}
                    </p>
                  </div>
                )}
                {session.business_context.tools &&
                  session.business_context.tools.length > 0 && (
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                        Tools
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {session.business_context.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-2 py-1 rounded text-xs"
                            style={{
                              background: "rgba(168,85,247,0.1)",
                              color: "#d8b4fe",
                            }}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                {session.business_context.pain_points &&
                  session.business_context.pain_points.length > 0 && (
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                        Pain Points
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-slate-300">
                        {session.business_context.pain_points.map((point) => (
                          <li key={point} className="text-xs">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* User info */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(10,14,26,0.4)",
              border: "1px solid rgba(59,130,246,0.25)",
              backdropFilter: "blur(12px)",
            }}
          >
            <h3
              className="text-sm font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              User Info
            </h3>
            <div className="space-y-3 text-sm">
              {session.email && (
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <p className="text-slate-300 break-all">{session.email}</p>
                </div>
              )}
              {session.user_agent && (
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                    User Agent
                  </p>
                  <p className="text-slate-300 text-xs break-words">
                    {session.user_agent}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
