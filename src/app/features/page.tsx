"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  FileText,
  BarChart3,
  Bot,
  Clock,
  Receipt,
  UserCheck,
  Plug,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import GlassCard from "@/components/GlassCard";
import {
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
  slideLeftVariants,
  slideRightVariants,
} from "@/lib/animations";

const features = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "Operations Dashboard",
    description:
      "Your entire business at a glance. A unified command center that surfaces the metrics that matter — revenue, pipeline, team capacity, and client health — all in real time.",
    benefits: [
      "Unified KPI tracking across all departments",
      "Automated daily briefings and anomaly alerts",
      "Custom views for leadership, sales, and ops teams",
      "Integration with 50+ data sources",
    ],
    imageAlt: "Operations Dashboard",
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Content Calendar",
    description:
      "Plan, create, and publish content across every channel without the chaos. AI-assisted writing, brand voice enforcement, and automated distribution so your content engine never stops.",
    benefits: [
      "Multi-channel content planning and scheduling",
      "AI-assisted drafting in your brand voice",
      "Social media, email, and blog automation",
      "Performance tracking and content analytics",
    ],
    imageAlt: "Content Calendar",
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: "AI Assistants",
    description:
      "Custom AI agents trained on your business, your SOPs, and your customer data. They handle email drafts, proposal generation, customer FAQs, and internal documentation — 24/7.",
    benefits: [
      "Custom AI trained on your brand and knowledge base",
      "Email and proposal drafting automation",
      "Customer service triage and response",
      "Internal knowledge management and search",
    ],
    imageAlt: "AI Assistants",
  },
  {
    icon: <UserCheck className="w-8 h-8" />,
    title: "Client Portal",
    description:
      "Give every client a premium, branded experience. Project updates, document sharing, approvals, and communication — all in one place that looks like a million dollars.",
    benefits: [
      "Branded white-label client experience",
      "Real-time project status and milestone tracking",
      "Secure document sharing and e-signatures",
      "Built-in messaging and approval workflows",
    ],
    imageAlt: "Client Portal",
  },
  {
    icon: <Receipt className="w-8 h-8" />,
    title: "Invoicing & Billing",
    description:
      "Stop chasing payments. Automated invoicing, payment reminders, and financial reporting that integrates with your accounting stack so nothing falls through the cracks.",
    benefits: [
      "Automated invoice generation and delivery",
      "Smart payment reminders and follow-ups",
      "Stripe, QuickBooks, and Xero integrations",
      "Revenue forecasting and cash flow dashboards",
    ],
    imageAlt: "Invoicing",
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Analytics & Reporting",
    description:
      "Move beyond vanity metrics. Deep-dive analytics across marketing, sales, operations, and finance — with automated reports that tell you exactly what to do next.",
    benefits: [
      "Cross-channel attribution and ROI tracking",
      "Automated weekly and monthly reporting",
      "Custom dashboards per stakeholder",
      "Predictive analytics and trend identification",
    ],
    imageAlt: "Analytics",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Team Management",
    description:
      "Task assignment, capacity planning, and performance tracking — without the micromanagement. Your team stays aligned and accountable while you focus on growth.",
    benefits: [
      "Visual project and task management",
      "Time tracking and resource allocation",
      "Automated stand-ups and check-ins",
      "Performance scorecards and goal tracking",
    ],
    imageAlt: "Team Management",
  },
  {
    icon: <Plug className="w-8 h-8" />,
    title: "Integrations Hub",
    description:
      "Connect every tool your business already uses. NMC Business OS sits at the center of your tech stack, pulling data from everywhere into one clean, intelligent system.",
    benefits: [
      "50+ pre-built integrations (CRM, email, accounting)",
      "Zapier and Make.com compatibility",
      "Custom API integrations on request",
      "Bi-directional data sync across all platforms",
    ],
    imageAlt: "Integrations",
  },
];

export default function FeaturesPage() {
  return (
    <div className="bg-[#080D1A] min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#0066FF]/8 blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={staggerItemVariants} className="badge badge-blue inline-flex mb-6">
              Platform Features
            </motion.p>
            <motion.h1 variants={staggerItemVariants} className="display-lg text-white mb-6">
              Every Tool You Need.{" "}
              <span className="gradient-text-blue">Nothing You Don't.</span>
            </motion.h1>
            <motion.p variants={staggerItemVariants} className="text-[#8892A4] text-xl max-w-2xl mx-auto">
              Eight fully integrated systems, custom-built for your business, working together in one platform you actually own.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Features alternating */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        {features.map((feature, i) => {
          const isEven = i % 2 === 0;
          return (
            <motion.div
              key={feature.title}
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className={`grid md:grid-cols-2 gap-12 items-center py-20 ${i < features.length - 1 ? "border-b border-white/5" : ""}`}
            >
              {/* Text */}
              <motion.div
                variants={isEven ? slideLeftVariants : slideRightVariants}
                className={isEven ? "" : "md:order-2"}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center mb-6 text-[#0066FF]">
                  {feature.icon}
                </div>
                <h2
                  className="text-white font-bold text-3xl mb-4"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {feature.title}
                </h2>
                <p className="text-[#8892A4] text-lg leading-relaxed mb-8">{feature.description}</p>

                <ul className="space-y-3 mb-8">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span className="text-[#B8C4D4] text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[#0066FF] font-semibold hover:text-[#1A7FFF] transition-colors group"
                >
                  See it in action <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Visual */}
              <motion.div
                variants={isEven ? slideRightVariants : slideLeftVariants}
                className={isEven ? "" : "md:order-1"}
              >
                <GlassCard className="p-8 aspect-[4/3] flex flex-col justify-between" hover={false}>
                  {/* Mock UI */}
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      {[...Array(3)].map((_, j) => (
                        <div
                          key={j}
                          className={`w-3 h-3 rounded-full ${j === 0 ? "bg-red-400/50" : j === 1 ? "bg-yellow-400/50" : "bg-green-400/50"}`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-[#0066FF]/20 flex items-center justify-center text-[#0066FF]">
                        {feature.icon}
                      </div>
                      <div>
                        <div className="h-3 w-28 bg-white/15 rounded-full mb-1.5" />
                        <div className="h-2 w-20 bg-white/8 rounded-full" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[80, 60, 90, 45].map((width, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 shrink-0" />
                        <div className="flex-1 space-y-1.5">
                          <div className="h-2.5 rounded-full bg-white/10" style={{ width: `${width}%` }} />
                          <div className="h-2 rounded-full bg-white/5" style={{ width: `${width * 0.6}%` }} />
                        </div>
                        <div className="h-6 w-12 rounded-lg bg-[#0066FF]/10 border border-[#0066FF]/15 flex items-center justify-center">
                          <div className="h-2 w-6 rounded-full bg-[#0066FF]/40" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                    <div className="flex-1 h-2 rounded-full bg-[#0066FF]/20 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "72%" }}
                        transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="h-full bg-[#0066FF] rounded-full"
                      />
                    </div>
                    <span className="text-[#8892A4] text-xs">72% complete</span>
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          );
        })}
      </section>

      <CTASection />
    </div>
  );
}
