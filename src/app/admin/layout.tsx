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
} from "lucide-react";
import { DashboardParticles } from "@/components/ParticleField";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads CRM", icon: Users },
  { href: "/admin/pipeline", label: "Pipeline", icon: Kanban },
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
    <div className="min-h-screen flex items-center justify-center relative" style={{ background: "#0A0A0B" }}>
      <DashboardParticles />
      <div
        className="relative z-10 rounded-2xl p-10 w-full max-w-sm"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="flex items-center gap-2.5 mb-10">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center"
            style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.25)" }}
          >
            <Zap className="w-3.5 h-3.5" style={{ color: "#8B5CF6" }} />
          </div>
          <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}>NMC Admin</span>
        </div>
        <h2 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.03em" }}>Access Required</h2>
        <p className="text-sm mb-8" style={{ color: "#71717A" }}>Enter your admin passphrase to continue.</p>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && attempt()}
          placeholder="Passphrase"
          className="w-full px-4 py-3 text-white text-sm mb-3 focus:outline-none transition-all rounded-lg"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${err ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.08)"}`,
            color: "#FAFAF9",
            fontFamily: "var(--font-dm-sans)",
          }}
          autoFocus
        />
        {err && <p className="text-red-400 text-xs mb-3">Incorrect passphrase.</p>}
        <button
          onClick={attempt}
          className="btn-violet w-full justify-center py-3 rounded-lg text-sm"
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
      <div
        className="flex min-h-screen relative"
        style={{ background: "#0A0A0B", fontFamily: "var(--font-dm-sans)" }}
      >
        <DashboardParticles />

        {/* Sidebar — Desktop */}
        <aside
          className="hidden lg:flex flex-col w-56 shrink-0 border-r relative z-10"
          style={{ background: "rgba(10,10,11,0.95)", borderColor: "rgba(255,255,255,0.04)" }}
        >
          <div className="px-5 py-6 border-b" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            <Link href="/" className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center"
                style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.25)" }}
              >
                <Zap className="w-3.5 h-3.5" style={{ color: "#8B5CF6" }} />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none" style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}>NMC OS</p>
                <p className="text-[10px] mt-0.5" style={{ color: "#52525B" }}>Admin Console</p>
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
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: active ? "rgba(139,92,246,0.08)" : "transparent",
                    color: active ? "#FAFAF9" : "#52525B",
                    borderLeft: active ? "2px solid #8B5CF6" : "2px solid transparent",
                  }}
                >
                  <Icon className="w-4 h-4 shrink-0" style={{ color: active ? "#8B5CF6" : "#52525B" }} />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="px-4 py-4 border-t space-y-3" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            <div
              className="rounded-xl p-3"
              style={{ background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.1)" }}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <Bot className="w-3.5 h-3.5" style={{ color: "#8B5CF6" }} />
                <span className="text-xs font-semibold" style={{ color: "#A1A1AA" }}>Active Agents</span>
              </div>
              {["Lead Scout", "Content Writer", "Outreach"].map((a, i) => (
                <div key={a} className="flex items-center gap-2 py-1">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#8B5CF6", animation: "pulseDot 2s ease-in-out infinite", animationDelay: `${i * 0.4}s` }}
                  />
                  <span className="text-xs" style={{ color: "#71717A" }}>{a}</span>
                </div>
              ))}
            </div>

            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors"
              style={{ color: "#52525B" }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Back to site
            </Link>
          </div>
        </aside>

        {/* Mobile sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/70" onClick={() => setSidebarOpen(false)} />
            <aside
              className="relative flex flex-col w-64 h-full border-r"
              style={{ background: "#0A0A0B", borderColor: "rgba(255,255,255,0.04)" }}
            >
              <div className="px-5 py-5 flex items-center justify-between border-b" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.25)" }}>
                    <Zap className="w-3.5 h-3.5" style={{ color: "#8B5CF6" }} />
                  </div>
                  <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-syne)" }}>NMC Admin</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} style={{ color: "#71717A" }}>
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
                        background: active ? "rgba(139,92,246,0.08)" : "transparent",
                        color: active ? "#FAFAF9" : "#52525B",
                      }}
                    >
                      <Icon className="w-4 h-4 shrink-0" style={{ color: active ? "#8B5CF6" : "#52525B" }} />
                      {label}
                    </Link>
                  );
                })}
              </nav>
            </aside>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0 relative z-10">
          <header
            className="flex items-center justify-between px-6 py-4 border-b shrink-0"
            style={{ background: "rgba(10,10,11,0.8)", borderColor: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)" }}
          >
            <button className="lg:hidden" style={{ color: "#71717A" }} onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2.5 ml-auto">
              <Activity className="w-3.5 h-3.5" style={{ color: "#8B5CF6" }} />
              <span className="text-xs" style={{ color: "#52525B" }}>System operational</span>
              <div
                className="w-1.5 h-1.5 rounded-full ml-1"
                style={{ background: "#8B5CF6", animation: "pulseDot 2s ease-in-out infinite" }}
              />
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
