import React from 'react';
import Link from 'next/link';
import { Users, CalendarDays, TrendingUp, Hotel, ArrowUpRight } from 'lucide-react';

export function OperationalShortcuts() {
  return (
    <div className="lg:col-span-4 space-y-4">
      <div>
        <h3 className="font-bold text-lg text-brand-icewhite">Operational Tools</h3>
        <p className="text-xs text-brand-silver">Quick shortcuts for secretariat staff</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Link href="/admin/delegations">
          <div className="p-4 rounded-xl border border-brand-line bg-brand-surface hover:border-brand-cyan/30 hover:bg-brand-darknavy transition-all flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-electric text-white flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-icewhite group-hover:text-brand-icewhite">
                  Manage Delegations
                </p>
                <p className="text-[11px] text-brand-muted">Add, edit, and issue badges</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-brand-muted group-hover:text-brand-icewhite" />
          </div>
        </Link>

        <Link href="/admin/activities">
          <div className="p-4 rounded-xl border border-brand-line bg-brand-surface hover:border-brand-cyan/30 hover:bg-brand-darknavy transition-all flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-gold text-brand-darknavy flex items-center justify-center">
                <CalendarDays className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-icewhite group-hover:text-brand-icewhite">
                  Schedule Sessions
                </p>
                <p className="text-[11px] text-brand-muted">Configure agendas & rooms</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-brand-muted group-hover:text-brand-icewhite" />
          </div>
        </Link>

        <Link href="/admin/gallery">
          <div className="p-4 rounded-xl border border-brand-line bg-brand-surface hover:border-brand-cyan/30 hover:bg-brand-darknavy transition-all flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-surface-3 text-white flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-icewhite group-hover:text-brand-icewhite">
                  Media & Press
                </p>
                <p className="text-[11px] text-brand-muted">Upload gallery photos & videos</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-brand-muted group-hover:text-brand-icewhite" />
          </div>
        </Link>

        <Link href="/admin/hotels">
          <div className="p-4 rounded-xl border border-brand-line bg-brand-surface hover:border-brand-cyan/30 hover:bg-brand-darknavy transition-all flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-royal text-white flex items-center justify-center">
                <Hotel className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-icewhite group-hover:text-brand-icewhite">
                  Hospitality Guide
                </p>
                <p className="text-[11px] text-brand-muted">Manage hotel partnerships</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-brand-muted group-hover:text-brand-icewhite" />
          </div>
        </Link>
      </div>
    </div>
  );
}
