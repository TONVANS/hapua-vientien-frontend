'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Sparkles,
  Users,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAssetPath } from '@/lib/utils';

interface HeroSectionProps {
  stats: {
    memberStates: number;
    accreditedDelegates: number;
    powerUtilities: number;
    eventDays: number;
  };
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Hero artwork from Example.html (Lao heritage skyline + ASEAN Power Grid globe)
const HERO_BACKGROUND_URL = getAssetPath('/images/hero-background.jpg');

const TARGET_DATE = new Date('2026-11-25T09:00:00+07:00').getTime();

function calculateTimeLeft(): TimeLeft {
  const now = Date.now();
  const distance = TARGET_DATE - now;

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

export function HeroSection({ stats }: HeroSectionProps) {
  // Real-time Countdown initialized lazily to eliminate initial mount re-render
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative isolate min-h-[94vh] pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden flex flex-col justify-between bg-brand-darknavy">
      {/* 1. Architectural & APG Interconnection Artwork */}
      <div className="absolute inset-0 -z-30 pointer-events-none overflow-hidden">
        <Image
          src={HERO_BACKGROUND_URL}
          alt="HWG 5 Meeting Lao PDR Digital Landscape"
          fill
          priority
          sizes="100vw"
          quality={75}
          className="object-cover object-bottom opacity-75 sm:opacity-90 mix-blend-screen scale-105"
        />
        {/* Dark gradient feathering overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-darknavy via-brand-darknavy/70 to-brand-darknavy mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,107,255,0.15),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-darknavy to-transparent" />
        <div className="absolute inset-0 grid-lines-overlay opacity-30" />
      </div>

      {/* 2. Atmospheric Luminous Flares */}
      <div className="absolute top-20 left-1/4 w-[420px] h-[420px] bg-gradient-to-br from-brand-cyan/15 to-transparent rounded-full blur-3xl pointer-events-none -z-20 animate-pulse duration-1000" />
      <div className="absolute top-44 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-brand-electric/25 to-transparent rounded-full blur-3xl pointer-events-none -z-20" />

      {/* 3. Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Column: Official Branding & Summit Details */}
          <div className="flex-1 text-center lg:text-left space-y-7">
            {/* Host Ribbon & Official Summit Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-navy/80 backdrop-blur-md text-brand-silver text-xs font-extrabold uppercase tracking-widest border border-brand-cyan/40 shadow-glow-cyan">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
                </span>
                <span>HWG 5 Meeting</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold text-[11px] font-bold tracking-wide border border-brand-gold/60 backdrop-blur-md">
                <Building2 className="w-3 h-3 text-brand-gold" />
                <span>Host: Electricité du Laos (EDL)</span>
              </div>
            </motion.div>

            {/* Official Summit Logo + Grand Title */}
            <div className="space-y-4 sm:space-y-5">
              {/* Clean Official Summit Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center lg:items-start gap-3"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="relative group cursor-pointer inline-block">
                    <Image
                      src={getAssetPath('/images/hapua_logo.webp')}
                      alt="HAPUA - Heads of ASEAN Power Utilities / Authorities"
                      width={220}
                      height={60}
                      priority
                      style={{ width: 'auto', height: 'auto' }}
                      className="h-11 sm:h-12 md:h-14 lg:h-16 w-auto object-contain drop-shadow-[0_4px_16px_rgba(79,209,255,0.35)] transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <Image
                    src={getAssetPath('/logo_organization/EDL.webp')}
                    alt="Electricité du Laos (EDL) - Host Utility"
                    width={72}
                    height={64}
                    style={{ width: 'auto', height: 'auto' }}
                    className="h-11 sm:h-12 md:h-14 lg:h-16 w-auto object-contain drop-shadow-[0_4px_16px_rgba(232,194,106,0.35)]"
                  />
                </div>

                {/* Distinct High-Contrast Underline Divider */}
                <div className="flex items-center justify-center lg:justify-start gap-2 w-full max-w-[260px] sm:max-w-[320px] pt-1">
                  <div className="h-1 sm:h-[4.5px] w-20 sm:w-28 rounded-full bg-gradient-to-r from-brand-icewhite via-brand-cyan to-brand-electric shadow-glow-cyan" />
                  <div className="h-1 sm:h-[3.5px] w-6 sm:w-8 rounded-full bg-brand-electric" />
                  <div className="h-[2.5px] sm:h-[3px] flex-1 rounded-full bg-gradient-to-r from-brand-cyan/60 via-brand-cyan/20 to-transparent" />
                  <span className="w-2 h-2 rounded-full bg-brand-gold ring-2 ring-brand-darknavy shadow-xs shrink-0" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-brand-icewhite tracking-tight leading-[1.12] drop-shadow-[0_4px_16px_rgba(79,209,255,0.35)]"
              >
                Human Capital in the Age of Intelligence:
                <span className="block mt-2 bg-gradient-to-r from-brand-gold via-[#ffdf9a] to-brand-gold bg-clip-text text-transparent">
                  Unlocking Skills, Innovation and Resilience
                </span>
              </motion.h1>
            </div>

            {/* Destination & Mission Subtext */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-2"
            >
              <div className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-brand-icewhite tracking-widest bg-brand-navy/50 backdrop-blur-md px-4 py-1.5 rounded-xl border border-brand-cyan/25">
                <MapPin className="w-4 h-4 text-brand-cyan" />
                <span>VIENTIANE, LAO PDR</span>
                <span className="text-brand-cyan">✦</span>
                <Calendar className="w-4 h-4 text-brand-cyan" />
                <span className="text-brand-gold">25 - 27 NOV 2026</span>
              </div>

            </motion.div>

            {/* Live Countdown Counter Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative overflow-hidden bg-brand-navy/65 backdrop-blur-xl p-4 rounded-2xl border border-brand-cyan/30 shadow-2xl max-w-md mx-auto lg:mx-0"
            >
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-brand-cyan/20 text-xs text-brand-silver">
                <span className="flex items-center gap-1.5 font-bold text-brand-silver uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-brand-cyan" />
                  Opening Ceremony Countdown
                </span>
                <span className="text-[11px] font-semibold text-brand-cyan">
                  Nov 25, 2026 • 09:00 AM
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center" suppressHydrationWarning>
                <div className="bg-black/35 p-2 rounded-xl border border-brand-cyan/20">
                  <div className="text-xl sm:text-2xl font-black text-brand-cyan tabular-nums" suppressHydrationWarning>
                    {timeLeft.days}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-brand-silver/75">Days</div>
                </div>
                <div className="bg-black/35 p-2 rounded-xl border border-brand-cyan/20">
                  <div className="text-xl sm:text-2xl font-black text-brand-icewhite tabular-nums" suppressHydrationWarning>
                    {timeLeft.hours}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-brand-silver/75">Hours</div>
                </div>
                <div className="bg-black/35 p-2 rounded-xl border border-brand-cyan/20">
                  <div className="text-xl sm:text-2xl font-black text-brand-icewhite tabular-nums" suppressHydrationWarning>
                    {timeLeft.minutes}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-brand-silver/75">Mins</div>
                </div>
                <div className="bg-black/35 p-2 rounded-xl border border-brand-cyan/20">
                  <div className="text-xl sm:text-2xl font-black text-brand-cyan tabular-nums animate-pulse" suppressHydrationWarning>
                    {timeLeft.seconds}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-brand-silver/75">Secs</div>
                </div>
              </div>
            </motion.div>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start pt-1"
            >
              <Link href="/activities#register">
                <Button
                  size="lg"
                  className="h-12 sm:h-13 px-8 bg-brand-electric hover:bg-brand-electric text-brand-icewhite rounded-full font-extrabold uppercase tracking-wide shadow-glow-blue hover:shadow-glow-cyan transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm cursor-pointer border border-brand-cyan/40 flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-brand-cyan" />
                  <span>Accredited Delegate Check-In</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/agenda">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 sm:h-13 px-7 bg-brand-navy/60 hover:bg-brand-navy/90 text-brand-icewhite border-brand-silver/30 hover:border-brand-cyan rounded-full font-bold uppercase tracking-wide backdrop-blur-md transition-all duration-300 text-sm cursor-pointer flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-brand-cyan" />
                  <span>Explore HWG 5 Agenda</span>
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 relative w-full max-w-lg lg:max-w-none"
          >
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-brand-cyan/30 group transition-transform duration-500 hover:scale-[1.01]">
              <Image
                src="https://media.istockphoto.com/id/1199630029/photo/top-view-of-business-people-sitting-at-boardroom-and-working-on-important-project-for-big.jpg?s=612x612&w=0&k=20&c=560uq74LN2mCmZmCcJW5A4Hac3RsXrRBYF2WQwRbfOM="
                alt="HWG 5 Meeting in Vientiane, Lao PDR"
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={80}
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-linear-to-t from-brand-darknavy/95 via-brand-navy/50 to-transparent flex flex-col justify-between p-6 sm:p-8">
                {/* Top Badge */}
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 rounded-full bg-brand-darknavy/90 backdrop-blur-md text-brand-cyan text-xs font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1.5 border border-brand-cyan/40">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                    <span className="sm:hidden">HAPUA WG 5</span>
                    <span className="hidden sm:inline">HAPUA Working Group 5</span>
                  </span>

                  <span className="px-3 py-1 rounded-full bg-brand-gold/90 backdrop-blur-md text-brand-darknavy text-xs font-black uppercase tracking-wider shadow-md">
                    Human Resources
                  </span>
                </div>

                {/* Bottom Card Content */}
                <div className="text-white space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-cyan uppercase tracking-widest">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>HWG 5 Meeting • Vientiane, Lao PDR</span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-extrabold tracking-tight">
                    Building an AI-ready ASEAN power sector workforce for an intelligent energy future.
                  </h3>
                  <div className="hidden sm:flex flex-wrap gap-2">
                    {['AI-Era Skills', 'Innovation', 'Resilience'].map((pillar) => (
                      <span
                        key={pillar}
                        className="px-2.5 py-1 rounded-full bg-brand-darknavy/70 backdrop-blur-md border border-brand-cyan/40 text-[11px] font-bold text-brand-icewhite"
                      >
                        {pillar}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Info Pill Over Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -bottom-6 -left-4 sm:-left-6 bg-brand-navy/90 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-brand-cyan/30 shadow-glow-cyan flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-electric to-brand-royal text-white flex items-center justify-center font-bold shadow-md shrink-0 animate-pulse">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-gold block">
                  Meeting Focus
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-brand-icewhite">
                  Human Capital Development
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 4. Key Summit Stats Banner */}
      <div className="mt-16 lg:mt-20 py-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-brand-darknavy/60 backdrop-blur-md p-6 rounded-2xl border border-brand-cyan/25 hover:border-brand-cyan text-center hover-lift relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="text-3xl sm:text-4xl font-black text-brand-cyan tracking-tight tabular-nums">
                {stats.memberStates}
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-silver mt-1">
                ASEAN Member States
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-brand-darknavy/60 backdrop-blur-md p-6 rounded-2xl border border-brand-cyan/25 hover:border-brand-cyan text-center hover-lift relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="text-3xl sm:text-4xl font-black text-brand-cyan tracking-tight tabular-nums">
                {stats.accreditedDelegates}
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-silver mt-1">
                Accredited Delegates
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-brand-darknavy/60 backdrop-blur-md p-6 rounded-2xl border border-brand-cyan/25 hover:border-brand-cyan text-center hover-lift relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-brand-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="text-3xl sm:text-4xl font-black text-brand-cyan tracking-tight tabular-nums">
                {stats.powerUtilities}
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-silver mt-1">
                Power Utilities & Observers
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-brand-darknavy/60 backdrop-blur-md p-6 rounded-2xl border border-brand-cyan/25 hover:border-brand-cyan text-center hover-lift relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-brand-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="text-3xl sm:text-4xl font-black text-brand-cyan tracking-tight tabular-nums">
                {stats.eventDays} Days
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-silver mt-1">
                Summit Days in Vientiane
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
