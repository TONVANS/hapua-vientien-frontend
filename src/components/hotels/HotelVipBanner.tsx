import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HotelVipBanner() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 relative z-10">
      <div className="glass-modal p-8 sm:p-12 rounded-3xl border border-brand-line shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> VIP Protocol Note
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-icewhite tracking-tight">
            Complimentary Delegation Transfers
          </h2>
          <p className="text-xs sm:text-sm text-brand-silver leading-relaxed">
            All accredited delegates staying at official partner hotels receive scheduled VIP shuttle transport between their accommodation and the Vientiane summit venue Center.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <Link href="/activities#register">
            <Button className="h-11 px-6 bg-brand-electric hover:bg-brand-royal text-white rounded-xl font-bold text-xs shadow-lg shadow-brand-electric/20 cursor-pointer">
              Verify Delegate Code
            </Button>
          </Link>
          <Link href="/agenda">
            <Button variant="outline" className="h-11 px-6 glass-panel text-brand-cyan border-brand-cyan/30 rounded-xl font-bold text-xs cursor-pointer">
              Summit Schedule
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
