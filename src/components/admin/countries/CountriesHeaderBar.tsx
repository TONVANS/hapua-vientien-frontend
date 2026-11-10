import React from 'react';
import { Plus, Search, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CountriesHeaderBarProps {
  search: string;
  setSearch: (search: string) => void;
  loading: boolean;
  onRefresh: () => void;
  onOpenCreate: () => void;
}

export function CountriesHeaderBar({
  search,
  setSearch,
  loading,
  onRefresh,
  onOpenCreate,
}: CountriesHeaderBarProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-icewhite tracking-tight">Countries Master Data</h2>
          <p className="text-xs text-brand-silver">ASEAN member states and international dialogue partners</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="rounded-xl border-brand-line text-brand-icewhite hover:bg-brand-surface-2 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={onOpenCreate}
            className="bg-brand-electric hover:bg-brand-royal text-white rounded-xl shadow-md text-xs font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Country
          </Button>
        </div>
      </div>

      <div className="p-4 bg-brand-surface rounded-2xl border border-brand-line shadow-xs flex items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search country or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 text-xs bg-brand-darknavy border-brand-line rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
