'use client';

import React, { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

interface AnimatedCounterProps {
  value?: number;
  end?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  end,
  suffix = '',
  prefix = '',
  duration = 2,
}: AnimatedCounterProps) {
  const targetValue = value ?? end ?? 0;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (inView && ref.current) {
      const node = ref.current;
      const controls = animate(0, targetValue, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          const formatted = latest.toFixed(targetValue % 1 === 0 ? 0 : 1);
          node.textContent = `${prefix}${formatted}${suffix}`;
        }
      });
      return () => controls.stop();
    }
  }, [inView, targetValue, prefix, suffix, duration]);

  return <span ref={ref} className="tabular-nums">{prefix}0{suffix}</span>;
}
