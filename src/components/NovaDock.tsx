"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NovaDockProps {
  onClick: () => void;
  visible?: boolean;
}

/**
 * Persistent, always-visible Nova trigger.
 * Fixed bottom-right. Hides itself while the HUD is open so it doesn't stack.
 * Fades in once the user has scrolled past the hero so it doesn't compete with the hero CTA.
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
    <AnimatePresence>
      {show && (
        <motion.button
          key="nova-dock"
          onClick={onClick}
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.92 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Talk to Nova — Diagnostic Scout"
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
            cursor: "pointer",
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "11px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
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
            <motion.span
              aria-hidden
              animate={{ opacity: [0.35, 0.9, 0.35], scale: [1, 1.35, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: "-4px",
                borderRadius: "50%",
                border: "1px solid rgba(59,130,246,0.55)",
                pointerEvents: "none",
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
            <span style={{ color: "#ffffff", fontSize: "12px", letterSpacing: "0.1em" }}>
              Talk to Nova
            </span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
