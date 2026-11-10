'use client';

import React, { useRef, useMemo } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import {
  Star,
  Bed,
  Wifi,
  ChevronRight,
  Bus,
  MapPin,
  UtensilsCrossed,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Hotel } from '@/types';
import { ParallaxImage } from './ParallaxImage';

interface FeaturedHotelsSectionProps {
  hotels: Hotel[];
  loading: boolean;
}

const DEFAULT_FEATURED_HOTELS: Hotel[] = [
  {
    id: 'default-hotel-1',
    name: 'Landmark Mekong Riverside Hotel',
    description: 'Five-star riverside hotel facing the Mekong with executive floors, large function rooms, and dedicated delegation shuttles to the summit venue.',
    address: 'Thadeua Road, Vientiane Capital, Lao PDR',
    starRating: 5,
    contactInfo: 'Reservations via official website · quote HAPUA 2026 delegation',
    coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    mapUrl: 'https://maps.google.com/?q=Landmark+Mekong+Riverside+Hotel+Vientiane',
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'default-hotel-2',
    name: 'Crowne Plaza Vientiane',
    description: 'Central business hotel close to Patuxay and the city centre, featuring executive lounges and high-speed connectivity for delegations.',
    address: 'Samsenthai Road, Vientiane Capital, Lao PDR',
    starRating: 5,
    contactInfo: 'Reservations via official website · quote HAPUA 2026 delegation',
    coverImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    mapUrl: 'https://maps.google.com/?q=Crowne+Plaza+Vientiane',
    createdAt: '',
    updatedAt: '',
  },
];

