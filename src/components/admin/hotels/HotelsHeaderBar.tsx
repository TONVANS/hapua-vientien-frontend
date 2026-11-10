import React from 'react';
import { Hotel as HotelIcon, Plus, Search, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface HotelsHeaderBarProps {
  search: string;
  setSearch: (val: string) => void;
  selectedStarFilter: string;
  setSelectedStarFilter: (val: string) => void;
  loading: boolean;
  onRefresh: () => void;
  onOpenCreate: () => void;
}

export function HotelsHeaderBar({
  search,
  setSearch,
  selectedStarFilter,
  setSelectedStarFilter,
  loading,
  onRefresh,
  onOpenCreate,
}: HotelsHeaderBarProps) {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-brand-surface p-6 rounded-2xl border border-brand-line shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-chip text-brand-icewhite">
              <HotelIcon className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-bold text-brand-icewhite tracking-tight">Hotel Accommodations</h2>
          </div>
          <p className="text-xs text-brand-silver mt-1 ml-10">
            Official partner hotels, luxury resorts, and accommodation guides for HWG 5 delegates
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="rounded-xl border-brand-line text-brand-icewhite hover:bg-brand-surface-2 h-10 px-4 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={onOpenCreate}
            className="bg-brand-electric hover:bg-brand-royal text-white rounded-xl shadow-md shadow-brand-electric/20 text-xs font-semibold h-10 px-4 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Partner Hotel
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 bg-brand-surface rounded-2xl border border-brand-line shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search hotel name, address, or contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-8 h-10 text-xs bg-brand-darknavy border-brand-line rounded-xl focus-visible:ring-brand-cyan/20"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-silver cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2">
            <Label className="text-xs font-semibold text-brand-silver whitespace-nowrap">Star Tier:</Label>
            <select
              value={selectedStarFilter}
              onChange={(e) => setSelectedStarFilter(e.target.value)}
              aria-label="Filter by star tier"
              className="h-10 text-xs px-3 bg-brand-darknavy border border-brand-line rounded-xl text-brand-icewhite focus:outline-brand-cyan cursor-pointer"
            >
              <option value="">All Ratings</option>
              <option value="5">5-Star Luxury</option>
              <option value="4">4-Star Superior</option>
              <option value="3">3-Star Standard</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
