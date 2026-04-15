"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown, ChevronUp, Zap } from "lucide-react";
import PricingCard from "@/components/PricingCard";
import CTASection from "@/components/CTASection";
import {
  staggerContainerVariants,
  staggerItemVariants,
  fadeUpVariants,
} from "@/lib/animations";

const plans = [
  {
    tier: "Foundation",
    price: "3 Ghost Employees",
    description:
      "For solo operators and small teams ready to automate their core workflows and stop leaving money on the table.",
    features: [
      "3 Ghost Employees",
      "Operations Dashboard (up to 5 users)",
      "Content Calendar & Scheduling",
      "Basic AI Assistant (pre-trained templates)",
      "CRM with up to 2,500 contacts",
      "Invoicing & Payment tracking",
      "10 automation workflows",
      "Email + chat support",
      "Onboarding call (2 hours)",
    ],
    cta: "Get Your Hidden Revenue Report",
  },
  {
    tier: "Growth",
    price: "7 Ghost Employees",
    description:
      "For scaling companies that need a full operational OS — custom AI, client portals, and advanced analytics.",
    features: [
      "7 Ghost Employees",
      "Everything in Foundation",
      "Unlimited team members",
      "Custom AI Assistant (trained on your data)",
      "Full Client Portal (branded)",
      "Advanced Analytics & Reporting",
      "Unlimited automation workflows",
      "Team management & HR tools",
      "20+ integrations",
      "Priority support + dedicated Slack channel",
      "White-glove onboarding (8 hours)",
      "Quarterly strategy reviews",
    ],
    cta: "Book a Strategy Call",
    popular: true,
  },
  {
    tier: "Enterprise",
    price: "Unlimited",
    description:
      "For multi-location businesses, agencies, and enterprises that need a fully bespoke, white-labeled operations platform.",
    features: [
      "Unlimited Ghost Employees",
      "Everything in Growth",
      "Fully custom-built workflows",
      "White-label and custom domain",
      "Custom AI models and training",
      "Dedicated implementation team",
      "SLA with 99.9% uptime guarantee",
      "Custom integrations and API access",
      "Multi-entity and multi-location support",
      "Executive reporting suite",
      "Monthly strategy sessions",
      "On-site training available",
    ],
    cta: "Contact Us",
    enterprise: true,
  },
];

const tableFeatures = [
  { feature: "Team members", foundation: "5", growth: "Unlimited", enterprise: "Unlimited" },
  { feature: "CRM contacts", foundation: "2,500", growth: "25,000", enterprise: "Unlimited" },
  { feature: "Automation workflows", foundation: "10", growth: "Unlimited", enterprise: "Unlimited" },
  { feature: "AI Assistant", foundation: "Templates only", growth: "Custom-trained", enterprise: "Custom models" },
  { feature: "Client Portal", foundation: false, growth: true, enterprise: true },
  { feature: "White-label", foundation: false, growth: false, enterprise: true },
  { feature: "Custom integrations", foundation: false, growth: false, enterprise: true },
  { feature: "Analytics & Reporting", foundation: "Basic", growth: "Advanced", enterprise: "Executive" },
  { feature: "Support", foundation: "Email + chat", growth: "Priority + Slack", enterprise: "Dedicated team" },
  { feature: "Onboarding", foundation: "2 hours", growth: "8 hours", enterprise: "Full team" },
  { feature: "Strategy sessions", foundation: false, growth: "Quarterly", enterprise: "Monthly" },
];

