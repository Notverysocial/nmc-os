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
    color: "#0066FF",
  },
  {
    industry: "Real Estate",
    company: "Meridian Properties",
    challenge: "Inconsistent content output and no social presence. Lost deals because prospects found no credible online footprint.",
    result: "3x content output, 285% LinkedIn growth, 2 deals directly attributed to content.",
    quote: "Our content now looks like we have a 5-person marketing agency. We have one person and the OS.",
    author: "Priya Sharma, Founder",
    metrics: [{ v: "3x", l: "Content Output" }, { v: "285%", l: "LinkedIn Growth" }, { v: "2 deals", l: "Attributed" }],
    color: "#D4A853",
  },
  {
    industry: "E-commerce",
    company: "Brightline Commerce",
    challenge: "Rapid growth creating operational chaos. No unified analytics, CS overwhelmed, decisions made on gut feel.",
    result: "$200K revenue recovered Q1, 80% of CS tickets automated, 22 hours saved per week.",
    quote: "The analytics dashboard showed us we were leaving $200K on the table every quarter. Fixed in 60 days.",
    author: "James Calloway, COO",
    metrics: [{ v: "$200K", l: "Revenue Recovered" }, { v: "80%", l: "CS Automated" }, { v: "22 hrs", l: "Saved/Week" }],
    color: "#0066FF",
  },
];

