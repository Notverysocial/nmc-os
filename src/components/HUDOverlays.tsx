"use client";

import { useState, useEffect } from "react";

export function TaskSwitcher() {
  return (
    <div style={{ position: "fixed", top: "80px", right: "16px", zIndex: 40, fontFamily: "var(--font-jetbrains)", fontSize: "9px", color: "rgba(100,140,200,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", display: "none" }} className="md:block hidden">
      <div style={{ borderLeft: "1px solid rgba(26,43,80,0.3)", paddingLeft: "8px" }}>
        {["BRIEFING", "DIAGNOSTIC", "PRICING", "CONTACT"].map((t, i) => (
          <div key={t} style={{ padding: "4px 0", cursor: "pointer", opacity: i === 0 ? 1 : 0.4, transition: "opacity 0.3s" }}>{t}</div>
        ))}
      </div>
    </div>
  );
}

const feedItems = [
  "AGENT_07 completed lead scoring \u2014 3 qualified",
  "PIPELINE_ENGINE processed 12 invoices",
  "INTELLIGENCE_DESK generated daily brief",
  "WORKSPACE synced 847 records",
  "AGENT_03 resolved 2 support tickets",
  "MISSION_CONTROL deployed workflow update",
  "AGENT_12 identified $4,200 revenue gap",
  "PIPELINE_ENGINE onboarded new client",
];

export function LiveFeed() {
  const [current, setCurrent] = useState(0);
  useEffect(() => { const interval = setInterval(() => { setCurrent((prev) => (prev + 1) % feedItems.length); }, 3000); return () => clearInterval(interval); }, []);
  return (
    <div style={{ position: "fixed", bottom: "16px", left: "16px", zIndex: 40, fontFamily: "var(--font-jetbrains)", fontSize: "10px", color: "rgba(100,140,200,0.35)", letterSpacing: "0.06em", maxWidth: "320px", display: "none" }} className="md:block hidden">
      <span style={{ color: "rgba(59,130,246,0.4)", marginRight: "6px" }}>\u25cf</span>{feedItems[current]}
    </div>
  );
}

export function ScrollTape() {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const handler = () => { const pct = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100); setScroll(pct); };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return <div style={{ position: "fixed", top: 0, left: 0, width: scroll + "%", height: "2px", background: "rgba(26,43,80,0.6)", zIndex: 60, transition: "width 0.15s ease-out" }} />;
}
