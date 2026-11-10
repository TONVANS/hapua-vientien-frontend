'use client';

import React, { useRef, useMemo } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Compass, MapPin, ChevronRight, Sparkles, Clock, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TravelRecommend } from '@/types';
import { ParallaxImage } from './ParallaxImage';

interface TravelGuideSectionProps {
  travelSpots: TravelRecommend[];
  loading: boolean;
}

const DEFAULT_TRAVEL_SPOTS: TravelRecommend[] = [
  {
    id: 'default-travel-1',
    placeName: 'Pha That Luang (Great Stupa)',
    description: 'The golden Great Stupa and national symbol of Lao PDR, a sacred Buddhist monument at the heart of Lao identity and the annual That Luang Festival.',
    location: 'That Luang Road, Saysettha District, Vientiane',
    openTime: '08:00',
    closeTime: '17:00',
    coverImage: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80',
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'default-travel-2',
    placeName: 'Wat Si Saket',
    description: 'Vientiane’s oldest surviving temple, famous for its cloister walls lined with thousands of small Buddha images.',
    location: 'Lane Xang Avenue & Setthathirath Road, Vientiane',
    openTime: '08:00',
    closeTime: '16:00',
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'default-travel-3',
    placeName: 'Patuxay Victory Monument',
    description: 'Vientiane’s iconic war memorial blending Lao motifs with an arch design, with a rooftop terrace overlooking Lane Xang Avenue.',
    location: 'Lane Xang Avenue, Vientiane',
    openTime: '08:00',
    closeTime: '17:00',
    coverImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    createdAt: '',
    updatedAt: '',
  },
];

function getSpotCategory(name: string, index: number): string {
  const lower = name.toLowerCase();
  if (lower.includes('waterfall') || lower.includes('kuang si') || lower.includes('tad')) {
    return 'Natural Wonder';
  }
  if (lower.includes('that luang') || lower.includes('stupa')) {
    return 'National Symbol';
  }
  if (lower.includes('wat') || lower.includes('temple') || lower.includes('xieng')) {
    return 'Historic Temple';
  }
  if (lower.includes('patuxay') || lower.includes('monument')) {
    return 'Landmark Monument';
  }
  if (lower.includes('buddha park')) {
    return 'Sculpture Park';
  }
  if (lower.includes('phousi') || lower.includes('mount') || lower.includes('hill')) {
    return 'Panoramic Sunset Vista';
  }
  if (lower.includes('cave') || lower.includes('pak ou')) {
    return 'Sacred Cave Shrine';
  }
  const defaultCategories = ['Heritage Landmark', 'Cultural Heritage', 'Scenic Destination'];
  return defaultCategories[index % defaultCategories.length];
}

function formatTimeDisplay(timeStr?: string | null): string {
  if (!timeStr || typeof timeStr !== 'string') return '';
  try {
    if (timeStr.includes('T')) {
      const match = timeStr.match(/T(\d{2}:\d{2})/);
      if (match && match[1]) return match[1];
    }
    if (timeStr.includes(':')) {
      const parts = timeStr.split(':');
      if (parts.length >= 2) {
        const h = parts[0].slice(-2).padStart(2, '0');
        const m = parts[1].slice(0, 2).padStart(2, '0');
        return `${h}:${m}`;
      }
    }
  } catch {
    return '';
  }
  return '';
}

