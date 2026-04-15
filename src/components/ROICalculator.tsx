"use client";

import { useState } from "react";

export default function ROICalculator() {
  const [employees, setEmployees] = useState(5);
  const avgSalary = 52000;
  const humanCost = Math.round((employees * avgSalary) / 12);
  const ghostsNeeded = employees <= 3 ? 3 : employees <= 8 ? 7 : "Unlimited";
  const tierLabel =
    employees <= 3 ? "Foundation" : employees <= 8 ? "Growth" : "Enterprise";
  const capacityRecovered = employees <= 3 ? "100%" : employees <= 8 ? "87%" : "95%+";

  return (
    <div style={{ border: "1px solid rgba(26,43,80,0.3)", padding: "1.5rem" }}>
      <div
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontSize: "9px",
          letterSpacing: "0.12em",
          color: "rgba(100,140,200,0.6)",
          textTransform: "uppercase",
          marginBottom: "1.5rem",
        }}
      >
        // ROI_CALCULATOR
      </div>
      <label
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "13px",
          color: "#aaa",
          display: "block",
          marginBottom: "8px",
        }}
      >
        How many employees handle operations today?
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
        <input
          type="range"
          min={1}
          max={20}
          value={employees}
          onChange={(e) => setEmployees(Number(e.target.value))}
          style={{ flex: 1, accentColor: "rgba(59,130,246,0.6)" }}
        />
        <span
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "24px",
            fontWeight: 700,
            color: "#fff",
            minWidth: "40px",
            textAlign: "right",
          }}
        >
          {employees}
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1px",
          background: "rgba(26,43,80,0.2)",
        }}
      >
        {[
          {
            label: "CURRENT_COST/MO",
            value: "$" + humanCost.toLocaleString(),
            color: "#ef4444",
          },
          {
            label: "GHOST_EMPLOYEES",
            value: String(ghostsNeeded) + " / " + tierLabel,
            color: "#4ade80",
          },
          {
            label: "CAPACITY_RECOVERED",
            value: capacityRecovered,
            color: "#3b82f6",
          },
        ].map((item) => (
          <div key={item.label} style={{ background: "#000", padding: "1rem" }}>
            <div
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "9px",
                letterSpacing: "0.1em",
                color: "rgba(100,140,200,0.5)",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "18px",
                fontWeight: 700,
                color: item.color,
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "12px",
          color: "rgba(255,255,255,0.45)",
          marginTop: "1rem",
          lineHeight: 1.55,
        }}
      >
        Ghost Employees work 24/7 with no payroll tax, benefits, or PTO. Our
        investment is quote-based and always less than the role it replaces —
        get your number on a strategy call.
      </p>
    </div>
  );
}