export function FeaturedHotelsSection({ hotels, loading }: FeaturedHotelsSectionProps) {
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

  const card1Y = useTransform(smoothProgress, [0, 1], [-18, 18]);
  const card2Y = useTransform(smoothProgress, [0, 1], [0, 0]);
  const card3Y = useTransform(smoothProgress, [0, 1], [18, -18]);
  const cardTransforms = [card1Y, card2Y, card3Y];

  // Primary data from backend: use backend hotels directly (fallback only if backend returned empty)
  const displayHotels = useMemo(() => {
    if (Array.isArray(hotels) && hotels.length > 0) {
      return hotels.slice(0, 2);
    }
    return DEFAULT_FEATURED_HOTELS.slice(0, 2);
  }, [hotels]);

  return (
    <section
      ref={sectionRef}
      className="py-24 relative z-20 overflow-hidden"
      id="hotels"
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
              <span>Official Hospitality Protocol</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold text-brand-icewhite tracking-tight"
            >
              Recommended Accommodations
            </motion.h2>
            <div className="h-1 w-20 bg-gradient-to-r from-brand-electric to-brand-gold rounded-full" />
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base text-brand-silver max-w-xl leading-relaxed"
            >
              Partner hotels in central and riverside Vientiane offering complimentary summit shuttle transfers to the main venue.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/hotels">
              <Button
                variant="outline"
                className="glass-panel text-brand-icewhite border-brand-cyan/30 hover:bg-brand-electric hover:text-white rounded-2xl font-bold text-xs h-12 px-6 transition-all group shadow-sm cursor-pointer"
              >
                <span>View All Accommodations</span>
                <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Content: 2 Backend Hotels + 1 Balanced Protocol & Amenities Card */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {/* Backend Hotels (up to 2) */}
            {displayHotels.map((hotel, idx) => (
              <motion.div
                key={hotel.id || `hotel-${idx}`}
                style={{ y: cardTransforms[idx % 2] }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-3xl border border-brand-line bg-brand-surface/90 backdrop-blur-xl overflow-hidden shadow-xl hover:shadow-2xl hover-lift flex flex-col justify-between will-change-transform transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-4/3 overflow-hidden bg-brand-surface-2">
                    <ParallaxImage
                      src={
                        hotel.coverImage ||
                        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
                      }
                      alt={hotel.name}
                      speed={14}
                      className="w-full h-full"
                    />
                    <div className="absolute top-3 right-3 bg-brand-surface/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-black text-brand-icewhite shadow-md flex items-center gap-1.5 border border-brand-line z-10">
                      <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                      <span>{hotel.starRating || 5}-Star Luxury</span>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-brand-darknavy/85 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-xs flex items-center gap-1.5 z-10">
                      <Bus className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Summit Shuttle Included</span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-3">
                    <h3 className="text-xl font-extrabold text-brand-icewhite leading-snug group-hover:text-brand-cyan transition-colors">
                      {hotel.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-silver line-clamp-2 leading-relaxed min-h-[2.5rem]">
                      {hotel.description || hotel.address}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-brand-silver pt-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      <span className="truncate">{hotel.address}</span>
                    </div>

                    <div className="flex items-center gap-2.5 text-xs font-bold text-brand-icewhite pt-2.5 border-t border-brand-line flex-wrap">
                      <span className="flex items-center gap-1.5 bg-brand-surface-2 px-2.5 py-1 rounded-lg">
                        <Bed className="w-3.5 h-3.5 text-brand-gold" /> Partner Suite
                      </span>
                      <span className="flex items-center gap-1.5 bg-brand-surface-2 px-2.5 py-1 rounded-lg">
                        <Wifi className="w-3.5 h-3.5 text-brand-gold" /> High-Speed WiFi
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-7 pt-0">
                  <Link href="/hotels" className="block w-full">
                    <Button
                      variant="outline"
                      className="w-full text-xs font-extrabold border-brand-cyan/25 text-brand-cyan hover:bg-brand-electric hover:text-white rounded-xl h-11 transition-all cursor-pointer shadow-xs group-hover:border-brand-cyan"
                    >
                      <span>Explore Hotel & Booking Details</span>
                      <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}

            {/* Card 3: Delegate Hospitality Protocol & Amenities Card (Balanced White Card matching Card 1 & 2 Height) */}
            <motion.div
              style={{ y: card3Y }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group rounded-3xl border border-brand-line bg-brand-surface/95 backdrop-blur-xl p-6 sm:p-7 shadow-xl hover:shadow-2xl hover-lift flex flex-col justify-between relative overflow-hidden will-change-transform transition-all duration-300"
            >
              {/* Top Accent Gradient Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-brand-electric via-brand-royal to-brand-gold absolute top-0 left-0 right-0" />

              <div className="space-y-3.5 pt-1">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-chip text-brand-icewhite text-[11px] font-bold uppercase tracking-wider border border-brand-line-strong/40">
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Official Protocol</span>
                  </div>
                  <span className="text-[11px] font-extrabold text-brand-icewhite flex items-center gap-1 bg-brand-chip/50 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" /> Complimentary
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-brand-icewhite tracking-tight leading-snug">
                    Delegate Privileges & Amenities
                  </h3>
                  <p className="text-xs text-brand-silver mt-1 font-medium leading-relaxed min-h-[2.5rem]">
                    All-inclusive diplomatic provisions, official summit transfers, and executive dining for accredited delegates.
                  </p>
                </div>

                {/* 3 Balanced Protocol Amenities */}
                <div className="space-y-2 pt-1">
                  {/* Amenity 1: Wi-Fi & 5G eSIM */}
                  <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-brand-surface-2 border border-brand-line hover:bg-brand-surface-2 transition-colors">
                    <div className="w-8 h-8 rounded-xl bg-brand-electric text-brand-gold flex items-center justify-center shrink-0 shadow-xs">
                      <Wifi className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-bold text-brand-icewhite truncate">Gigabit Wi-Fi & 5G eSIM</h4>
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-brand-chip text-brand-icewhite font-bold shrink-0">Free</span>
                      </div>
                      <p className="text-[11px] text-brand-silver truncate">Unlimited summit internet & local 5G eSIM at check-in</p>
                    </div>
                  </div>

                  {/* Amenity 2: Executive Dining */}
                  <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-brand-surface-2 border border-brand-line hover:bg-brand-surface-2 transition-colors">
                    <div className="w-8 h-8 rounded-xl bg-brand-electric text-brand-gold flex items-center justify-center shrink-0 shadow-xs">
                      <UtensilsCrossed className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-bold text-brand-icewhite truncate">Executive Dining & Banquets</h4>
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-brand-gold/40 text-brand-gold font-bold shrink-0">Full Board</span>
                      </div>
                      <p className="text-[11px] text-brand-silver truncate">Daily buffet, luncheons & Royal Lao Baci Gala Dinner</p>
                    </div>
                  </div>

                  {/* Amenity 3: VIP Shuttle */}
                  <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-brand-surface-2 border border-brand-line hover:bg-brand-surface-2 transition-colors">
                    <div className="w-8 h-8 rounded-xl bg-brand-electric text-brand-gold flex items-center justify-center shrink-0 shadow-xs">
                      <Bus className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-bold text-brand-icewhite truncate">Scheduled VIP Shuttle Loops</h4>
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-brand-chip text-brand-icewhite font-bold shrink-0">VIP Transit</span>
                      </div>
                      <p className="text-[11px] text-brand-silver truncate">Continuous luxury coach transfers to convention hall</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Protocol Footer Actions */}
              <div className="mt-4 pt-3.5 border-t border-brand-line space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-brand-silver">
                  <span className="flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" /> Accredited Delegates
                  </span>
                  <span className="font-bold text-brand-icewhite">100% Included</span>
                </div>
                <Link href="/hotels" className="block w-full">
                  <Button className="w-full text-xs font-extrabold bg-brand-electric hover:bg-brand-royal text-white rounded-xl h-11 transition-all cursor-pointer shadow-md shadow-brand-electric/15 flex items-center justify-center gap-1.5 group/btn">
                    <span>View Full Hospitality Protocol</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
