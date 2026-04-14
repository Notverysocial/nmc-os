"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

const VIDEO_URL = "https://ag70nigpmfghzu34.public.blob.vercel-storage.com/Untitled%20design%20(56).mp4";

export default function VideoHero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => { setIsPlaying(true); setTimeout(() => videoRef.current?.play(), 100); };
  const handlePause = () => { if (videoRef.current?.paused) { videoRef.current.play(); } else { videoRef.current?.pause(); } };

  return (
    <section style={{ position: "relative", width: "100%", background: "#000", borderBottom: "1px solid rgba(26,43,80,0.3)", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem 0" }}>
        <div style={{ fontFamily: "var(--font-jetbrains)", fontSize: "10px", letterSpacing: "0.15em", color: "rgba(100,140,200,0.6)", textTransform: "uppercase", marginBottom: "0.75rem", textAlign: "center" }}>
          // CLASSIFIED_BRIEFING \u2014 WATCH BEFORE SCROLLING
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}
          style={{ position: "relative", width: "100%", paddingBottom: "56.25%", background: "#0a0a0a", border: "1px solid rgba(26,43,80,0.4)", overflow: "hidden" }}>
          <video ref={videoRef} src={VIDEO_URL} preload="metadata" playsInline onClick={handlePause}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: isPlaying ? "block" : "none", cursor: "pointer" }}
            onEnded={() => setIsPlaying(false)} />
          {!isPlaying && (
            <div onClick={handlePlay} style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "radial-gradient(ellipse at center, rgba(26,43,80,0.1) 0%, #000 70%)" }}>
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                style={{ width: "80px", height: "80px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}>
                <div style={{ width: 0, height: 0, borderTop: "14px solid transparent", borderBottom: "14px solid transparent", borderLeft: "22px solid #ffffff", marginLeft: "4px" }} />
              </motion.div>
              <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "11px", color: "#888", letterSpacing: "0.12em", textTransform: "uppercase" }}>Play Briefing</span>
            </div>
          )}
        </motion.div>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", padding: "1rem 0 2rem" }}>
          {[{ label: "CLEARANCE", value: "PUBLIC" }, { label: "FORMAT", value: "BRIEFING" }, { label: "STATUS", value: "LIVE" }].map((item, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-jetbrains)", fontSize: "9px", color: "rgba(100,140,200,0.5)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "2px" }}>{item.label}</div>
              <div style={{ fontFamily: "var(--font-jetbrains)", fontSize: "12px", color: "#888", letterSpacing: "0.08em" }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
