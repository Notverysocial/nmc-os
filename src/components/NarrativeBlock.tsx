"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

interface NarrativeBlockProps { id: string; metadataLabel?: string; children: React.ReactNode; }

export default function NarrativeBlock({ id, metadataLabel, children }: NarrativeBlockProps) {
  return (
    <motion.div id={id} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} style={{ position: "relative" }}>
      {metadataLabel && (
        <div style={{ fontFamily: "var(--font-jetbrains)", fontSize: "9px", letterSpacing: "0.15em", color: "rgba(100,140,200,0.4)", textTransform: "uppercase", marginBottom: "2.5rem" }}>{metadataLabel}</div>
      )}
      <div className="narrative-prose" style={{ fontFamily: "var(--font-inter)", fontSize: "17px", lineHeight: 1.95, letterSpacing: "0.3px", color: "#cccccc", maxWidth: "65ch" }}>{children}</div>
    </motion.div>
  );
}
