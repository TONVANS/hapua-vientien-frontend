import React from 'react';

interface DayOption {
  date: string;
  label: string;
  subtitle: string;
}

interface DaySwitcherProps {
  days: DayOption[];
  selectedDay: string;
  onSelectDay: (date: string) => void;
}

export function DaySwitcher({ days, selectedDay, onSelectDay }: DaySwitcherProps) {
  return (
    <div className="sticky top-20 z-20 py-4 mb-8 bg-brand-darknavy/90 backdrop-blur-xl border-y border-brand-line">
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {days.map((day) => {
          const isSelected = selectedDay === day.date;
          return (
            <button
              key={day.date}
              onClick={() => onSelectDay(day.date)}
              className={`px-4 sm:px-6 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 flex flex-col items-center gap-0.5 cursor-pointer ${
                isSelected
                  ? 'bg-brand-electric text-white shadow-lg shadow-brand-electric/20 scale-105'
                  : 'bg-brand-surface border border-brand-line text-brand-silver hover:bg-brand-chip/40 hover:text-brand-icewhite'
              }`}
            >
              <span className="text-xs uppercase tracking-wider">{day.label}</span>
              <span className={`text-[10px] font-normal ${isSelected ? 'text-brand-gold' : 'text-brand-muted'}`}>
                {day.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
