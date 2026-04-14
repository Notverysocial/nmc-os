'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

export default function ScrollTape() {
  const { scrollYProgress } = useScroll();
  const [bitrate, setBitrate] = useState(124);

  // Map scroll progress to a technical 'bitrate'
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const syncLabel = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [syncValue, setSyncValue] = useState(0);

  useMotionValueEvent(syncLabel, "change", (latest) => {
    setSyncValue(Math.round(latest));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setBitrate(Math.floor(Math.random() * 20) + 120);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      style={{ opacity }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] h-[300px] w-[2px] bg-white/5 hidden xl:block"
    >
      <div className="relative h-full flex flex-col justify-between items-center py-4">
        <div className="absolute top-0 right-4 text-[10px] font-mono text-white/20 whitespace-nowrap rotate-90 origin-right tracking-widest uppercase">
          // SYNC_BITRATE: {bitrate}kbps
        </div>

        <motion.div 
          style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
          className="absolute inset-x-0 top-0 bg-blue-500/40"
        />

        <div className="absolute bottom-0 right-4 text-[10px] font-mono text-white/20 whitespace-nowrap rotate-90 origin-right tracking-widest uppercase">
          COORD_Y: {syncValue}%
        </div>
      </div>
    </motion.div>
  );
}
