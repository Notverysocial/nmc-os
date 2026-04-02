"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Calendar, Play, Cpu, TrendingUp, Database, Users, FileText,
  BarChart3, Bot, Clock, Receipt, CheckCircle2, Sparkles, ChevronRight,
  Globe, Shield, Zap, Star, Quote, Check, ChevronDown, ChevronUp,
  Target, Lightbulb, Heart, Award, Mail, Phone, MapPin, Send,
  DollarSign, Share2, X,
} from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import GlassCard from "./GlassCard";
import ParticleField from "./ParticleField";
import {
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
  slideLeftVariants,
  slideRightVariants,
  scaleUpVariants,
  cardHoverVariants,
} from "@/lib/animations";

// ─── DATA ───────────────────────────────────────────────────────────────────

const stats = [
  { value: 340, suffix: "%", label: "Average ROI Year 1" },
  { value: 47, suffix: "+", label: "Hours Saved / Week" },
  { value: 200, suffix: "+", label: "Clients Automated" },
  { value: 99, suffix: "%", label: "Client Retention" },
];

const trustedLogos = [
  "Apex Talent Group", "Meridian Properties", "Brightline Commerce",
  "Peak Advisory", "Vantage Media", "Clearpath Finance", "Summit Operations",
  "Apex Talent Group", "Meridian Properties", "Brightline Commerce",
  "Peak Advisory", "Vantage Media", "Clearpath Finance", "Summit Operations",
];

const pillars = [
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Automate Operations",
    description: "Replace manual processes with intelligent workflows that run 24/7. From lead routing to invoice generation, your OS handles the repetitive so your team can focus on what matters.",
    badge: "Core Feature",
    accent: "blue",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Scale Your Brand",
    description: "A content engine that publishes consistently across every channel. AI-assisted writing, scheduling, and distribution — so your brand never goes quiet.",
    badge: "Growth Engine",
    accent: "gold",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Own Your Data",
    description: "Every customer interaction, every dollar, every touchpoint — unified in a dashboard that's yours. No black boxes, no vendor lock-in.",
    badge: "Data First",
    accent: "blue",
  },
];

const howItWorks = [
  { step: "01", title: "Discover", description: "We map your entire business — every workflow, every bottleneck, every manual process. Our strategists build a complete picture before building anything.", icon: <Globe className="w-5 h-5" /> },
  { step: "02", title: "Build", description: "Your OS is built from scratch to match how your business actually works. Custom integrations, branded dashboards, AI trained on your data. Nothing off-the-shelf.", icon: <Zap className="w-5 h-5" /> },
  { step: "03", title: "Launch", description: "Hands-on onboarding, team training, and a dedicated growth partner for 90 days. We stay until you're fully operational and thriving.", icon: <Shield className="w-5 h-5" /> },
];

const bentoFeatures = [
  { icon: <Users className="w-5 h-5" />, title: "CRM & Pipeline", description: "Full client relationship management with deal tracking, follow-up automation, and relationship scoring.", wide: true },
  { icon: <FileText className="w-5 h-5" />, title: "Content Engine", description: "Plan, draft, schedule, and distribute content across all channels from one command center.", wide: false },
  { icon: <BarChart3 className="w-5 h-5" />, title: "Analytics Dashboard", description: "Real-time performance metrics across revenue, marketing, and operations.", wide: false },
  { icon: <Bot className="w-5 h-5" />, title: "AI Agents", description: "Custom AI assistants trained on your SOPs, brand voice, and customer data.", wide: false },
  { icon: <Clock className="w-5 h-5" />, title: "Smart Scheduling", description: "Automated appointment booking, reminders, and capacity management.", wide: false },
  { icon: <Receipt className="w-5 h-5" />, title: "Invoicing & Billing", description: "Automated invoicing, payment tracking, and financial reporting integrated with your accounting stack.", wide: true },
];

const caseStudies = [
  {
    industry: "Staffing & Recruiting",
    company: "Apex Talent Group",
    challenge: "Managing 300+ active placements with spreadsheets. Coordinators losing 4+ hours/day on manual updates.",
    result: "40% more placements, $180K revenue recovered, 15 hours saved per week.",
    quote: "We went from drowning to thriving. The OS handles what used to take two full-time coordinators.",
    author: "Marcus Thompson, CEO",
    metrics: [{ v: "40%", l: "More Placements" }, { v: "15 hrs", l: "Saved/Week" }, { v: "$180K", l: "Recovered" }],
    color: "#8B5CF6",
  },
  {
    industry: "Real Estate",
    company: "Meridian Properties",
    challenge: "Inconsistent content output and no social presence. Lost deals because prospects found no credible online footprint.",
    result: "3x content output, 285% LinkedIn growth, 2 deals directly attributed to content.",
    quote: "Our content now looks like we have a 5-person marketing agency. We have one person and the OS.",
    author: "Priya Sharma, Founder",
    metrics: [{ v: "3x", l: "Content Output" }, { v: "285%", l: "LinkedIn Growth" }, { v: "2 deals", l: "Attributed" }],
    color: "#8B5CF6",
  },
  {
    industry: "E-commerce",
    company: "Brightline Commerce",
    challenge: "Rapid growth creating operational chaos. No unified analytics, CS overwhelmed, decisions made on gut feel.",
    result: "$200K revenue recovered Q1, 80% of CS tickets automated, 22 hours saved per week.",
    quote: "The analytics dashboard showed us we were leaving $200K on the table every quarter. Fixed in 60 days.",
    author: "James Calloway, COO",
    metrics: [{ v: "$200K", l: "Revenue Recovered" }, { v: "80%", l: "CS Automated" }, { v: "22 hrs", l: "Saved/Week" }],
    color: "#8B5CF6",
  },
];

