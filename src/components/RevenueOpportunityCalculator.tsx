"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── TYPES ──────────────────────────────────────────────────────────────────

type YesNo = "yes" | "no" | "";
type FollowUpSpeed =
  | ""
  | "minutes"
  | "hours"
  | "day"
  | "more_than_day"
  | "no_system";

interface Answers {
  avgDealSize: string; // dollars
  dealsPerMonth: string; // count
  dormantCustomers: string; // count over last 12mo
  hasCompIntel: YesNo;
  hasResearch: YesNo;
  followUpSpeed: FollowUpSpeed;
  contentPerWeek: string; // count 0-20+
  hasIntelDesk: YesNo;
}

const DEFAULT_ANSWERS: Answers = {
  avgDealSize: "",
  dealsPerMonth: "",
  dormantCustomers: "",
  hasCompIntel: "",
  hasResearch: "",
  followUpSpeed: "",
  contentPerWeek: "",
  hasIntelDesk: "",
};

// ─── MATH ───────────────────────────────────────────────────────────────────

const FOLLOWUP_LIFT: Record<Exclude<FollowUpSpeed, "">, number> = {
  minutes: 0.0,
  hours: 0.08,
  day: 0.2,
  more_than_day: 0.35,
  no_system: 0.5,
};

interface Breakdown {
  label: string;
  monthly: number;
  agent: string;
  rationale: string;
}

interface Computation {
  currentMonthly: number;
  total: number;
  breakdown: Breakdown[];
  agents: string[];
}

function compute(a: Answers): Computation {
  const deal = Number(a.avgDealSize) || 0;
  const deals = Number(a.dealsPerMonth) || 0;
  const dormant = Number(a.dormantCustomers) || 0;
  const content = Number(a.contentPerWeek) || 0;

  const currentMonthly = deal * deals;

  const reactivation = (0.175 * dormant * deal) / 12;
  const compIntel = a.hasCompIntel === "no" ? 0.23 * currentMonthly : 0;
  const research = a.hasResearch === "no" ? 0.4 * currentMonthly : 0;
  const followUp = a.followUpSpeed
    ? FOLLOWUP_LIFT[a.followUpSpeed] * currentMonthly
    : 0;
  const contentGap =
    Math.max(0, (5 - content) / 5) * 0.67 * currentMonthly;
  const intelDesk = a.hasIntelDesk === "no" ? 0.1 * currentMonthly : 0;

  const breakdown: Breakdown[] = [];
  const agents = new Set<string>();

  if (reactivation > 0) {
    breakdown.push({
      label: "Customer Reactivation",
      monthly: reactivation,
      agent: "Reactivation Specialist",
      rationale: `17.5% of ${dormant} dormant customers × ${fmtUsd(deal)} avg deal, spread over 12 months.`,
    });
    agents.add("Reactivation Specialist");
  }

  if (compIntel > 0) {
    breakdown.push({
      label: "Competitive Intelligence",
      monthly: compIntel,
      agent: "Market Recon Agent",
      rationale:
        "Teams with weekly competitor tracking close ~23% more deals. Your current revenue × 23%.",
    });
    agents.add("Market Recon Agent");
  }

  if (research > 0) {
    breakdown.push({
      label: "Customer Research & Avatars",
      monthly: research,
      agent: "Avatar Analyst",
      rationale:
        "Buyer-avatar-led campaigns convert 3–5x warmer. Conservative lift of 40% of current revenue.",
    });
    agents.add("Avatar Analyst");
  }

  if (followUp > 0) {
    breakdown.push({
      label: "Follow-Up Speed",
      monthly: followUp,
      agent: "Inbox Sentinel",
      rationale:
        "5-minute inbound response yields up to 21× conversion vs. 24hr+. Lift scales with your current speed.",
    });
    agents.add("Inbox Sentinel");
  }

  if (contentGap > 0) {
    breakdown.push({
      label: "Content & Marketing Cadence",
      monthly: contentGap,
      agent: "Content Amplifier",
      rationale: `Consistent weekly content yields ~67% more inbound leads. You publish ~${content}/wk; target 5.`,
    });
    agents.add("Content Amplifier");
  }

  if (intelDesk > 0) {
    breakdown.push({
      label: "Daily Intelligence Desk",
      monthly: intelDesk,
      agent: "Intelligence Desk",
      rationale:
        "Morning operating reports drive sharper decisions. Conservative 10% revenue lift from daily signal.",
    });
    agents.add("Intelligence Desk");
  }

  const total = breakdown.reduce((acc, b) => acc + b.monthly, 0);
  return { currentMonthly, total, breakdown, agents: Array.from(agents) };
}

