'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  Camera,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Building,
  Sparkles,
  Info,
} from 'lucide-react';
import { Activity } from '@/types';
import { formatEventDate } from '@/components/admin/activities/utils';

interface ActivityCheckInInfoCardProps {
  activity: Activity;
  className?: string;
}

export function ActivityCheckInInfoCard({ activity, className = '' }: ActivityCheckInInfoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isDescriptionLong = (activity.description?.length || 0) > 180;

  return (
    <div
      className={`bg-brand-surface/90 backdrop-blur-2xl p-5 sm:p-7 rounded-3xl border border-brand-line shadow-[0_12px_36px_rgba(0,38,96,0.06)] relative overflow-hidden transition-all ${className}`}
    >
      {/* Top institutional gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-electric via-brand-electric to-brand-gold" />

      {/* Top Header Tags */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-brand-chip text-brand-icewhite tracking-wide">
            <Sparkles className="w-3 h-3 text-brand-gold" />
            HWG 5 Session
          </span>
          {activity.status && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-surface-2 text-brand-icewhite border border-brand-line">
              {activity.status}
            </span>
          )}
        </div>

        {activity.qrCode && (
          <span className="font-mono text-[10px] font-bold text-brand-silver bg-brand-surface-2 px-2 py-0.5 rounded-md border border-brand-line">
            REF: {activity.qrCode}
          </span>
        )}
      </div>

      {/* Activity Title */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-brand-icewhite leading-snug mb-3 tracking-tight">
        {activity.name}
      </h1>

      {/* Description with Expand/Collapse */}
      {activity.description && (
        <div className="mb-5">
          <p
            className={`text-brand-silver text-xs sm:text-sm leading-relaxed ${
              !isExpanded && isDescriptionLong ? 'line-clamp-3' : ''
            }`}
          >
            {activity.description}
          </p>
          {isDescriptionLong && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-1.5 text-xs font-bold text-brand-icewhite hover:text-brand-cyan flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>{isExpanded ? 'Show less' : 'Read full session brief'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      )}

      {/* Schedule & Venue Meta Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-brand-darknavy p-3.5 sm:p-4 rounded-2xl border border-brand-line/90">
        {/* Date */}
        <div className="flex items-center text-xs font-semibold text-brand-icewhite">
          <div className="w-8 h-8 rounded-xl bg-brand-surface flex items-center justify-center mr-3 shadow-2xs border border-brand-line shrink-0">
            <Calendar className="w-4 h-4 text-brand-cyan" />
          </div>
          <div>
            <span className="text-[10px] font-medium text-brand-muted block">Session Date</span>
            <span>{formatEventDate(activity.date)}</span>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-center text-xs font-semibold text-brand-icewhite">
          <div className="w-8 h-8 rounded-xl bg-brand-surface flex items-center justify-center mr-3 shadow-2xs border border-brand-line shrink-0">
            <Clock className="w-4 h-4 text-brand-cyan" />
          </div>
          <div>
            <span className="text-[10px] font-medium text-brand-muted block">Time Window</span>
            <span>
              {new Date(activity.startTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              -{' '}
              {new Date(activity.endTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>

        {/* Room / Location */}
        <div className="flex items-center text-xs font-semibold text-brand-icewhite">
          <div className="w-8 h-8 rounded-xl bg-brand-surface flex items-center justify-center mr-3 shadow-2xs border border-brand-line shrink-0">
            <MapPin className="w-4 h-4 text-brand-cyan" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-medium text-brand-muted block">Venue Room</span>
            <span className="truncate block">{activity.room?.name || 'Main Summit Hall'}</span>
          </div>
        </div>
      </div>

      {/* Materials & Resources Bar */}
      {(activity.docURL || activity.allImageURL) && (
        <div className="mt-4 pt-3.5 border-t border-brand-line flex flex-wrap items-center gap-2.5">
          {activity.docURL && (
            <a
              href={activity.docURL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-chip hover:bg-brand-chip text-brand-icewhite text-xs font-bold border border-brand-line-strong transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xs cursor-pointer"
            >
              <FileText className="w-4 h-4 text-brand-cyan" />
              <span>Session Documents (PDF)</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          )}
          {activity.allImageURL && (
            <a
              href={activity.allImageURL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/15 text-amber-300 text-xs font-bold border border-amber-500/35 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xs cursor-pointer"
            >
              <Camera className="w-4 h-4 text-amber-300" />
              <span>Session Photo Album</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
