'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOG_MESSAGES = [
  '[OK] LEAD_SCOUT_NODE_04 ACTIVE',
  '[LOG] 12 REPLIES CATEGORIZED',
  '[SYNC] PIPELINE_ENGINE OVERFLOW CHECK: PASS',
  '[OK] WORKSPACE_SYNCED (4ms)',
  '[INFO] AGENT_CONTENT_WRITER: DRAFT_03 READY',
  '[DEBUG] LATENCY_CHECK: 12ms',
  '[SYNC] INTELLIGENCE_DESK DATA_REFRESH',
  '[OK] SYSTEM_OPTIMIZATION #47 DEPLOYED',
  '[WARN] HIGH_LOAD: AGENT_SOURCE_MANAGER (IGNORE)',
  '[OK] DATABASE_COMMIT_SUCCESS',
];

export default function LiveFeed() {
  const [logs, setLogs] = useState<string[]>([]);
  const logIndex = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextLog = LOG_MESSAGES[logIndex.current];
      setLogs((prev) => [...prev.slice(-4), nextLog]); // Keep only last 5 logs
      logIndex.current = (logIndex.current + 1) % LOG_MESSAGES.length;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      whileDrag={{ cursor: "grabbing", scale: 1.02 }}
      className="fixed bottom-8 left-8 z-[100] pointer-events-auto hidden md:block cursor-grab active:cursor-grabbing"
    >
      <div className="bg-black/80 backdrop-blur-xl border border-blue-500/10 p-4 rounded-sm w-[280px] shadow-[0_0_30px_rgba(30,58,138,0.1)]">
        <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">
            // System Live Log
          </span>
        </div>
        
        <div className="space-y-2 h-[80px] overflow-hidden flex flex-col justify-end">
          <AnimatePresence mode="popLayout">
            {logs.map((log, i) => (
              <motion.div
                key={`${log}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-[9px] font-mono text-white/50 tracking-tight whitespace-nowrap"
              >
                {log}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
