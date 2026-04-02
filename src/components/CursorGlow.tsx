'use client';
import { useEffect, useState } from 'react';
export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);
  return <div className="fixed pointer-events-none" style={{ left: pos.x - 150, top: pos.y - 150, width: 300, height: 300, background: 'radial-gradient(circle, rgba(26,43,80,0.12) 0%, transparent 70%)', borderRadius: '50%', zIndex: 9997, transition: 'left 0.08s ease-out, top 0.08s ease-out' }} />;
}
