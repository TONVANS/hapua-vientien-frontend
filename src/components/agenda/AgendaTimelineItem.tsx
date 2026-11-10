import React from 'react';
import Link from 'next/link';
import { Clock, DoorOpen, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AgendaItem } from '@/types';

interface AgendaTimelineItemProps {
  item: AgendaItem;
  duration: string | null;
}

export function AgendaTimelineItem({ item, duration }: AgendaTimelineItemProps) {
  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-7 hover-lift transition-all border border-brand-line shadow-xs flex flex-col sm:flex-row gap-6 items-start justify-between group">
      {/* Time Column */}
      <div className="sm:w-44 shrink-0 flex sm:flex-col items-center sm:items-start gap-1.5 text-xs">
        <div className="px-3 py-1 rounded-lg bg-brand-chip text-brand-icewhite font-mono font-bold text-xs inline-flex items-center gap-1.5 shadow-xs">
          <Clock className="w-3.5 h-3.5 text-brand-cyan" />
          {new Date(item.startTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          –{' '}
          {new Date(item.endTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
        {duration && (
          <span className="text-[11px] font-semibold text-brand-icewhite px-1">
            Duration: {duration}
          </span>
        )}
        <span className="text-[10px] text-brand-muted">Lao Time (GMT+7)</span>
      </div>

      {/* Content Column */}
      <div className="flex-1 space-y-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-chip text-brand-icewhite">
            {item.status}
          </span>
          {item.room?.name && (
            <span className="text-xs text-brand-silver flex items-center gap-1 font-medium bg-brand-surface/80 px-2 py-0.5 rounded-md border border-brand-line">
              <DoorOpen className="w-3.5 h-3.5 text-brand-cyan" />
              {item.room.name}
            </span>
          )}
        </div>

        <Link href={`/agenda/${item.id}`} className="block group-hover:text-brand-icewhite transition-colors">
          <h3 className="text-lg font-bold text-brand-icewhite leading-snug">
            {item.name}
          </h3>
        </Link>

        {item.description && (
          <p className="text-xs text-brand-silver leading-relaxed line-clamp-2">{item.description}</p>
        )}
      </div>

      {/* Actions */}
      <div className="w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-brand-line flex sm:flex-col items-center sm:items-end justify-end gap-2 shrink-0">
        <Link href={`/agenda/${item.id}`}>
          <Button className="bg-brand-electric hover:bg-brand-royal text-white rounded-xl text-xs font-semibold h-9 px-4 shadow-sm group-hover:scale-105 transition-transform cursor-pointer">
            <span>View Details</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
