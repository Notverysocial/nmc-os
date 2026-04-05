'use client';

import React from 'react';

export default function ScanLines() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Static very subtle vertical lines */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: 'linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '4px 100%'
        }}
      />
      
      {/* Moving scan sweep */}
      <div 
        className="absolute left-0 right-0 h-[100px] animate-scan-sweep"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(139, 159, 189, 0.08), transparent)',
          borderTop: '0.5px solid rgba(139, 159, 189, 0.15)',
          boxShadow: '0 0 15px rgba(26, 43, 80, 0.2)'
        }}
      />
    </div>
  );
}
