"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Target,
  Users,
  Lightbulb,
  Heart,
  Award,
  ArrowRight,
  Zap,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import GlassCard from "@/components/GlassCard";
import {
  staggerContainerVariants,
  staggerItemVariants,
  fadeUpVariants,
  slideLeftVariants,
  slideRightVariants,
} from "@/lib/animations";

const values = [
  {
    icon: <Target className="w-5 h-5" />,
    title: "Precision Over Volume",
    description:
      "We build precise systems that do exactly what your business needs — not bloated platforms that overwhelm your team.",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Client-First Always",
    description:
      "Every design decision, every automation, every dashboard is built to serve your team and your clients — not us.",
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Journalism Standards",
    description:
      "We bring newsroom-grade rigor to business content. Every story, every report tells the truth and earns attention.",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Long-Term Partnership",
    description:
      "We measure success by your growth, not our contract length. Your wins are our case studies.",
  },
];

const team = [
  {
    name: "Antonio Middleton",
    role: "Founder & CEO",
    bio: "Built New Mindset Content after spending a decade in brand journalism and digital operations. Obsessed with finding the intersection of great storytelling and intelligent systems.",
    bg: "from-[#0066FF] to-[#1A7FFF]",
  },
  {
    name: "Operations Lead",
    role: "Head of Platform",
    bio: "Former VP of Operations at a Series B SaaS company. Joined NMC to bring enterprise-grade thinking to growth-stage businesses.",
    bg: "from-[#D4A853] to-[#E0BC73]",
  },
  {
    name: "Strategy Director",
    role: "Client Success",
    bio: "10 years helping mid-market companies scale their marketing operations. Specializes in content strategy, brand voice, and audience development.",
    bg: "from-[#0D1E3D] to-[#1A2640]",
  },
];

const timeline = [
  {
    year: "2018",
    event: "Founded",
    description: "New Mindset Content launched as a brand journalism agency, helping B2B companies tell better stories.",
  },
  {
    year: "2020",
    event: "First OS Build",
    description: "Built a custom operations system for our first enterprise client — discovered the transformative power of unified ops.",
  },
  {
    year: "2022",
    event: "Product Launch",
    description: "Launched the Business OS as a standalone service after seeing consistent, dramatic results across clients.",
  },
  {
    year: "2024",
    event: "200+ Clients",
    description: "Crossed 200 active Business OS clients across staffing, real estate, e-commerce, and professional services.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#080D1A] min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#0066FF]/6 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div variants={staggerContainerVariants} initial="hidden" animate="visible">
              <motion.p variants={staggerItemVariants} className="badge badge-gold inline-flex mb-6">
                Our Story
              </motion.p>
              <motion.h1 variants={staggerItemVariants} className="display-lg text-white mb-6">
                Built by Operators,{" "}
                <span className="gradient-text-blue">for Operators</span>
              </motion.h1>
              <motion.p variants={staggerItemVariants} className="text-[#8892A4] text-xl leading-relaxed">
                New Mindset Content started as a brand journalism agency. We kept hitting the same wall: our clients had great stories to tell but chaotic operations underneath. So we built the fix.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 gap-16 items-center mb-28"
        >
          <motion.div variants={slideLeftVariants}>
            <p className="badge badge-blue inline-flex mb-6">The Mission</p>
            <h2
              className="text-white font-bold text-3xl mb-6"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Every Great Business Deserves Great Infrastructure
            </h2>
            <p className="text-[#8892A4] leading-relaxed mb-5 text-lg">
              We believe that the difference between a good business and a great one isn't the idea — it's the infrastructure. The systems that run quietly in the background, making sure nothing slips, every client is served, and every opportunity is captured.
            </p>
            <p className="text-[#8892A4] leading-relaxed mb-5">
              Before NMC Business OS, that kind of infrastructure was reserved for enterprise companies with 10-person ops teams. We changed that. Now any growth-stage business can operate with the same precision and intelligence as a Fortune 500 — at a fraction of the cost.
            </p>
            <p className="text-[#D4A853] font-medium">
              That's the new mindset. And it changes everything.
            </p>
          </motion.div>

          <motion.div variants={slideRightVariants}>
            {/* Timeline */}
            <div className="relative pl-8 border-l border-[#0066FF]/20">
              {timeline.map((item, i) => (
                <div key={item.year} className={`relative ${i < timeline.length - 1 ? "mb-8" : ""}`}>
                  <div className="absolute -left-[41px] w-4 h-4 rounded-full bg-[#0066FF] border-2 border-[#080D1A]" />
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[#0066FF] font-bold text-sm" style={{ fontFamily: "var(--font-syne)" }}>
                      {item.year}
                    </span>
                    <span className="badge badge-blue text-[10px]">{item.event}</span>
                  </div>
                  <p className="text-[#B8C4D4] text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Values */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-28"
        >
          <motion.div variants={staggerItemVariants} className="text-center mb-12">
            <p className="badge badge-blue inline-flex mb-4">What We Stand For</p>
            <h2
              className="text-white font-bold text-3xl"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Our Values
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {values.map((value) => (
              <motion.div key={value.title} variants={staggerItemVariants}>
                <GlassCard className="p-6 h-full" glowColor="blue">
                  <div className="w-10 h-10 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center mb-4 text-[#0066FF]">
                    {value.icon}
                  </div>
                  <h3
                    className="text-white font-bold mb-3"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-[#8892A4] text-sm leading-relaxed">{value.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-28"
        >
          <motion.div variants={staggerItemVariants} className="text-center mb-12">
            <p className="badge badge-gold inline-flex mb-4">The People</p>
            <h2
              className="text-white font-bold text-3xl"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              The Team Behind Your OS
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member) => (
              <motion.div key={member.name} variants={staggerItemVariants}>
                <GlassCard className="p-7" glowColor="blue">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.bg} flex items-center justify-center text-white font-bold text-2xl mb-5`} style={{ fontFamily: "var(--font-syne)" }}>
                    {member.name[0]}
                  </div>
                  <h3
                    className="text-white font-bold text-lg mb-1"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-[#0066FF] text-sm font-medium mb-4">{member.role}</p>
                  <p className="text-[#8892A4] text-sm leading-relaxed">{member.bio}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* NBC Partnership */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="glass rounded-2xl p-10 text-center max-w-3xl mx-auto"
        >
          <div className="w-12 h-12 rounded-xl bg-[#D4A853]/10 border border-[#D4A853]/20 flex items-center justify-center mx-auto mb-5">
            <Award className="w-6 h-6 text-[#D4A853]" />
          </div>
          <p className="badge badge-gold inline-flex mb-5">Partnership</p>
          <h3
            className="text-white font-bold text-2xl mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Powered by NBC Studio
          </h3>
          <p className="text-[#8892A4] leading-relaxed">
            NMC Business OS is built in partnership with NBC Studio, a product development house specializing in AI-powered operational platforms. Together, we bring enterprise-grade technology infrastructure to growth-stage businesses that demand the best without the enterprise price tag.
          </p>
        </motion.div>
      </section>

      <CTASection />
    </div>
  );
}
