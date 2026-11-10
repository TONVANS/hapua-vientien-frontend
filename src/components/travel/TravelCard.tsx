import React from 'react';
import { Compass, MapPin, Clock, Calendar, Navigation, Sparkles, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TravelRecommend } from '@/types';
import { getSpotImages, formatTime, WEEKDAY_NAMES } from './utils';

interface TravelCardProps {
  spot: TravelRecommend;
  index: number;
  onSelect: (spot: TravelRecommend) => void;
}

export function TravelCard({ spot, index, onSelect }: TravelCardProps) {
  const images = getSpotImages(spot);
  const cover = images[0] || 'https://placehold.co/1200x800/e2e8f0/475569?text=No+Image+Available';
  const openTimeFormatted = formatTime(spot.openTime);
  const closeTimeFormatted = formatTime(spot.closeTime);

  return (
    <div className="group rounded-3xl border border-brand-line bg-brand-surface overflow-hidden shadow-sm hover-lift flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-brand-cyan/30">
      <div>
        {/* Destination Cover Image */}
        <div className="relative aspect-16/10 overflow-hidden bg-brand-surface-2">
          <img
            src={cover}
            alt={spot.placeName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-1 bg-brand-electric/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Heritage Site</span>
            </div>

            {spot.images && spot.images.length > 0 && (
              <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                <Camera className="w-3 h-3" />
                <span>+{spot.images.length + 1}</span>
              </span>
            )}
          </div>

          {/* Place Name in Overlay */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="text-lg font-bold leading-snug drop-shadow-sm">
              {spot.placeName}
            </h3>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-6 space-y-4">
          {/* Location Tag */}
          <div className="flex items-start gap-2 text-xs text-brand-silver">
            <MapPin className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
            <span className="line-clamp-1 leading-relaxed font-medium">{spot.location}</span>
          </div>

          {/* Operating Hours & Days */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-brand-silver pt-1">
            {openTimeFormatted && closeTimeFormatted && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-surface-2 text-brand-icewhite text-[11px] font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {openTimeFormatted} – {closeTimeFormatted}
                </span>
              </div>
            )}

            {spot.openDays && spot.openDays.length > 0 && (
              <div className="flex items-center gap-1 text-[11px] text-brand-silver">
                <Calendar className="w-3.5 h-3.5 text-brand-cyan" />
                <span>
                  {spot.openDays.length === 7
                    ? 'Open Daily'
                    : spot.openDays.map((d) => WEEKDAY_NAMES[d] || d).join(', ')}
                </span>
              </div>
            )}
          </div>

          {/* Description snippet */}
          {spot.description && (
            <p className="text-xs text-brand-silver line-clamp-3 leading-relaxed">
              {spot.description}
            </p>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-6 pt-0 border-t border-brand-line mt-4 flex items-center gap-2">
        <Button
          onClick={() => onSelect(spot)}
          className="flex-1 bg-brand-electric hover:bg-brand-royal text-white rounded-xl text-xs font-bold h-10 shadow-md shadow-brand-electric/15 transition-all cursor-pointer"
        >
          <Compass className="w-3.5 h-3.5 mr-1.5" />
          Explore Guide & Photos
        </Button>

        {spot.mapUrl && (
          <a
            href={spot.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-brand-line text-brand-icewhite hover:bg-brand-surface-2 transition-colors"
            title="Open Google Maps Directions"
          >
            <Navigation className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
