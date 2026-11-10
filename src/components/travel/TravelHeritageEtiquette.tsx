import React from 'react';
import { Sparkles } from 'lucide-react';

export function TravelHeritageEtiquette() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 relative z-10">
      <div className="glass-modal p-8 sm:p-12 rounded-3xl border border-brand-line shadow-xl relative overflow-hidden space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-chip text-brand-icewhite text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Delegate Visiting Etiquette
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-icewhite tracking-tight">
            Lao Cultural Etiquette
          </h2>
          <p className="text-xs sm:text-sm text-brand-silver max-w-3xl leading-relaxed">
            As esteemed guests of Lao PDR, we encourage all delegations to experience the ancient spiritual and natural beauty of Vientiane while observing local cultural customs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-brand-surface/70 border border-brand-line space-y-2">
            <div className="w-8 h-8 rounded-xl bg-brand-electric text-brand-gold flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h4 className="text-sm font-bold text-brand-icewhite">Sacred Temple Dress Code</h4>
            <p className="text-xs text-brand-silver leading-relaxed">
              Shoulders and knees must be respectfully covered when entering sacred Buddhist monasteries (Vats) and the Royal Palace Museum.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-brand-surface/70 border border-brand-line space-y-2">
            <div className="w-8 h-8 rounded-xl bg-brand-electric text-brand-gold flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h4 className="text-sm font-bold text-brand-icewhite">Morning Alms Giving (Tak Bat)</h4>
            <p className="text-xs text-brand-silver leading-relaxed">
              Witness the dawn saffron-robed procession silently from a respectful distance. Flash photography and obstructing monks are strictly prohibited.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-brand-surface/70 border border-brand-line space-y-2">
            <div className="w-8 h-8 rounded-xl bg-brand-electric text-brand-gold flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="text-sm font-bold text-brand-icewhite">Mekong Riverside & Markets</h4>
            <p className="text-xs text-brand-silver leading-relaxed">
              Enjoy the Mekong riverside promenade and night market respectfully: bargain politely, avoid single-use plastics, and keep riverbanks clean.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
