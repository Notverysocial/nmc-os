"use client";

import { motion } from "framer-motion";

const steps = [
  { id: "01", label: "AUDIT", desc: "Map your current operations" },
  { id: "02", label: "CONFIGURE", desc: "Deploy custom agent harness" },
  { id: "03", label: "ACTIVATE", desc: "Ghost employees go online" },
  { id: "04", label: "OPTIMIZE", desc: "Monthly review + expansion" },
];

export default function LogicFlow() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "1px", background: "rgba(26,43,80,0.2)" }} className="md:grid-cols-4">
      {steps.map((step, i) => (
        <motion.div key={step.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
          style={{ background: "#000", padding: "1.5rem", position: "relative" }}>
          <div style={{ fontFamily: "var(--font-jetbrains)", fontSize: "28px", fontWeight: 700, color: "rgba(59,130,246,0.25)", lineHeight: 1, marginBottom: "8px" }}>{step.id}</div>
          <div style={{ fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: "6px" }}>{step.label}</div>
          <div style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#999", lineHeight: 1.5 }}>{step.desc}</div>
          {i < steps.length - 1 && (
            <div className="hidden md:block" style={{ position: "absolute", right: "-8px", top: "50%", transform: "translateY(-50%)", color: "rgba(26,43,80,0.6)", fontFamily: "var(--font-jetbrains)", fontSize: "16px", zIndex: 2 }}>\u2192</div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
