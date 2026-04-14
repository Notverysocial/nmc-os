"use client";

import { useEffect, useState } from "react";

export default function NeuralCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div style={{ position: "fixed", left: pos.x - 120, top: pos.y - 120, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,43,80,0.15) 0%, transparent 70%)", pointerEvents: "none", zIndex: 50, transition: "left 0.08s ease-out, top 0.08s ease-out", mixBlendMode: "screen" }} />
  );
}
