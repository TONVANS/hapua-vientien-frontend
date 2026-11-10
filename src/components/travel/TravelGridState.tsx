import React from 'react';
import { Compass, Info, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TravelRecommend } from '@/types';
import { TravelCard } from './TravelCard';

interface TravelGridStateProps {
  travelList: TravelRecommend[];
  filteredTravel: TravelRecommend[];
  isLoading: boolean;
  error: string | null;
  search: string;
  onRetry: () => void;
  onResetFilters: () => void;
  onSelectSpot: (spot: TravelRecommend) => void;
}

export function TravelGridState({
  travelList,
  filteredTravel,
  isLoading,
  error,
  search,
  onRetry,
  onResetFilters,
  onSelectSpot,
}: TravelGridStateProps) {
  if (isLoading && travelList.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-3xl border border-brand-line bg-brand-surface/80 overflow-hidden shadow-sm animate-pulse space-y-4 p-4"
          >
            <div className="aspect-16/10 bg-brand-surface-3 rounded-2xl" />
            <div className="space-y-2 pt-2">
              <div className="h-5 bg-brand-surface-3 rounded w-3/4" />
              <div className="h-4 bg-brand-surface-3 rounded w-1/2" />
              <div className="h-16 bg-brand-surface-3 rounded w-full mt-3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!isLoading && error && travelList.length === 0) {
    return (
      <div className="text-center py-16 glass-panel rounded-3xl p-8 max-w-lg mx-auto space-y-4">
        <div className="w-12 h-12 rounded-full bg-red-500/15 text-red-400 flex items-center justify-center mx-auto">
          <Info className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-brand-icewhite">Unable to Load Travel Guide</h3>
        <p className="text-xs text-brand-silver">{error}</p>
        <Button
          onClick={onRetry}
          className="bg-brand-electric hover:bg-brand-royal text-white rounded-xl text-xs font-semibold cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
          Retry
        </Button>
      </div>
    );
  }

  if (!isLoading && filteredTravel.length === 0) {
    return (
      <div className="text-center py-16 glass-panel rounded-3xl p-8 max-w-lg mx-auto space-y-4">
        <div className="w-12 h-12 rounded-full bg-brand-chip text-brand-icewhite flex items-center justify-center mx-auto">
          <Compass className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-brand-icewhite">No Destinations Found</h3>
        <p className="text-xs text-brand-silver">
          We could not find any sightseeing locations matching &quot;{search}&quot;. Try searching for &quot;stupa&quot;, &quot;temple&quot;, or &quot;Mekong&quot;.
        </p>
        <Button
          onClick={onResetFilters}
          variant="outline"
          className="rounded-xl text-xs font-semibold border-brand-cyan/30 text-brand-icewhite cursor-pointer"
        >
          Reset Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredTravel.map((spot, index) => (
        <TravelCard
          key={spot.id}
          spot={spot}
          index={index}
          onSelect={onSelectSpot}
        />
      ))}
    </div>
  );
}
