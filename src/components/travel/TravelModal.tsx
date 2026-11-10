import React, { useState, useEffect } from 'react';
import { Compass, MapPin, Clock, Calendar, Navigation, Sparkles, Camera, X, ChevronLeft, ChevronRight, ShieldCheck, Check, Copy, Globe, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { TravelRecommend } from '@/types';
import { getSpotImages, formatTime, WEEKDAY_NAMES, ALL_WEEKDAYS } from './utils';

interface TravelModalProps {
  spot: TravelRecommend | null;
  onClose: () => void;
}

export function TravelModal({ spot, onClose }: TravelModalProps) {
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [copiedLocation, setCopiedLocation] = useState(false);

  useEffect(() => {
    if (spot) {
      setModalImageIndex(0);
      setCopiedLocation(false);
    }
  }, [spot]);

  useEffect(() => {
    if (!spot) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const images = getSpotImages(spot);
      if (images.length <= 1) return;

      if (e.key === 'ArrowRight') {
        setModalImageIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setModalImageIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [spot]);

  if (!spot) return null;

  const handleCopyLocation = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLocation(true);
    setTimeout(() => setCopiedLocation(false), 2000);
  };

  const images = getSpotImages(spot);
  const currentImg =
    images[modalImageIndex] ||
    images[0] ||
    'https://placehold.co/1200x800/e2e8f0/475569?text=No+Image+Available';

  return (
    <Dialog open={!!spot} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-4xl lg:max-w-5xl w-full p-0 overflow-hidden rounded-[28px] border border-brand-line bg-brand-surface/95 backdrop-blur-2xl shadow-2xl ring-1 ring-black/5 transition-all"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{spot.placeName}</DialogTitle>
          <DialogDescription>{spot.description || spot.location}</DialogDescription>
        </DialogHeader>

        <div className="relative flex flex-col max-h-[90vh]">
          {/* Photo Showcase Carousel */}
          <div className="relative w-full shrink-0 bg-slate-950">
            {/* Main Image Stage */}
            <div className="relative h-[280px] sm:h-[380px] lg:h-[420px] w-full overflow-hidden group">
              <img
                src={currentImg}
                alt={spot.placeName}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Vignette Gradients */}
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

              {/* Top Header Floating Bar */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                {/* Category & Badge */}
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white font-bold text-xs shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Heritage & Culture Guide</span>
                  </div>
                </div>

                {/* Top Right Controls */}
                <div className="flex items-center gap-2">
                  {images.length > 1 && (
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/90 text-xs font-semibold shadow-lg">
                      <Camera className="w-3.5 h-3.5 text-brand-gold" />
                      <span>
                        {modalImageIndex + 1} / {images.length}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={onClose}
                    className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:scale-105 shadow-lg active:scale-95 cursor-pointer"
                    aria-label="Close dialog"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chevron Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalImageIndex((prev) => (prev - 1 + images.length) % images.length);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 shadow-xl active:scale-95 z-10 cursor-pointer"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalImageIndex((prev) => (prev + 1) % images.length);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 shadow-xl active:scale-95 z-10 cursor-pointer"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Bottom Image Overlay (Title & Location) */}
              <div className="absolute bottom-5 inset-x-6 z-10 text-white space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-xs text-brand-gold font-medium tracking-wide">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-brand-gold" />
                  <span className="drop-shadow-xs">{spot.location}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
                  {spot.placeName}
                </h2>
              </div>
            </div>

            {/* Thumbnail Strip (if multiple photos) */}
            {images.length > 1 && (
              <div className="flex items-center gap-2.5 px-6 py-3 bg-brand-darknavy border-t border-white/10 overflow-x-auto">
                <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
                  Gallery:
                </span>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setModalImageIndex(idx)}
                    className={`relative w-16 h-11 sm:w-20 sm:h-13 rounded-xl overflow-hidden shrink-0 transition-all duration-200 cursor-pointer ${
                      modalImageIndex === idx
                        ? 'ring-2 ring-brand-gold ring-offset-2 ring-offset-brand-line scale-105 shadow-md opacity-100'
                        : 'opacity-50 hover:opacity-90 hover:scale-102 border border-white/10'
                    }`}
                  >
                    <img src={img} alt="Thumbnail preview" className="w-full h-full object-cover" />
                    {modalImageIndex === idx && (
                      <div className="absolute inset-0 bg-brand-gold/10" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Modal Body Content (Scrollable) */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-gradient-to-b from-brand-surface to-brand-surface-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Description & Cultural Etiquette Advisory */}
              <div className="lg:col-span-7 space-y-6">
                {/* Destination Overview */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-icewhite">
                    <Compass className="w-4 h-4 text-brand-cyan" />
                    <span>Destination Highlights</span>
                  </div>
                  <p className="text-sm sm:text-base text-brand-silver leading-relaxed">
                    {spot.description ||
                      'Renowned historic highlight of Vientiane Capital offering delegates a memorable experience of Lao culture, biodiversity, and serenity.'}
                  </p>
                </div>

                {/* Delegate Visiting Advice / Etiquette Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-chip/40 via-brand-surface-2/30 to-brand-surface border border-brand-line-strong/40 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-icewhite">
                    <ShieldCheck className="w-4 h-4 text-brand-cyan" />
                    <span>Delegate Etiquette & Practical Recommendations</span>
                  </div>
                  <ul className="space-y-2 text-xs text-brand-silver leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-electric mt-1.5 shrink-0" />
                      <span>
                        <strong>Sacred Site Dress Code:</strong> Wear respectful clothing covering shoulders and knees when visiting temples or royal monuments.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-electric mt-1.5 shrink-0" />
                      <span>
                        <strong>Photography:</strong> Photography is permitted in courtyard areas; kindly disable flash inside sacred assembly halls and during morning alms.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-electric mt-1.5 shrink-0" />
                      <span>
                        <strong>Transportation:</strong> Accessible via official conference delegate transfers, hotel concierge shuttles, or local Vientiane tuk-tuks.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Key Details & Location Hub */}
              <div className="lg:col-span-5 space-y-4">
                {/* Visiting Hours Card */}
                <div className="p-4 rounded-2xl bg-brand-surface border border-brand-line shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-icewhite">
                    <Clock className="w-4 h-4 text-brand-cyan" />
                    <span>Visiting Hours</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-sm font-bold text-brand-icewhite">
                      {formatTime(spot.openTime) && formatTime(spot.closeTime)
                        ? `${formatTime(spot.openTime)} – ${formatTime(spot.closeTime)}`
                        : 'Open Regular Hours'}
                    </p>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 text-[11px] font-semibold">
                      Daily Access
                    </span>
                  </div>
                </div>

                {/* Operating Days */}
                <div className="p-4 rounded-2xl bg-brand-surface border border-brand-line shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-brand-icewhite">
                      <Calendar className="w-4 h-4 text-brand-cyan" />
                      <span>Operating Schedule</span>
                    </div>
                    <span className="text-[11px] text-brand-muted">
                      {spot.openDays && spot.openDays.length > 0 && spot.openDays.length < 7
                        ? `${spot.openDays.length} days/week`
                        : '7 days/week'}
                    </span>
                  </div>

                  {/* Day Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ALL_WEEKDAYS.map((day) => {
                      const isOpen =
                        !spot.openDays ||
                        spot.openDays.length === 0 ||
                        spot.openDays.includes(day);
                      return (
                        <span
                          key={day}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                            isOpen
                              ? 'bg-brand-electric text-white shadow-xs'
                              : 'bg-brand-surface-2 text-brand-muted opacity-50'
                          }`}
                        >
                          {WEEKDAY_NAMES[day]}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Address & Fast Copy Card */}
                <div className="p-4 rounded-2xl bg-brand-surface-2 border border-brand-line space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-brand-icewhite">
                      <MapPin className="w-4 h-4 text-brand-cyan" />
                      <span>Location</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyLocation(spot.location)}
                      className="h-7 px-2.5 text-xs rounded-lg text-brand-cyan hover:bg-brand-chip/50 transition-colors cursor-pointer"
                    >
                      {copiedLocation ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                          <span className="text-emerald-300 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1" />
                          <span>Copy</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-brand-silver font-medium leading-relaxed bg-brand-surface p-2.5 rounded-xl border border-brand-line/80">
                    {spot.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="p-4 sm:px-8 sm:py-4 bg-brand-surface-2 border-t border-brand-line flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-2 text-xs text-brand-muted">
              <Globe className="w-3.5 h-3.5 text-brand-cyan" />
              <span>HWG 5 Meeting • Delegate Travel Guide</span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <Button
                variant="outline"
                onClick={onClose}
                className="rounded-xl text-xs font-semibold h-11 px-5 border-brand-line bg-brand-surface hover:bg-brand-surface-2 transition-colors cursor-pointer"
              >
                Close
              </Button>

              {spot.mapUrl && (
                <a
                  href={spot.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial"
                >
                  <Button className="w-full bg-brand-electric hover:bg-brand-royal text-white rounded-xl text-xs font-bold h-11 px-6 shadow-md shadow-brand-electric/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5 cursor-pointer">
                    <Navigation className="w-4 h-4 mr-1" />
                    <span>Google Maps Directions</span>
                    <ExternalLink className="w-3 h-3 ml-0.5 opacity-75" />
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
