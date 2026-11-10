'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Calendar, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { AgendaItem } from '@/types';

interface RelatedSessionsCardProps {
  relatedActivities: AgendaItem[];
}

export function RelatedSessionsCard({ relatedActivities }: RelatedSessionsCardProps) {
  if (relatedActivities.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glass-panel rounded-3xl p-6 sm:p-7 border border-brand-line shadow-xl space-y-4"
    >
      <div className="flex items-center gap-2 pb-2 border-b border-brand-line">
        <Calendar className="w-4 h-4 text-brand-gold" />
        <h3 className="font-extrabold text-sm text-brand-icewhite">Other Sessions Today</h3>
      </div>

      <div className="space-y-3">
        {relatedActivities.map((rel) => (
          <Link
            key={rel.id}
            href={`/agenda/${rel.id}`}
            className="block p-3.5 rounded-2xl bg-brand-surface/80 hover:bg-brand-surface border border-brand-line hover:border-brand-line-strong transition-all hover:scale-[1.02] shadow-xs group"
          >
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-mono text-[11px] text-brand-icewhite font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-gold" />
                {new Date(rel.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} –{' '}
                {new Date(rel.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <ChevronRight className="w-4 h-4 text-brand-muted group-hover:text-brand-icewhite group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="text-xs font-bold text-brand-icewhite group-hover:text-brand-icewhite mt-1.5 line-clamp-1">
              {rel.name}
            </h4>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
