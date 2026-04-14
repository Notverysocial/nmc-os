'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  animate?: boolean;
}

export default function Sparkline({ 
  data, 
  width = 100, 
  height = 30, 
  color = "#3b82f6",
  animate = true 
}: SparklineProps) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' L ');

  const pathData = `M ${points}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <motion.path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ 
          duration: animate ? 1.5 : 0, 
          ease: "easeInOut",
          delay: 0.2
        }}
        style={{ filter: `drop-shadow(0 0 4px ${color}40)` }}
      />
      {/* Animated Scan Indicator */}
      <motion.circle
        r="2"
        fill="#ffffff"
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ 
          offsetPath: `path('${pathData}')`,
          filter: "drop-shadow(0 0 6px #fff)"
        }}
      />
    </svg>
  );
}
