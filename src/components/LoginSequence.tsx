"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  "NEXUS_OS v4.2.1 \u2014 initializing...",
  "loading agent_harness_framework...",
  "connecting neural_mesh_layer...",
  "calibrating workspace_engine...",
  "pipeline_engine: ONLINE",
  "intelligence_desk: ONLINE",
  "mission_control: ONLINE",
  "all systems nominal.",
  "WELCOME TO NEXUS.",
];

export default function LoginSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setLines((prev) => [...prev, bootLines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setDone(true), 600);
        setTimeout(() => onCompleteRef.current(), 1200);
      }
    }, 180);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#000000", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}
        >
          <div style={{ maxWidth: "600px", width: "100%" }}>
            <div style={{ fontFamily: "var(--font-jetbrains)", fontSize: "10px", letterSpacing: "0.15em", color: "rgba(100,140,200,0.6)", marginBottom: "1.5rem", textTransform: "uppercase" }}>
              // NEXUS_BOOT_SEQUENCE
            </div>
            {lines.map((line, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}
                style={{ fontFamily: "var(--font-jetbrains)", fontSize: "13px", color: i === lines.length - 1 && i === bootLines.length - 1 ? "#ffffff" : "#666666", marginBottom: "6px", letterSpacing: "0.03em" }}>
                <span style={{ color: "rgba(59,130,246,0.5)", marginRight: "8px" }}>{"\u203a"}</span>
                {line}
              </motion.div>
            ))}
            {lines.length < bootLines.length && (
              <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }}
                style={{ display: "inline-block", width: "8px", height: "14px", background: "rgba(59,130,246,0.6)", marginTop: "4px" }} />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