export function TravelGuideSection({ travelSpots, loading }: TravelGuideSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

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

  const spot1Y = useTransform(smoothProgress, [0, 1], [-18, 18]);
  const spot2Y = useTransform(smoothProgress, [0, 1], [0, 0]);
  const spot3Y = useTransform(smoothProgress, [0, 1], [18, -18]);
  const cardTransforms = [spot1Y, spot2Y, spot3Y];

  // Primary data from backend: use backend travelSpots directly (fallback only if backend returned empty)
  const displaySpots = useMemo(() => {
    if (Array.isArray(travelSpots) && travelSpots.length > 0) {
      return travelSpots.slice(0, 3);
    }
    return DEFAULT_TRAVEL_SPOTS.slice(0, 3);
  }, [travelSpots]);

  return (
    <section
      ref={sectionRef}
      className="py-24 relative z-20 overflow-hidden"
      id="travel"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-chip text-brand-icewhite text-xs font-bold uppercase tracking-widest border border-brand-line-strong/40"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Lao PDR Capital City</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold text-brand-icewhite tracking-tight"
            >
              Vientiane Culture & Visits Guide
            </motion.h2>
            <div className="h-1 w-20 bg-gradient-to-r from-brand-electric to-brand-gold rounded-full" />
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base text-brand-silver max-w-xl leading-relaxed"
            >
              Experience the golden Pha That Luang, the Patuxay monument, historic temples, Mekong riverside evenings, and Lao culinary traditions.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/travel">
              <Button
                variant="outline"
                className="glass-panel text-brand-icewhite border-brand-cyan/30 hover:bg-brand-electric hover:text-white rounded-2xl font-bold text-xs h-12 px-6 transition-all group shadow-sm cursor-pointer"
              >
                <span>View Full Travel Guide</span>
                <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Content Grid - 3 Travel Destination Spots */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-3xl border border-brand-line bg-brand-surface/80 p-5 space-y-4 animate-pulse shadow-sm"
              >
                <div className="aspect-4/3 bg-brand-surface-3 rounded-2xl" />
                <div className="h-6 bg-brand-surface-3 rounded w-3/4" />
                <div className="h-4 bg-brand-surface-3 rounded w-1/2" />
                <div className="h-10 bg-brand-surface-3 rounded-xl" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displaySpots.map((spot, idx) => {
              const category = getSpotCategory(spot.placeName, idx);
              // Use backend coverImage directly
              const spotImage =
                spot.coverImage ||
                'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80';
              const openTime = formatTimeDisplay(spot.openTime);
              const closeTime = formatTimeDisplay(spot.closeTime);

              return (
                <motion.div
                  key={spot.id || `spot-${idx}`}
                  style={{ y: cardTransforms[idx % 3] }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group rounded-3xl border border-brand-line bg-brand-surface/90 backdrop-blur-xl overflow-hidden shadow-xl hover:shadow-2xl hover-lift flex flex-col justify-between will-change-transform transition-all duration-300"
                >
                  <div>
                    {/* Visual Cover with Parallax */}
                    <div className="relative aspect-4/3 overflow-hidden bg-brand-surface-2">
                      <ParallaxImage
                        src={spotImage}
                        alt={spot.placeName}
                        speed={14}
                        className="w-full h-full"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 bg-brand-darknavy/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-md flex items-center gap-1.5 border border-white/30 z-10">
                        <Compass className="w-3.5 h-3.5 text-brand-gold" />
                        <span>{category}</span>
                      </div>

                      {/* Photo indicator badge */}
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-white/95 shadow-sm flex items-center gap-1.5 z-10">
                        <Camera className="w-3 h-3 text-brand-gold" />
                        <span>Scenic Vista</span>
                      </div>
                    </div>

                    {/* Spot Details */}
                    <div className="p-6 sm:p-7 space-y-3">
                      <h3 className="text-xl font-extrabold text-brand-icewhite leading-snug group-hover:text-brand-cyan transition-colors">
                        {spot.placeName}
                      </h3>
                      <p className="text-xs sm:text-sm text-brand-silver line-clamp-2 leading-relaxed min-h-[2.5rem]">
                        {spot.description || spot.location}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-brand-line">
                        <div className="flex items-center gap-2 text-xs font-medium text-brand-silver">
                          <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                          <span className="truncate">{spot.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] font-medium text-brand-silver">
                          <Clock className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                          <span>
                            {openTime && closeTime && openTime !== '00:00'
                              ? `Open: ${openTime} - ${closeTime}`
                              : 'Open Daily: 08:00 - 18:00'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Explore Button */}
                  <div className="p-6 sm:p-7 pt-0">
                    <Link href="/travel" className="block w-full">
                      <Button
                        variant="outline"
                        className="w-full text-xs font-extrabold border-brand-cyan/25 text-brand-cyan hover:bg-brand-electric hover:text-white rounded-xl h-11 transition-all cursor-pointer shadow-xs group-hover:border-brand-cyan"
                      >
                        <span>Explore Destination Details</span>
                        <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
