"use client";

import React, { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addDays,
} from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  value?: string | null; // Expected format: 'YYYY-MM-DD'
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  presets?: { label: string; date: Date | string }[];
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'Select event date...',
  className,
  disabled = false,
  error = false,
  presets,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  // Parse current selected date safely in UTC/local to avoid offset drift
  const parseDate = (val?: string | null): Date | null => {
    if (!val) return null;
    const parts = val.split('T')[0].split('-').map(Number);
    if (parts.length < 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
      return null;
    }
    return new Date(parts[0], parts[1] - 1, parts[2]);
  };

  const selectedDate = parseDate(value);
  const [currentMonth, setCurrentMonth] = useState<Date>(selectedDate || new Date());

  // Keep currentMonth in sync when value changes externally
  React.useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(selectedDate);
    }
  }, [value]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const weekDayLabels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const handleSelectDay = (day: Date) => {
    const formatted = format(day, 'yyyy-MM-dd');
    onChange(formatted);
    setOpen(false);
  };

  const handlePresetClick = (target: Date | string) => {
    const d = typeof target === 'string' ? parseDate(target) : target;
    if (d) {
      onChange(format(d, 'yyyy-MM-dd'));
      setCurrentMonth(d);
      setOpen(false);
    }
  };

  const defaultPresets = presets || [
    { label: 'Today', date: new Date() },
    { label: 'Tomorrow', date: addDays(new Date(), 1) },
    { label: '+3 Days', date: addDays(new Date(), 3) },
    { label: '+1 Week', date: addDays(new Date(), 7) },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        className={cn(
          'flex h-10 w-full items-center justify-between gap-2 rounded-xl border bg-brand-darknavy px-3 py-2 text-xs transition-all outline-none cursor-pointer select-none text-left',
          error
            ? 'border-rose-400 focus-visible:ring-2 focus-visible:ring-rose-500/20'
            : 'border-brand-line focus-visible:border-brand-cyan focus-visible:ring-2 focus-visible:ring-brand-cyan/20',
          !value && 'text-brand-muted',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <div className="flex items-center gap-2 truncate">
          <CalendarIcon className={cn('w-4 h-4 shrink-0', value ? 'text-brand-icewhite' : 'text-brand-muted')} />
          {selectedDate ? (
            <span className="font-semibold text-brand-icewhite tracking-tight">
              {format(selectedDate, 'EEE, dd MMM yyyy')}
            </span>
          ) : (
            <span>{placeholder}</span>
          )}
        </div>

        {value && !disabled && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onChange('');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                onChange('');
              }
            }}
            className="p-1 rounded-md text-brand-muted hover:text-brand-icewhite hover:bg-brand-surface-3/50 cursor-pointer transition-colors"
            title="Clear date"
            aria-label="Clear date"
          >
            <X className="w-3.5 h-3.5" />
          </span>
        )}
      </PopoverTrigger>

      <PopoverContent align="start" className="w-[300px] p-3 rounded-2xl shadow-xl border border-brand-line bg-brand-surface">
        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1 pb-3 mb-2 border-b border-brand-line">
          <span className="text-[10px] uppercase font-bold text-brand-muted mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-brand-gold" /> Quick:
          </span>
          {defaultPresets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => handlePresetClick(p.date)}
              className="px-2 py-0.5 rounded-md bg-brand-surface-2 hover:bg-brand-chip/60 text-brand-icewhite text-[11px] font-semibold transition-colors cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-2 px-1">
          <button
            type="button"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-1.5 rounded-lg hover:bg-brand-surface-2 text-brand-silver hover:text-brand-icewhite cursor-pointer transition-colors"
            title="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="font-bold text-xs text-brand-icewhite">
            {format(currentMonth, 'MMMM yyyy')}
          </span>

          <button
            type="button"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-1.5 rounded-lg hover:bg-brand-surface-2 text-brand-silver hover:text-brand-icewhite cursor-pointer transition-colors"
            title="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 text-center mb-1">
          {weekDayLabels.map((lbl) => (
            <span key={lbl} className="text-[10px] font-bold text-brand-muted py-1">
              {lbl}
            </span>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, idx) => {
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
            const isDayToday = isToday(day);

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectDay(day)}
                className={cn(
                  'h-8 w-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer select-none',
                  !isCurrentMonth && 'text-brand-muted hover:text-brand-silver hover:bg-brand-surface-2',
                  isCurrentMonth && !isSelected && 'text-brand-icewhite hover:bg-brand-chip/50 hover:text-brand-icewhite',
                  isDayToday && !isSelected && 'border border-blue-400 font-bold text-brand-icewhite',
                  isSelected && 'bg-brand-electric text-white shadow-sm font-bold scale-105'
                )}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
