"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Play,
  Cpu,
  TrendingUp,
  Database,
  Users,
  FileText,
  BarChart3,
  Bot,
  Clock,
  Receipt,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Globe,
  Shield,
  Zap,
} from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import TestimonialCarousel from "./TestimonialCarousel";
import CTASection from "./CTASection";
import FeatureCard from "./FeatureCard";
import GlassCard from "./GlassCard";
import {
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
  scaleUpVariants,
} from "@/lib/animations";

const stats = [
  { value: 340, suffix: "%", label: "Average ROI in Year 1" },
  { value: 47, suffix: "+", label: "Hours Saved Per Week" },
  { value: 200, suffix: "+", label: "Clients Automated" },
  { value: 99, suffix: "%", label: "Client Retention Rate" },
];

const pillars = [
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Automate Operations",
    description:
      "Replace manual processes with intelligent workflows that run 24/7. From lead routing to invoice generation, your OS handles the repetitive so your team can focus on what matters.",
    badge: "Core Feature",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Scale Your Brand",
    description:
      "A content engine that publishes consistently across every channel. AI-assisted writing, scheduling, and distribution — so your brand never goes quiet, even when you're offline.",
    badge: "Growth Engine",
    accent: "gold" as const,
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Own Your Data",
    description:
      "Every customer interaction, every dollar, every touchpoint — unified in a dashboard that's yours. No black boxes, no vendor lock-in. Your data, your insights, your edge.",
    badge: "Data First",
  },
];

const bentoFeatures = [
  {
    icon: <Users className="w-5 h-5" />,
    title: "CRM & Pipeline",
    description: "Full client relationship management with deal tracking, follow-up automation, and relationship scoring.",
    wide: true,
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Content Engine",
    description: "Plan, draft, schedule, and distribute content across all channels from one command center.",
    wide: false,
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Analytics Dashboard",
    description: "Real-time performance metrics across revenue, marketing, and operations.",
    wide: false,
  },
  {
    icon: <Bot className="w-5 h-5" />,
    title: "AI Agents",
    description: "Custom AI assistants trained on your SOPs, brand voice, and customer data to handle tasks autonomously.",
    wide: false,
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Smart Scheduling",
    description: "Automated appointment booking, reminders, and capacity management.",
    wide: false,
  },
  {
    icon: <Receipt className="w-5 h-5" />,
    title: "Invoicing & Billing",
    description: "Automated invoicing, payment tracking, and financial reporting that integrates with your accounting stack.",
    wide: true,
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Discover",
    description:
      "We map your entire business — every workflow, every bottleneck, every manual process. Our strategists build a complete picture of your operations before writing a single line of automation.",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    step: "02",
    title: "Build",
    description:
      "Your OS is built from scratch to match how your business actually works. Custom integrations, branded dashboards, AI assistants trained on your data. Nothing off-the-shelf.",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    step: "03",
    title: "Launch",
    description:
      "Hands-on onboarding, team training, and a dedicated growth partner for 90 days. We don't hand you keys and disappear — we stay until you're fully operational.",
    icon: <Shield className="w-5 h-5" />,
  },
];

const trustedLogos = [
  "Apex Talent Group",
  "Meridian Properties",
  "Brightline Commerce",
  "Peak Advisory",
  "Vantage Media",
  "Clearpath Finance",
  "Summit Operations",
  "Apex Talent Group",
  "Meridian Properties",
  "Brightline Commerce",
  "Peak Advisory",
  "Vantage Media",
  "Clearpath Finance",
  "Summit Operations",
];

