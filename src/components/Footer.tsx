"use client";

import { Link, Globe, X } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t font-mono" style={{ borderTopColor: "rgba(26,43,80,0.3)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* LEFT: Brand */}
          <div>
            <p className="text-white text-sm font-mono">NEXUS</p>
            <p className="text-[#666] text-xs font-mono mt-1">ENTERPRISE OS</p>
          </div>

          {/* CENTER: Nav links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-center items-start">
            {[
              { label: "Features", href: "#solution" },
              { label: "Pricing", href: "#pricing" },
              { label: "Industries", href: "#industries" },
              { label: "Contact", href: "#contact" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-[#666] text-xs font-mono hover:text-white transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* RIGHT: Login + social */}
          <div className="flex flex-col gap-3 md:items-end">
            <a
              href="https://app.newmindsetcontent.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#666] text-xs font-mono hover:text-white transition-colors duration-200"
            >
              Client Login
            </a>
            <div className="flex gap-4">
              <a href="#" aria-label="LinkedIn" className="text-[#666] hover:text-white transition-colors duration-200">
                <Link className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Instagram" className="text-[#666] hover:text-white transition-colors duration-200">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" aria-label="X" className="text-[#666] hover:text-white transition-colors duration-200">
                <X className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 mb-6 border-t" style={{ borderTopColor: "rgba(26,43,80,0.3)" }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <p className="text-[#444] text-xs font-mono">
            © 2026 NEXUS. BUILT BY NEON BEACH CLUB
          </p>
          <p className="text-[#444] text-xs font-mono">
            // LAST UPDATE: 2026.04.04
          </p>
        </div>
      </div>
    </footer>
  );
}
