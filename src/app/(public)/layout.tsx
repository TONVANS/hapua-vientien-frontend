'use client';

import React from 'react';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';
import { motion, useScroll, useTransform } from 'motion/react';
import { Header, Footer, ShaderBackground } from '@/components/layout';
import { SmoothScrollProvider } from '@/components/providers';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col relative bg-brand-darknavy text-brand-icewhite overflow-x-hidden selection:bg-brand-cyan selection:text-brand-darknavy">
      {/* 1. Global Reading & Scroll Progress Bar */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          transformOrigin: 'left',
        }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-electric via-brand-cyan to-brand-icewhite z-[100] shadow-glow-cyan"
      />

      {/* 2. Persistent WebGL Ambient Dynamic Shader Background */}
      <ShaderBackground />

      {/* 3. Global Atmospheric Parallax Background Layer */}
      <motion.div
        style={{ y: bgY }}
        className="fixed inset-0 pointer-events-none -z-40 opacity-40 overflow-hidden will-change-transform transform-gpu"
      >
        <Image
          src={getAssetPath('/images/background.webp')}
          alt="Parallax Background"
          fill
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-darknavy/90 via-brand-darknavy/80 to-brand-darknavy" />
      </motion.div>

      {/* 4. Floating Ambient Lighting Glow */}
      <div className="fixed top-1/4 -right-40 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none -z-30" />
      <div className="fixed bottom-1/4 -left-40 w-[500px] h-[500px] bg-brand-electric/10 rounded-full blur-3xl pointer-events-none -z-30" />

      {/* 5. Navigation Header */}
      <Header />

      {/* 6. Page Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        {children}
      </div>

      {/* 7. Institutional Footer */}
      <Footer />
    </div>
    </SmoothScrollProvider>
  );
}
