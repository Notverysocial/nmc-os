"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cardHoverVariants } from "@/lib/animations";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  badge?: string;
  className?: string;
  accent?: "blue" | "gold";
}

export default function FeatureCard({
  icon,
  title,
  description,
  badge,
  className = "",
  accent = "blue",
}: FeatureCardProps) {
  const accentColor = accent === "blue" ? "#0066FF" : "#D4A853";
  const accentBg = accent === "blue" ? "rgba(0, 102, 255, 0.1)" : "rgba(212, 168, 83, 0.1)";
  const accentBorder = accent === "blue" ? "rgba(0, 102, 255, 0.2)" : "rgba(212, 168, 83, 0.2)";

  return (
    <motion.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      className={`glass rounded-2xl p-6 group transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,102,255,0.15)] ${className}`}
    >
      {badge && (
        <div className="mb-4">
          <span
            className="badge text-xs font-semibold"
            style={{
              background: accentBg,
              border: `1px solid ${accentBorder}`,
              color: accentColor,
            }}
          >
            {badge}
          </span>
        </div>
      )}

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
        style={{ background: accentBg, border: `1px solid ${accentBorder}` }}
      >
        <div style={{ color: accentColor }}>{icon}</div>
      </div>

      <h3
        className="text-white font-bold text-lg mb-2.5"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {title}
      </h3>
      <p className="text-[#8892A4] text-sm leading-relaxed">{description}</p>

      {/* Hover accent line */}
      <div
        className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
        style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
      />
    </motion.div>
  );
}
