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
    blue: "hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(139,92,246,0.2),0_0_40px_rgba(139,92,246,0.08)]",
    gold: "hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(139,92,246,0.2),0_0_40px_rgba(139,92,246,0.08)]",
    none: "hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(139,92,246,0.1)]",
  };

  const corners = (
    <>
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20 rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20 rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 rounded-br-lg" />
    </>
  );

  if (hover) {
    return (
      <motion.div
        variants={cardHoverVariants}
        initial="rest"
        whileHover="hover"
        onClick={onClick}
        className={`glass relative rounded-2xl transition-all duration-300 ${glowClasses[glowColor]} ${className} ${onClick ? "cursor-pointer" : ""}`}
      >
        {corners}
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`glass relative rounded-2xl ${className}`}>
      {corners}
      {children}
    </div>
  );
}
