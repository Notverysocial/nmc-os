'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KernelTooltipProps {
  children: React.ReactNode;
  metadata: {
    label: string;
    value: string;
    status?: 'OPTIMAL' | 'STABLE' | 'SYNCING';
  }[];
}

export default function KernelTooltip({ children, metadata }: KernelTooltipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setPos({ x: e.clientX + 15, y: e.clientY + 15 });
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            style={{ 
              position: 'fixed',
              left: pos.x,
              top: pos.y,
              zIndex: 200,
              pointerEvents: 'none'
            }}
            className="bg-black/90 backdrop-blur-xl border border-blue-500/20 p-3 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] min-w-[180px]"
          >
            <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[9px] font-mono text-white/40 tracking-[0.2em] uppercase">
                Kernel_Metadata_Audit
              </span>
            </div>
            
            <div className="space-y-2">
              {metadata.map((item, i) => (
                <div key={i} className="flex justify-between items-center gap-4">
                  <span className="text-[8px] font-mono text-white/30 uppercase">{item.label}</span>
                  <span className={`text-[9px] font-mono tracking-wider ${
                    item.status === 'STABLE' ? 'text-green-400' : 
                    item.status === 'SYNCING' ? 'text-blue-400 animate-pulse' : 
                    'text-white/70'
                  }`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-2 pt-2 border-t border-white/5 text-[7px] font-mono text-white/10 flex justify-between">
              <span>REF_ID: 0x4f2a</span>
              <span>PARITY: OK</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
