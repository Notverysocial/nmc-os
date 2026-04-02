"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ArrowRight, Mail, X, Globe, Share2 } from "lucide-react";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/animations";

const footerLinks = {
  Platform: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Integrations", href: "#features" },
  ],
  Company: [
    { label: "About NMC", href: "#about" },
    { label: "Contact Us", href: "#contact" },
    { label: "Book a Call", href: "#contact" },
    { label: "newmindsetcontent.com", href: "https://newmindsetcontent.com" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-[#040810] border-t border-white/5 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-6 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-[#0066FF] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,102,255,0.5)] transition-all">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-base" style={{ fontFamily: "var(--font-syne)" }}>
                  NMC Business OS
                </span>
                <span className="text-[10px] text-[#8892A4] tracking-[0.12em] uppercase font-medium">
                  by New Mindset Content
                </span>
              </div>
            </Link>
            <p className="text-[#8892A4] text-sm leading-relaxed max-w-xs mb-8">
              An AI-powered operations platform built for growth-stage companies ready to scale without the chaos.
            </p>

            {/* Newsletter */}
            <div className="mb-8">
              <p className="text-white text-sm font-semibold mb-3">Stay in the loop</p>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 px-4 py-2.5 glass rounded-lg border border-white/08">
                  <Mail className="w-4 h-4 text-[#8892A4] shrink-0" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="bg-transparent text-sm text-white placeholder-[#8892A4] outline-none w-full"
                  />
                </div>
                <button className="px-4 py-2.5 bg-[#0066FF] text-white rounded-lg text-sm font-semibold hover:bg-[#1A7FFF] transition-colors hover:shadow-[0_0_15px_rgba(0,102,255,0.4)]">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: X, href: "#", label: "X (Twitter)" },
                { icon: Globe, href: "#", label: "LinkedIn" },
                { icon: Share2, href: "#", label: "Instagram" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 glass rounded-lg flex items-center justify-center text-[#8892A4] hover:text-white hover:border-[#0066FF]/30 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-white font-semibold text-sm mb-5">{category}</p>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[#8892A4] text-sm hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8892A4] text-xs">
            © {new Date().getFullYear()} New Mindset Content. All rights reserved.
          </p>
          <p className="text-[#8892A4] text-xs flex items-center gap-1.5">
            Powered by{" "}
            <span className="text-[#D4A853] font-semibold">NBC Studio</span>
            <span className="w-1 h-1 rounded-full bg-[#D4A853] inline-block" />
            Built for growth
          </p>
        </div>
      </div>
    </footer>
  );
}