function fmtUsd(n: number): string {
  if (!isFinite(n)) return "$0";
  return "$" + Math.round(n).toLocaleString();
}

// ─── SHARED STYLES ──────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains)",
  fontSize: "9px",
  letterSpacing: "0.14em",
  color: "rgba(100,140,200,0.7)",
  textTransform: "uppercase",
  marginBottom: "0.75rem",
};

const questionStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter)",
  fontSize: "18px",
  color: "#ffffff",
  lineHeight: 1.55,
  fontWeight: 500,
  marginBottom: "1.75rem",
};

const optionStyle: React.CSSProperties = {
  background: "transparent",
  border: "1px solid rgba(26,43,80,0.45)",
  color: "#ccc",
  fontFamily: "var(--font-inter)",
  fontSize: "14px",
  padding: "14px 16px",
  textAlign: "left",
  cursor: "pointer",
  transition: "border-color 0.2s, background 0.2s",
  width: "100%",
};

const numberInputStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(26,43,80,0.55)",
  padding: "10px 0",
  fontFamily: "var(--font-inter)",
  fontSize: "20px",
  color: "#ffffff",
  outline: "none",
};

const primaryBtn: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  background: "#ffffff",
  color: "#000000",
  border: "none",
  fontFamily: "var(--font-inter)",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer",
  letterSpacing: "0.03em",
};

const ghostBtn: React.CSSProperties = {
  padding: "10px 16px",
  background: "transparent",
  color: "rgba(255,255,255,0.6)",
  border: "1px solid rgba(255,255,255,0.15)",
  fontFamily: "var(--font-jetbrains)",
  fontSize: "11px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  cursor: "pointer",
};

// ─── STEP DEFINITIONS ───────────────────────────────────────────────────────

