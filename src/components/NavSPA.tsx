"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, LogIn } from "lucide-react";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#about", label: "About" },
];

export default function NavSPA() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-strong shadow-[0_1px_0_rgba(255,255,255,0.05)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <button
              onClick={() => scrollTo("#hero")}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,102,255,0.5)] transition-all duration-300">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-white font-bold text-sm tracking-tight"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  NMC
                </span>
                <span className="text-[10px] text-[#8892A4] tracking-[0.12em] uppercase font-medium">
                  Business OS
                </span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="px-4 py-2 text-sm text-[#8892A4] hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5 font-medium"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://app.newmindsetcontent.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-[#8892A4] hover:text-white transition-colors font-medium px-3 py-2 rounded-lg hover:bg-white/5"
              >
                <LogIn className="w-3.5 h-3.5" />
                Client Login
              </a>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("#contact")}
                className="px-5 py-2.5 bg-[#0066FF] text-white text-sm font-semibold rounded-lg hover:bg-[#1A7FFF] transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,102,255,0.4)]"
              >
                Book a Call
              </motion.button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-[#8892A4] hover:text-white transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-[72px] left-4 right-4 z-40 glass-strong rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                >
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="block w-full text-left px-4 py-3 text-[#B8C4D4] hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium"
                  >
                    {link.label}
                  </button>
                </motion.div>
              ))}
              <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                <button
                  onClick={() => scrollTo("#contact")}
                  className="block w-full text-center px-4 py-3 bg-[#0066FF] text-white font-semibold rounded-xl hover:bg-[#1A7FFF] transition-colors"
                >
                  Book a Strategy Call
                </button>
                <a
                  href="https://app.newmindsetcontent.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full text-center px-4 py-3 glass border border-white/10 text-[#8892A4] font-medium rounded-xl hover:text-white transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Client Login
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