const plans = [
  {
    tier: "Foundation",
    price: "$499",
    period: "/mo",
    description: "The essentials for solo operators and small teams ready to get organized and capture more leads.",
    features: [
      "Branded workspace",
      "Operations dashboard with KPIs",
      "Lead capture forms + basic CRM pipeline",
      "Booking / scheduling system",
      "Weekly intelligence brief",
      "Basic project management (task boards)",
      "Email support",
      "Monthly optimization call",
    ],
    cta: "Get Started",
    tierKey: "Foundation",
  },
  {
    tier: "Growth",
    price: "$999",
    period: "/mo",
    description: "For scaling companies that need a full OS with active AI agents, automation, and client tools.",
    features: [
      "Everything in Foundation",
      "Daily intelligence briefs (personalized)",
      "3 active AI agents (Lead Scout, Content Writer, Outreach Agent)",
      "Automated lead nurture sequences",
      "Invoicing and billing tools",
      "Analytics dashboard",
      "Client portal",
      "Integration hub",
      "Bi-weekly strategy calls",
    ],
    cta: "Get Started",
    popular: true,
    tierKey: "Growth",
  },
  {
    tier: "Enterprise",
    price: "Custom",
    subPrice: "$2,500+/mo",
    description: "For multi-location businesses that need a fully bespoke, white-labeled operations platform.",
    features: [
      "Everything in Growth",
      "Unlimited custom agents",
      "Full workflow automation builder",
      "White-labeled platform",
      "Dedicated account manager",
      "Custom integrations",
      "Weekly strategy sessions",
      "Priority feature development",
      "Multi-user team access with roles",
    ],
    cta: "Book a Strategy Call",
    enterprise: true,
    tierKey: "Enterprise",
  },
];

const testimonials = [
  { quote: "NMC Business OS completely transformed how we run our staffing agency. We went from drowning in spreadsheets to having everything automated. Our placements are up 40% and I actually have time to think strategically again.", author: "Marcus Thompson", role: "CEO, Apex Talent Group", metric: "40% more placements" },
  { quote: "The content engine alone is worth 10x what we pay. We're publishing three times as much content, our social engagement is through the roof, and the AI assistants handle 80% of our client communication drafts.", author: "Priya Sharma", role: "Founder, Meridian Properties", metric: "3x content output" },
  { quote: "I was skeptical — I've tried a dozen different tools. But NMC actually built us a system that works the way our business works, not the other way around. The analytics showed us $200K we were leaving on the table every quarter.", author: "James Calloway", role: "COO, Brightline Commerce", metric: "$200K recovered" },
  { quote: "Our client portal is now something we showcase to prospects as a differentiator. The invoicing and project flows saved our team at least 15 hours a week. ROI was obvious within 60 days.", author: "Sofia Reyes", role: "Managing Director, Peak Advisory", metric: "15 hrs/week saved" },
];

const values = [
  { icon: <Target className="w-5 h-5" />, title: "Precision Over Volume", description: "We build precise systems that do exactly what your business needs." },
  { icon: <Users className="w-5 h-5" />, title: "Client-First Always", description: "Every decision is built to serve your team and your clients — not us." },
  { icon: <Lightbulb className="w-5 h-5" />, title: "Journalism Standards", description: "Newsroom-grade rigor in everything we write and build." },
  { icon: <Heart className="w-5 h-5" />, title: "Long-Term Partnership", description: "We measure success by your growth, not our contract length." },
];

const faqs = [
  { q: "Is there a setup fee?", a: "No setup fees on any plan. Your monthly subscription covers platform access, onboarding, and ongoing support." },
  { q: "Can I cancel anytime?", a: "Yes. All plans are month-to-month. No lock-in contracts — though we offer discounts for annual commitments." },
  { q: "What does 'custom-built' mean?", a: "We don't hand you a generic SaaS login. Your OS is configured, branded, and automated to match your specific business by our team before you ever log in." },
  { q: "How long does setup take?", a: "Most clients are fully operational in 14–30 days. Enterprise clients with complex workflows take 30–60 days." },
  { q: "What integrations are included?", a: "Growth and Enterprise plans include Gmail, Stripe, QuickBooks, HubSpot, Slack, Zapier, and 15+ more. Custom integrations available for Enterprise." },
];

// ─── TESTIMONIAL CAROUSEL ────────────────────────────────────────────────────

