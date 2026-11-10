'use client';

import React from 'react';
import { motion } from 'motion/react';
import { FileText, Sparkles, ExternalLink } from 'lucide-react';

interface ActivityOverviewCardProps {
  description?: string | null;
  docURL?: string | null;
}

export function ActivityOverviewCard({ description, docURL }: ActivityOverviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-panel rounded-3xl p-6 sm:p-8 border border-brand-line shadow-xl space-y-4"
    >
      <div className="flex items-center gap-2.5 pb-2 border-b border-brand-line">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-electric to-brand-royal text-white flex items-center justify-center shadow-md">
          <FileText className="w-5 h-5 text-brand-gold" />
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-brand-icewhite">Session Details & Deliberation Scope</h2>
          <p className="text-xs text-brand-muted">Official executive brief and agenda items</p>
        </div>
      </div>

      <div className="text-sm sm:text-base text-brand-silver leading-relaxed space-y-3 pt-2 font-normal">
        {description ? (
          <p className="whitespace-pre-line leading-relaxed">{description}</p>
        ) : (
          <p className="text-brand-muted italic">
            Official ministerial proceedings and strategic energy governance resolutions for the HWG 5 Meeting in Vientiane, Lao PDR.
          </p>
        )}
      </div>

      {docURL && (
        <div className="mt-4 pt-4 border-t border-brand-line">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-brand-surface-2 via-brand-surface to-brand-surface-2 border border-brand-line-strong shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-electric text-white flex items-center justify-center shadow-xs shrink-0">
                <FileText className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-brand-icewhite">Official Session Documentation</h3>
                <p className="text-[11px] text-brand-silver">
                  Ministerial brief, session presentation slides, or agenda documentation
                </p>
              </div>
            </div>
            <a
              href={docURL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-electric hover:bg-brand-royal text-white text-xs font-bold shadow-md shadow-brand-electric/15 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0"
            >
              <span>Open Document</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </motion.div>
  );
}
