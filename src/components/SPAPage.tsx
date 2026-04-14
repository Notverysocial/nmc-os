"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ParticleField from "./ParticleField";
import NavSPA from "./NavSPA";
import Typewriter from "./Typewriter";
import AnimatedCounter from "./AnimatedCounter";
import GlassCard from "./GlassCard";
import LiveFeed from "./LiveFeed";
import SystemSpecTable from "./SystemSpecTable";
import LogicFlow from "./LogicFlow";
import QuizSection from "./QuizSection";
import ROICalculator from "./ROICalculator";
import ScrollTape from "./ScrollTape";
import LoginSequence from "./LoginSequence";
import AgentCore from "./AgentCore";
import Sparkline from "./Sparkline";
import TaskSwitcher from "./TaskSwitcher";
import KernelTooltip from "./KernelTooltip";
import VideoHero from "./VideoHero";
import NeuralCursor from "./NeuralCursor";
import NarrativeBlock from "./NarrativeBlock";
import { Canvas } from "@react-three/fiber";
import { useDecryptText } from "../hooks/useDecryptText";

const getTimestamp = (sec: string) => `// 2026.04.05 // SEC.${sec} // ACTIVE`;

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

// ─── DATA ──────────────────────────────────────────────────────────────────

const differentiators: { n: string; title: string; desc: string }[] = [
  { n: "01", title: "Built for operators, not prompt engineers", desc: "NEXUS doesn't ask you to learn a new tool. It plugs into the stack you already run — CRM, inbox, calendar, storage — and takes over the repetitive work you were paying humans to do." },
  { n: "02", title: "Ghost employees, not chatbots", desc: "Every agent in NEXUS has a named role, a scope, and a measurable output. You don't 'chat' with them. They just do the work — 24/7, no supervision, no attitude." },
  { n: "03", title: "Priced like software, paid off like a hire", desc: "A single NEXUS deployment runs the equivalent workload of 3–7 full-time operators for less than the cost of one junior hire. The ROI curve isn't subtle." },
  { n: "04", title: "Owner-operated. You never touch the console.", desc: "We install, configure, monitor, and expand your agent harness. You focus on the business. We keep the ghosts running." },
];

const modules: { id: string; name: string; desc: string }[] = [
  { id: "M01", name: "Inbox Sentinel", desc: "Triages every incoming message, routes leads into your CRM, and drafts context-aware responses in your voice." },
  { id: "M02", name: "Pipeline Pulse", desc: "Watches every deal 24/7. Flags stalled conversations, auto-nudges on the right cadence, and escalates when a decision is imminent." },
  { id: "M03", name: "Client Onboarder", desc: "Runs new clients through welcome, intake, contract, and kickoff without a human touching it. Fully branded, fully logged." },
  { id: "M04", name: "Ops Reporter", desc: "Compiles weekly operating reports from across your stack. KPIs, variances, and plain-English commentary on your desk by Monday 6am." },
];

const industries: { name: string; stat: string; label: string; items: string[] }[] = [
  { name: "Agencies & Consultancies", stat: "67%", label: "Ops hours recovered", items: ["Lead qualification", "Proposal assembly", "Client reporting", "Project status rollups"] },
  { name: "Real Estate & Brokerage", stat: "3.4x", label: "Response-time improvement", items: ["Inbound lead routing", "Showing coordination", "Listing updates", "Offer tracking"] },
  { name: "Professional Services", stat: "42%", label: "Margin expansion", items: ["Intake & conflict checks", "Matter status updates", "Document assembly", "Compliance logging"] },
];

const timeline: { week: string; label: string; desc: string }[] = [
  { week: "WEEK 01", label: "Audit & map", desc: "We shadow your operations, interview your team, and map every repeatable workflow worth automating." },
  { week: "WEEK 02", label: "Deploy harness", desc: "Your first ghost employees come online — scoped, sandboxed, and running on real data." },
  { week: "WEEK 03", label: "Go live", desc: "Full production cutover. Agents take the work. Humans get moved up the value stack." },
  { week: "WEEK 04+", label: "Expand & optimize", desc: "Monthly review. Find the next bottleneck. Deploy the next agent. Compound." },
];