const STEP_COUNT = 7; // 7 diagnostic screens, then results

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function RevenueOpportunityCalculator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(DEFAULT_ANSWERS);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [leadStatus, setLeadStatus] =
    useState<"idle" | "sending" | "sent" | "error">("idle");

  const result = useMemo(() => compute(answers), [answers]);

  const setA = <K extends keyof Answers>(key: K, val: Answers[K]) =>
    setAnswers((p) => ({ ...p, [key]: val }));

  const canAdvance = (): boolean => {
    switch (step) {
      case 0:
        return (
          Number(answers.avgDealSize) > 0 && Number(answers.dealsPerMonth) > 0
        );
      case 1:
        return answers.dormantCustomers !== "" && Number(answers.dormantCustomers) >= 0;
      case 2:
        return answers.hasCompIntel !== "";
      case 3:
        return answers.hasResearch !== "";
      case 4:
        return answers.followUpSpeed !== "";
      case 5:
        return answers.contentPerWeek !== "" && Number(answers.contentPerWeek) >= 0;
      case 6:
        return answers.hasIntelDesk !== "";
      default:
        return true;
    }
  };

  const next = () => {
    if (!canAdvance()) return;
    if (step < STEP_COUNT - 1) {
      setStep((s) => s + 1);
    } else {
      setSubmitted(true);
    }
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const sessionId = useMemo(() => {
    if (typeof window === "undefined") return "calc-ssr";
    return (
      "calc-" +
      Date.now().toString(36) +
      "-" +
      Math.random().toString(36).slice(2, 8)
    );
  }, [submitted]);

  const submitLead = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLeadStatus("error");
      return;
    }
    setLeadStatus("sending");
    try {
      const res = await fetch("/api/agent/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          email,
          business_context: {
            source: "revenue_opportunity_calculator",
            answers,
            result: {
              currentMonthly: result.currentMonthly,
              hiddenMonthly: result.total,
              breakdown: result.breakdown,
              agents: result.agents,
            },
          },
        }),
      });
      if (!res.ok) throw new Error("lead_failed");
      setLeadStatus("sent");
    } catch {
      setLeadStatus("error");
    }
  };

  // ─── RENDER ───────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: "380px" }}>
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress */}
            <div style={labelStyle}>
              DIAGNOSTIC // STEP {step + 1} OF {STEP_COUNT}
            </div>
            <div
              style={{
                height: "2px",
                width: "100%",
                background: "rgba(26,43,80,0.4)",
                marginBottom: "1.75rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <motion.div
                layout
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, rgba(100,140,200,0.4), rgba(100,140,200,0.9))",
                  width: `${((step + 1) / STEP_COUNT) * 100}%`,
                  transition: "width 0.4s ease",
                }}
              />
            </div>

            {step === 0 && (
              <>
                <p style={questionStyle}>
                  Let&apos;s start with the math. What does a typical deal look
                  like for you?
                </p>
                <div style={{ display: "grid", gap: "1.25rem" }}>
                  <div>
                    <div style={labelStyle}>AVG DEAL SIZE (USD)</div>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      placeholder="e.g. 5000"
                      value={answers.avgDealSize}
                      onChange={(e) => setA("avgDealSize", e.target.value)}
                      style={numberInputStyle}
                    />
                  </div>
                  <div>
                    <div style={labelStyle}>DEALS CLOSED PER MONTH</div>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      placeholder="e.g. 8"
                      value={answers.dealsPerMonth}
                      onChange={(e) => setA("dealsPerMonth", e.target.value)}
                      style={numberInputStyle}
                    />
                  </div>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <p style={questionStyle}>
                  How many customers have you lost or gone dormant in the last
                  12 months?
                </p>
                <div style={labelStyle}>REACTIVATION POOL</div>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  placeholder="e.g. 40"
                  value={answers.dormantCustomers}
                  onChange={(e) => setA("dormantCustomers", e.target.value)}
                  style={numberInputStyle}
                />
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.4)",
                    marginTop: "1rem",
                    lineHeight: 1.5,
                  }}
                >
                  Jay Abraham&apos;s rule: 15–20% of dormant customers can be
                  reactivated with the right sequence.
                </p>
              </>
            )}

            {step === 2 && (
              <>
                <p style={questionStyle}>
                  Do you run systematic competitive intelligence — weekly
                  tracking of what competitors are pricing, launching, and
                  claiming?
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {(["yes", "no"] as YesNo[]).map((v) => (
                    <button
                      key={v}
                      onClick={() => setA("hasCompIntel", v)}
                      style={{
                        ...optionStyle,
                        borderColor:
                          answers.hasCompIntel === v
                            ? "rgba(100,140,200,0.8)"
                            : "rgba(26,43,80,0.45)",
                        background:
                          answers.hasCompIntel === v
                            ? "rgba(26,43,80,0.18)"
                            : "transparent",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-jetbrains)",
                          color: "rgba(100,140,200,0.6)",
                          marginRight: "12px",
                          fontSize: "12px",
                        }}
                      >
                        {v === "yes" ? "A." : "B."}
                      </span>
                      {v === "yes" ? "Yes — we track this weekly" : "No — we operate blind"}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <p style={questionStyle}>
                  Do you have a written customer avatar — a documented profile
                  of your best buyer with pains, beliefs, and buying triggers?
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {(["yes", "no"] as YesNo[]).map((v) => (
                    <button
                      key={v}
                      onClick={() => setA("hasResearch", v)}
                      style={{
                        ...optionStyle,
                        borderColor:
                          answers.hasResearch === v
                            ? "rgba(100,140,200,0.8)"
                            : "rgba(26,43,80,0.45)",
                        background:
                          answers.hasResearch === v
                            ? "rgba(26,43,80,0.18)"
                            : "transparent",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-jetbrains)",
                          color: "rgba(100,140,200,0.6)",
                          marginRight: "12px",
                          fontSize: "12px",
                        }}
                      >
                        {v === "yes" ? "A." : "B."}
                      </span>
                      {v === "yes"
                        ? "Yes — we have it documented"
                        : "No — we sell to whoever shows up"}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <p style={questionStyle}>
                  When a new lead comes in through your website, email, or
                  phone — how fast do they hear back from a human?
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {(
                    [
                      ["minutes", "Within minutes (5 or less)"],
                      ["hours", "Within hours"],
                      ["day", "Within a day"],
                      ["more_than_day", "More than a day"],
                      ["no_system", "We don’t have a system"],
                    ] as [Exclude<FollowUpSpeed, "">, string][]
                  ).map(([v, label], i) => (
                    <button
                      key={v}
                      onClick={() => setA("followUpSpeed", v)}
                      style={{
                        ...optionStyle,
                        borderColor:
                          answers.followUpSpeed === v
                            ? "rgba(100,140,200,0.8)"
                            : "rgba(26,43,80,0.45)",
                        background:
                          answers.followUpSpeed === v
                            ? "rgba(26,43,80,0.18)"
                            : "transparent",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-jetbrains)",
                          color: "rgba(100,140,200,0.6)",
                          marginRight: "12px",
                          fontSize: "12px",
                        }}
                      >
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {label}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <p style={questionStyle}>
                  How many pieces of content (posts, emails, videos) does your
                  business publish in a typical week?
                </p>
                <div style={labelStyle}>PIECES PER WEEK</div>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={50}
                  placeholder="e.g. 2"
                  value={answers.contentPerWeek}
                  onChange={(e) => setA("contentPerWeek", e.target.value)}
                  style={numberInputStyle}
                />
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.4)",
                    marginTop: "1rem",
                    lineHeight: 1.5,
                  }}
                >
                  Businesses that publish 5+ pieces/week generate ~67% more
                  inbound leads than those that don&apos;t.
                </p>
              </>
            )}

            {step === 6 && (
              <>
                <p style={questionStyle}>
                  Do you get a daily intelligence brief — pipeline status,
                  inbox summary, competitor moves — waiting for you every
                  morning?
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {(["yes", "no"] as YesNo[]).map((v) => (
                    <button
                      key={v}
                      onClick={() => setA("hasIntelDesk", v)}
                      style={{
                        ...optionStyle,
                        borderColor:
                          answers.hasIntelDesk === v
                            ? "rgba(100,140,200,0.8)"
                            : "rgba(26,43,80,0.45)",
                        background:
                          answers.hasIntelDesk === v
                            ? "rgba(26,43,80,0.18)"
                            : "transparent",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-jetbrains)",
                          color: "rgba(100,140,200,0.6)",
                          marginRight: "12px",
                          fontSize: "12px",
                        }}
                      >
                        {v === "yes" ? "A." : "B."}
                      </span>
                      {v === "yes"
                        ? "Yes — on my desk by 6am"
                        : "No — I build it by hand when I can"}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* NAV */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                marginTop: "2rem",
              }}
            >
              <button
                onClick={back}
                disabled={step === 0}
                style={{
                  ...ghostBtn,
                  opacity: step === 0 ? 0.3 : 1,
                  cursor: step === 0 ? "default" : "pointer",
                }}
              >
                ← Back
              </button>
              <motion.button
                whileHover={canAdvance() ? { scale: 1.02 } : {}}
                whileTap={canAdvance() ? { scale: 0.98 } : {}}
                onClick={next}
                disabled={!canAdvance()}
                style={{
                  ...primaryBtn,
                  width: "auto",
                  padding: "12px 28px",
                  opacity: canAdvance() ? 1 : 0.35,
                  cursor: canAdvance() ? "pointer" : "not-allowed",
                }}
              >
                {step === STEP_COUNT - 1 ? "Reveal Hidden Revenue →" : "Continue →"}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={labelStyle}>DIAGNOSTIC_COMPLETE // HIDDEN_REVENUE_REPORT</div>

            <div
              style={{
                padding: "2rem",
                border: "1px solid rgba(100,140,200,0.5)",
                background:
                  "linear-gradient(180deg, rgba(26,43,80,0.25) 0%, rgba(26,43,80,0.05) 100%)",
                marginBottom: "1.75rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  color: "rgba(100,140,200,0.8)",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                YOUR HIDDEN REVENUE OPPORTUNITY
              </div>
              <div
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                {fmtUsd(result.total)}
                <span
                  style={{
                    fontSize: "0.45em",
                    color: "rgba(255,255,255,0.5)",
                    fontWeight: 500,
                    marginLeft: "8px",
                  }}
                >
                  /month
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.65)",
                  marginTop: "1rem",
                  lineHeight: 1.55,
                }}
              >
                Annualized: <strong style={{ color: "#fff" }}>{fmtUsd(result.total * 12)}</strong>.
                Current monthly revenue baseline: {fmtUsd(result.currentMonthly)}.
              </p>
            </div>

            {/* Breakdown */}
            {result.breakdown.length > 0 && (
              <div style={{ marginBottom: "1.75rem" }}>
                <div style={labelStyle}>BREAKDOWN</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(26,43,80,0.3)" }}>
                  {result.breakdown.map((b) => (
                    <div
                      key={b.label}
                      style={{
                        background: "#000",
                        padding: "1rem 1.1rem",
                        borderLeft: "2px solid rgba(100,140,200,0.6)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          gap: "1rem",
                          marginBottom: "0.4rem",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "14px",
                            color: "#fff",
                            fontWeight: 600,
                          }}
                        >
                          {b.label}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-jetbrains)",
                            fontSize: "14px",
                            color: "rgba(100,140,200,0.95)",
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {fmtUsd(b.monthly)}/mo
                        </span>
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.5)",
                          lineHeight: 1.55,
                          marginBottom: "0.4rem",
                        }}
                      >
                        {b.rationale}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-jetbrains)",
                          fontSize: "10px",
                          letterSpacing: "0.12em",
                          color: "rgba(100,140,200,0.65)",
                          textTransform: "uppercase",
                        }}
                      >
                        → Ghost Employee: {b.agent}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended agents */}
            {result.agents.length > 0 && (
              <div style={{ marginBottom: "1.75rem" }}>
                <div style={labelStyle}>RECOMMENDED GHOST EMPLOYEES</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {result.agents.map((agent) => (
                    <span
                      key={agent}
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        fontSize: "11px",
                        letterSpacing: "0.08em",
                        color: "#fff",
                        padding: "6px 12px",
                        border: "1px solid rgba(100,140,200,0.5)",
                        background: "rgba(26,43,80,0.25)",
                        textTransform: "uppercase",
                      }}
                    >
                      {agent}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div style={{ display: "grid", gap: "0.9rem" }}>
              {leadStatus !== "sent" ? (
                <div
                  style={{
                    padding: "1.25rem",
                    border: "1px solid rgba(26,43,80,0.55)",
                    background: "rgba(26,43,80,0.08)",
                  }}
                >
                  <div style={labelStyle}>GET THE FULL REPORT BY EMAIL</div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        flex: "1 1 240px",
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid rgba(26,43,80,0.55)",
                        padding: "10px 0",
                        fontFamily: "var(--font-inter)",
                        fontSize: "15px",
                        color: "#fff",
                        outline: "none",
                      }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={submitLead}
                      disabled={leadStatus === "sending"}
                      style={{
                        ...primaryBtn,
                        width: "auto",
                        padding: "12px 22px",
                        opacity: leadStatus === "sending" ? 0.6 : 1,
                      }}
                    >
                      {leadStatus === "sending"
                        ? "Sending…"
                        : leadStatus === "error"
                          ? "Try again"
                          : "Send Report →"}
                    </motion.button>
                  </div>
                  {leadStatus === "error" && (
                    <p
                      style={{
                        marginTop: "0.75rem",
                        fontFamily: "var(--font-inter)",
                        fontSize: "12px",
                        color: "#ef4444",
                      }}
                    >
                      Check the email address and try again.
                    </p>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    padding: "1.25rem",
                    border: "1px solid rgba(74,222,128,0.4)",
                    background: "rgba(74,222,128,0.08)",
                    color: "#fff",
                    fontFamily: "var(--font-inter)",
                    fontSize: "14px",
                  }}
                >
                  ✓ Report queued. Check your inbox shortly.
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                style={primaryBtn}
              >
                Book a Strategy Call →
              </motion.button>

              <button
                onClick={() => {
                  setAnswers(DEFAULT_ANSWERS);
                  setEmail("");
                  setLeadStatus("idle");
                  setSubmitted(false);
                  setStep(0);
                }}
                style={{ ...ghostBtn, width: "100%" }}
              >
                ← Restart diagnostic
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
