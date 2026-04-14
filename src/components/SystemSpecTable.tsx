"use client";

import { motion } from "framer-motion";

interface SpecRow { parameter: string; legacy: string; nexus: string; status: string; }

const cellStyle: React.CSSProperties = { fontFamily: "var(--font-jetbrains)", fontSize: "11px", color: "#aaa", padding: "10px 12px", letterSpacing: "0.03em" };

export default function SystemSpecTable({ caption, rows }: { caption: string; rows: SpecRow[] }) {
  return (
    <div style={{ overflow: "hidden" }}>
      <div style={{ fontFamily: "var(--font-jetbrains)", fontSize: "9px", letterSpacing: "0.12em", color: "rgba(100,140,200,0.5)", textTransform: "uppercase", marginBottom: "1rem" }}>{caption}</div>
      <div style={{ border: "1px solid rgba(26,43,80,0.3)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 80px", background: "rgba(26,43,80,0.15)", borderBottom: "1px solid rgba(26,43,80,0.3)" }}>
          {["PARAMETER", "LEGACY", "NEXUS", "STATUS"].map((h) => (
            <div key={h} style={{ fontFamily: "var(--font-jetbrains)", fontSize: "9px", letterSpacing: "0.12em", color: "rgba(100,140,200,0.7)", padding: "10px 12px", textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>
        {rows.map((row, i) => (
          <motion.div key={row.parameter} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 80px", borderBottom: i < rows.length - 1 ? "1px solid rgba(26,43,80,0.15)" : "none" }}>
            <div style={cellStyle}>{row.parameter}</div>
            <div style={{ ...cellStyle, color: "#ef4444", textDecoration: "line-through", opacity: 0.6 }}>{row.legacy}</div>
            <div style={{ ...cellStyle, color: "#4ade80" }}>{row.nexus}</div>
            <div style={cellStyle}>
              <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", marginRight: "4px" }} />
              <span style={{ fontSize: "8px", color: "#4ade80" }}>{row.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
