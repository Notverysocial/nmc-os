"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "NMC Business OS completely transformed how we run our staffing agency. We went from drowning in spreadsheets to having everything automated. Our placements are up 40% and I actually have time to think strategically again.",
    author: "Marcus Thompson",
    role: "CEO",
    company: "Apex Talent Group",
    industry: "Staffing & Recruiting",
    metric: "40% more placements",
  },
  {
    quote:
      "The content engine alone is worth 10x what we pay. We're publishing three times as much content, our social engagement is through the roof, and the AI assistants handle 80% of our client communication drafts. It's like having a full marketing team.",
    author: "Priya Sharma",
    role: "Founder",
    company: "Meridian Properties",
    industry: "Real Estate",
    metric: "3x content output",
  },
  {
    quote:
      "I was skeptical at first — I've tried a dozen different tools. But NMC actually built us a system that works the way our business works, not the other way around. The analytics dashboard showed us we were leaving $200K on the table every quarter.",
    author: "James Calloway",
    role: "COO",
    company: "Brightline Commerce",
    industry: "E-commerce",
    metric: "$200K recovered revenue",
  },
  {
    quote:
      "Our client portal is now something we actually showcase to prospects as a differentiator. The invoicing and project management flows saved our team at least 15 hours a week. The ROI was obvious within 60 days.",
    author: "Sofia Reyes",
    role: "Managing Director",
    company: "Peak Advisory",
    industry: "Financial Services",
    metric: "15 hrs/week saved",
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
  };

  useEffect(() => {
    if (autoplay) startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoplay]);

  const navigate = (dir: "prev" | "next") => {
    setAutoplay(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrent((prev) =>
      dir === "next"
        ? (prev + 1) % testimonials.length
        : (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const t = testimonials[current];

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Quote mark */}
      <div className="absolute -top-8 -left-4 opacity-10">
        <Quote className="w-20 h-20 text-[#0066FF] fill-[#0066FF]" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-3xl p-10 md:p-14"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Stars */}
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-[#D4A853] fill-[#D4A853]" />
            ))}
          </div>

          <blockquote className="text-white text-xl md:text-2xl leading-relaxed font-light mb-8" style={{ fontFamily: "var(--font-syne)" }}>
            "{t.quote}"
          </blockquote>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              {/* Avatar placeholder */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0066FF] to-[#1A7FFF] flex items-center justify-center text-white font-bold text-lg">
                {t.author[0]}
              </div>
              <div>
                <p className="text-white font-semibold">{t.author}</p>
                <p className="text-[#8892A4] text-sm">{t.role}, {t.company}</p>
                <p className="text-[#8892A4] text-xs mt-0.5">{t.industry}</p>
              </div>
            </div>

            <div className="px-4 py-2 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/20">
              <p className="text-[#6699FF] text-sm font-semibold">{t.metric}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-between mt-8">
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setAutoplay(false); setCurrent(i); }}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-8 h-2 bg-[#0066FF]"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("prev")}
            className="w-10 h-10 glass rounded-xl flex items-center justify-center text-[#8892A4] hover:text-white hover:border-white/20 transition-all border border-white/06"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate("next")}
            className="w-10 h-10 glass rounded-xl flex items-center justify-center text-[#8892A4] hover:text-white hover:border-white/20 transition-all border border-white/06"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
