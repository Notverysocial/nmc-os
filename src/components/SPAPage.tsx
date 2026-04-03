"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ParticleField from "./ParticleField";
import NavSPA from "./NavSPA";

// ─── ANIMATION VARIANTS ────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const viewportOpts = { once: true, margin: "-80px" };

// ─── SHARED COMPONENTS ─────────────────────────────────────────────────────

function Pill({ label }: { label: string }) {
  return (
    <div className="section-pill">{label}</div>
  );
}

function SectionHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`text-4xl md:text-5xl font-bold text-white leading-tight ${className}`}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {children}
    </h2>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────

const tickerItems = [
  "LEAD SCOUT — 14 prospects identified",
  "CONTENT WRITER — Blog post published",
  "INTELLIGENCE DESK — Market brief compiled",
  "PIPELINE ENGINE — 3 deals advanced",
  "MISSION CONTROL — KPIs updated",
  "LEAD SCOUT — Outreach sequence launched",
  "CONTENT WRITER — Social calendar synced",
  "INTELLIGENCE DESK — Competitor brief ready",
];

const painPoints = [
  "You're still doing manually what AI can automate overnight.",
  "Your team spends 40% of their week on low-value admin work.",
  "Every tool you use is siloed — none of them talk to each other.",
  "You're making decisions based on gut, not real-time data.",
  "Your competitors are compounding their edge while you're catching up.",
];

const modules = [
  {
    id: "01",
    name: "Workspace",
    desc: "Centralized command center for every department. One login, full visibility.",
  },
  {
    id: "02",
    name: "Pipeline Engine",
    desc: "Automated lead scoring, follow-up sequences, and deal advancement — 24/7.",
  },
  {
    id: "03",
    name: "Intelligence Desk",
    desc: "Real-time market briefs, competitor monitoring, and performance dashboards.",
  },
  {
    id: "04",
    name: "Mission Control",
    desc: "Strategic KPI tracking, team accountability, and executive reporting in one view.",
  },
];

const differentiators = [
  {
    n: "01",
    title: "Built for your industry",
    desc: "Not a generic SaaS tool. Each OS is configured for staffing, real estate, or e-commerce.",
  },
  {
    n: "02",
    title: "You own the infrastructure",
    desc: "Your data, your agents, your workflows. We build — you own.",
  },
  {
    n: "03",
    title: "No-code client dashboard",
    desc: "Your team gets a clean interface. No technical overhead required.",
  },
  {
    n: "04",
    title: "Done-with-you onboarding",
    desc: "We don't hand you a tool and walk away. We run your first 30 days with you.",
  },
  {
    n: "05",
    title: "Continuous intelligence",
    desc: "The OS learns from your data and improves automatically over time.",
  },
];

const industries = [
  {
    name: "Staffing & Recruiting",
    stat: "340%",
    label: "Average ROI Year 1",
    items: ["Automated candidate sourcing", "Client pipeline management", "Compliance reporting"],
  },
  {
    name: "Real Estate",
    stat: "3x",
    label: "More deals closed",
    items: ["Lead nurture sequences", "Market intelligence briefs", "Commission tracking"],
  },
  {
    name: "E-Commerce",
    stat: "200%",
    label: "Revenue lift",
    items: ["Customer lifecycle automation", "Inventory intelligence", "Review and retention flows"],
  },
];

const timeline = [
  { week: "WK01", label: "Discovery", desc: "Audit your current stack, map gaps, define success metrics." },
  { week: "WK02", label: "Build", desc: "Configure your OS modules, connect data sources, deploy agents." },
  { week: "WK03", label: "Launch", desc: "Go live with first automations, train your team, capture quick wins." },
  { week: "WK04", label: "Optimize", desc: "Review KPIs, iterate on workflows, lock in momentum." },
];