function TestimonialSection() {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  return (
    <section id="testimonials" className="section-padding bg-[#0F0F10]/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.span variants={staggerItemVariants} className="section-pill">What People Are Saying</motion.span>
          <motion.h2 variants={staggerItemVariants} className="display-lg text-white mt-2">Loved by operators.</motion.h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-8 -left-4 opacity-10">
            <Quote className="w-20 h-20 text-[#8B5CF6] fill-[#8B5CF6]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-3xl p-10 md:p-14"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-[#8B5CF6] fill-[#8B5CF6]" />)}
              </div>
              <blockquote className="text-white text-xl md:text-2xl leading-relaxed font-light mb-8" style={{ fontFamily: "var(--font-syne)" }}>
                "{t.quote}"
              </blockquote>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center text-white font-bold text-lg">
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{t.author}</p>
                    <p className="text-[#71717A] text-sm">{t.role}</p>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
                  <p className="text-[#A78BFA] text-sm font-semibold">{t.metric}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${i === current ? "w-8 h-2 bg-[#8B5CF6]" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/5 cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between py-5">
        <p className="text-white font-medium pr-8">{q}</p>
        {open ? <ChevronUp className="w-5 h-5 text-[#8B5CF6] shrink-0" /> : <ChevronDown className="w-5 h-5 text-[#71717A] shrink-0" />}
      </div>
      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} transition={{ duration: 0.3 }}>
          <p className="text-[#71717A] pb-5 leading-relaxed">{a}</p>
        </motion.div>
      )}
    </div>
  );
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────

