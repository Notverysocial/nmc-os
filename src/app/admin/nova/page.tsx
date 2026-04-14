import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import type { NovaSession } from "@/lib/types/nova";
import { MessageCircle, Calendar, Check, Eye } from "lucide-react";

interface PageProps {
  searchParams: Promise<Record<string, string>>;
}

export default async function NovaSessionsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const booked = params.booked;
  const email = params.email;
  const since = params.since;

  if (!supabaseAdmin) {
    return (
      <div
        className="rounded-2xl p-8 max-w-2xl"
        style={{
          background: "rgba(239,68,68,0.1)",
          border: "1px solid rgba(239,68,68,0.3)",
        }}
      >
        <h2 className="text-lg font-bold text-white mb-2">
          Supabase Not Configured
        </h2>
        <p className="text-slate-400 text-sm">
          Please ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment
          variables are set.
        </p>
      </div>
    );
  }

  try {
    // Build query
    let query = supabaseAdmin
      .from("nova_sessions")
      .select("*", { count: "exact" });

    if (booked === "true") {
      query = query.eq("booked", true);
    } else if (booked === "false") {
      query = query.eq("booked", false);
    }

    if (email) {
      query = query.ilike("email", `%${email}%`);
    }

    if (since) {
      query = query.gte("created_at", `${since}T00:00:00Z`);
    }

    // Pagination
    const pageSize = 20;
    const offset = (page - 1) * pageSize;
    query = query.order("created_at", { ascending: false }).range(offset, offset + pageSize - 1);

    const { data: sessions, error, count } = await query;

    if (error) throw error;

    const totalPages = Math.ceil((count || 0) / pageSize);

    return (
      <div className="space-y-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Nova Sessions
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {count} total sessions
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {booked && (
            <div
              className="px-3 py-1 rounded-full text-xs text-slate-300"
              style={{
                background: "rgba(59,130,246,0.15)",
                border: "1px solid rgba(59,130,246,0.3)",
              }}
            >
              Booked: {booked === "true" ? "Yes" : "No"}
            </div>
          )}
          {email && (
            <div
              className="px-3 py-1 rounded-full text-xs text-slate-300"
              style={{
                background: "rgba(59,130,246,0.15)",
                border: "1px solid rgba(59,130,246,0.3)",
              }}
            >
              Email: {email}
            </div>
          )}
          {since && (
            <div
              className="px-3 py-1 rounded-full text-xs text-slate-300"
              style={{
                background: "rgba(59,130,246,0.15)",
                border: "1px solid rgba(59,130,246,0.3)",
              }}
            >
              Since: {since}
            </div>
          )}
        </div>

        {/* Sessions table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(10,14,26,0.4)",
            border: "1px solid rgba(59,130,246,0.25)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  style={{ borderBottomColor: "rgba(59,130,246,0.15)" }}
                  className="border-b"
                >
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Session ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Started
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Industry
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Messages
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Booked
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {sessions && sessions.length > 0 ? (
                  sessions.map((session: NovaSession) => {
                    const startDate = new Date(session.created_at);
                    const industry =
                      session.business_context?.industry || "—";
                    const messageCount = session.messages?.length || 0;

                    return (
                      <tr
                        key={session.id}
                        style={{ borderBottomColor: "rgba(59,130,246,0.1)" }}
                        className="border-b hover:bg-white/[0.03] transition-colors"
                      >
                        <td
                          className="px-6 py-4 font-mono text-sm text-slate-300"
                          title={session.session_id}
                        >
                          {session.session_id.substring(0, 12)}…
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300">
                          {startDate.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300">
                          {session.email || "—"}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300">
                          {industry}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300 text-center">
                          <span
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium"
                            style={{
                              background: "rgba(168,85,247,0.1)",
                              color: "#d8b4fe",
                            }}
                          >
                            <MessageCircle className="w-3 h-3" />
                            {messageCount}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {session.booked ? (
                            <Check className="w-4 h-4 text-green-400 mx-auto" />
                          ) : (
                            <span className="text-slate-600 text-sm">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Link
                            href={`/admin/nova/${session.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-colors hover:bg-blue-500/20"
                            style={{
                              color: "#60a5fa",
                            }}
                          >
                            <Eye className="w-3 h-3" />
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <p className="text-slate-500 text-sm">
                        No sessions found.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            {page > 1 && (
              <Link
                href={`/admin/nova?page=${page - 1}${
                  booked ? `&booked=${booked}` : ""
                }${email ? `&email=${email}` : ""}${
                  since ? `&since=${since}` : ""
                }`}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: "rgba(59,130,246,0.15)",
                  color: "#60a5fa",
                }}
              >
                Previous
              </Link>
            )}
            <div className="text-sm text-slate-500">
              Page {page} of {totalPages}
            </div>
            {page < totalPages && (
              <Link
                href={`/admin/nova?page=${page + 1}${
                  booked ? `&booked=${booked}` : ""
                }${email ? `&email=${email}` : ""}${
                  since ? `&since=${since}` : ""
                }`}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: "rgba(59,130,246,0.15)",
                  color: "#60a5fa",
                }}
              >
                Next
              </Link>
            )}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("[Nova] Error fetching sessions:", error);
    return (
      <div
        className="rounded-2xl p-8 max-w-2xl"
        style={{
          background: "rgba(239,68,68,0.1)",
          border: "1px solid rgba(239,68,68,0.3)",
        }}
      >
        <h2 className="text-lg font-bold text-white mb-2">Error</h2>
        <p className="text-slate-400 text-sm">Failed to load sessions.</p>
      </div>
    );
  }
}
