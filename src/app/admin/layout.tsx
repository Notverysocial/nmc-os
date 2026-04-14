"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Kanban,
  Settings,
  Zap,
  ExternalLink,
  Menu,
  X,
  Bot,
  Activity,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads CRM", icon: Users },
  { href: "/admin/pipeline", label: "Pipeline", icon: Kanban },
  { href: "/admin/nova", label: "Nova Transcripts", icon: Bot },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminAuth({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("nmc_admin") === "true";
  });
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);

  const attempt = () => {
    if (pw === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "nmc2026")) {
      sessionStorage.setItem("nmc_admin", "true");
      setAuthed(true);
    } else {
      setErr(true);
      setTimeout(() => setErr(false), 2000);
    }
  };

  if (authed) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0A0B" }}>
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(139,92,246,0.2)" }} className="rounded-2xl p-10 w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(139,92,246,0.2)" }}>
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>NMC Admin</span>
        </div>
        <h2 className="text-white font-bold text-xl mb-1" style={{ fontFamily: "var(--font-syne)" }}>Access Required</h2>
        <p className="text-slate-400 text-sm mb-6">Enter your admin passphrase to continue.</p>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && attempt()}
          placeholder="Passphrase"
          className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-slate-500 mb-3 focus:outline-none transition-all"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${err ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.08)"}`,
          }}
          autoFocus
        />
        {err && <p className="text-red-400 text-xs mb-3">Incorrect passphrase.</p>}
        <button
          onClick={attempt}
          className="w-full py-3 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: "rgba(139,92,246,0.9)" }}
        >
          Enter
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminAuth>
      <div className="flex min-h-screen" style={{ background: "#0A0A0B", fontFamily: "var(--font-dm-sans)" }}>

        {/* Sidebar — Desktop */}
        <aside
          className="hidden lg:flex flex-col w-60 shrink-0 border-r"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="px-5 py-6 border-b" style={{ borderColor: "rgba(30,58,138,0.2)" }}>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(139,92,246,0.2)" }}>
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none" style={{ fontFamily: "var(--font-syne)" }}>NMC OS</p>
                <p className="text-slate-500 text-[10px] mt-0.5">Admin Console</p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-0.5">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group"
                  style={{
                    background: active ? "rgba(139,92,246,0.12)" : "transparent",
                    color: active ? "#ffffff" : "#6b7280",
                    borderLeft: active ? "2px solid #8B5CF6" : "2px solid transparent",
                  }}
                >
                  <Icon className="w-4 h-4 shrink-0" style={{ color: active ? "#8B5CF6" : "#6b7280" }} />
                  {label}
                  {active && <ChevronRight className="w-3 h-3 ml-auto opacity-50" />}
                </Link>
              );
            })}
          </nav>

          <div className="px-4 py-4 border-t space-y-3" style={{ borderColor: "rgba(30,58,138,0.2)" }}>
            {/* Agent status */}
            <div className="rounded-xl p-3" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-xs font-semibold text-slate-300">Active Agents</span>
              </div>
              {["Lead Scout", "Content Writer", "Outreach"].map((a, i) => (
                <div key={a} className="flex items-center gap-2 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                  <span className="text-xs text-slate-400">{a}</span>
                </div>
              ))}
            </div>

            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Back to site
            </Link>
          </div>
        </aside>

        {/* Mobile sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
            <aside className="relative flex flex-col w-64 h-full border-r" style={{ background: "#0D1117", borderColor: "rgba(30,58,138,0.2)" }}>
              <div className="px-5 py-5 flex items-center justify-between border-b" style={{ borderColor: "rgba(30,58,138,0.2)" }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(139,92,246,0.2)" }}>
                    <Zap className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-syne)" }}>NMC Admin</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 px-3 py-4 space-y-0.5">
                {navItems.map(({ href, label, icon: Icon }) => {
                  const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                      style={{
                        background: active ? "rgba(139,92,246,0.12)" : "transparent",
                        color: active ? "#ffffff" : "#6b7280",
                      }}
                    >
                      <Icon className="w-4 h-4 shrink-0" style={{ color: active ? "#8B5CF6" : "#6b7280" }} />
                      {label}
                    </Link>
                  );
                })}
              </nav>
            </aside>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header
            className="flex items-center justify-between px-6 py-4 border-b shrink-0"
            style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
          >
            <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 ml-auto">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-xs text-slate-400">System operational</span>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse ml-1" />
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminAuth>
  );
}