const plans = [
  {
    tier: "Starter",
    price: "$499",
    description: "For solo operators and small teams ready to automate core workflows.",
    features: ["Operations Dashboard (5 users)", "Content Calendar & Scheduling", "Basic AI Assistant", "CRM up to 2,500 contacts", "Invoicing & Payment tracking", "10 automation workflows", "Onboarding call (2 hrs)"],
    cta: "Start with Starter",
  },
  {
    tier: "Growth",
    price: "$999",
    description: "For scaling companies that need a full OS — custom AI, client portals, and advanced analytics.",
    features: ["Everything in Starter", "Unlimited team members", "Custom AI (trained on your data)", "Full Client Portal (branded)", "Advanced Analytics", "Unlimited automations", "Team management tools", "Priority support + Slack", "White-glove onboarding (8 hrs)", "Quarterly strategy reviews"],
    cta: "Start with Growth",
    popular: true,
  },
  {
    tier: "Enterprise",
    price: "Custom",
    description: "For multi-location businesses that need a fully bespoke, white-labeled operations platform.",
    features: ["Everything in Growth", "Fully custom workflows", "White-label & custom domain", "Custom AI models", "Dedicated implementation team", "99.9% uptime SLA", "Custom API integrations", "Monthly strategy sessions"],
    cta: "Contact Sales",
    enterprise: true,
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
    <section id="testimonials" className="section-padding bg-[#0D1424]/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.p variants={staggerItemVariants} className="badge badge-blue inline-flex mb-4">Client Results</motion.p>
          <motion.h2 variants={staggerItemVariants} className="display-lg text-white">Proof That It Works</motion.h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-8 -left-4 opacity-10">
            <Quote className="w-20 h-20 text-[#0066FF] fill-[#0066FF]" />
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
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-[#D4A853] fill-[#D4A853]" />)}
              </div>
              <blockquote className="text-white text-xl md:text-2xl leading-relaxed font-light mb-8" style={{ fontFamily: "var(--font-syne)" }}>
                "{t.quote}"
              </blockquote>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0066FF] to-[#1A7FFF] flex items-center justify-center text-white font-bold text-lg">
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{t.author}</p>
                    <p className="text-[#8892A4] text-sm">{t.role}</p>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/20">
                  <p className="text-[#6699FF] text-sm font-semibold">{t.metric}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${i === current ? "w-8 h-2 bg-[#0066FF]" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`}
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
        {open ? <ChevronUp className="w-5 h-5 text-[#0066FF] shrink-0" /> : <ChevronDown className="w-5 h-5 text-[#8892A4] shrink-0" />}
      </div>
      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} transition={{ duration: 0.3 }}>
          <p className="text-[#8892A4] pb-5 leading-relaxed">{a}</p>
        </motion.div>
      )}
    </div>
  );
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-[#0066FF]" />
        </div>
        <h3 className="text-white font-bold text-2xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>Message Received</h3>
        <p className="text-[#8892A4]">Our team will be in touch within one business day.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
      <h2 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "var(--font-syne)" }}>Tell us about your business</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[#8892A4] text-xs font-medium uppercase tracking-wide block mb-2">Full Name *</label>
          <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#8892A4] text-sm focus:outline-none focus:border-[#0066FF]/50 transition-colors" placeholder="Your name" />
        </div>
        <div>
          <label className="text-[#8892A4] text-xs font-medium uppercase tracking-wide block mb-2">Email *</label>
          <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#8892A4] text-sm focus:outline-none focus:border-[#0066FF]/50 transition-colors" placeholder="you@company.com" />
        </div>
      </div>
      <div>
        <label className="text-[#8892A4] text-xs font-medium uppercase tracking-wide block mb-2">Company *</label>
        <input type="text" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#8892A4] text-sm focus:outline-none focus:border-[#0066FF]/50 transition-colors" placeholder="Acme Corp" />
      </div>
      <div>
        <label className="text-[#8892A4] text-xs font-medium uppercase tracking-wide block mb-2">What's your biggest challenge?</label>
        <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#8892A4] text-sm focus:outline-none focus:border-[#0066FF]/50 transition-colors resize-none" placeholder="Tell us what's slowing you down..." />
      </div>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#0066FF] text-white font-semibold rounded-xl hover:bg-[#1A7FFF] transition-all hover:shadow-[0_0_30px_rgba(0,102,255,0.4)]">
        <Send className="w-4 h-4" />
        Send Message
      </motion.button>
      <p className="text-[#8892A4] text-xs text-center">We respond within one business day.</p>
    </form>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function SPAPage() {
  return (
    <div className="bg-[#080D1A]">

      {/* ══════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#080D1A]" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-[8%] w-[500px] h-[500px] rounded-full bg-[#0066FF]/12 blur-[120px] pointer-events-none orb-1" />
        <div className="absolute bottom-1/4 right-[8%] w-[400px] h-[400px] rounded-full bg-[#D4A853]/6 blur-[100px] pointer-events-none orb-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#0066FF]/4 blur-[150px] pointer-events-none orb-3" />

        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#080D1A] to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
          <motion.div variants={staggerContainerVariants} initial="hidden" animate="visible" className="max-w-4xl">
            {/* Urgency badge */}
            <motion.div variants={staggerItemVariants} className="mb-8 flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2 badge badge-blue">
                <Sparkles className="w-3 h-3" />
                AI-Powered Business Operations
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A853]/10 border border-[#D4A853]/25 text-[#D4A853] text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] animate-pulse" />
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
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0066FF] to-transparent origin-left"
                />
              </span>
            </motion.h1>

            <motion.p variants={staggerItemVariants} className="text-[#B8C4D4] text-xl leading-relaxed max-w-2xl mb-4">
              NMC builds a custom AI-powered operating system for your business — so you stop managing chaos and start scaling with precision.
            </motion.p>

            <motion.p variants={staggerItemVariants} className="text-[#8892A4] text-base leading-relaxed max-w-xl mb-10">
              We configure everything from your CRM and content engine to your invoicing and analytics. You get one platform, built for your business, running on day one.
            </motion.p>

            <motion.div variants={staggerItemVariants} className="flex flex-col sm:flex-row items-start gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2.5 px-7 py-4 bg-[#0066FF] text-white font-semibold rounded-xl hover:bg-[#1A7FFF] transition-all hover:shadow-[0_0_40px_rgba(0,102,255,0.35)] text-base w-full sm:w-auto justify-center"
              >
                <Calendar className="w-5 h-5" />
                Book a Free Strategy Call
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2.5 px-7 py-4 glass border border-white/10 text-white font-semibold rounded-xl hover:border-white/20 transition-all text-base group w-full sm:w-auto justify-center"
              >
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#0066FF]/30 transition-colors">
                  <Play className="w-3.5 h-3.5 fill-white" />
                </div>
                See Client Results
              </motion.button>
            </motion.div>

            <motion.div variants={staggerItemVariants} className="flex items-center gap-6 mt-10 text-sm text-[#8892A4] flex-wrap">
              {["Free 30-min strategy call", "Custom-built in 30 days", "ROI guaranteed in 60 days"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
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
                <span className="text-xs text-[#8892A4] font-medium">Live Dashboard</span>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Leads Today", value: "14", trend: "+3" },
                  { label: "Revenue MTD", value: "$48.2K", trend: "+12%" },
                  { label: "Tasks Auto'd", value: "231", trend: "today" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-end justify-between">
                      <span className="text-[#8892A4] text-xs">{item.label}</span>
                      <span className="text-green-400 text-xs font-medium">{item.trend}</span>
                    </div>
                    <p className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>{item.value}</p>
                    <div className="mt-1 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "75%" }} transition={{ delay: 1.2, duration: 1 }} className="h-full bg-[#0066FF] rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#080D1A] to-transparent pointer-events-none" />
      </section>

      {/* ══════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════ */}
      <section className="py-20 border-y border-white/5 bg-[#0D1424]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, suffix, label }) => (
              <motion.div key={label} variants={staggerItemVariants} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                  <AnimatedCounter end={value} suffix={suffix} />
                </div>
                <p className="text-[#8892A4] text-sm">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. TRUSTED BY
      ══════════════════════════════════════════════════ */}
      <section className="py-16 overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-8">
          <p className="text-[#8892A4] text-sm font-medium tracking-[0.12em] uppercase">Trusted by growth-stage companies</p>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#080D1A] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#080D1A] to-transparent z-10" />
          <div className="flex gap-12 animate-[marquee_25s_linear_infinite]">
            {trustedLogos.map((logo, i) => (
              <div key={i} className="shrink-0 px-6 py-3 glass rounded-xl border border-white/06 flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-[#0066FF]/20 flex items-center justify-center">
                  <Zap className="w-2.5 h-2.5 text-[#0066FF]" />
                </div>
                <span className="text-[#8892A4] text-sm font-medium whitespace-nowrap">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. THREE PILLARS
      ══════════════════════════════════════════════════ */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <motion.p variants={staggerItemVariants} className="badge badge-gold inline-flex mb-4">The Platform</motion.p>
            <motion.h2 variants={staggerItemVariants} className="display-lg text-white mb-4">Everything Your Business Needs</motion.h2>
            <motion.p variants={staggerItemVariants} className="text-[#8892A4] text-lg max-w-2xl mx-auto">Three core pillars that transform how you operate, grow, and compete — all in one custom-built platform.</motion.p>
          </motion.div>

          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar) => {
              const isGold = pillar.accent === "gold";
              const c = isGold ? "#D4A853" : "#0066FF";
              const bg = isGold ? "rgba(212,168,83,0.1)" : "rgba(0,102,255,0.1)";
              const border = isGold ? "rgba(212,168,83,0.2)" : "rgba(0,102,255,0.2)";
              return (
                <motion.div key={pillar.title} variants={staggerItemVariants}>
                  <motion.div variants={cardHoverVariants} initial="rest" whileHover="hover" className="glass rounded-2xl p-6 group transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,102,255,0.15)] h-full">
                    <div className="mb-4">
                      <span className="badge text-xs font-semibold" style={{ background: bg, border: `1px solid ${border}`, color: c }}>{pillar.badge}</span>
                    </div>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ background: bg, border: `1px solid ${border}` }}>
                      <div style={{ color: c }}>{pillar.icon}</div>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2.5" style={{ fontFamily: "var(--font-syne)" }}>{pillar.title}</h3>
                    <p className="text-[#8892A4] text-sm leading-relaxed">{pillar.description}</p>
                    <div className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full" style={{ background: `linear-gradient(90deg, ${c}, transparent)` }} />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. HOW IT WORKS
      ══════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#0D1424]/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <motion.p variants={staggerItemVariants} className="badge badge-blue inline-flex mb-4">The Process</motion.p>
            <motion.h2 variants={staggerItemVariants} className="display-lg text-white mb-4">From Chaos to Clarity in 90 Days</motion.h2>
            <motion.p variants={staggerItemVariants} className="text-[#8892A4] text-lg max-w-xl mx-auto">Our proven implementation process gets you fully operational, fast.</motion.p>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-px">
              <div className="h-full bg-gradient-to-r from-[#0066FF]/30 via-[#0066FF]/60 to-[#0066FF]/30" />
              <div className="absolute left-1/3 -top-1 w-2 h-2 rounded-full bg-[#0066FF]" />
              <div className="absolute right-1/3 -top-1 w-2 h-2 rounded-full bg-[#0066FF]" />
            </div>

            <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
              {howItWorks.map((step) => (
                <motion.div key={step.step} variants={staggerItemVariants}>
                  <GlassCard className="p-8 h-full" glowColor="blue">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center shrink-0">
                        <div className="text-[#0066FF]">{step.icon}</div>
                      </div>
                      <span className="text-5xl font-bold text-[#0D1E3D] leading-none" style={{ fontFamily: "var(--font-syne)" }}>{step.step}</span>
                    </div>
                    <h3 className="text-white font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>{step.title}</h3>
                    <p className="text-[#8892A4] leading-relaxed text-sm">{step.description}</p>
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
            <motion.p variants={staggerItemVariants} className="badge badge-gold inline-flex mb-4">Capabilities</motion.p>
            <motion.h2 variants={staggerItemVariants} className="display-lg text-white mb-4">Six Systems, One Platform</motion.h2>
            <motion.p variants={staggerItemVariants} className="text-[#8892A4] text-lg max-w-2xl mx-auto">Every tool you need to run a modern business — built, connected, and customized for you.</motion.p>
          </motion.div>

          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bentoFeatures.map((feature) => (
              <motion.div key={feature.title} variants={staggerItemVariants} className={feature.wide ? "md:col-span-2" : ""}>
                <GlassCard className="p-7 h-full group relative overflow-hidden min-h-[180px]" glowColor="blue">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#0066FF]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-10 h-10 rounded-lg bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center mb-4 text-[#0066FF] group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: "var(--font-syne)" }}>{feature.title}</h3>
                  <p className="text-[#8892A4] text-sm leading-relaxed">{feature.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-[#0066FF] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more <ChevronRight className="w-3 h-3" />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. CASE STUDIES
      ══════════════════════════════════════════════════ */}
      <section id="case-studies" className="section-padding bg-[#0D1424]/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <motion.p variants={staggerItemVariants} className="badge badge-blue inline-flex mb-4">Proof of Impact</motion.p>
            <motion.h2 variants={staggerItemVariants} className="display-lg text-white mb-4">Real Businesses. <span className="gradient-text-blue">Real Results.</span></motion.h2>
          </motion.div>

          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((cs) => (
              <motion.div key={cs.company} variants={staggerItemVariants}>
                <motion.div variants={cardHoverVariants} initial="rest" whileHover="hover" className="glass rounded-2xl overflow-hidden h-full flex flex-col" style={{ boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.06)` }}>
                  <div className="h-1" style={{ background: `linear-gradient(90deg, ${cs.color}80, transparent)` }} />
                  <div className="p-7 flex flex-col flex-1">
                    <span className="badge mb-4 text-xs" style={{ background: `${cs.color}18`, border: `1px solid ${cs.color}30`, color: cs.color }}>{cs.industry}</span>
                    <h3 className="text-white font-bold text-lg mb-3" style={{ fontFamily: "var(--font-syne)" }}>{cs.company}</h3>
                    <p className="text-[#8892A4] text-sm mb-3 leading-relaxed"><span className="text-white/60 text-xs font-semibold uppercase tracking-wide">Challenge: </span>{cs.challenge}</p>
                    <div className="grid grid-cols-3 gap-2 my-4">
                      {cs.metrics.map(({ v, l }) => (
                        <div key={l} className="rounded-lg p-2.5 text-center" style={{ background: `${cs.color}10`, border: `1px solid ${cs.color}20` }}>
                          <p className="font-bold text-sm text-white" style={{ fontFamily: "var(--font-syne)" }}>{v}</p>
                          <p className="text-[10px] text-[#8892A4]">{l}</p>
                        </div>
                      ))}
                    </div>
                    <blockquote className="mt-auto pl-3 border-l-2 italic" style={{ borderColor: cs.color }}>
                      <p className="text-[#B8C4D4] text-xs">&ldquo;{cs.quote}&rdquo;</p>
                      <p className="text-[#8892A4] text-[11px] mt-1">— {cs.author}</p>
                    </blockquote>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. PRICING
      ══════════════════════════════════════════════════ */}
      <section id="pricing" className="section-padding">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <motion.p variants={staggerItemVariants} className="badge badge-gold inline-flex mb-4">Pricing</motion.p>
            <motion.h2 variants={staggerItemVariants} className="display-lg text-white mb-4">Simple, Transparent Pricing</motion.h2>
            <motion.p variants={staggerItemVariants} className="text-[#8892A4] text-lg max-w-xl mx-auto">One flat monthly fee. No hidden costs, no per-seat traps.</motion.p>
          </motion.div>

          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
              <motion.div key={plan.tier} variants={staggerItemVariants}>
                <motion.div
                  variants={cardHoverVariants} initial="rest" whileHover="hover"
                  className={`relative rounded-2xl p-8 transition-all duration-300 flex flex-col h-full ${plan.popular ? "bg-gradient-to-b from-[#0D1E3D] to-[#0D1424] border border-[#0066FF]/30 shadow-[0_0_60px_rgba(0,102,255,0.15)]" : "glass"}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#0066FF] text-white text-xs font-bold rounded-full tracking-wide uppercase">
                        <Zap className="w-3 h-3 fill-white" />
                        Most Popular
                      </div>
                    </div>
                  )}
                  <div className="mb-8">
                    <h3 className="text-white font-bold text-xl mb-4" style={{ fontFamily: "var(--font-syne)" }}>{plan.tier}</h3>
                    <div className="flex items-end gap-1 mb-3">
                      {plan.enterprise ? (
                        <span className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>Custom</span>
                      ) : (
                        <>
                          <span className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>{plan.price}</span>
                          <span className="text-[#8892A4] mb-1.5">/mo</span>
                        </>
                      )}
                    </div>
                    <p className="text-[#8892A4] text-sm">{plan.description}</p>
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.popular ? "bg-[#0066FF]/20 border border-[#0066FF]/30" : "bg-white/5 border border-white/10"}`}>
                          <Check className={`w-3 h-3 ${plan.popular ? "text-[#0066FF]" : "text-[#8892A4]"}`} />
                        </div>
                        <span className="text-[#B8C4D4] text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className={`block w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${plan.popular ? "bg-[#0066FF] text-white hover:bg-[#1A7FFF] hover:shadow-[0_0_25px_rgba(0,102,255,0.4)]" : "glass border border-white/10 text-white hover:border-white/20"}`}
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
              <p className="badge badge-gold inline-flex mb-6">About NMC</p>
              <h2 className="display-md text-white mb-6">Built by Operators, for Operators</h2>
              <p className="text-[#8892A4] leading-relaxed mb-5 text-lg">
                New Mindset Content started as a brand journalism agency. We kept hitting the same wall: our clients had great stories to tell but chaotic operations underneath. So we built the fix.
              </p>
              <p className="text-[#8892A4] leading-relaxed mb-5">
                The difference between a good business and a great one isn't the idea — it's the infrastructure. The systems that run quietly in the background, making sure nothing slips and every opportunity is captured.
              </p>
              <p className="text-[#D4A853] font-medium">That's the new mindset. And it changes everything.</p>
            </motion.div>

            <motion.div variants={slideRightVariants} className="grid grid-cols-2 gap-4">
              {values.map((value) => (
                <GlassCard key={value.title} className="p-5" glowColor="blue">
                  <div className="w-9 h-9 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center mb-3 text-[#0066FF]">{value.icon}</div>
                  <h3 className="text-white font-bold text-sm mb-2" style={{ fontFamily: "var(--font-syne)" }}>{value.title}</h3>
                  <p className="text-[#8892A4] text-xs leading-relaxed">{value.description}</p>
                </GlassCard>
              ))}
            </motion.div>
          </motion.div>

          {/* NBC Partnership */}
          <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <div className="w-10 h-10 rounded-xl bg-[#D4A853]/10 border border-[#D4A853]/20 flex items-center justify-center mx-auto mb-4">
              <Award className="w-5 h-5 text-[#D4A853]" />
            </div>
            <h3 className="text-white font-bold text-xl mb-3" style={{ fontFamily: "var(--font-syne)" }}>Powered by NBC Studio</h3>
            <p className="text-[#8892A4] text-sm leading-relaxed">
              NMC Business OS is built in partnership with NBC Studio, a product development house specializing in AI-powered operational platforms. Together, we bring enterprise-grade technology to growth-stage businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          10. CONTACT / CTA
      ══════════════════════════════════════════════════ */}
      <section id="contact" className="section-padding bg-[#0D1424]/40 relative overflow-hidden">
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0066FF]/5 blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <motion.p variants={staggerItemVariants} className="badge badge-blue inline-flex mb-4">Let's Talk</motion.p>
            <motion.h2 variants={staggerItemVariants} className="display-lg text-white mb-4">Ready to Transform <span className="gradient-text-gold">Your Business?</span></motion.h2>
            <motion.p variants={staggerItemVariants} className="text-[#8892A4] text-lg max-w-xl mx-auto">Tell us about your business and we'll show you exactly what your custom OS would look like.</motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div variants={slideLeftVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <ContactForm />
            </motion.div>

            <motion.div variants={slideRightVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-5">
              <div className="glass rounded-2xl p-7 border border-[#0066FF]/15">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#0066FF]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold" style={{ fontFamily: "var(--font-syne)" }}>Book a Strategy Call</h3>
                    <p className="text-[#8892A4] text-xs">30-minute discovery session</p>
                  </div>
                </div>
                <p className="text-[#8892A4] text-sm mb-4">Skip the back-and-forth. Book directly and come ready to talk operations.</p>
                <div className="aspect-[4/3] glass-strong rounded-xl flex items-center justify-center border border-white/5">
                  <div className="text-center p-6">
                    <Calendar className="w-10 h-10 text-[#0066FF]/40 mx-auto mb-3" />
                    <p className="text-[#8892A4] text-sm font-medium mb-1">Calendly Booking</p>
                    <p className="text-[#8892A4] text-xs mb-4">Select a time that works for you</p>
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0066FF] text-white text-sm font-semibold rounded-lg hover:bg-[#1A7FFF] transition-colors cursor-pointer">
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
                    <div className="w-8 h-8 rounded-lg bg-[#0066FF]/10 border border-[#0066FF]/15 flex items-center justify-center text-[#0066FF] shrink-0">{icon}</div>
                    <div>
                      <p className="text-[#8892A4] text-xs mb-0.5">{label}</p>
                      <p className="text-white text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass rounded-2xl p-5 border border-[#D4A853]/10">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white text-sm font-semibold">We're responsive</span>
                </div>
                <p className="text-[#8892A4] text-sm">Average response: <span className="text-[#D4A853] font-medium">under 4 hours</span></p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
