"use client";

import { motion } from "framer-motion";
import { cardHoverVariants } from "@/lib/animations";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glowColor?: "blue" | "gold" | "none";
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
  glowColor = "none",
  onClick,
}: GlassCardProps) {
  const glowClasses = {
    blue: "hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,102,255,0.2),0_0_40px_rgba(0,102,255,0.08)]",
    gold: "hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,168,83,0.2)]",
    none: "hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.06)]",
  };

  if (hover) {
    return (
      <motion.div
        variants={cardHoverVariants}
        initial="rest"
        whileHover="hover"
        onClick={onClick}
        className={`glass rounded-2xl transition-all duration-300 ${glowClasses[glowColor]} ${className} ${onClick ? "cursor-pointer" : ""}`}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`glass rounded-2xl ${className}`}>
      {children}
    </div>
  );
}
