"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  { q: "How many hours per week do you or your team spend on repetitive operational tasks?", options: ["Under 10", "10\u201325", "25\u201340", "40+"], weights: [1, 2, 3, 4] },
  { q: "How much of your revenue is currently being left on the table due to missed follow-ups or manual bottlenecks?", options: ["Very little", "Some \u2014 maybe 5-10%", "Significant \u2014 10-25%", "We don\u2019t even know"], weights: [1, 2, 3, 4] },
  { q: "If you could add capacity to your business without adding payroll, what would you automate first?", options: ["Lead follow-up", "Client onboarding", "Reporting & analytics", "Everything"], weights: [2, 2, 2, 4] },
  { q: "How would you describe your current tech stack?", options: ["Mostly manual / spreadsheets", "Some tools, not connected", "Good tools, bad workflows", "We need a complete overhaul"], weights: [4, 3, 2, 4] },
  { q: "What\u2019s your biggest operational pain right now?", options: ["Can\u2019t scale without hiring", "Losing deals to slow response", "No visibility into pipeline", "All of the above"], weights: [3, 3, 3, 4] },
];

export default function QuizSection() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const handleAnswer = (weight: number) => {
    const newScore = score + weight;
    setScore(newScore);
    if (step < questions.length - 1) { setStep(step + 1); } else { setDone(true); }
  };

  const getVerdict = () => {
    if (score >= 16) return { level: "CRITICAL", color: "#ef4444", text: "Your business is hemorrhaging revenue. NEXUS would likely identify $10,000+/month in recoverable value within 90 days." };
    if (score >= 11) return { level: "HIGH", color: "#f59e0b", text: "Significant operational drag detected. You\u2019re leaving money on the table every month. A strategy call would reveal exactly where." };
    return { level: "MODERATE", color: "#4ade80", text: "You\u2019re running tighter than most, but there are likely hidden inefficiencies an audit would surface. Worth a conversation." };
  };

  return (
    <div style={{ minHeight: "300px" }}>
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <div style={{ fontFamily: "var(--font-jetbrains)", fontSize: "9px", letterSpacing: "0.12em", color: "rgba(100,140,200,0.5)", textTransform: "uppercase", marginBottom: "1rem" }}>QUESTION {step + 1} OF {questions.length}</div>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#ffffff", lineHeight: 1.6, marginBottom: "1.5rem", fontWeight: 500 }}>{questions[step].q}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {questions[step].options.map((opt, i) => (
                <motion.button key={opt} whileHover={{ scale: 1.01, borderColor: "rgba(59,130,246,0.5)" }} whileTap={{ scale: 0.99 }} onClick={() => handleAnswer(questions[step].weights[i])}
                  style={{ background: "transparent", border: "1px solid rgba(26,43,80,0.4)", color: "#ccc", fontFamily: "var(--font-inter)", fontSize: "14px", padding: "12px 16px", textAlign: "left", cursor: "pointer", transition: "border-color 0.2s" }}>
                  <span style={{ fontFamily: "var(--font-jetbrains)", color: "rgba(59,130,246,0.5)", marginRight: "10px", fontSize: "12px" }}>{String.fromCharCode(65 + i)}.</span>{opt}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ fontFamily: "var(--font-jetbrains)", fontSize: "9px", letterSpacing: "0.12em", color: "rgba(100,140,200,0.5)", textTransform: "uppercase", marginBottom: "1rem" }}>DIAGNOSTIC_COMPLETE</div>
            <div style={{ padding: "1.5rem", border: "1px solid " + getVerdict().color + "33", background: getVerdict().color + "08", marginBottom: "1.5rem" }}>
              <div style={{ fontFamily: "var(--font-jetbrains)", fontSize: "12px", fontWeight: 700, color: getVerdict().color, letterSpacing: "0.1em", marginBottom: "8px" }}>OPERATIONAL_DRAG: {getVerdict().level}</div>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "15px", color: "#ccc", lineHeight: 1.6 }}>{getVerdict().text}</p>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{ width: "100%", padding: "14px", background: "#ffffff", color: "#000000", border: "none", fontFamily: "var(--font-inter)", fontSize: "14px", fontWeight: 700, cursor: "pointer", letterSpacing: "0.03em" }}>
              Get Your Full Hidden Revenue Report \u2192
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
