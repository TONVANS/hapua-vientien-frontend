'use client';

import React from 'react';
import { motion } from 'motion/react';
import { DoorOpen, Building, MapPin, Users, Wifi, MonitorPlay } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Room } from '@/types';

interface ActivityVenueCardProps {
  room: Room;
}

export function ActivityVenueCard({ room }: ActivityVenueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="glass-panel rounded-3xl p-6 sm:p-8 border border-brand-line shadow-xl space-y-5"
    >
      <div className="flex items-center justify-between pb-2 border-b border-brand-line">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-electric to-brand-royal text-white flex items-center justify-center shadow-md">
            <DoorOpen className="w-5 h-5 text-brand-gold" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-brand-icewhite">Meeting Room & Facility</h2>
            <p className="text-xs text-brand-muted">Summit Venue, Vientiane Capital, Lao PDR</p>
          </div>
        </div>

        <Badge className="bg-brand-chip text-brand-icewhite text-xs font-bold px-3 py-1 rounded-full border border-brand-line-strong/40">
          <Users className="w-3.5 h-3.5 mr-1" />
          Capacity: {room.capacity} Delegates
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pt-1">
        {room.imageUrl ? (
          <div className="w-full sm:w-52 aspect-video sm:aspect-4/3 rounded-2xl overflow-hidden border border-brand-line bg-slate-900 shrink-0 group">
            <img
              src={room.imageUrl}
              alt={room.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="w-full sm:w-36 h-28 rounded-2xl bg-gradient-to-br from-brand-chip to-brand-chip/40 text-brand-icewhite flex flex-col items-center justify-center shrink-0 border border-brand-line-strong/50 shadow-xs">
            <Building className="w-8 h-8 mb-1 text-brand-cyan" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider">Hall Facility</span>
          </div>
        )}

        <div className="space-y-2 flex-1">
          <h3 className="text-lg font-black text-brand-icewhite">{room.name}</h3>

          {room.location && (
            <p className="text-xs sm:text-sm text-brand-silver flex items-center gap-1.5 font-semibold">
              <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
              <span>{room.location}</span>
            </p>
          )}

          {room.description && (
            <p className="text-xs text-brand-muted leading-relaxed pt-1">
              {room.description}
            </p>
          )}

          {/* Facility Highlights */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="text-[11px] font-bold text-brand-icewhite bg-brand-surface/90 px-2.5 py-1 rounded-lg border border-brand-line flex items-center gap-1">
              <MonitorPlay className="w-3 h-3 text-brand-gold" /> Plenary Screen
            </span>
            <span className="text-[11px] font-bold text-brand-icewhite bg-brand-surface/90 px-2.5 py-1 rounded-lg border border-brand-line flex items-center gap-1">
              <Wifi className="w-3 h-3 text-brand-gold" /> 5G Delegation Stream
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
