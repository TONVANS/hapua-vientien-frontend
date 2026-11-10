'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import {
  Landmark,
  ArrowRight,
  Sparkles,
  Award,
  Brain,
  Lightbulb,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ParallaxImage } from './ParallaxImage';

export function ActivitiesBento() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Scroll tracking for bento column parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.12,
    restDelta: 0.0001,
  });

  const col1Y = useTransform(smoothProgress, [0, 1], [-25, 25]);
  const col2Y = useTransform(smoothProgress, [0, 1], [30, -30]);
  const col3Y = useTransform(smoothProgress, [0, 1], [20, -20]);

  return (
    <section
      ref={sectionRef}
      className="py-24 relative z-20 overflow-hidden"
      id="activities"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-32 w-120 h-120 bg-brand-chip/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-120 h-120 bg-brand-gold/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-chip text-brand-icewhite text-xs font-bold uppercase tracking-widest border border-brand-line-strong/40"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Summit Program Architecture</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-brand-icewhite tracking-tight"
          >
            Activities & Key Highlights
          </motion.h2>
          <div className="h-1 w-20 bg-linear-to-r from-brand-electric to-brand-gold mx-auto rounded-full" />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-brand-silver max-w-2xl mx-auto leading-relaxed"
          >
           Human Capital in the Age of Intelligence: Unlocking Skills, Innovation and Resilience.
          </motion.p>
        </div>

        {/* Bento Grid with Column Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* Bento Card 1: Plenary Assembly & Ministerial Address (Col Span 8) */}
          <motion.div
            style={{ y: col1Y }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-8 group relative overflow-hidden rounded-3xl glass-panel min-h-90 sm:min-h-105 shadow-2xl hover-lift border border-brand-line will-change-transform"
          >
            <ParallaxImage
              src="https://digital.ihg.com/is/image/ihg/holiday-inn-hotel-and-suites-vientiane-10109933332-4x3?wid=733"
              alt="HWG 5 Meeting Plenary Session"
              speed={16}
              className="absolute inset-0"
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-darknavy/95 via-brand-electric/45 to-transparent z-10" />

            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between text-white z-20">
              <div className="flex justify-between items-start">
                <span className="px-3.5 py-1.5 rounded-full bg-brand-gold text-brand-darknavy text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>Plenary Assembly</span>
                </span>
              </div>

              <div className="space-y-3 max-w-xl">
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  HWG 5 Meeting
                </h3>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  Heads of ASEAN power utilities convene in Vientiane to shape a future-ready workforce: AI-era skills, innovation in grid operations, and organisational resilience across the ASEAN Power Grid.
                </p>
                <div className="pt-2">
                  <Link href="/agenda">
                    <Button
                      size="sm"
                      className="bg-brand-surface/90 hover:bg-brand-surface text-brand-icewhite font-bold rounded-xl text-xs h-9 px-4 shadow-md transition-all group/btn cursor-pointer"
                    >
                      <span>View Plenary Schedule</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 2: Cultural Visits (Col Span 4) */}
          <motion.div
            style={{ y: col2Y }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-4 glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover-lift shadow-2xl border border-brand-line group will-change-transform"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-brand-electric to-brand-royal text-white flex items-center justify-center shadow-lg shadow-brand-electric/30">
                  <Landmark className="w-6 h-6 text-brand-gold" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-brand-chip text-brand-icewhite text-[11px] font-bold uppercase tracking-wider">
                  Cultural Visits
                </span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-brand-icewhite tracking-tight">
                  Vientiane Heritage Tour
                </h3>
                <p className="text-xs text-brand-silver leading-relaxed mt-2">
                  Guided cultural excursion to the golden Pha That Luang stupa and the Patuxay Victory Monument, followed by an evening along the Mekong riverside.
                </p>
              </div>
            </div>

            <div className="mt-6 aspect-video rounded-2xl overflow-hidden relative shadow-md">
              <ParallaxImage
                src="https://tse1.mm.bing.net/th/id/OIP.e9N9wxMuQY6w6tTo1I5DRAHaE8?r=0&w=1024&h=683&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Lao temple architecture"
                speed={12}
                className="w-full h-full"
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-brand-darknavy/85 backdrop-blur-md text-[10px] font-bold text-brand-gold z-10">
                Lao Heritage • Vientiane Tour
              </div>
            </div>
          </motion.div>

          {/* Bento Card 3: Unlocking Skills, Innovation and Resilience (Col Span 12) */}
          <motion.div
            style={{ y: col3Y }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="md:col-span-12 glass-panel rounded-3xl p-6 sm:p-8 lg:p-10 hover-lift shadow-2xl border border-brand-line group will-change-transform relative overflow-hidden"
          >
            {/* Background subtle radial glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-electric/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Thematic Narrative & 3 Pillars */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3.5 py-1 rounded-full bg-brand-chip text-brand-cyan text-xs font-extrabold uppercase tracking-wider border border-brand-line-strong/40 flex items-center gap-1.5 shadow-xs">
                      <GraduationCap className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Summit Thematic Focus</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-brand-surface/80 text-brand-silver text-[11px] font-semibold border border-brand-line">
                      HAPUA WG 5 • Human Resources
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-icewhite tracking-tight leading-tight">
                    Unlocking Skills, Innovation and Resilience
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-silver leading-relaxed max-w-2xl">
                    Building an AI-ready ASEAN power sector workforce for an intelligent energy future. Under the theme <span className="text-brand-icewhite font-semibold">&ldquo;Human Capital in the Age of Intelligence,&rdquo;</span> HAPUA Working Group 5 convenes regional leaders and talent architects to drive technological transformation, cross-border competency sharing, and agile institutional resilience across ASEAN power utilities.
                  </p>
                </div>

                {/* 3 Pillars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                  {/* Pillar 1: Skills */}
                  <div className="p-4 rounded-2xl bg-brand-surface/60 border border-brand-line/80 hover:border-brand-cyan/40 transition-all duration-300 space-y-2 group/card">
                    <div className="w-8 h-8 rounded-xl bg-brand-electric/20 border border-brand-cyan/30 text-brand-cyan flex items-center justify-center">
                      <Brain className="w-4 h-4 text-brand-cyan" />
                    </div>
                    <h4 className="text-sm font-bold text-brand-icewhite flex items-center gap-1.5">
                      <span>AI-Era Skills</span>
                    </h4>
                    <p className="text-[11px] text-brand-silver leading-relaxed">
                      Upskilling engineers and leaders in digital automation, artificial intelligence, and smart grid operation capabilities.
                    </p>
                  </div>

                  {/* Pillar 2: Innovation */}
                  <div className="p-4 rounded-2xl bg-brand-surface/60 border border-brand-line/80 hover:border-brand-gold/40 transition-all duration-300 space-y-2 group/card">
                    <div className="w-8 h-8 rounded-xl bg-brand-gold/20 border border-brand-gold/40 text-brand-gold flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-brand-gold" />
                    </div>
                    <h4 className="text-sm font-bold text-brand-icewhite flex items-center gap-1.5">
                      <span>Utility Innovation</span>
                    </h4>
                    <p className="text-[11px] text-brand-silver leading-relaxed">
                      Catalyzing next-generation utility practices, collaborative energy technologies, and regional knowledge exchange.
                    </p>
                  </div>

                  {/* Pillar 3: Resilience */}
                  <div className="p-4 rounded-2xl bg-brand-surface/60 border border-brand-line/80 hover:border-brand-cyan/40 transition-all duration-300 space-y-2 group/card">
                    <div className="w-8 h-8 rounded-xl bg-brand-royal/40 border border-brand-line-strong text-brand-silver flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-brand-gold" />
                    </div>
                    <h4 className="text-sm font-bold text-brand-icewhite flex items-center gap-1.5">
                      <span>Strategic Resilience</span>
                    </h4>
                    <p className="text-[11px] text-brand-silver leading-relaxed">
                      Strengthening organizational agility, leadership readiness, and sustainable workforce adaptation for the ASEAN Power Grid.
                    </p>
                  </div>
                </div>

                {/* Footer Action & Link */}
                <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-brand-line">
                  <Link href="/agenda">
                    <Button
                      size="sm"
                      className="bg-brand-electric hover:bg-brand-royal text-brand-icewhite font-bold rounded-xl text-xs h-9 px-4.5 shadow-md shadow-brand-electric/30 transition-all group/btn cursor-pointer"
                    >
                      <span>Explore Thematic Agenda</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  <div className="flex items-center gap-2 text-xs text-brand-silver">
                    <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                    <span className="font-medium">Focus: ASEAN Power Sector Human Capital Transformation</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Frame */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-brand-line-strong/30 group/img">
                  <ParallaxImage
                    src="https://tse4.mm.bing.net/th/id/OIP.x4hKwo0aXe7931dtlx3hvwHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                    alt="Unlocking Skills, Innovation and Resilience - HAPUA WG 5 Meeting"
                    speed={12}
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-brand-darknavy/90 via-brand-darknavy/20 to-transparent pointer-events-none" />

                  {/* Overlaid badges */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-darknavy/85 backdrop-blur-md border border-brand-cyan/30 text-brand-cyan text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md z-10">
                    <Sparkles className="w-3 h-3 text-brand-gold" />
                    <span>Theme in Action</span>
                  </div>

                  <div className="absolute bottom-3 inset-x-3 p-3.5 rounded-xl bg-brand-navy/90 backdrop-blur-md border border-brand-cyan/25 shadow-lg flex items-center justify-between z-10">
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-mono text-brand-gold uppercase tracking-wider font-bold">
                        Future-Ready Workforce
                      </p>
                      <p className="text-xs font-bold text-white">
                        AI, Innovation & Resilience
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-brand-electric/30 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
