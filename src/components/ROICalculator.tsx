"use client";

import { useState } from "react";

export default function ROICalculator() {
  const [employees, setEmployees] = useState(5);
  const avgSalary = 52000;
  const nexusCost = employees <= 3 ? 499 : employees <= 8 ? 999 : 2500;
  const humanCost = Math.round((employees * avgSalary) / 12);
  const savings = humanCost - nexusCost;
  const savingsPct = Math.round((savings / humanCost) * 100);

  return (
    <div style={{ border: "1px solid rgba(26,43,80,0.3)", padding: "1.5rem" }}>
      <div style={{ fontFamily: "var(--font-jetbrains)", fontSize: "9px", letterSpacing: "0.12em", color: "rgba(100,140,200,0.6)", textTransform: "uppercase", marginBottom: "1.5rem" }}>// ROI_CALCULATOR</div>
      <label style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#aaa", display: "block", marginBottom: "8px" }}>How many employees handle operations today?</label>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
        <input type="range" min={1} max={20} value={employees} onChange={(e) => setEmployees(Number(e.target.value))} style={{ flex: 1, accentColor: "rgba(59,130,246,0.6)" }} />
        <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "24px", fontWeight: 700, color: "#fff", minWidth: "40px", textAlign: "right" }}>{employees}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", background: "rgba(26,43,80,0.2)" }}>
        {[
          { label: "CURRENT_COST/MO", value: "$" + humanCost.toLocaleString(), color: "#ef4444" },
          { label: "NEXUS_COST/MO", value: "$" + nexusCost.toLocaleString(), color: "#4ade80" },
          { label: "MONTHLY_SAVINGS", value: "$" + savings.toLocaleString() + " (" + savingsPct + "%)", color: "#3b82f6" },
        ].map((item) => (
          <div key={item.label} style={{ background: "#000", padding: "1rem" }}>
            <div style={{ fontFamily: "var(--font-jetbrains)", fontSize: "9px", letterSpacing: "0.1em", color: "rgba(100,140,200,0.5)", textTransform: "uppercase", marginBottom: "6px" }}>{item.label}</div>
            <div style={{ fontFamily: "var(--font-jetbrains)", fontSize: "18px", fontWeight: 700, color: item.color }}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
