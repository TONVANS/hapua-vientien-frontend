import React from 'react';
import { Plus, Search, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Room } from '@/types';

interface ActivitiesHeaderBarProps {
  total: number;
  search: string;
  setSearch: (search: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedRoom: string;
  setSelectedRoom: (roomId: string) => void;
  rooms: Room[];
  isLoading: boolean;
  onRefresh: () => void;
  onOpenCreate: () => void;
}

export function ActivitiesHeaderBar({
  total,
  search,
  setSearch,
  selectedStatus,
  setSelectedStatus,
  selectedRoom,
  setSelectedRoom,
  rooms,
  isLoading,
  onRefresh,
  onOpenCreate,
}: ActivitiesHeaderBarProps) {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-brand-icewhite tracking-tight">HWG 5 Activities & Agenda</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-brand-chip text-brand-icewhite border border-brand-line-strong">
              {total} Total
            </span>
          </div>
          <p className="text-xs text-brand-silver mt-0.5">
            Manage official plenary sessions, bilateral dialogues, working groups, and technical site tours
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="rounded-xl border-brand-line text-brand-icewhite hover:bg-brand-surface-2 cursor-pointer transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={onOpenCreate}
            className="bg-brand-electric hover:bg-brand-royal text-white rounded-xl shadow-md shadow-brand-electric/20 text-xs font-semibold cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            New Activity
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 bg-brand-surface rounded-2xl border border-brand-line shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search activities by name or scope..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 text-xs bg-brand-darknavy border-brand-line rounded-xl focus-visible:ring-brand-cyan/20"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-silver p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            aria-label="Filter by status"
            className="h-10 text-xs px-3 bg-brand-darknavy border border-brand-line rounded-xl text-brand-icewhite focus:outline-brand-cyan cursor-pointer transition-colors"
          >
            <option value="">All Statuses</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELED">Canceled</option>
          </select>

          {/* Room Filter */}
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            aria-label="Filter by meeting room"
            className="h-10 text-xs px-3 bg-brand-darknavy border border-brand-line rounded-xl text-brand-icewhite focus:outline-brand-cyan cursor-pointer transition-colors"
          >
            <option value="">All Meeting Rooms</option>
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} (Cap: {r.capacity})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