const faqs = [
  {
    q: "How does the pricing actually work?",
    a: "Every engagement is quote-based. We run a diagnostic on your business, identify where revenue is leaking, and propose a scope with a locked-in monthly investment. The price is always less than the role each Ghost Employee replaces — or we don't take the deal.",
  },
  {
    q: "Is there a setup fee?",
    a: "No setup fees. Your monthly investment covers everything — platform access, custom configuration, onboarding, and ongoing support.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. All engagements are month-to-month. We don't lock you into annual contracts (though we offer discounts for annual commitments if you choose).",
  },
  {
    q: "What does 'custom-built' actually mean?",
    a: "We don't hand you a generic SaaS login. Your Business OS is configured, branded, and automated to match how your specific business operates — by our team, before you ever log in.",
  },
  {
    q: "How long does setup take?",
    a: "Most clients are fully operational within 14–30 days. Enterprise clients with complex workflows typically take 30–60 days.",
  },
  {
    q: "What integrations are included?",
    a: "Growth and Enterprise plans include connections to Gmail, Outlook, Stripe, QuickBooks, Xero, HubSpot, Slack, Zapier, and 15+ more. Custom integrations are available for Enterprise.",
  },
  {
    q: "Do you offer refunds?",
    a: "If you're not satisfied in the first 30 days, we'll work to make it right or refund your first month. We stand behind the results.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-white/5 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-5">
        <p className="text-white font-medium pr-8">{q}</p>
        {open ? (
          <ChevronUp className="w-5 h-5 text-[#0066FF] shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#8892A4] shrink-0" />
        )}
      </div>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[#8892A4] pb-5 leading-relaxed">{a}</p>
        </motion.div>
      )}
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="bg-[#080D1A] min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0066FF]/6 blur-[120px] rounded-full" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div variants={staggerContainerVariants} initial="hidden" animate="visible">
            <motion.p variants={staggerItemVariants} className="badge badge-blue inline-flex mb-6">
              Quote-Based Partnership
            </motion.p>
            <motion.h1 variants={staggerItemVariants} className="display-lg text-white mb-6">
              Invest in Your{" "}
              <span className="gradient-text-blue">Operational Edge</span>
            </motion.h1>
            <motion.p variants={staggerItemVariants} className="text-[#8892A4] text-xl max-w-2xl mx-auto">
              If we find revenue you are not capturing, would it be worth a
              conversation? Every engagement is scoped and quoted to the leaks
              we find in your business — never more than the role it replaces.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-20"
        >
          {plans.map((plan, i) => (
            <motion.div key={plan.tier} variants={staggerItemVariants}>
              <PricingCard {...plan} />
            </motion.div>
          ))}
        </motion.div>

        {/* All plans include */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#D4A853]/10 border border-[#D4A853]/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#D4A853]" />
            </div>
            <h3 className="text-white font-bold text-xl" style={{ fontFamily: "var(--font-syne)" }}>
              All plans include
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Custom-configured platform",
              "SSL & SOC2-grade security",
              "Daily automated backups",
              "Mobile-responsive interface",
              "Data export anytime",
              "Software updates included",
              "NMC strategy methodology",
              "US-based support team",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#D4A853] shrink-0 mt-0.5" />
                <span className="text-[#B8C4D4] text-sm">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2
            className="text-white font-bold text-2xl mb-8 text-center"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Plan Comparison
          </h2>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 gap-0">
              <div className="p-4 border-b border-white/5 col-span-1">
                <span className="text-[#8892A4] text-sm font-medium">Feature</span>
              </div>
              {["Foundation", "Growth", "Enterprise"].map((tier) => (
                <div key={tier} className={`p-4 border-b border-white/5 text-center ${tier === "Growth" ? "bg-[#0066FF]/5" : ""}`}>
                  <span className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-syne)" }}>
                    {tier}
                    {tier === "Growth" && <span className="ml-2 badge badge-blue text-[10px] inline-flex">Popular</span>}
                  </span>
                </div>
              ))}
            </div>
            {tableFeatures.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-4 gap-0 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
              >
                <div className="p-4 border-b border-white/5">
                  <span className="text-[#B8C4D4] text-sm">{row.feature}</span>
                </div>
                {(["foundation", "growth", "enterprise"] as const).map((tier) => (
                  <div
                    key={tier}
                    className={`p-4 border-b border-white/5 text-center ${tier === "growth" ? "bg-[#0066FF]/5" : ""}`}
                  >
                    {typeof row[tier] === "boolean" ? (
                      row[tier] ? (
                        <Check className="w-4 h-4 text-[#0066FF] mx-auto" />
                      ) : (
                        <span className="text-[#8892A4] text-lg">—</span>
                      )
                    ) : (
                      <span className="text-[#B8C4D4] text-sm">{row[tier]}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2
            className="text-white font-bold text-2xl mb-8 text-center"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="glass rounded-2xl p-8">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </motion.div>
      </section>

      <CTASection />
    </div>
  );
}
