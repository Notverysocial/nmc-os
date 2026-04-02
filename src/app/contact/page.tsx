"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Send,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import {
  staggerContainerVariants,
  staggerItemVariants,
  fadeUpVariants,
  slideLeftVariants,
  slideRightVariants,
} from "@/lib/animations";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    revenue: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#080D1A] min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-15" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0066FF]/6 blur-[120px] rounded-full" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div variants={staggerContainerVariants} initial="hidden" animate="visible">
            <motion.p variants={staggerItemVariants} className="badge badge-blue inline-flex mb-6">
              Let's Talk
            </motion.p>
            <motion.h1 variants={staggerItemVariants} className="display-lg text-white mb-4">
              Start the Conversation
            </motion.h1>
            <motion.p variants={staggerItemVariants} className="text-[#8892A4] text-xl">
              Tell us about your business and we'll show you exactly what your custom OS would look like.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <motion.div
            variants={slideLeftVariants}
            initial="hidden"
            animate="visible"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-[#0066FF]" />
                </div>
                <h3
                  className="text-white font-bold text-2xl mb-3"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Message Received
                </h3>
                <p className="text-[#8892A4] leading-relaxed">
                  Our team will be in touch within one business day. In the meantime, feel free to browse our case studies to see what we've built for businesses like yours.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-8 space-y-5"
              >
                <h2
                  className="text-white font-bold text-xl mb-2"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Tell us about your business
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#8892A4] text-xs font-medium uppercase tracking-wide block mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#8892A4] text-sm focus:outline-none focus:border-[#0066FF]/50 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-[#8892A4] text-xs font-medium uppercase tracking-wide block mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#8892A4] text-sm focus:outline-none focus:border-[#0066FF]/50 transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#8892A4] text-xs font-medium uppercase tracking-wide block mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#8892A4] text-sm focus:outline-none focus:border-[#0066FF]/50 transition-colors"
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label className="text-[#8892A4] text-xs font-medium uppercase tracking-wide block mb-2">
                    Annual Revenue Range
                  </label>
                  <select
                    value={formData.revenue}
                    onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0D1424] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#0066FF]/50 transition-colors"
                  >
                    <option value="">Select a range</option>
                    <option value="under500k">Under $500K</option>
                    <option value="500k-1m">$500K – $1M</option>
                    <option value="1m-5m">$1M – $5M</option>
                    <option value="5m-10m">$5M – $10M</option>
                    <option value="10m+">$10M+</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#8892A4] text-xs font-medium uppercase tracking-wide block mb-2">
                    What's your biggest operational challenge?
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#8892A4] text-sm focus:outline-none focus:border-[#0066FF]/50 transition-colors resize-none"
                    placeholder="Tell us what's slowing you down..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#0066FF] text-white font-semibold rounded-xl hover:bg-[#1A7FFF] transition-all hover:shadow-[0_0_30px_rgba(0,102,255,0.4)]"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </motion.button>

                <p className="text-[#8892A4] text-xs text-center">
                  We respond within one business day.
                </p>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            variants={slideRightVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Book a call */}
            <div className="glass rounded-2xl p-7 border border-[#0066FF]/15">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#0066FF]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold" style={{ fontFamily: "var(--font-syne)" }}>
                    Book a Strategy Call
                  </h3>
                  <p className="text-[#8892A4] text-xs">30-minute discovery session</p>
                </div>
              </div>
              <p className="text-[#8892A4] text-sm mb-5 leading-relaxed">
                Skip the back-and-forth. Book directly on our calendar and come ready to talk operations.
              </p>
              {/* Calendly embed placeholder */}
              <div className="aspect-[4/3] glass-strong rounded-xl flex items-center justify-center border border-white/5">
                <div className="text-center p-6">
                  <Calendar className="w-10 h-10 text-[#0066FF]/40 mx-auto mb-3" />
                  <p className="text-[#8892A4] text-sm font-medium mb-2">Calendly Booking</p>
                  <p className="text-[#8892A4] text-xs mb-4">Select a time that works for you</p>
                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0066FF] text-white text-sm font-semibold rounded-lg hover:bg-[#1A7FFF] transition-colors"
                  >
                    Open Calendar <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact info */}
            <div className="glass rounded-2xl p-7 space-y-5">
              <h3
                className="text-white font-semibold mb-5"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Direct Contact
              </h3>
              {[
                {
                  icon: <Mail className="w-4 h-4" />,
                  label: "Email",
                  value: "hello@newmindsetcontent.com",
                  link: "mailto:hello@newmindsetcontent.com",
                },
                {
                  icon: <Phone className="w-4 h-4" />,
                  label: "Phone",
                  value: "+1 (555) 000-0000",
                  link: "tel:+15550000000",
                },
                {
                  icon: <MapPin className="w-4 h-4" />,
                  label: "Location",
                  value: "Remote-first, US-based team",
                  link: null,
                },
              ].map(({ icon, label, value, link }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0066FF]/10 border border-[#0066FF]/15 flex items-center justify-center text-[#0066FF] shrink-0 mt-0.5">
                    {icon}
                  </div>
                  <div>
                    <p className="text-[#8892A4] text-xs mb-0.5">{label}</p>
                    {link ? (
                      <a
                        href={link}
                        className="text-white text-sm hover:text-[#0066FF] transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-white text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Response time */}
            <div className="glass rounded-2xl p-6 border border-[#D4A853]/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white text-sm font-semibold">We're responsive</span>
              </div>
              <p className="text-[#8892A4] text-sm">
                Average response time: <span className="text-[#D4A853] font-medium">under 4 hours</span> during business days.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
