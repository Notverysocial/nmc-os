"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/animations";

export default function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#080D1A]" />
      <div className="absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/20 to-transparent" />
      </div>

      {/* Large orbs */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0066FF]/6 blur-[120px] pointer-events-none" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#D4A853]/4 blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2 badge badge-gold mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] animate-pulse" />
            Limited Spots Available
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="display-lg text-white mb-6"
          >
            Ready to Transform{" "}
            <span className="gradient-text-gold">Your Business?</span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="text-[#8892A4] text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Join forward-thinking companies using NMC Business OS to operate smarter, scale faster, and own every piece of their growth story.
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="flex items-center gap-2.5 px-8 py-4 bg-[#0066FF] text-white font-semibold rounded-xl hover:bg-[#1A7FFF] transition-all duration-200 hover:shadow-[0_0_40px_rgba(0,102,255,0.4)] text-base"
              >
                <Calendar className="w-5 h-5" />
                Book a Strategy Call
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/pricing"
                className="flex items-center gap-2.5 px-8 py-4 glass border border-white/10 text-white font-semibold rounded-xl hover:border-white/20 transition-all duration-200 text-base group"
              >
                View Pricing
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.p
            variants={fadeUpVariants}
            className="mt-8 text-[#8892A4] text-sm"
          >
            No long-term contracts. Cancel anytime. White-glove onboarding included.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