const plans = [
  {
    name: "Foundation",
    price: "$499",
    period: "/mo",
    tag: null,
    items: [
      "1 core module",
      "Up to 5 automations",
      "Standard dashboard",
      "Email support",
      "Monthly review call",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$999",
    period: "/mo",
    tag: "RECOMMENDED",
    items: [
      "3 core modules",
      "Unlimited automations",
      "Full dashboard + Intelligence Desk",
      "Priority support",
      "Weekly strategy calls",
      "Custom agent build",
    ],
    cta: "Book a Strategy Call",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    tag: null,
    items: [
      "Full OS deployment",
      "White-label option",
      "Dedicated account team",
      "SLA guarantee",
      "Quarterly business reviews",
      "Custom integrations",
    ],
    cta: "Contact Us",
    highlight: false,
  },
];

const testimonials = [
  {
    quote: "We closed 40% more deals in Q3 without hiring anyone new. The pipeline engine runs itself.",
    name: "Marcus T.",
    company: "Apex Talent Group",
    role: "CEO",
  },
  {
    quote: "I finally have visibility into every part of the business from one screen. Game-changing.",
    name: "Sarah K.",
    company: "Meridian Properties",
    role: "Founder",
  },
  {
    quote: "The intelligence desk alone saved us 12 hours a week in research and reporting.",
    name: "David R.",
    company: "Brightline Commerce",
    role: "COO",
  },
];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function SPAPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    tier: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div style={{ background: "#000000", color: "#ffffff", minHeight: "100vh" }}>
      <NavSPA />

      {/* ─── 1. HERO ─────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ paddingTop: "80px" }}
      >
        <ParticleField density={40} opacity={0.1} color="255,255,255" connectionDistance={100} className="z-0" />
        <div className="hero-glow" />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <span
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "11px",
                letterSpacing: "0.14em",
                color: "#666666",
                textTransform: "uppercase",
              }}
            >
              NEW MINDSET CONTENT // BUSINESS OS
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              margin: "1.5rem 0 1.25rem",
            }}
          >
            Your Business.
            <br />
            <em style={{ fontStyle: "italic" }}>Supercharged.</em>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1.125rem",
              color: "#999999",
              maxWidth: "560px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.65,
            }}
          >
            An AI-powered operations platform built for growth-stage companies. One system. Unlimited leverage.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: "#ffffff",
                color: "#000000",
                fontFamily: "var(--font-inter)",
                fontSize: "14px",
                fontWeight: 600,
                padding: "13px 28px",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              Book a Strategy Call
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector("#solution")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: "transparent",
                color: "#ffffff",
                fontFamily: "var(--font-inter)",
                fontSize: "14px",
                fontWeight: 500,
                padding: "13px 28px",
                border: "1px solid rgba(255,255,255,0.3)",
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              See How It Works
            </motion.button>
          </motion.div>

          <motion.div variants={fadeUp} style={{ marginTop: "2rem" }}>
            <span
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "11px",
                color: "#666666",
                letterSpacing: "0.1em",
              }}
            >
              // 3 client slots remaining this quarter
            </span>
          </motion.div>
        </motion.div>

        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "120px",
            background: "linear-gradient(to bottom, transparent, #000000)",
            pointerEvents: "none",
          }}
        />
      </section>

      {/* ─── 2. AGENT TICKER ─────────────────────────────────────────── */}
      <div
        style={{
          background: "#000000",
          borderTop: "1px solid rgba(26,43,80,0.4)",
          borderBottom: "1px solid rgba(26,43,80,0.4)",
          padding: "14px 0",
          overflow: "hidden",
        }}
      >
        <div
          className="ticker-track"
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "12px",
            color: "#666666",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} style={{ marginRight: "0" }}>
              <span style={{ color: "rgba(26,43,80,0.8)", marginRight: "8px" }}> ///</span>
              <span style={{ marginRight: "48px" }}>{item}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── 3. PROBLEM ──────────────────────────────────────────────── */}
      <motion.section
        id="problem"
        className="section-padding"
        style={{ maxWidth: "1000px", margin: "0 auto", padding: "8rem 2rem" }}
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
      >
        <motion.div variants={fadeUp}>
          <Pill label="[ THE PROBLEM ]" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <SectionHeading className="mb-12">
            You&apos;re running your business
            <br />
            on duct tape.
          </SectionHeading>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {painPoints.map((point, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "24px",
                padding: "24px 0",
                borderBottom: "1px solid rgba(26,43,80,0.25)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "13px",
                  color: "rgba(26,43,80,0.6)",
                  minWidth: "48px",
                  paddingTop: "2px",
                  letterSpacing: "0.05em",
                }}
              >
                {String(i + 1).padStart(2, "0")} //
              </span>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "1.125rem",
                  color: "#cccccc",
                  lineHeight: 1.5,
                  fontWeight: 400,
                }}
              >
                {point}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className="nmc-line" />

      {/* ─── 4. AGITATION ────────────────────────────────────────────── */}
      <motion.section
        id="cost"
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "8rem 2rem" }}
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
      >
        <motion.div variants={fadeUp}>
          <Pill label="[ THE COST ]" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <SectionHeading className="mb-14">
            Every day you wait,
            <br />
            your competitors get smarter.
          </SectionHeading>
        </motion.div>

        <motion.div
          variants={fadeUp}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2px",
          }}
          className="md:grid-cols-2"
        >
          {/* WITHOUT column */}
          <div
            style={{
              background: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(26,43,80,0.3)",
              padding: "2.5rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "11px",
                letterSpacing: "0.12em",
                color: "#666666",
                marginBottom: "1.5rem",
                textTransform: "uppercase",
              }}
            >
              WITHOUT
            </div>
            {[
              "Manual processes eating 20+ hours/week",
              "Decisions made on outdated reports",
              "Siloed tools with no unified view",
              "Revenue leaking through follow-up gaps",
              "Team burned out on low-value work",
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  marginBottom: "14px",
                }}
              >
                <span style={{ color: "#444444", marginTop: "2px", fontSize: "14px" }}>—</span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "15px", color: "#777777" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* WITH THE OS column */}
          <div
            style={{
              background: "rgba(26,43,80,0.06)",
              border: "1px solid rgba(26,43,80,0.5)",
              padding: "2.5rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "11px",
                letterSpacing: "0.12em",
                color: "rgba(100,140,200,0.9)",
                marginBottom: "1.5rem",
                textTransform: "uppercase",
              }}
            >
              WITH THE OS
            </div>
            {[
              "Fully automated pipelines running 24/7",
              "Real-time dashboards for every decision",
              "One unified system — all data connected",
              "Zero revenue leaks — every follow-up automated",
              "Team focused only on high-leverage work",
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  marginBottom: "14px",
                }}
              >
                <span
                  style={{
                    color: "rgba(26,43,80,0.9)",
                    marginTop: "2px",
                    fontSize: "14px",
                    background: "rgba(26,43,80,0.4)",
                    width: "16px",
                    height: "16px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    borderRadius: "2px",
                    border: "1px solid rgba(26,43,80,0.6)",
                  }}
                >
                  ✓
                </span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "15px", color: "#cccccc" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <div className="nmc-line" />

      {/* ─── 5. SOLUTION ─────────────────────────────────────────────── */}
      <motion.section
        id="solution"
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "8rem 2rem" }}
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
      >
        <motion.div variants={fadeUp}>
          <Pill label="[ THE SOLUTION ]" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <SectionHeading className="mb-16">
            One system.
            <br />
            Built for your business.
          </SectionHeading>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px",
            background: "rgba(26,43,80,0.3)",
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {modules.map((mod, i) => (
            <motion.div
              key={mod.id}
              variants={fadeUp}
              style={{
                background: "#000000",
                padding: "2.5rem",
                border: "1px solid rgba(26,43,80,0.4)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "48px",
                  fontWeight: 700,
                  color: "rgba(26,43,80,0.35)",
                  position: "absolute",
                  top: "16px",
                  right: "24px",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  userSelect: "none",
                }}
              >
                {mod.id}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  marginBottom: "10px",
                }}
              >
                {mod.name}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "15px",
                  color: "#666666",
                  lineHeight: 1.6,
                }}
              >
                {mod.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className="nmc-line" />

      {/* ─── 6. DIFFERENTIATORS ──────────────────────────────────────── */}
      <motion.section
        id="features"
        style={{ maxWidth: "1000px", margin: "0 auto", padding: "8rem 2rem" }}
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
      >
        <motion.div variants={fadeUp}>
          <Pill label="[ WHY US ]" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <SectionHeading className="mb-14">Five reasons we&apos;re different.</SectionHeading>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {differentiators.map((d, i) => (
            <motion.div
              key={d.n}
              variants={fadeUp}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr",
                gap: "32px",
                padding: "28px 0",
                borderBottom: "1px solid rgba(26,43,80,0.25)",
                alignItems: "start",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "56px",
                  fontWeight: 700,
                  color: "rgba(26,43,80,0.35)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  userSelect: "none",
                }}
              >
                {d.n}
              </span>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "#ffffff",
                    marginBottom: "6px",
                  }}
                >
                  {d.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "15px",
                    color: "#666666",
                    lineHeight: 1.55,
                  }}
                >
                  {d.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className="nmc-line" />

      {/* ─── 7. INDUSTRIES ───────────────────────────────────────────── */}
      <motion.section
        id="case-studies"
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "8rem 2rem" }}
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
      >
        <motion.div variants={fadeUp}>
          <Pill label="[ BUILT FOR ]" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <SectionHeading className="mb-14">Your industry. Our expertise.</SectionHeading>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "rgba(26,43,80,0.3)",
          }}
          className="grid-cols-1 md:grid-cols-3"
        >
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              variants={fadeUp}
              style={{
                background: "#000000",
                padding: "2.5rem",
                border: "1px solid rgba(26,43,80,0.4)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "3.5rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1,
                  marginBottom: "4px",
                  letterSpacing: "-0.03em",
                }}
              >
                {ind.stat}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "11px",
                  color: "rgba(100,140,200,0.7)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "1.5rem",
                }}
              >
                {ind.label}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#cccccc",
                  marginBottom: "1rem",
                }}
              >
                {ind.name}
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                {ind.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "13px",
                      color: "#666666",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        width: "4px",
                        height: "4px",
                        background: "rgba(26,43,80,0.8)",
                        borderRadius: "50%",
                        flexShrink: 0,
                        display: "inline-block",
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className="nmc-line" />

      {/* ─── 8. TIMELINE ─────────────────────────────────────────────── */}
      <motion.section
        id="onboarding"
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "8rem 2rem" }}
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
      >
        <motion.div variants={fadeUp}>
          <Pill label="[ ONBOARDING ]" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <SectionHeading className="mb-14">Your first 30 days.</SectionHeading>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "rgba(26,43,80,0.3)",
          }}
          className="grid-cols-1 md:grid-cols-4"
        >
          {timeline.map((t, i) => (
            <motion.div
              key={t.week}
              variants={fadeUp}
              style={{
                background: "#000000",
                border: "1px solid rgba(26,43,80,0.4)",
                padding: "2rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "11px",
                  color: "rgba(100,140,200,0.7)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                {t.week}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: "10px",
                }}
              >
                {t.label}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "14px",
                  color: "#666666",
                  lineHeight: 1.55,
                }}
              >
                {t.desc}
              </p>
              {i < timeline.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    right: "-1px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "1px",
                    height: "40%",
                    background: "rgba(26,43,80,0.6)",
                    zIndex: 1,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className="nmc-line" />

      {/* ─── 9. PRICING ──────────────────────────────────────────────── */}
      <motion.section
        id="pricing"
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "8rem 2rem" }}
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
      >
        <motion.div variants={fadeUp}>
          <Pill label="[ PRICING ]" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <SectionHeading className="mb-14">Clear pricing. Real results.</SectionHeading>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "rgba(26,43,80,0.3)",
          }}
          className="grid-cols-1 md:grid-cols-3"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              style={{
                background: plan.highlight ? "rgba(26,43,80,0.08)" : "#000000",
                border: plan.highlight ? "1px solid rgba(26,43,80,0.6)" : "1px solid rgba(26,43,80,0.4)",
                padding: "2.5rem",
                position: "relative",
              }}
            >
              {plan.tag && (
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "9px",
                    letterSpacing: "0.12em",
                    color: "rgba(100,140,200,0.8)",
                    border: "1px solid rgba(26,43,80,0.5)",
                    padding: "3px 8px",
                    textTransform: "uppercase",
                  }}
                >
                  {plan.tag}
                </div>
              )}

              <h3
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "12px",
                  letterSpacing: "0.12em",
                  color: "#666666",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                {plan.name}
              </h3>

              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "2rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: plan.price === "Custom" ? "2rem" : "3rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "14px",
                      color: "#666666",
                    }}
                  >
                    {plan.period}
                  </span>
                )}
              </div>

              <ul style={{ listStyle: "none", marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "10px" }}>
                {plan.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontFamily: "var(--font-inter)",
                      fontSize: "14px",
                      color: "#999999",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        color: plan.highlight ? "rgba(100,140,200,0.8)" : "#444444",
                        marginTop: "1px",
                        fontSize: "12px",
                      }}
                    >
                      →
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: plan.highlight ? "#ffffff" : "transparent",
                  color: plan.highlight ? "#000000" : "#ffffff",
                  border: plan.highlight ? "none" : "1px solid rgba(255,255,255,0.2)",
                  fontFamily: "var(--font-inter)",
                  fontSize: "14px",
                  fontWeight: plan.highlight ? 600 : 500,
                  cursor: "pointer",
                  letterSpacing: "0.02em",
                }}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className="nmc-line" />

      {/* ─── 10. TESTIMONIALS ────────────────────────────────────────── */}
      <motion.section
        id="signals"
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "8rem 2rem" }}
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
      >
        <motion.div variants={fadeUp}>
          <Pill label="[ SIGNALS ]" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <SectionHeading className="mb-14">What clients say.</SectionHeading>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "rgba(26,43,80,0.3)",
          }}
          className="grid-cols-1 md:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{
                background: "#000000",
                border: "1px solid rgba(26,43,80,0.4)",
                padding: "2.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "15px",
                  fontStyle: "italic",
                  color: "#cccccc",
                  lineHeight: 1.65,
                  marginBottom: "1.75rem",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "11px",
                  color: "#666666",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {t.name} — {t.role}, {t.company}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className="nmc-line" />

      {/* ─── 11. CONTACT ─────────────────────────────────────────────── */}
      <motion.section
        id="contact"
        style={{ maxWidth: "680px", margin: "0 auto", padding: "8rem 2rem" }}
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
      >
        <motion.div variants={fadeUp}>
          <Pill label="[ CONNECT ]" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <SectionHeading className="mb-4">Ready to supercharge?</SectionHeading>
        </motion.div>
        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "16px",
            color: "#666666",
            marginBottom: "2.5rem",
            lineHeight: 1.6,
          }}
        >
          Tell us about your business. We&apos;ll show you exactly how the OS would work for you.
        </motion.p>

        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {[
            { key: "name", label: "Full Name", type: "text", placeholder: "Antonio Middleton" },
            { key: "email", label: "Work Email", type: "email", placeholder: "antonio@company.com" },
            { key: "company", label: "Company", type: "text", placeholder: "Company name" },
          ].map((field) => (
            <div key={field.key}>
              <label
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  color: "#666666",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                {field.label}
              </label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.key as keyof typeof formData]}
                onChange={(e) => setFormData((p) => ({ ...p, [field.key]: e.target.value }))}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid rgba(26,43,80,0.5)",
                  padding: "10px 0",
                  fontFamily: "var(--font-inter)",
                  fontSize: "15px",
                  color: "#ffffff",
                  outline: "none",
                }}
                onFocus={(e) => (e.currentTarget.style.borderBottomColor = "rgba(100,140,200,0.8)")}
                onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(26,43,80,0.5)")}
              />
            </div>
          ))}

          <div>
            <label
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "10px",
                letterSpacing: "0.12em",
                color: "#666666",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Tier of Interest
            </label>
            <select
              value={formData.tier}
              onChange={(e) => setFormData((p) => ({ ...p, tier: e.target.value }))}
              style={{
                width: "100%",
                background: "#000000",
                border: "none",
                borderBottom: "1px solid rgba(26,43,80,0.5)",
                padding: "10px 0",
                fontFamily: "var(--font-inter)",
                fontSize: "15px",
                color: formData.tier ? "#ffffff" : "#666666",
                outline: "none",
                cursor: "pointer",
                appearance: "none",
              }}
            >
              <option value="" disabled>Select a plan</option>
              <option value="foundation" style={{ background: "#000" }}>Foundation — $499/mo</option>
              <option value="growth" style={{ background: "#000" }}>Growth — $999/mo</option>
              <option value="enterprise" style={{ background: "#000" }}>Enterprise — Custom</option>
            </select>
          </div>

          <div>
            <label
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "10px",
                letterSpacing: "0.12em",
                color: "#666666",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Message (optional)
            </label>
            <textarea
              placeholder="Tell us about your biggest operational challenge..."
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid rgba(26,43,80,0.5)",
                padding: "10px 0",
                fontFamily: "var(--font-inter)",
                fontSize: "15px",
                color: "#ffffff",
                outline: "none",
                resize: "none",
              }}
              onFocus={(e) => (e.currentTarget.style.borderBottomColor = "rgba(100,140,200,0.8)")}
              onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(26,43,80,0.5)")}
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: "14px",
              background: "#ffffff",
              color: "#000000",
              border: "none",
              fontFamily: "var(--font-inter)",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.03em",
              marginTop: "0.5rem",
            }}
          >
            Send Message
          </motion.button>
        </motion.form>
      </motion.section>

      <div className="nmc-line" />

      {/* ─── 12. FOOTER ──────────────────────────────────────────────── */}
      <footer
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "3rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "13px",
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: "0.05em",
          }}
        >
          NMC
        </span>
        <span
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "11px",
            color: "#444444",
            letterSpacing: "0.1em",
          }}
        >
          © {new Date().getFullYear()} NEW MINDSET CONTENT — ALL RIGHTS RESERVED
        </span>
        <span
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "11px",
            color: "#444444",
            letterSpacing: "0.08em",
          }}
        >
          os.newmindsetcontent.com
        </span>
      </footer>
    </div>
  );
}
