"use client";

import React, { useState, useRef, ReactNode } from "react";
import { motion } from "framer-motion";
import { cardHoverVariants } from "@/lib/animations";
import { useAudioHaptics } from "@/hooks/useAudioHaptics";

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
  const { playSound } = useAudioHaptics();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    playSound('hover');
  };

  const corners = (
    <>
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 rounded-tl-sm" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20 rounded-tr-sm" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20 rounded-bl-sm" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 rounded-br-sm" />
    </>
  );

  const crosshair = (
    <div 
      className="pointer-events-none absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
      style={{
        left: mousePos.x,
        top: mousePos.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="relative">
        {/* Dynamic Detection Box */}
        <motion.div 
          initial={{ scale: 2, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          className="absolute top-[-20px] left-[-20px] w-10 h-10 border border-blue-500/30 rounded-sm"
        >
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-400" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blue-400" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blue-400" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-400" />
        </motion.div>

        <div className="absolute top-0 left-[-10px] right-[-10px] h-[0.5px] bg-blue-500/40" />
        <div className="absolute left-0 top-[-10px] bottom-[-10px] w-[0.5px] bg-blue-500/40" />
        <div className="absolute top-[-4px] left-[-4px] w-2 h-2 border border-blue-500/60 rounded-full" />
        
        <div className="absolute top-[-35px] left-4 text-[8px] font-mono text-blue-500/80 whitespace-nowrap uppercase tracking-tighter">
          STATE: ACTIVE // SCANNING...
        </div>
        <div className="absolute top-[-25px] left-4 text-[8px] font-mono text-blue-500/60 whitespace-nowrap uppercase tracking-tighter">
          X:{Math.round(mousePos.x)} Y:{Math.round(mousePos.y)}
        </div>
      </div>
    </div>
  );

  const glowClasses = {
    blue: "hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(59,130,246,0.2),0_0_40px_rgba(59,130,246,0.08)]",
    gold: "hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,175,55,0.2),0_0_40px_rgba(212,175,55,0.08)]",
    none: "hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)]",
  };

  if (hover) {
    return (
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => playSound('hover')}
        onClick={() => {
          playSound('click');
          onClick?.();
        }}
        variants={cardHoverVariants}
        initial="rest"
        whileHover="hover"
        className={`glass group relative rounded-sm transition-all duration-300 ${glowClasses[glowColor]} ${className} ${onClick ? "cursor-pointer" : ""}`}
      >
        {crosshair}
        {corners}
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`glass relative rounded-sm ${className}`}>
      {corners}
      {children}
    </div>
  );
}
