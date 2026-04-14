"use client";

import { useEffect, useState } from "react";

interface NovaDockProps {
  onClick: () => void;
  visible?: boolean;
}

/**
 * Persistent, always-visible Nova trigger.
 * Fixed bottom-right. Hides while the HUD is open so it doesn't stack.
 * Fades in once the user has scrolled past the hero so it doesn't compete with the hero CTA.
 * Uses plain CSS transitions (not framer-motion) for bulletproof mount/animate behavior.
 */
export default function NovaDock({ onClick, visible = true }: NovaDockProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const show = visible && scrolled;

  return (
    <button
      onClick={onClick}
      aria-hidden={!show}
      aria-label="Talk to Nova — Diagnostic Scout"
      tabIndex={show ? 0 : -1}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 45,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 18px 12px 14px",
        borderRadius: "9999px",
        border: "1px solid rgba(59,130,246,0.45)",
        background: "rgba(6,10,20,0.92)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.7), 0 0 24px rgba(59,130,246,0.18), inset 0 1px 0 rgba(255,255,255,0.04)",
        color: "#ffffff",
        cursor: show ? "pointer" : "default",
        fontFamily: "var(--font-jetbrains), monospace",
        fontSize: "11px",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0) scale(1)" : "translateY(24px) scale(0.92)",
        pointerEvents: show ? "auto" : "none",
        transition:
          "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
      onMouseEnter={(e) => {
        if (show) (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px) scale(1.03)";
      }}
      onMouseLeave={(e) => {
        if (show) (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0) scale(1)";
      }}
    >
      {/* pulsing avatar */}
      <span
        style={{
          position: "relative",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, rgba(59,130,246,0.45), rgba(26,43,80,0.9))",
          border: "1px solid rgba(120,170,255,0.55)",
          color: "#e8f0ff",
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          flexShrink: 0,
        }}
      >
        01
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: "-4px",
            borderRadius: "50%",
            border: "1px solid rgba(59,130,246,0.55)",
            pointerEvents: "none",
            animation: "novaDockPing 2.6s ease-in-out infinite",
          }}
        />
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: "-1px",
            right: "-1px",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#22c55e",
            boxShadow: "0 0 8px rgba(34,197,94,0.8)",
          }}
        />
      </span>

      <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1.2 }}>
        <span style={{ color: "rgba(100,140,200,0.75)", fontSize: "9px" }}>AGENT_01 // ONLINE</span>
        <span style={{ color: "#ffffff", fontSize: "12px", letterSpacing: "0.1em" }}>Talk to Nova</span>
      </span>

      <style>{`
        @keyframes novaDockPing {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.35); }
        }
      `}</style>
    </button>
  );
}