const plans: { name: string; price: string; period?: string; highlight?: boolean; tag?: string; items: string[]; cta: string }[] = [
  { name: "Operator", price: "$499", period: "/mo", items: ["Up to 3 ghost employees", "1 core workflow automation", "Standard stack integrations", "Email + chat support"], cta: "Start with Operator" },
  { name: "Command", price: "$999", period: "/mo", highlight: true, tag: "Most common", items: ["Up to 8 ghost employees", "Full workflow harness", "Priority integrations + custom tools", "Dedicated ops reviews", "Slack channel with our team"], cta: "Deploy Command" },
];

const testimonials: { quote: string; name: string; role: string; company: string }[] = [
  { quote: "We replaced about four full-time roles worth of tasks in the first 60 days. The team we kept is now doing the work they were actually hired to do.", name: "M. Ellis", role: "COO", company: "Mid-market agency" },
  { quote: "Our response time on inbound went from hours to under a minute. Close rate on warm leads jumped almost 30%.", name: "R. Cho", role: "Managing broker", company: "Regional brokerage" },
];

// ─── SHARED COMPONENTS ─────────────────────────────────────────────────────

function Pill({ label, sec = "01" }: { label: string; sec?: string }) {
  const timestamp = useMemo(() => getTimestamp(sec), [sec]);
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "6px 14px",
        border: "1px solid rgba(26,43,80,0.4)",
        borderRadius: "9999px",
        background: "rgba(10,14,26,0.4)",
        fontFamily: "var(--font-jetbrains)",
        fontSize: "10px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      <span style={{ color: "#3b82f6" }}>{label}</span>
      <span style={{ color: "rgba(100,140,200,0.5)" }}>{timestamp}</span>
    </div>
  );
}

function SectionHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={className}
      style={{
        fontFamily: "var(--font-playfair)",
        fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
        fontWeight: 700,
        lineHeight: 1.15,
        letterSpacing: "-0.01em",
        color: "#ffffff",
      }}
    >
      {children}
    </h2>
  );
}

