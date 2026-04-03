"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#pricing", label: "Pricing" },
  { href: "#signals", label: "Signals" },
  { href: "#contact", label: "Contact" },
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
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: scrolled ? "rgba(0,0,0,0.92)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(26,43,80,0.3)" : "none",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "64px",
            }}
          >
            {/* Logo */}
            <button
              onClick={() => scrollTo("#hero")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-jetbrains)",
                fontSize: "16px",
                fontWeight: 600,
                color: "#ffffff",
                letterSpacing: "0.1em",
                padding: "0",
              }}
            >
              NMC
            </button>

            {/* Desktop Nav */}
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
              className="hidden md:flex"
            >
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-inter)",
                    fontSize: "13px",
                    color: "#666666",
                    padding: "8px 14px",
                    letterSpacing: "0.02em",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right — Client Login */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }} className="hidden md:flex">
              <a
                href="https://app.newmindsetcontent.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  color: "#666666",
                  textDecoration: "none",
                  padding: "7px 16px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  letterSpacing: "0.02em",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#666666";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                }}
              >
                Client Login
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#666666",
                padding: "8px",
              }}
              className="md:hidden"
            >
              {mobileOpen ? <X size={20} color="#ffffff" /> : <Menu size={20} color="#666666" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: "64px",
              left: "16px",
              right: "16px",
              zIndex: 40,
              background: "rgba(0,0,0,0.97)",
              border: "1px solid rgba(26,43,80,0.4)",
              padding: "1.5rem",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                >
                  <button
                    onClick={() => scrollTo(link.href)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "var(--font-inter)",
                      fontSize: "15px",
                      color: "#999999",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(26,43,80,0.2)",
                    }}
                  >
                    {link.label}
                  </button>
                </motion.div>
              ))}
              <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "8px" }}>
                <button
                  onClick={() => scrollTo("#contact")}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "#ffffff",
                    color: "#000000",
                    border: "none",
                    fontFamily: "var(--font-inter)",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Book a Strategy Call
                </button>
                <a
                  href="https://app.newmindsetcontent.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "12px",
                    background: "transparent",
                    color: "#666666",
                    border: "1px solid rgba(26,43,80,0.4)",
                    fontFamily: "var(--font-inter)",
                    fontSize: "14px",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
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