export default function HomePage() {
  return (
    <div className="bg-[#080D1A] min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[#080D1A]" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] rounded-full bg-[#0066FF]/12 blur-[120px] pointer-events-none orb-1" />
        <div className="absolute bottom-1/4 right-1/6 w-[400px] h-[400px] rounded-full bg-[#D4A853]/6 blur-[100px] pointer-events-none orb-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#0066FF]/4 blur-[150px] pointer-events-none orb-3" />

        {/* Top gradient fade */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#080D1A] to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            {/* Badge */}
            <motion.div variants={staggerItemVariants} className="mb-8">
              <div className="inline-flex items-center gap-2 badge badge-blue">
                <Sparkles className="w-3 h-3" />
                AI-Powered Business Operations
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={staggerItemVariants} className="display-xl text-white mb-6">
              Your Business.{" "}
              <span className="relative inline-block">
                <span className="gradient-text-blue">Supercharged.</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0066FF] to-transparent origin-left"
                />
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={staggerItemVariants}
              className="text-[#8892A4] text-xl leading-relaxed max-w-2xl mb-10"
            >
              NMC builds a custom AI-powered operating system for your business — automating operations, scaling your brand, and putting every insight at your fingertips.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={staggerItemVariants}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="flex items-center gap-2.5 px-7 py-4 bg-[#0066FF] text-white font-semibold rounded-xl hover:bg-[#1A7FFF] transition-all hover:shadow-[0_0_40px_rgba(0,102,255,0.35)] text-base"
                >
                  <Calendar className="w-5 h-5" />
                  Book a Strategy Call
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/features"
                  className="flex items-center gap-2.5 px-7 py-4 glass border border-white/10 text-white font-semibold rounded-xl hover:border-white/20 transition-all text-base group"
                >
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#0066FF]/30 transition-colors">
                    <Play className="w-3.5 h-3.5 fill-white" />
                  </div>
                  See How It Works
                </Link>
              </motion.div>
            </motion.div>

            {/* Micro-trust */}
            <motion.div
              variants={staggerItemVariants}
              className="flex items-center gap-6 mt-10 text-sm text-[#8892A4]"
            >
              {["No contracts", "White-glove setup", "ROI in 60 days"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
                  {item}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Floating stats card */}
          <motion.div
            initial={{ opacity: 0, x: 60, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
                    <p className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>
                      {item.value}
                    </p>
                    <div className="mt-1 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                        className="h-full bg-[#0066FF] rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#080D1A] to-transparent pointer-events-none" />
      </section>

      {/* ─── STATS ─── */}
      <section className="py-20 border-y border-white/5 bg-[#0D1424]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map(({ value, suffix, label }) => (
              <motion.div key={label} variants={staggerItemVariants} className="text-center">
                <div
                  className="text-4xl md:text-5xl font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  <AnimatedCounter end={value} suffix={suffix} />
                </div>
                <p className="text-[#8892A4] text-sm">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── TRUSTED BY ─── */}
      <section className="py-16 overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-8">
          <p className="text-[#8892A4] text-sm font-medium tracking-[0.12em] uppercase">
            Trusted by growth-stage companies
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#080D1A] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#080D1A] to-transparent z-10" />
          <div className="flex gap-12 animate-[marquee_25s_linear_infinite]">
            {trustedLogos.map((logo, i) => (
              <div
                key={i}
                className="shrink-0 px-6 py-3 glass rounded-xl border border-white/06 flex items-center gap-2"
              >
                <div className="w-5 h-5 rounded bg-[#0066FF]/20 flex items-center justify-center">
                  <Zap className="w-2.5 h-2.5 text-[#0066FF]" />
                </div>
                <span className="text-[#8892A4] text-sm font-medium whitespace-nowrap">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THREE PILLARS ─── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.p variants={staggerItemVariants} className="badge badge-gold inline-flex mb-4">
              The Platform
            </motion.p>
            <motion.h2 variants={staggerItemVariants} className="display-lg text-white mb-4">
              Everything Your Business Needs
            </motion.h2>
            <motion.p variants={staggerItemVariants} className="text-[#8892A4] text-lg max-w-2xl mx-auto">
              Three core pillars that transform how you operate, grow, and compete — all in one custom-built platform.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {pillars.map((pillar) => (
              <motion.div key={pillar.title} variants={staggerItemVariants}>
                <FeatureCard {...pillar} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="section-padding bg-[#0D1424]/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.p variants={staggerItemVariants} className="badge badge-blue inline-flex mb-4">
              The Process
            </motion.p>
            <motion.h2 variants={staggerItemVariants} className="display-lg text-white mb-4">
              From Chaos to Clarity in 90 Days
            </motion.h2>
            <motion.p variants={staggerItemVariants} className="text-[#8892A4] text-lg max-w-xl mx-auto">
              Our proven implementation process gets you fully operational, fast — with zero guesswork.
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-px">
              <div className="h-full bg-gradient-to-r from-[#0066FF]/30 via-[#0066FF]/60 to-[#0066FF]/30" />
              <div className="absolute left-1/3 -top-1 w-2 h-2 rounded-full bg-[#0066FF]" />
              <div className="absolute right-1/3 -top-1 w-2 h-2 rounded-full bg-[#0066FF]" />
            </div>

            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {howItWorks.map((step, i) => (
                <motion.div key={step.step} variants={staggerItemVariants}>
                  <GlassCard className="p-8 h-full" glowColor="blue">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center shrink-0">
                        <div className="text-[#0066FF]">{step.icon}</div>
                      </div>
                      <span
                        className="text-5xl font-bold text-[#0D1E3D] leading-none"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {step.step}
                      </span>
                    </div>
                    <h3
                      className="text-white font-bold text-xl mb-3"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[#8892A4] leading-relaxed text-sm">{step.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── BENTO GRID ─── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.p variants={staggerItemVariants} className="badge badge-gold inline-flex mb-4">
              Capabilities
            </motion.p>
            <motion.h2 variants={staggerItemVariants} className="display-lg text-white mb-4">
              Six Systems, One Platform
            </motion.h2>
            <motion.p variants={staggerItemVariants} className="text-[#8892A4] text-lg max-w-2xl mx-auto">
              Every tool you need to run a modern business — built, connected, and customized for you.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {bentoFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={staggerItemVariants}
                className={feature.wide ? "md:col-span-2" : ""}
              >
                <GlassCard
                  className={`p-7 h-full group relative overflow-hidden ${feature.wide ? "min-h-[180px]" : "min-h-[180px]"}`}
                  glowColor="blue"
                >
                  {/* Hover glow corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#0066FF]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="w-10 h-10 rounded-lg bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center mb-4 text-[#0066FF] group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3
                    className="text-white font-bold text-lg mb-2"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-[#8892A4] text-sm leading-relaxed">{feature.description}</p>

                  <div className="mt-4 flex items-center gap-1 text-[#0066FF] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more <ChevronRight className="w-3 h-3" />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Link
              href="/features"
              className="inline-flex items-center gap-2 text-[#0066FF] font-semibold hover:text-[#1A7FFF] transition-colors"
            >
              Explore all features <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section-padding bg-[#0D1424]/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.p variants={staggerItemVariants} className="badge badge-blue inline-flex mb-4">
              Client Results
            </motion.p>
            <motion.h2 variants={staggerItemVariants} className="display-lg text-white mb-4">
              Proof That It Works
            </motion.h2>
          </motion.div>

          <motion.div
            variants={scaleUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <TestimonialCarousel />
          </motion.div>
        </div>
      </section>

      {/* ─── PRICING TEASER ─── */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p variants={staggerItemVariants} className="badge badge-gold inline-flex mb-6">
              Simple Pricing
            </motion.p>
            <motion.h2 variants={staggerItemVariants} className="display-lg text-white mb-4">
              Plans start at{" "}
              <span className="gradient-text-gold">$499/mo</span>
            </motion.h2>
            <motion.p variants={staggerItemVariants} className="text-[#8892A4] text-lg mb-8">
              No setup fees. No per-seat charges for your team. One flat monthly investment for your entire business OS.
            </motion.p>
            <motion.div variants={staggerItemVariants}>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 glass border border-white/10 text-white font-semibold rounded-xl hover:border-[#0066FF]/30 hover:text-[#0066FF] transition-all group"
              >
                See all plans <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <CTASection />
    </div>
  );
}