export default function SPAPage() {
  const [isBooting, setIsBooting] = useState(true);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      // TODO (DEPLOY-03): wire Supabase here
      console.log("[Contact form]", formData);
      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <>

      <LoginSequence onComplete={() => setIsBooting(false)} />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isBooting ? 0 : 1 }}
        transition={{ duration: 1.5, staggerChildren: 0.1 }}
        style={{ 
          background: "#000000",
          color: "#ffffff", 
          minHeight: "100vh", 
          position: "relative", 
          zIndex: 10,
          visibility: isBooting ? "hidden" : "visible"
        }}
        className="vanta-black-floor"
      >
        <NeuralCursor />
        <NavSPA />
        <TaskSwitcher />
        <LiveFeed />
        <ScrollTape />

        <VideoHero />

        {/* ─── 1. HERO ─────────────────────────────────────────────────── */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{ paddingTop: "80px" }}
        >
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
                NEXUS // ENTERPRISE OS
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2.5rem, 6vw, 4.2rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                color: "#ffffff",
                margin: "1.5rem 0 1.25rem",
                textAlign: "center",
              }}
            >
              "The Ugly Little Secret Every CEO In America Is Whispering In Boardrooms This Year — And Why It Will Either Destroy Your Business In The Next 24 Months Or Hand You The Biggest Land Grab Of Your Entire Career"
            </motion.h1>

            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "1.25rem",
                color: "#888888",
                maxWidth: "800px",
                margin: "0 auto 2.5rem",
                lineHeight: 1.5,
                fontWeight: 500,
                fontStyle: "italic"
              }}
            >
              A warning (and a war plan) for small business owners who can feel the ground shifting under their feet — from the people building what comes after the layoffs.
            </motion.p>

            <motion.div
              variants={fadeUp}
              style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="hover:animate-glitch"
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
                Get Your Hidden Revenue Report
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="hover:animate-glitch"
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
                Book a Strategy Call
              </motion.button>
            </motion.div>

            <motion.div variants={fadeUp} style={{ marginTop: "2.5rem" }}>
              <div className="flex justify-center gap-12 border-t border-white/5 pt-8">
                {[
                  { label: "UPTIME", value: "99.98%" },
                  { label: "ACTIVE_AGENTS", value: "1,402" },
                  { label: "CPU_LOAD", value: "12%" },
                  { label: "LATENCY", value: "0.4ms" }
                ].map((spec, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="text-[9px] font-mono text-white/20 tracking-[0.2em] mb-1">
                      {spec.label}
                    </span>
                    <span className="text-[12px] font-mono text-blue-400/70 tracking-widest">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
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

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "120px",
              background: "linear-gradient(to bottom, transparent, #000000)",
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
        </section>

        {/* ─── MIC DROP BUFFER ─────────────────────────────────────── */}
        <div className="h-[20vh] w-full bg-black pointer-events-none" />

        {/* ─── ASYMMETRICAL LAYOUT GRID ────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-12 relative max-w-[1400px] mx-auto px-4 md:px-8 pb-32">
          
          {/* ROW 1: LEAD + AGITATION */}
          <div className="col-span-1 md:col-span-5 prose-invert relative z-20 md:pr-4">
            <div className="md:hidden absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.85)_0%,transparent_100%)] pointer-events-none -z-10 blur-xl" />
            <NarrativeBlock id="story-lead" metadataLabel="NARRATIVE_NODE_01">
              <p>Dear Friend,</p>
              <p>I'm writing this to you from a small office in Las Vegas, and I need you to read every word of what's about to follow. <strong>Not skim it. Read it.</strong></p>
              <p>Because the thing I'm about to tell you is the single most important piece of business news you will read this year. And I say that without any exaggeration whatsoever.</p>
              <p>If you own a business — any business, doesn't matter if you run a staffing agency or a plumbing company or a three-person marketing shop out of your spare bedroom — the next 24 months are going to be the most dangerous, and simultaneously the most profitable, period of your entire working life.</p>
              <p><strong>I know that sounds dramatic. I wish it wasn't.</strong></p>
              <p>Let me just lay out the facts and let you decide for yourself.</p>
            </NarrativeBlock>
            <div className="h-16" />
            <NarrativeBlock id="story-storm" metadataLabel="NARRATIVE_NODE_02">
              <p>Here's what's going on.</p>
              <p>Every CEO running a real company in America is sitting in a board meeting this quarter asking the same question: <em>"How fast can we replace our people with AI?"</em></p>
              <p>Don't take my word for it. Take theirs.</p>
            </NarrativeBlock>
          </div>
          <div className="col-span-1 md:col-span-7 relative z-10">
            <GlassCard>
              <motion.div variants={fadeUp}>
                <Pill label="[ THE STORM ]" sec="03" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionHeading className="mb-14">
                  The factual evidence
                  <br />
                  of the shifting ground.
                </SectionHeading>
              </motion.div>

              <motion.div variants={fadeUp}>
                <SystemSpecTable 
                  caption="CEO_AUDIT_REPORT_03B"
                  rows={[
                    { parameter: "KLARNA_AI", legacy: "700_REPS", nexus: "REPLACED_BY_AI", status: "OPTIMAL" },
                    { parameter: "IBM_HIRES", legacy: "7,800_ROLES", nexus: "PAUSED_FOR_AI", status: "OPTIMAL" },
                    { parameter: "DUOLINGO", legacy: "CONTRACTORS", nexus: "CUT_FOR_AI", status: "OPTIMAL" },
                    { parameter: "SHOPIFY", legacy: "HUMAN_HIRING", nexus: "GATED_BY_AI", status: "OPTIMAL" },
                    { parameter: "ANTHROPIC", legacy: "50%_WHITE_COLLAR", nexus: "VANISHING_JOBS", status: "OPTIMAL" },
                  ]}
                />
              </motion.div>
            </GlassCard>
          </div>

          {/* ROW 2: STORM CONCLUSION + DIFFERENTIATORS */}
          <div className="col-span-1 md:col-span-5 prose-invert relative z-20 mt-12 md:mt-32 md:pr-4">
            <div className="md:hidden absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.85)_0%,transparent_100%)] pointer-events-none -z-10 blur-xl" />
            <NarrativeBlock id="story-storm-conclusion" metadataLabel="NARRATIVE_NODE_03">
              <p>These are not predictions from some tech blog. These are the actual people who sign the paychecks telling you what they're about to do.</p>
              <p><strong>Now here's the part nobody is saying out loud.</strong></p>
              <p>When those jobs get cut, the businesses that serve those people and those industries get cut with them. The staffing agencies that placed them. The accountants that did their taxes. The marketing firms that ran their campaigns. The IT shops that set up their laptops. The insurance brokers that sold them group plans.</p>
              <p>The lenders, the consultants, the coaches, the SaaS vendors — every small business whose customer is a mid-sized company is about to watch its customer get smaller.</p>
              <p><strong>That's the storm. And it's not coming. It's already here.</strong></p>
            </NarrativeBlock>
          </div>
          <div className="col-span-1 md:col-span-7 relative z-10 mt-0 md:mt-32">
            <GlassCard>
              <motion.div variants={fadeUp}>
                <Pill label="[ FASCINATION BULLETS ]" sec="06" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionHeading className="mb-14">The technical edge of 2026.</SectionHeading>
              </motion.div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {differentiators.map((d, i) => (
                  <motion.div
                    key={d.n}
                    variants={fadeUp}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "100px 1fr",
                      gap: "32px",
                      padding: "1rem 0",
                      borderBottom: "1px solid rgba(26,43,80,0.25)",
                      alignItems: "center",
                    }}
                  >
                    <div className="flex flex-col">
                      <span
                        style={{
                          fontFamily: "var(--font-jetbrains)",
                          fontSize: "24px",
                          fontWeight: 800,
                          color: "rgba(59, 130, 246, 0.4)",
                          lineHeight: 1,
                        }}
                      >
                        {d.n}
                      </span>
                      <span className="text-[9px] font-mono text-white/20 uppercase tracking-tighter">
                        NODE_REF_{99 - i}
                      </span>
                    </div>
                    <div>
                      <h4
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: "#FFFFFF",
                          marginBottom: "6px",
                          textTransform: "uppercase",
                          letterSpacing: "0.02em"
                        }}
                      >
                        {d.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "13px",
                          color: "#BBBBBB",
                          lineHeight: 1.6,
                          maxWidth: "700px"
                        }}
                      >
                        {d.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* MIC DROP BUFFER */}
          <div className="col-span-full h-[60vh] flex items-center justify-center border-t border-white/5 mt-32 md:mt-64 relative">
             <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full opacity-50" />
             <div className="text-center space-y-4">
                <span className="text-[11px] font-mono text-blue-400 tracking-[0.3em] uppercase">Phase Change</span>
                <h2 className="text-4xl md:text-6xl font-playfair font-bold text-white tracking-tight">The Paradigm Shift</h2>
             </div>
          </div>

          {/* ROW 3: TURN/MECHANISM + SOLUTION */}
          <div className="col-span-1 md:col-span-5 prose-invert relative z-20 mt-12 md:mt-32 md:pr-4">
            <div className="md:hidden absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.85)_0%,transparent_100%)] pointer-events-none -z-10 blur-xl" />
            <NarrativeBlock id="story-turn" metadataLabel="NARRATIVE_NODE_03">
              <p>Now I told you this was dangerous AND profitable. Let me explain the profitable part.</p>
              <p>Because here's what almost nobody has figured out yet.</p>
              <p>The same wave that's going to destroy most businesses is the exact wave that's going to hand a tiny group of business owners the biggest windfall of their lives.</p>
              <p>And I mean biggest of their lives — the kind of once-in-a-generation repositioning that happens when Kodak misses digital. When Blockbuster misses streaming. When radio misses podcasts.</p>
              <p>Every one of those transitions minted a new class of wealthy people. Not because those people were smarter. Because they were early.</p>
              <p>And the early move right now is this:</p>
              <p className="border-l-2 border-blue-500/50 pl-4 py-2 italic text-white/90"><strong>Stop being a business that employs people. Start being a business that employs ghost employees — AI agents that work 24 hours a day, 7 days a week, never quit, never call in sick, never ask for a raise, and cost you less than a car payment.</strong></p>
              <p>Not a tool. Not a chatbot. <strong>Employees.</strong> With roles, responsibilities, KPIs, and a place on your org chart.</p>
              <ul>
                <li>They answer your phones.</li>
                <li>They chase your leads.</li>
                <li>They write your content.</li>
                <li>They run your books.</li>
                <li>They onboard your clients.</li>
                <li>They follow up on your invoices.</li>
              </ul>
              <p>They do the work a five-person team would do and <em>they do it while you're asleep.</em></p>
              <p>The CEOs of the Fortune 500 are already doing this. The only difference is they have a team of consultants charging them two million dollars a year to set it up.</p>
              <p><strong>You don't. You have us.</strong></p>
            </NarrativeBlock>
            <div className="h-16" />
            <NarrativeBlock id="story-mechanism" metadataLabel="NARRATIVE_NODE_04">
              <p>We call it NEXUS. It's not a website and it's not software. <strong>It's an operating system for your business — and the ghost employees come with it.</strong></p>
            </NarrativeBlock>
          </div>
          <div className="col-span-1 md:col-span-7 relative z-10 mt-0 md:mt-32">
            <GlassCard>
              <motion.div variants={fadeUp}>
                <Pill label="[ THE TURN ]" sec="04" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionHeading className="mb-8">
                  Stop being a business
                  <br />
                  that employs people.
                </SectionHeading>
              </motion.div>

              <motion.div 
                variants={fadeUp} 
                className="w-full h-[300px] mb-12 relative flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full" />
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <AgentCore />
                </Canvas>
              </motion.div>

              <motion.div variants={fadeUp} className="mb-12">
                <LogicFlow />
              </motion.div>

              <motion.div variants={fadeUp} className="mb-12">
                <ROICalculator />
              </motion.div>

              <p className="text-white/40 font-mono text-xs mb-8 uppercase tracking-widest text-center">
                // INTERNAL_OPERATING_SYSTEM_STRUCTURE
              </p>

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
                      padding: "2rem",
                      border: "1px solid rgba(26,43,80,0.4)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        fontSize: "32px",
                        fontWeight: 700,
                        color: "rgba(26,43,80,0.35)",
                        position: "absolute",
                        top: "12px",
                        right: "16px",
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
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: "#ffffff",
                        marginBottom: "10px",
                        textTransform: "uppercase"
                      }}
                    >
                      {mod.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "14px",
                        color: "#FFFFFF",
                        lineHeight: 1.6,
                      }}
                    >
                      {mod.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* ROW 4: OFFER + INDUSTRIES/TIMELINE */}
          <div className="col-span-1 md:col-span-5 prose-invert relative z-20 mt-12 md:mt-32 md:pr-4">
            <div className="md:hidden absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.85)_0%,transparent_100%)] pointer-events-none -z-10 blur-xl" />
            <NarrativeBlock id="story-offer" metadataLabel="NARRATIVE_NODE_05">
              <p>So here's what I'm prepared to do.</p>
              <p>We are taking on a very small number of Founding Clients right now. I want to be specific about the number because specificity is how you know I'm not blowing smoke:</p>
              <p><strong>Three per month. That's it. Three.</strong></p>
              <p>Why three? Because we actually run the system with you. Every Founding Client gets direct access, custom agent configuration, and monthly optimization reviews.</p>
              <p>You also get a locked-in price that we will honor for as long as you stay with us — even after we raise prices on the public. And we will raise them, because the compound effect I described earlier is real, and the early clients are getting something the later ones cannot buy at any price.</p>
              <p>This is not a webinar. It is not a course. It is not a chatbot you install and figure out by yourself.</p>
              <p><strong>It is a working partnership with the people who are building the infrastructure for what happens to small businesses after the AI job wave hits.</strong></p>
              <p>And here's my guarantee — the one I can actually keep, because I've thought hard about what's fair to promise:</p>
              
              <div className="my-12 p-8 md:p-12 border border-blue-500/30 bg-black/40 rounded-xl relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 left-0 bottom-0 w-2 bg-blue-500" />
                <span className="font-jetbrains text-blue-400 text-[10px] tracking-widest uppercase mb-4 block">// PROTOCOL: THE 90-DAY GUARANTEE</span>
                <p className="!mb-0 text-white font-semibold text-xl md:text-2xl leading-relaxed italic">"If in the first 90 days we don't identify more in untapped revenue and eliminated cost than what you've paid us, we keep working for free until we do. Not a refund. Better than a refund. We stay on the job."</p>
              </div>
            </NarrativeBlock>
          </div>
          <div className="col-span-1 md:col-span-7 relative z-10 mt-0 md:mt-32 space-y-12">
            <GlassCard>
              <motion.div variants={fadeUp}>
                <Pill label="[ THE LAND GRAB ]" sec="06" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionHeading className="mb-14">
                  Reposition for the win.
                  <br />
                  Before the storm hits.
                </SectionHeading>
              </motion.div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(1, 1fr)",
                  gap: "1px",
                  background: "rgba(26,43,80,0.3)",
                }}
                className="md:grid-cols-3"
              >
                {industries.map((ind, i) => (
                  <motion.div
                    key={ind.name}
                    variants={fadeUp}
                    style={{
                      background: "#000000",
                      padding: "2rem",
                      border: "1px solid rgba(26,43,80,0.4)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        fontSize: "3rem",
                        fontWeight: 700,
                        color: "#ffffff",
                        lineHeight: 1,
                        marginBottom: "4px",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      <AnimatedCounter 
                        value={parseFloat(ind.stat)} 
                        suffix={ind.stat.includes('%') ? '%' : ind.stat.includes('x') ? 'x' : ''} 
                      />
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        fontSize: "10px",
                        color: "rgba(100,140,200,0.7)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "1rem",
                      }}
                    >
                      {ind.label}
                    </div>

                    <h3
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: "#ffffff",
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
                            fontSize: "12px",
                            color: "#FFFFFF",
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
            </GlassCard>
            
            <GlassCard>
              <motion.div variants={fadeUp}>
                <Pill label="[ ONBOARDING ]" sec="08" />
              </motion.div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(1, 1fr)",
                  gap: "1px",
                  background: "rgba(26,43,80,0.3)",
                }}
                className="md:grid-cols-4"
              >
                {timeline.map((t, i) => (
                  <motion.div
                    key={t.week}
                    variants={fadeUp}
                    style={{
                      background: "#000000",
                      border: "1px solid rgba(26,43,80,0.4)",
                      padding: "1.5rem",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        fontSize: "10px",
                        color: "rgba(100,140,200,0.7)",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: "10px",
                      }}
                    >
                      {t.week}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "#ffffff",
                        marginBottom: "8px",
                      }}
                    >
                      {t.label}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "13px",
                        color: "#FFFFFF",
                        lineHeight: 1.5,
                      }}
                    >
                      {t.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* MIC DROP BUFFER */}
          <div className="col-span-full h-[60vh] flex items-center justify-center border-t border-white/5 mt-32 md:mt-64 relative">
             <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full opacity-50" />
             <div className="text-center space-y-4">
                <span className="text-[11px] font-mono text-indigo-400 tracking-[0.3em] uppercase">Architecture</span>
                <h2 className="text-4xl md:text-6xl font-playfair font-bold text-white tracking-tight">The Diagnostics</h2>
             </div>
          </div>

          {/* ROW 5: CTA + QUIZ/PRICING/CONTACT */}
          <div className="col-span-1 md:col-span-5 prose-invert relative z-20 mt-12 md:mt-32 md:pr-4">
            <div className="md:hidden absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.85)_0%,transparent_100%)] pointer-events-none -z-10 blur-xl" />
            <NarrativeBlock id="story-cta" metadataLabel="NARRATIVE_NODE_06">
              <p>Here's what to do right now, while this is still in front of you.</p>
              <p>Boot up the diagnostic terminal locally and answer five questions. Let the system scan your current operation and build your Hidden Revenue Report.</p>
              <p>That's it. No forms to fill out. No sales gauntlet. No pressure.</p>
              <p>Just a conversation about what your business could look like in 12 months if you made one smart move this week instead of waiting to see what everybody else does.</p>
            </NarrativeBlock>
            
            <div className="mt-24 border-t border-white/5 pt-12 space-y-12">
              <motion.div variants={fadeUp} style={{ fontFamily: "var(--font-playfair)", color: "#FFFFFF", opacity: 0.7 }}>
                <p className="text-xl md:text-2xl leading-relaxed italic mb-6">
                  P.S. I want to tell you one more thing, because I think it's the real reason you should do this.
                  Every person who reads a letter like this one tells themselves the same thing: "This is interesting, I'll think about it." 
                  And then they close the tab, get back to their inbox, and six months later they read another letter like this one, 
                  and they tell themselves the same thing again.
                </p>
                <p className="text-xl md:text-2xl leading-relaxed italic">
                  The only thing that guy did differently was he stopped thinking about it. The people who move now will look like geniuses 
                  in 24 months. The people who wait will be asking the people who moved for a job.
                </p>
                <p className="text-2xl font-bold mt-8 text-white">— Antonio</p>
              </motion.div>

              <motion.div 
                variants={fadeUp} 
                className="pt-4"
                style={{ fontFamily: "var(--font-playfair)", color: "#FFFFFF", opacity: 0.7 }}
              >
                <p className="text-xl leading-relaxed italic">
                  <strong>P.P.S. One more thing.</strong> If you read all of this and the part that stuck with you was the line about 
                  turning your worst spreadsheet into software, write me back and just say "spreadsheet." 
                  I'll know what you mean. That's one of the fastest wins we do.
                </p>
              </motion.div>
            </div>
            
          </div>
          <div className="col-span-1 md:col-span-7 relative z-10 mt-0 md:mt-32 space-y-12">
            
            <GlassCard>
                <motion.div
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  style={{ textAlign: "center", marginBottom: "4rem" }}
                >
                  <motion.div
                    variants={fadeUp}
                    data-neural-node="true"
                    style={{ marginBottom: "2rem" }}
                  >
                    <Pill label="[ SYSTEM_DIAGNOSTIC ]" sec="09" />
                  </motion.div>
                  <SectionHeading>
                    Build Your Hidden Revenue Report.
                    <br />
                    Identify the leaks.
                  </SectionHeading>
                </motion.div>
                <QuizSection />
            </GlassCard>

            <GlassCard>
              <motion.div variants={fadeUp}>
                <Pill label="[ PRICING ]" sec="09" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionHeading className="mb-14">
                  If we find $10,000/month in revenue you're not capturing — and we usually do — would it be worth $499 to start?
                </SectionHeading>
              </motion.div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(1, 1fr)",
                  gap: "1px",
                  background: "rgba(26,43,80,0.3)",
                }}
                className="md:grid-cols-2"
              >
                {plans.map((plan) => (
                  <motion.div
                    key={plan.name}
                    variants={fadeUp}
                    data-neural-node="true"
                    style={{
                      background: plan.highlight ? "rgba(26,43,80,0.08)" : "#000000",
                      border: plan.highlight ? "1px solid rgba(26,43,80,0.6)" : "1px solid rgba(26,43,80,0.4)",
                      padding: "2rem",
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
                        color: "#ffffff",
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
                            color: "#FFFFFF",
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
                            fontSize: "13px",
                            color: "#FFFFFF",
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
            </GlassCard>

            <GlassCard>
              <motion.div variants={fadeUp}>
                <Pill label="[ SIGNALS ]" sec="10" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionHeading className="mb-14">What operators are saying.</SectionHeading>
              </motion.div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(1, 1fr)",
                  gap: "1px",
                  background: "rgba(26,43,80,0.3)",
                }}
                className="md:grid-cols-2"
              >
                {testimonials.map((t, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    style={{
                      background: "#000000",
                      border: "1px solid rgba(26,43,80,0.4)",
                      padding: "2rem",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "14px",
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
                        fontSize: "10px",
                        color: "#FFFFFF",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {t.name} — {t.role}, {t.company}
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <div id="contact" style={{ maxWidth: "680px", margin: "0 auto" }}>
                <motion.div variants={fadeUp}>
                  <Pill label="[ CONNECT ]" sec="11" />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <SectionHeading className="mb-4">Ready to meet your ghost employees?</SectionHeading>
                </motion.div>
                <motion.p
                  variants={fadeUp}
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "15px",
                    color: "#FFFFFF",
                    marginBottom: "2.5rem",
                    lineHeight: 1.6,
                  }}
                >
                  Tell us about your business. We'll show you exactly how your ghost employees will work for you.
                </motion.p>

                <motion.form
                  variants={fadeUp}
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
                >
                  {[
                    { key: "name", label: "Full Name", type: "text", placeholder: "Your Name" },
                    { key: "email", label: "Work Email", type: "email", placeholder: "you@company.com" },
                    { key: "company", label: "Company", type: "text", placeholder: "Company name" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label
                        style={{
                          fontFamily: "var(--font-jetbrains)",
                          fontSize: "10px",
                          letterSpacing: "0.12em",
                          color: "#FFFFFF",
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
                        value={(formData as any)[field.key]}
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
                        color: "#FFFFFF",
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
                      <option value="foundation" style={{ background: "#00" }}>Foundation — $499/mo</option>
                      <option value="growth" style={{ background: "#00" }}>Growth — $999/mo</option>
                      <option value="enterprise" style={{ background: "#00" }}>Enterprise — Custom</option>
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        fontSize: "10px",
                        letterSpacing: "0.12em",
                        color: "#FFFFFF",
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
                    disabled={status === "submitting" || status === "success"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: "14px",
                      background: status === "success" ? "#4ade80" : status === "error" ? "#ef4444" : "#ffffff",
                      color: "#000000",
                      border: "none",
                      fontFamily: "var(--font-inter)",
                      fontSize: "14px",
                      fontWeight: 700,
                      cursor: (status === "submitting" || status === "success") ? "default" : "pointer",
                      letterSpacing: "0.03em",
                      marginTop: "0.5rem",
                      opacity: status === "submitting" ? 0.7 : 1,
                      transition: "background 0.3s ease"
                    }}
                  >
                    {status === "submitting" ? "Sending..." : status === "success" ? "Message Sent!" : status === "error" ? "Error! Try Again" : "Send Message"}
                  </motion.button>
                </motion.form>
              </div>
            </GlassCard>

          </div>

        </div>

        {/* ─── DYNAMIC FUNNEL TRIGGER (MOBILE ONLY) ────────────────── */}
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm"
        >
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="w-full flex items-center justify-between px-6 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-white/20 active:scale-95 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="font-inter font-semibold text-white text-sm">System Diagnostic</span>
            </div>
            <span className="font-jetbrains text-blue-400 text-xs tracking-widest uppercase">Start</span>
          </button>
        </motion.div>

      </motion.div>
    </>
  );
}
