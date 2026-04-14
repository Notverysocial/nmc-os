'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioHaptics } from '../hooks/useAudioHaptics';
import KernelTooltip from './KernelTooltip';

const sectors = [
  { id: 'video-intro', num: '00', label: 'INTRO' },
  { id: 'hero', num: '01', label: 'HERO' },
  { id: 'problem', num: '02', label: 'PROBLEM' },
  { id: 'cost', num: '03', label: 'AGITATION' },
  { id: 'solution', num: '04', label: 'SOLUTION' },
  { id: 'mechanism', num: '05', label: 'MECHANISM' },
  { id: 'case-studies', num: '06', label: 'INDUSTRIES' },
  { id: 'quiz', num: '07', label: 'DIAGNOSTIC' },
  { id: 'pricing', num: '08', label: 'PRICING' },
  { id: 'testimonials', num: '09', label: 'SIGNALS' },
  { id: 'onboarding', num: '10', label: 'ONBOARDING' },
  { id: 'contact', num: '11', label: 'CONNECT' },
];

export default function TaskSwitcher() {
  const [activeSector, setActiveSector] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const { playSound } = useAudioHaptics();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
      
      for (const sector of [...sectors].reverse()) {
        const el = document.getElementById(sector.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.3) {
          setActiveSector(sector.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    playSound('click');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -40, opacity: 0 }}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-3"
        >
          {sectors.map((s) => (
            <KernelTooltip
              key={s.id}
              metadata={[
                { label: 'STATUS', value: 'STABLE', status: 'STABLE' },
                { label: 'LATENCY', value: `${Math.floor(Math.random() * 5 + 8)}MS` },
                { label: 'NODE_ID', value: `0x${s.num}F2` }
              ]}
            >
              <button
                onClick={() => scrollTo(s.id)}
                onMouseEnter={() => playSound('hover')}
                className="group relative flex items-center gap-4"
              >
                <div className={`
                  w-[1px] h-4 transition-all duration-300
                  ${activeSector === s.id ? 'bg-blue-500 h-6 scale-y-125' : 'bg-white/10 group-hover:bg-white/30'}
                `} />
                
                <span className={`
                  font-mono text-[9px] transition-all duration-300 tracking-widest
                  ${activeSector === s.id ? 'text-blue-400 opacity-100' : 'text-white/20 opacity-0 group-hover:opacity-40'}
                `}>
                  SEC.{s.num} // {s.label}
                </span>

                {activeSector === s.id && (
                  <motion.div 
                    layoutId="indicator"
                    className="absolute -left-1 w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                  />
                )}
              </button>
            </KernelTooltip>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