function ContactForm({ defaultTier }: { defaultTier?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    tier_interest: defaultTier || "",
    message: "",
  });

  // Update tier when parent changes it (e.g. clicking Enterprise CTA)
  useState(() => {
    if (defaultTier) setFormData((p) => ({ ...p, tier_interest: defaultTier }));
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tier_interest) { setError("Please select a plan tier."); return; }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const set = (k: string, v: string) => setFormData((p) => ({ ...p, [k]: v }));
  const inputCls = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#71717A] text-sm focus:outline-none focus:border-[#8B5CF6]/50 transition-colors";

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-[#8B5CF6]" />
        </div>
        <h3 className="text-white font-bold text-2xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>Message Received</h3>
        <p className="text-[#71717A]">Our team will be in touch within one business day.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
      <h2 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "var(--font-syne)" }}>Tell us about your business</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[#71717A] text-xs font-medium uppercase tracking-wide block mb-2">Full Name *</label>
          <input type="text" required value={formData.name} onChange={(e) => set("name", e.target.value)} className={inputCls} placeholder="Your name" />
        </div>
        <div>
          <label className="text-[#71717A] text-xs font-medium uppercase tracking-wide block mb-2">Email *</label>
          <input type="email" required value={formData.email} onChange={(e) => set("email", e.target.value)} className={inputCls} placeholder="you@company.com" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[#71717A] text-xs font-medium uppercase tracking-wide block mb-2">Phone</label>
          <input type="tel" value={formData.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} placeholder="+1 (555) 000-0000" />
        </div>
        <div>
          <label className="text-[#71717A] text-xs font-medium uppercase tracking-wide block mb-2">Company</label>
          <input type="text" value={formData.company} onChange={(e) => set("company", e.target.value)} className={inputCls} placeholder="Acme Corp" />
        </div>
      </div>
      <div>
        <label className="text-[#71717A] text-xs font-medium uppercase tracking-wide block mb-2">Interested In *</label>
        <select
          required
          value={formData.tier_interest}
          onChange={(e) => set("tier_interest", e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#8B5CF6]/50 transition-colors appearance-none cursor-pointer"
          style={{ color: formData.tier_interest ? "#fff" : "#71717A" }}
        >
          <option value="" disabled style={{ background: "#0F0F10", color: "#71717A" }}>Select a plan tier...</option>
          <option value="Foundation" style={{ background: "#0F0F10", color: "#fff" }}>Foundation — $499/mo</option>
          <option value="Growth" style={{ background: "#0F0F10", color: "#fff" }}>Growth — $999/mo</option>
          <option value="Enterprise" style={{ background: "#0F0F10", color: "#fff" }}>Enterprise — Custom ($2,500+/mo)</option>
        </select>
      </div>
      <div>
        <label className="text-[#71717A] text-xs font-medium uppercase tracking-wide block mb-2">What&apos;s your biggest challenge?</label>
        <textarea rows={4} value={formData.message} onChange={(e) => set("message", e.target.value)} className={`${inputCls} resize-none`} placeholder="Tell us what's slowing you down..." />
      </div>
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
      <motion.button
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#8B5CF6] text-white font-semibold rounded-xl hover:bg-[#7C3AED] transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        {submitting ? "Sending..." : "Send Message"}
      </motion.button>
      <p className="text-[#71717A] text-xs text-center">We respond within one business day.</p>
    </form>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function SPAPage() {
  const [selectedTier, setSelectedTier] = useState("");

  const handlePricingCTA = (tierKey: string) => {
    setSelectedTier(tierKey);
    setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <div className="bg-[#0A0A0B]">

      {/* ══════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0A0A0B]" />
        <ParticleField density={50} opacity={0.18} color="139, 92, 246" />
        <div className="hero-glow" />
        <div className="absolute inset-0 grid-pattern opacity-20" />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-[8%] w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/12 blur-[120px] pointer-events-none orb-1" />
        <div className="absolute bottom-1/4 right-[8%] w-[400px] h-[400px] rounded-full bg-[#8B5CF6]/6 blur-[100px] pointer-events-none orb-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#8B5CF6]/4 blur-[150px] pointer-events-none orb-3" />

        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0A0A0B] to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
          <motion.div variants={staggerContainerVariants} initial="hidden" animate="visible" className="max-w-4xl">
            {/* Urgency badge */}
            <motion.div variants={staggerItemVariants} className="mb-8 flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2 badge badge-blue">
                <Sparkles className="w-3 h-3" />
                AI-Powered Business Operations
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/25 text-[#8B5CF6] text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
                3 spots left this month
              </div>
            </motion.div>

            <motion.h1 variants={staggerItemVariants} className="display-xl text-white mb-6">
              Your Business.{" "}
              <span className="relative inline-block">
                <span className="gradient-text-blue">Supercharged.</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#8B5CF6] to-transparent origin-left"
                />
              </span>
            </motion.h1>

            <motion.p variants={staggerItemVariants} className="text-[#A1A1AA] text-xl leading-relaxed max-w-2xl mb-10">
              Custom AI agents that run your operations while you focus on growth.
            </motion.p>

            <motion.div variants={staggerItemVariants} className="flex flex-col sm:flex-row items-start gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2.5 px-7 py-4 bg-[#8B5CF6] text-white font-semibold rounded-xl hover:bg-[#7C3AED] transition-all hover:shadow-[0_0_40px_rgba(139,92,246,0.35)] text-base w-full sm:w-auto justify-center"
              >
                <Calendar className="w-5 h-5" />
                Book a Strategy Call
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2.5 px-7 py-4 border border-white/15 text-white font-semibold rounded-xl hover:border-white/30 hover:bg-white/5 transition-all text-base w-full sm:w-auto justify-center"
              >
                See How It Works
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>

            <motion.div variants={staggerItemVariants} className="flex items-center gap-6 mt-10 text-sm text-[#71717A] flex-wrap">
              {["Free 30-min strategy call", "Custom-built in 30 days", "ROI guaranteed in 60 days"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8B5CF6]" />
                  {item}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Floating dashboard card */}
          <motion.div
            initial={{ opacity: 0, x: 60, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block"
          >
            <div className="glass-strong rounded-2xl p-6 w-56">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-[#71717A] font-medium">Live Dashboard</span>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Leads Today", value: "14", trend: "+3" },
                  { label: "Revenue MTD", value: "$48.2K", trend: "+12%" },
                  { label: "Tasks Auto'd", value: "231", trend: "today" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-end justify-between">
                      <span className="text-[#71717A] text-xs">{item.label}</span>
                      <span className="text-green-400 text-xs font-medium">{item.trend}</span>
                    </div>
                    <p className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>{item.value}</p>
                    <div className="mt-1 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "75%" }} transition={{ delay: 1.2, duration: 1 }} className="h-full bg-[#8B5CF6] rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0A0A0B] to-transparent pointer-events-none" />
      </section>

      {/* ══════════════════════════════════════════════════
          LIVE AGENT ACTIVITY TICKER
      ══════════════════════════════════════════════════ */}
      <section className="py-4 border-y border-white/5 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
        <div className="flex items-center gap-3 px-6 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
          <span className="text-[#71717A] text-xs font-mono tracking-widest uppercase">Live Agent Activity</span>
        </div>
        <div className="flex gap-8 animate-[marquee_40s_linear_infinite]">
          {[
            "→ Lead Scout identified 3 warm prospects for Apex Talent",
            "→ Content Writer published LinkedIn post for Meridian Properties",
            "→ Invoice #4821 auto-generated for Brightline Commerce",
            "→ CRM updated: deal moved to Proposal stage",
            "→ Outreach sequence triggered for 12 contacts",
            "→ Analytics brief delivered to Peak Advisory",
            "→ Scheduling bot confirmed 4 meetings for this week",
            "→ Lead Scout identified 3 warm prospects for Apex Talent",
            "→ Content Writer published LinkedIn post for Meridian Properties",
            "→ Invoice #4821 auto-generated for Brightline Commerce",
            "→ CRM updated: deal moved to Proposal stage",
            "→ Outreach sequence triggered for 12 contacts",
          ].map((item, i) => (
            <span key={i} className="shrink-0 font-mono text-xs text-[#71717A] hover:text-[#A78BFA] transition-colors whitespace-nowrap px-4">{item}</span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. PROBLEM SECTION
      ══════════════════════════════════════════════════ */}
      <section className="section-cream section-padding">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl"
          >
            <motion.span variants={staggerItemVariants} className="section-pill">The Problem</motion.span>
            <motion.h2 variants={staggerItemVariants} className="display-lg text-[#111] mb-12">
              You&apos;re Running Your Business<br />on Duct Tape.
            </motion.h2>
            <div className="space-y-6">
              {[
                "Five tabs open. A CRM you hate.",
                "A spreadsheet tracking leads that's three weeks out of date.",
                "You're the bottleneck on every decision.",
                "Your team asks you the same questions every day.",
                "You spend more time managing tools than managing growth.",
              ].map((pain, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="text-lg text-[#71717A]"
                >
                  {pain}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(26,43,80,0.3)] to-transparent" />
      {/* ══════════════════════════════════════════════════
          4. AGITATION SECTION
      ══════════════════════════════════════════════════ */}
      <section className="section-cream section-padding border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span variants={staggerItemVariants} className="section-pill">The Cost of Waiting</motion.span>
            <motion.h2 variants={staggerItemVariants} className="display-lg text-[#111] mt-2">
              Every Day You Wait,<br />Your Competitors Get Smarter.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-px bg-black/10 rounded-2xl overflow-hidden"
          >
            {/* Without */}
            <div className="bg-[#F2EFE9] p-10 md:p-14">
              <p className="text-xs font-mono tracking-[0.15em] uppercase text-[#9CA3AF] mb-8">Without the OS</p>
              <ul className="space-y-5">
                {[
                  "Manual follow-ups that slip through cracks",
                  "Leads going cold while you're busy",
                  "No visibility into what's working",
                  "Decisions based on gut, not data",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1.5 w-4 h-4 rounded-full border border-[#D1C5B8] shrink-0 flex items-center justify-center">
                      <X className="w-2.5 h-2.5 text-[#C4A882]" />
                    </span>
                    <span className="text-[#71717A] text-base">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* With */}
            <div className="bg-[#FAF8F5] p-10 md:p-14">
              <p className="text-xs font-mono tracking-[0.15em] uppercase text-[#8B5CF6] mb-8">With the OS</p>
              <ul className="space-y-5">
                {[
                  "Agents follow up instantly, 24/7",
                  "Every lead scored, nurtured, tracked",
                  "Real-time dashboard with actionable intelligence",
                  "AI briefs every morning with data-driven recommendations",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1.5 w-4 h-4 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 shrink-0 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-[#8B5CF6]" />
                    </span>
                    <span className="text-[#374151] text-base font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(26,43,80,0.3)] to-transparent" />
      {/* ══════════════════════════════════════════════════
          5. SOLUTION INTRO
      ══════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#0A0A0B] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#8B5CF6]/8 blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span variants={staggerItemVariants} className="section-pill">The Solution</motion.span>
            <motion.h2 variants={staggerItemVariants} className="display-lg text-white mt-2 mb-6 max-w-4xl mx-auto">
              One System. Built for Your Business.<br />Powered by Agents That Work.
            </motion.h2>
            <motion.p variants={staggerItemVariants} className="text-[#71717A] text-xl leading-relaxed max-w-2xl mx-auto">
              Not another tool to learn. A custom-configured digital operations team that runs your business from day one.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. THREE PILLARS
      ══════════════════════════════════════════════════ */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <motion.span variants={staggerItemVariants} className="section-pill">The Platform</motion.span>
            <motion.h2 variants={staggerItemVariants} className="display-lg text-white mt-2 mb-4">Everything Your Business Needs</motion.h2>
            <motion.p variants={staggerItemVariants} className="text-[#71717A] text-lg max-w-2xl mx-auto">Three core pillars that transform how you operate, grow, and compete — all in one custom-built platform.</motion.p>
          </motion.div>

          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar) => {
              const isGold = pillar.accent === "gold";
              const c = isGold ? "#8B5CF6" : "#8B5CF6";
              const bg = isGold ? "rgba(212,168,83,0.1)" : "rgba(139,92,246,0.1)";
              const border = isGold ? "rgba(212,168,83,0.2)" : "rgba(139,92,246,0.2)";
              return (
                <motion.div key={pillar.title} variants={staggerItemVariants}>
                  <motion.div variants={cardHoverVariants} initial="rest" whileHover="hover" className="glass rounded-2xl p-6 group transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(139,92,246,0.15)] h-full">
                    <div className="mb-4">
                      <span className="badge text-xs font-semibold" style={{ background: bg, border: `1px solid ${border}`, color: c }}>{pillar.badge}</span>
                    </div>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ background: bg, border: `1px solid ${border}` }}>
                      <div style={{ color: c }}>{pillar.icon}</div>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2.5" style={{ fontFamily: "var(--font-syne)" }}>{pillar.title}</h3>
                    <p className="text-[#71717A] text-sm leading-relaxed">{pillar.description}</p>
                    <div className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full" style={{ background: `linear-gradient(90deg, ${c}, transparent)` }} />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHAT MAKES US DIFFERENT
      ══════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#0F0F10]/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="mb-16">
            <motion.span variants={staggerItemVariants} className="section-pill">Why Us</motion.span>
            <motion.h2 variants={staggerItemVariants} className="display-lg text-white max-w-2xl mt-2">What Makes Us<br /><span className="gradient-text-violet">Different</span></motion.h2>
          </motion.div>

          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-px">
            {[
              { n: "01", title: "We don't sell software. We install a workforce.", desc: "Most platforms give you a login. We give you a running system — agents configured, automations live, and a team that cares whether it works." },
              { n: "02", title: "Bespoke, not boxed.", desc: "Your OS is built around how your business actually operates. Not a template. Not a preset. Your workflows, your data, your brand." },
              { n: "03", title: "It gets better every month.", desc: "Continuous optimization isn't an upsell — it's built into every plan. Your system evolves with your business." },
              { n: "04", title: "One place to make money.", desc: "CRM, content, invoicing, analytics — all connected. No more duct-taping six tools together and losing data between them." },
              { n: "05", title: "Your data stays yours.", desc: "No vendor lock-in. No black boxes. You own every record, every workflow, every integration. Always." },
            ].map((item) => (
              <motion.div
                key={item.n}
                variants={staggerItemVariants}
                className="group flex items-start gap-6 md:gap-10 py-8 border-b border-white/5 hover:border-[#8B5CF6]/20 transition-colors duration-300 cursor-default"
              >
                <span className="text-5xl md:text-6xl font-bold text-white/5 group-hover:text-[#8B5CF6]/15 transition-colors duration-300 leading-none shrink-0 select-none" style={{ fontFamily: "var(--font-syne)" }}>{item.n}</span>
                <div className="pt-2 flex-1">
                  <h3 className="text-white font-bold text-lg md:text-xl mb-2 group-hover:text-[#A78BFA] transition-colors duration-300" style={{ fontFamily: "var(--font-syne)" }}>{item.title}</h3>
                  <p className="text-[#71717A] text-sm leading-relaxed max-w-xl">{item.desc}</p>
                </div>
                <div className="shrink-0 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ChevronRight className="w-5 h-5 text-[#8B5CF6]" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════ */}
      <section id="how-it-works" className="section-padding bg-[#0F0F10]/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <motion.span variants={staggerItemVariants} className="section-pill">How It Works</motion.span>
            <motion.h2 variants={staggerItemVariants} className="display-lg text-white mt-2 mb-4">From Chaos to Clarity in 90 Days</motion.h2>
            <motion.p variants={staggerItemVariants} className="text-[#71717A] text-lg max-w-xl mx-auto">Our proven implementation process gets you fully operational, fast.</motion.p>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-px">
              <div className="h-full bg-gradient-to-r from-[#8B5CF6]/30 via-[#8B5CF6]/60 to-[#8B5CF6]/30" />
              <div className="absolute left-1/3 -top-1 w-2 h-2 rounded-full bg-[#8B5CF6]" />
              <div className="absolute right-1/3 -top-1 w-2 h-2 rounded-full bg-[#8B5CF6]" />
            </div>

            <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
              {howItWorks.map((step) => (
                <motion.div key={step.step} variants={staggerItemVariants}>
                  <GlassCard className="p-8 h-full" glowColor="blue">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center shrink-0">
                        <div className="text-[#8B5CF6]">{step.icon}</div>
                      </div>
                      <span className="text-5xl font-bold text-[#18181B] leading-none" style={{ fontFamily: "var(--font-syne)" }}>{step.step}</span>
                    </div>
                    <h3 className="text-white font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>{step.title}</h3>
                    <p className="text-[#71717A] leading-relaxed text-sm">{step.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. FEATURES BENTO GRID
      ══════════════════════════════════════════════════ */}
      <section id="features" className="section-padding">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <motion.span variants={staggerItemVariants} className="section-pill">Features</motion.span>
            <motion.h2 variants={staggerItemVariants} className="display-lg text-white mt-2 mb-4">Everything you need to run an autonomous business.</motion.h2>
            <motion.p variants={staggerItemVariants} className="text-[#71717A] text-lg max-w-2xl mx-auto">Every tool built, connected, and customized for you — from day one.</motion.p>
          </motion.div>

          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bentoFeatures.map((feature) => (
              <motion.div key={feature.title} variants={staggerItemVariants} className={feature.wide ? "md:col-span-2" : ""}>
                <GlassCard className="p-7 h-full group relative overflow-hidden min-h-[180px]" glowColor="blue">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center mb-4 text-[#8B5CF6] group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: "var(--font-syne)" }}>{feature.title}</h3>
                  <p className="text-[#71717A] text-sm leading-relaxed">{feature.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-[#8B5CF6] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more <ChevronRight className="w-3 h-3" />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(26,43,80,0.3)] to-transparent" />
      {/* ══════════════════════════════════════════════════
          6. CASE STUDIES
      ══════════════════════════════════════════════════ */}
      <section id="case-studies" className="section-padding bg-[#0F0F10]/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <motion.span variants={staggerItemVariants} className="section-pill">Industries</motion.span>
            <motion.h2 variants={staggerItemVariants} className="display-lg text-white mt-2 mb-4">Real Businesses. <span className="gradient-text-blue">Real Results.</span></motion.h2>
          </motion.div>

          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((cs) => (
              <motion.div key={cs.company} variants={staggerItemVariants}>
                <motion.div variants={cardHoverVariants} initial="rest" whileHover="hover" className="glass rounded-2xl overflow-hidden h-full flex flex-col" style={{ boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.06)` }}>
                  <div className="h-1" style={{ background: `linear-gradient(90deg, ${cs.color}80, transparent)` }} />
                  <div className="p-7 flex flex-col flex-1">
                    <span className="badge mb-4 text-xs" style={{ background: `${cs.color}18`, border: `1px solid ${cs.color}30`, color: cs.color }}>{cs.industry}</span>
                    <h3 className="text-white font-bold text-lg mb-3" style={{ fontFamily: "var(--font-syne)" }}>{cs.company}</h3>
                    <p className="text-[#71717A] text-sm mb-3 leading-relaxed"><span className="text-white/60 text-xs font-semibold uppercase tracking-wide">Challenge: </span>{cs.challenge}</p>
                    <div className="grid grid-cols-3 gap-2 my-4">
                      {cs.metrics.map(({ v, l }) => (
                        <div key={l} className="rounded-lg p-2.5 text-center" style={{ background: `${cs.color}10`, border: `1px solid ${cs.color}20` }}>
                          <p className="font-bold text-sm text-white" style={{ fontFamily: "var(--font-syne)" }}>{v}</p>
                          <p className="text-[10px] text-[#71717A]">{l}</p>
                        </div>
                      ))}
                    </div>
                    <blockquote className="mt-auto pl-3 border-l-2 italic" style={{ borderColor: cs.color }}>
                      <p className="text-[#A1A1AA] text-xs">&ldquo;{cs.quote}&rdquo;</p>
                      <p className="text-[#71717A] text-[11px] mt-1">— {cs.author}</p>
                    </blockquote>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          YOUR FIRST 30 DAYS
      ══════════════════════════════════════════════════ */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <motion.span variants={staggerItemVariants} className="section-pill">Onboarding</motion.span>
            <motion.h2 variants={staggerItemVariants} className="display-lg text-white mt-2 mb-4">Your First 30 Days</motion.h2>
            <motion.p variants={staggerItemVariants} className="text-[#71717A] text-lg max-w-xl mx-auto">From signed contract to fully operational — in four focused weeks.</motion.p>
          </motion.div>

          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-4 gap-4 relative">
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent" />
            {[
              { week: "Week 1", label: "Discovery", desc: "Deep-dive into your workflows, bottlenecks, and goals. We map every system before touching a single line of config.", icon: <Globe className="w-5 h-5" /> },
              { week: "Week 2", label: "Configuration", desc: "Your OS is built: CRM configured, automations live, AI agents trained on your brand and data.", icon: <Cpu className="w-5 h-5" /> },
              { week: "Week 3", label: "Go Live", desc: "Full team onboarding. Live data migrated. Your system switches on and starts working for you immediately.", icon: <Zap className="w-5 h-5" /> },
              { week: "Week 4", label: "Optimization", desc: "We review every output, tune every workflow, and set your 90-day growth roadmap.", icon: <TrendingUp className="w-5 h-5" /> },
            ].map((phase) => (
              <motion.div key={phase.week} variants={staggerItemVariants} className="relative">
                <div className="glass rounded-2xl p-6 h-full hover:border-[#8B5CF6]/25 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] group-hover:bg-[#8B5CF6]/15 transition-colors">
                      {phase.icon}
                    </div>
                    <div>
                      <p className="text-[#71717A] text-xs font-mono">{phase.week}</p>
                      <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-syne)" }}>{phase.label}</p>
                    </div>
                  </div>
                  <p className="text-[#71717A] text-sm leading-relaxed">{phase.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(26,43,80,0.3)] to-transparent" />
      {/* ══════════════════════════════════════════════════
          7. PRICING
      ══════════════════════════════════════════════════ */}
      <section id="pricing" className="section-padding">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <motion.span variants={staggerItemVariants} className="section-pill">Pricing</motion.span>
            <motion.h2 variants={staggerItemVariants} className="display-lg text-white mt-2 mb-4">Simple, Transparent Pricing</motion.h2>
            <motion.p variants={staggerItemVariants} className="text-[#71717A] text-lg max-w-xl mx-auto">One flat monthly fee. No hidden costs, no per-seat traps.</motion.p>
          </motion.div>

          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
              <motion.div key={plan.tier} variants={staggerItemVariants}>
                <motion.div
                  variants={cardHoverVariants} initial="rest" whileHover="hover"
                  className={`relative rounded-2xl p-8 transition-all duration-300 flex flex-col h-full ${plan.popular ? "bg-gradient-to-b from-[#18181B] to-[#0F0F10] border border-[#8B5CF6]/30 shadow-[0_0_60px_rgba(139,92,246,0.15)]" : "glass"}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#8B5CF6] text-white text-xs font-bold rounded-full tracking-wide uppercase">
                        <Zap className="w-3 h-3 fill-white" />
                        Most Popular
                      </div>
                    </div>
                  )}
                  <div className="mb-8">
                    <h3 className="text-white font-bold text-xl mb-4" style={{ fontFamily: "var(--font-syne)" }}>{plan.tier}</h3>
                    <div className="flex items-end gap-1 mb-1">
                      <span className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>{plan.price}</span>
                      {plan.period && <span className="text-[#71717A] mb-1.5">{plan.period}</span>}
                    </div>
                    {"subPrice" in plan && plan.subPrice && (
                      <p className="text-[#71717A] text-xs mb-3">{plan.subPrice}</p>
                    )}
                    <p className="text-[#71717A] text-sm">{plan.description}</p>
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.popular ? "bg-[#8B5CF6]/20 border border-[#8B5CF6]/30" : "bg-white/5 border border-white/10"}`}>
                          <Check className={`w-3 h-3 ${plan.popular ? "text-[#8B5CF6]" : "text-[#71717A]"}`} />
                        </div>
                        <span className="text-[#A1A1AA] text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => handlePricingCTA(plan.tierKey)}
                    className={`block w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${plan.popular ? "bg-[#8B5CF6] text-white hover:bg-[#7C3AED] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]" : "glass border border-white/10 text-white hover:border-white/20"}`}
                  >
                    {plan.cta}
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto mt-20">
            <h3 className="text-white font-bold text-2xl mb-8 text-center" style={{ fontFamily: "var(--font-syne)" }}>Frequently Asked Questions</h3>
            <div className="glass rounded-2xl p-8">
              {faqs.map((faq) => <FAQItem key={faq.q} {...faq} />)}
            </div>
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(26,43,80,0.3)] to-transparent" />
      {/* ══════════════════════════════════════════════════
          8. TESTIMONIALS
      ══════════════════════════════════════════════════ */}
      <TestimonialSection />

      {/* ══════════════════════════════════════════════════
          9. ABOUT / TEAM
      ══════════════════════════════════════════════════ */}
      <section id="about" className="section-padding">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div variants={slideLeftVariants}>
              <span className="section-pill mb-6">About</span>
              <h2 className="display-md text-white mb-6">Built by Operators, for Operators</h2>
              <p className="text-[#71717A] leading-relaxed mb-5 text-lg">
                New Mindset Content started as a brand journalism agency. We kept hitting the same wall: our clients had great stories to tell but chaotic operations underneath. So we built the fix.
              </p>
              <p className="text-[#71717A] leading-relaxed mb-5">
                The difference between a good business and a great one isn't the idea — it's the infrastructure. The systems that run quietly in the background, making sure nothing slips and every opportunity is captured.
              </p>
              <p className="text-[#8B5CF6] font-medium">That's the new mindset. And it changes everything.</p>
            </motion.div>

            <motion.div variants={slideRightVariants} className="grid grid-cols-2 gap-4">
              {values.map((value) => (
                <GlassCard key={value.title} className="p-5" glowColor="blue">
                  <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center mb-3 text-[#8B5CF6]">{value.icon}</div>
                  <h3 className="text-white font-bold text-sm mb-2" style={{ fontFamily: "var(--font-syne)" }}>{value.title}</h3>
                  <p className="text-[#71717A] text-xs leading-relaxed">{value.description}</p>
                </GlassCard>
              ))}
            </motion.div>
          </motion.div>

          {/* NBC Partnership */}
          <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center mx-auto mb-4">
              <Award className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <h3 className="text-white font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>Powered by NBC Studio</h3>
            <p className="text-[#71717A] text-sm leading-relaxed">
              NMC Business OS is built in partnership with NBC Studio, a product development house specializing in AI-powered operational platforms. Together, we bring enterprise-grade technology to growth-stage businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          10. CONTACT / CTA
      ══════════════════════════════════════════════════ */}
      <section id="contact" className="section-padding bg-[#0F0F10]/40 relative overflow-hidden">
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#8B5CF6]/5 blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <motion.span variants={staggerItemVariants} className="section-pill">Get Started</motion.span>
            <motion.h2 variants={staggerItemVariants} className="display-lg text-white mt-2 mb-4">Ready to Transform <span className="gradient-text-gold">Your Business?</span></motion.h2>
            <motion.p variants={staggerItemVariants} className="text-[#71717A] text-lg max-w-xl mx-auto">Tell us about your business and we'll show you exactly what your custom OS would look like.</motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div variants={slideLeftVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <ContactForm defaultTier={selectedTier} />
            </motion.div>

            <motion.div variants={slideRightVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-5">
              <div className="glass rounded-2xl p-7 border border-[#8B5CF6]/15">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold" style={{ fontFamily: "var(--font-syne)" }}>Book a Strategy Call</h3>
                    <p className="text-[#71717A] text-xs">30-minute discovery session</p>
                  </div>
                </div>
                <p className="text-[#71717A] text-sm mb-4">Skip the back-and-forth. Book directly and come ready to talk operations.</p>
                <div className="aspect-[4/3] glass-strong rounded-xl flex items-center justify-center border border-white/5">
                  <div className="text-center p-6">
                    <Calendar className="w-10 h-10 text-[#8B5CF6]/40 mx-auto mb-3" />
                    <p className="text-[#71717A] text-sm font-medium mb-1">Calendly Booking</p>
                    <p className="text-[#71717A] text-xs mb-4">Select a time that works for you</p>
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8B5CF6] text-white text-sm font-semibold rounded-lg hover:bg-[#7C3AED] transition-colors cursor-pointer">
                      Open Calendar <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-6 space-y-4">
                {[
                  { icon: <Mail className="w-4 h-4" />, label: "Email", value: "hello@newmindsetcontent.com" },
                  { icon: <Phone className="w-4 h-4" />, label: "Phone", value: "+1 (555) 000-0000" },
                  { icon: <MapPin className="w-4 h-4" />, label: "Location", value: "Remote-first, US-based team" },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/15 flex items-center justify-center text-[#8B5CF6] shrink-0">{icon}</div>
                    <div>
                      <p className="text-[#71717A] text-xs mb-0.5">{label}</p>
                      <p className="text-white text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass rounded-2xl p-5 border border-[#8B5CF6]/10">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white text-sm font-semibold">We're responsive</span>
                </div>
                <p className="text-[#71717A] text-sm">Average response: <span className="text-[#8B5CF6] font-medium">under 4 hours</span></p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
