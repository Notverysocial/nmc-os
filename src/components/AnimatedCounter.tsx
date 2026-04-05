'use client';

import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, motion } from 'framer-motion';

interface AnimatedCounterProps {
  value?: number;
  end?: number; // Alias for value to support existing usage
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  end,
  suffix = '',
  prefix = '',
  duration = 2.5,
}: AnimatedCounterProps) {
  const targetValue = value ?? end ?? 0;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(targetValue);
    }
  }, [inView, targetValue, motionValue]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        // Handle decimals if necessary, otherwise floor
        const formatted = latest.toFixed(targetValue % 1 === 0 ? 0 : 1);
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix, targetValue]);

  return <span ref={ref} className="tabular-nums">0{suffix}</span>;
}
