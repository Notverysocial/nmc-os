"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { cardHoverVariants } from "@/lib/animations";

interface PricingCardProps {
  tier: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  enterprise?: boolean;
}

export default function PricingCard({
  tier,
  price,
  period = "/mo",
  description,
  features,
  cta,
  popular = false,
  enterprise = false,
}: PricingCardProps) {
  return (
    <motion.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      className={`relative rounded-2xl p-8 transition-all duration-300 flex flex-col ${
        popular
          ? "bg-gradient-to-b from-[#0D1E3D] to-[#0D1424] border border-[#0066FF]/30 shadow-[0_0_60px_rgba(0,102,255,0.15)]"
          : "glass"
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#0066FF] text-white text-xs font-bold rounded-full tracking-wide uppercase">
            <Zap className="w-3 h-3 fill-white" />
            Most Popular
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-white font-bold text-xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {tier}
          </h3>
          {popular && (
            <span className="badge badge-blue text-[10px]">Recommended</span>
          )}
        </div>

        <div className="flex items-end gap-1 mb-3">
          {enterprise ? (
            <span
              className="text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Custom
            </span>
          ) : (
            <>
              <span
                className="text-4xl font-bold text-white"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {price}
              </span>
              <span className="text-[#8892A4] mb-1.5">{period}</span>
            </>
          )}
        </div>

        <p className="text-[#8892A4] text-sm leading-relaxed">{description}</p>
      </div>

      <ul className="space-y-3 flex-1 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                popular
                  ? "bg-[#0066FF]/20 border border-[#0066FF]/30"
                  : "bg-white/5 border border-white/10"
              }`}
            >
              <Check
                className={`w-3 h-3 ${popular ? "text-[#0066FF]" : "text-[#8892A4]"}`}
              />
            </div>
            <span className="text-[#B8C4D4] text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link
          href="/contact"
          className={`block w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
            popular
              ? "bg-[#0066FF] text-white hover:bg-[#1A7FFF] hover:shadow-[0_0_25px_rgba(0,102,255,0.4)]"
              : "glass border border-white/10 text-white hover:border-white/20"
          }`}
        >
          {cta}
        </Link>
      </motion.div>
    </motion.div>
  );
}
