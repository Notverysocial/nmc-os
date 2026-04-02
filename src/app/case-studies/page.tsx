"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import GlassCard from "@/components/GlassCard";
import {
  staggerContainerVariants,
  staggerItemVariants,
  fadeUpVariants,
} from "@/lib/animations";

const caseStudies = [
  {
    industry: "Staffing & Recruiting",
    company: "Apex Talent Group",
    challenge:
      "Managing 300+ active placements across 3 locations with a spreadsheet-based system. Coordinators spending 4+ hours/day on manual status updates. Follow-ups falling through the cracks. Revenue leakage from mismanaged contracts.",
    solution:
      "We built a full placement management OS — from candidate intake to contract execution. AI agents handle status update emails, the CRM tracks every touchpoint, and automated invoicing eliminated billing errors entirely.",
    results: [
      { metric: "40%", label: "More Placements", icon: <TrendingUp className="w-4 h-4" /> },
      { metric: "15 hrs", label: "Saved Per Week", icon: <Clock className="w-4 h-4" /> },
      { metric: "$180K", label: "Revenue Recovered", icon: <DollarSign className="w-4 h-4" /> },
      { metric: "3x", label: "Faster Onboarding", icon: <Users className="w-4 h-4" /> },
    ],
    timeline: "Deployed in 21 days",
    quote:
      "\"We went from drowning to thriving. The OS handles what used to take two full-time coordinators.\"",
    quoteAuthor: "Marcus Thompson, CEO",
    color: "#0066FF",
    bg: "from-[#0066FF]/10 to-transparent",
  },
  {
    industry: "Real Estate",
    company: "Meridian Properties",
    challenge:
      "Inconsistent content output, no social media presence, and a marketing team that was reactive instead of strategic. Lost multiple deals because prospects couldn't find credible content when researching the firm.",
    solution:
      "Built a full content OS with a 90-day editorial calendar, AI writing assistant trained on real estate thought leadership, and automated distribution across LinkedIn, email, and their blog. Monthly analytics report sent automatically to leadership.",
    results: [
      { metric: "3x", label: "Content Output", icon: <BarChart3 className="w-4 h-4" /> },
      { metric: "285%", label: "LinkedIn Growth", icon: <TrendingUp className="w-4 h-4" /> },
      { metric: "2 deals", label: "Directly Attributed", icon: <DollarSign className="w-4 h-4" /> },
      { metric: "8 hrs", label: "Saved Per Week", icon: <Clock className="w-4 h-4" /> },
    ],
    timeline: "Deployed in 14 days",
    quote:
      "\"Our content now looks like we have a 5-person marketing agency behind us. We have one person and the OS.\"",
    quoteAuthor: "Priya Sharma, Founder",
    color: "#D4A853",
    bg: "from-[#D4A853]/10 to-transparent",
  },
  {
    industry: "E-commerce",
    company: "Brightline Commerce",
    challenge:
      "Rapid growth creating operational chaos. Customer service overwhelmed, fulfillment tracking manual, no unified analytics. Leadership making decisions based on gut feel instead of data. Burn rate was growing faster than revenue.",
    solution:
      "Complete operations OS with unified analytics pulling from Shopify, Meta, Google, and their 3PL. AI customer service triage handles 80% of tickets. Automated inventory alerts and reorder recommendations built in. Weekly executive dashboard delivered automatically.",
    results: [
      { metric: "$200K", label: "Revenue Recovered Q1", icon: <DollarSign className="w-4 h-4" /> },
      { metric: "80%", label: "CS Tickets Automated", icon: <TrendingUp className="w-4 h-4" /> },
      { metric: "4.8★", label: "Customer Rating", icon: <Users className="w-4 h-4" /> },
      { metric: "22 hrs", label: "Saved Per Week", icon: <Clock className="w-4 h-4" /> },
    ],
    timeline: "Deployed in 30 days",
    quote:
      "\"The analytics dashboard showed us we were leaving $200K on the table every quarter. We fixed that in 60 days.\"",
    quoteAuthor: "James Calloway, COO",
    color: "#0066FF",
    bg: "from-[#0066FF]/10 to-transparent",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="bg-[#080D1A] min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-15" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0066FF]/6 blur-[120px] rounded-full" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div variants={staggerContainerVariants} initial="hidden" animate="visible">
            <motion.p variants={staggerItemVariants} className="badge badge-blue inline-flex mb-6">
              Proof of Impact
            </motion.p>
            <motion.h1 variants={staggerItemVariants} className="display-lg text-white mb-6">
              Real Businesses.{" "}
              <span className="gradient-text-blue">Real Results.</span>
            </motion.h1>
            <motion.p variants={staggerItemVariants} className="text-[#8892A4] text-xl max-w-2xl mx-auto">
              We don't do case studies for vanity. Every number here is verified and every story is real.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Case studies */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        {caseStudies.map((cs, i) => (
          <motion.div
            key={cs.company}
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className={`mb-12`}
          >
            <GlassCard
              className="overflow-hidden"
              glowColor={cs.color === "#0066FF" ? "blue" : "gold"}
              hover={false}
            >
              {/* Top bar */}
              <div
                className={`h-1 bg-gradient-to-r ${cs.bg}`}
                style={{ background: `linear-gradient(90deg, ${cs.color}60, transparent)` }}
              />

              <div className="p-8 md:p-12">
                <div className="grid lg:grid-cols-3 gap-10">
                  {/* Left: Story */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-6">
                      <span
                        className="badge text-xs"
                        style={{
                          background: `${cs.color}18`,
                          border: `1px solid ${cs.color}30`,
                          color: cs.color,
                        }}
                      >
                        {cs.industry}
                      </span>
                      <span className="text-[#8892A4] text-sm">{cs.timeline}</span>
                    </div>

                    <h2
                      className="text-white font-bold text-2xl mb-6"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {cs.company}
                    </h2>

                    <div className="space-y-5">
                      <div>
                        <p
                          className="text-xs font-semibold uppercase tracking-wide mb-2"
                          style={{ color: cs.color }}
                        >
                          The Challenge
                        </p>
                        <p className="text-[#8892A4] text-sm leading-relaxed">{cs.challenge}</p>
                      </div>
                      <div>
                        <p
                          className="text-xs font-semibold uppercase tracking-wide mb-2"
                          style={{ color: cs.color }}
                        >
                          Our Solution
                        </p>
                        <p className="text-[#8892A4] text-sm leading-relaxed">{cs.solution}</p>
                      </div>
                    </div>

                    <blockquote
                      className="mt-6 pl-4 border-l-2 italic"
                      style={{ borderColor: cs.color }}
                    >
                      <p className="text-white text-sm">{cs.quote}</p>
                      <p className="text-[#8892A4] text-xs mt-1">— {cs.quoteAuthor}</p>
                    </blockquote>
                  </div>

                  {/* Right: Results */}
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wide mb-5"
                      style={{ color: cs.color }}
                    >
                      Results
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {cs.results.map(({ metric, label, icon }) => (
                        <div
                          key={label}
                          className="rounded-xl p-4"
                          style={{
                            background: `${cs.color}08`,
                            border: `1px solid ${cs.color}18`,
                          }}
                        >
                          <div className="mb-2" style={{ color: cs.color }}>
                            {icon}
                          </div>
                          <p
                            className="text-white font-bold text-2xl mb-1"
                            style={{ fontFamily: "var(--font-syne)" }}
                          >
                            {metric}
                          </p>
                          <p className="text-[#8892A4] text-xs">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}

        {/* More coming */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="glass rounded-2xl p-10 text-center"
        >
          <p className="text-[#8892A4] text-sm mb-2">More case studies across 15+ industries</p>
          <h3
            className="text-white font-bold text-xl mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Ready to Be Our Next Success Story?
          </h3>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0066FF] text-white font-semibold rounded-xl hover:bg-[#1A7FFF] transition-all hover:shadow-[0_0_25px_rgba(0,102,255,0.3)] group"
          >
            Let's Build Your OS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

      <CTASection />
    </div>
  );
}
