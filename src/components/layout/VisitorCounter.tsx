'use client';

import React, { useEffect, useState } from 'react';
import { Eye, TrendingUp } from 'lucide-react';
import { publicService } from '@/services/public.service';
import type { SiteVisitStats } from '@/types';

export function VisitorCounter() {
  const [stats, setStats] = useState<SiteVisitStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const SESSION_KEY = 'hapua_has_visited';

    const handleVisit = async () => {
      try {
        const hasVisited = typeof window !== 'undefined' ? sessionStorage.getItem(SESSION_KEY) : null;

        if (!hasVisited) {
          // First visit in this browser session -> record and fetch stats
          const path = typeof window !== 'undefined' ? window.location.pathname : '/';
          const data = await publicService.recordVisit(path);
          if (isMounted) {
            setStats(data);
            try {
              sessionStorage.setItem(SESSION_KEY, 'true');
            } catch {
              // Ignore sessionStorage errors (e.g. private browsing storage limits)
            }
          }
        } else {
          // Already visited in this session -> get stats without incrementing
          const data = await publicService.getVisitStats();
          if (isMounted) {
            setStats(data);
          }
        }
      } catch {
        // Silently handle error so footer doesn't break
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    handleVisit();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-surface/80 backdrop-blur-xs border border-brand-line shadow-2xs hover:border-brand-gold/60 transition-colors">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold" />
        </span>
        <div className="flex items-center gap-1.5 text-brand-silver">
          <Eye className="w-3.5 h-3.5 text-brand-cyan" />
          <span className="font-medium text-brand-silver">Total Visits:</span>
        </div>
        {isLoading ? (
          <span className="inline-block w-10 h-3.5 bg-brand-surface-3 animate-pulse rounded-xs" />
        ) : (
          <span className="font-semibold text-brand-icewhite tabular-nums">
            {stats ? stats.totalVisits.toLocaleString() : '—'}
          </span>
        )}
      </div>

      <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-brand-gold/20 border border-brand-gold/50 text-brand-gold">
        <TrendingUp className="w-3.5 h-3.5 text-brand-gold" />
        <span className="font-medium">Today:</span>
        {isLoading ? (
          <span className="inline-block w-6 h-3.5 bg-brand-gold/40 animate-pulse rounded-xs" />
        ) : (
          <span className="font-bold tabular-nums">
            {stats ? stats.todayVisits.toLocaleString() : '—'}
          </span>
        )}
      </div>
    </div>
  );
}
