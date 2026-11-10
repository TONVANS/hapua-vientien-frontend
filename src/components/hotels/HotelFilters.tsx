import React from 'react';
import { Search, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HotelFiltersProps {
  search: string;
  setSearch: (search: string) => void;
  starFilter: number | null;
  setStarFilter: (rating: number | null) => void;
  totalCount: number;
}

export function HotelFilters({
  search,
  setSearch,
  starFilter,
  setStarFilter,
  totalCount,
}: HotelFiltersProps) {
  return (
    <div className="mt-10 max-w-4xl mx-auto glass-panel p-4 sm:p-5 rounded-2xl shadow-lg border border-brand-line space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full flex-1">
          <Search className="w-4 h-4 text-brand-silver absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search hotel name, location, or amenities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 bg-brand-surface/80 border-brand-line rounded-xl text-sm focus:bg-brand-surface"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-silver p-1 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Star Rating Quick Filter Buttons */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Button
            variant={starFilter === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStarFilter(null)}
            className={`rounded-xl text-xs font-semibold h-10 px-4 cursor-pointer ${
              starFilter === null
                ? 'bg-brand-electric text-white hover:bg-brand-royal'
                : 'border-brand-line text-brand-silver bg-brand-surface/70 hover:bg-brand-surface'
            }`}
          >
            All Hotels
          </Button>
          <Button
            variant={starFilter === 5 ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStarFilter(5)}
            className={`rounded-xl text-xs font-semibold h-10 px-3 flex items-center gap-1 cursor-pointer ${
              starFilter === 5
                ? 'bg-brand-electric text-white hover:bg-brand-royal'
                : 'border-brand-line text-brand-silver bg-brand-surface/70 hover:bg-brand-surface'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
            <span>5-Star Luxury</span>
          </Button>
          <Button
            variant={starFilter === 4 ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStarFilter(4)}
            className={`rounded-xl text-xs font-semibold h-10 px-3 flex items-center gap-1 cursor-pointer ${
              starFilter === 4
                ? 'bg-brand-electric text-white hover:bg-brand-royal'
                : 'border-brand-line text-brand-silver bg-brand-surface/70 hover:bg-brand-surface'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
            <span>4-Star+</span>
          </Button>
        </div>
      </div>

      {/* Results Count & Summary Bar */}
      <div className="flex items-center justify-between text-xs text-brand-silver pt-2 border-t border-brand-line/60 px-1">
        <span>
          Showing <strong className="text-brand-icewhite">{totalCount}</strong> official partner accommodations
        </span>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Delegation shuttle service included</span>
        </div>
      </div>
    </div>
  );
}
