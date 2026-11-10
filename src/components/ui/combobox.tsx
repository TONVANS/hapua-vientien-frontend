"use client";

import React, { useState } from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';
import { cn } from '@/lib/utils';

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  keywords?: string[];
}

interface ComboboxProps {
  value?: string | null;
  onChange: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  icon?: React.ElementType;
  className?: string;
  popoverClassName?: string;
  disabled?: boolean;
  error?: boolean;
  allowClear?: boolean;
}

export function Combobox({
  value,
  onChange,
  options,
  placeholder = 'Select option...',
  searchPlaceholder = 'Type to search...',
  emptyText = 'No options found.',
  icon: Icon,
  className,
  popoverClassName,
  disabled = false,
  error = false,
  allowClear = false,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        className={cn(
          'flex h-10 w-full items-center justify-between gap-2 rounded-xl border bg-brand-darknavy px-3 py-2 text-xs transition-all outline-none cursor-pointer select-none text-left',
          error
            ? 'border-rose-400 bg-rose-500/15 focus-visible:ring-2 focus-visible:ring-rose-500/20'
            : 'border-brand-line focus-visible:border-brand-cyan focus-visible:ring-2 focus-visible:ring-brand-cyan/20',
          !selectedOption && 'text-brand-muted',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <div className="flex items-center gap-2 truncate">
          {Icon && (
            <Icon
              className={cn(
                'w-3.5 h-3.5 shrink-0',
                selectedOption ? 'text-brand-icewhite' : 'text-brand-muted'
              )}
            />
          )}
          {selectedOption ? (
            <span className="font-semibold text-brand-icewhite tracking-tight truncate">
              {selectedOption.label}
            </span>
          ) : (
            <span className="truncate">{placeholder}</span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {allowClear && value && !disabled && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
              }}
              className="p-1 rounded-md text-brand-muted hover:text-brand-icewhite hover:bg-brand-surface-3/50 cursor-pointer transition-colors"
              title="Clear selection"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
          <ChevronsUpDown className="w-3.5 h-3.5 text-brand-muted opacity-70" />
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className={cn(
          'w-[var(--anchor-width)] min-w-[240px] p-0 rounded-2xl shadow-xl border border-brand-line bg-brand-surface overflow-hidden',
          popoverClassName
        )}
      >
        <Command
          filter={(itemValue, search) => {
            const opt = options.find((o) => o.value === itemValue);
            if (!opt) return 0;
            const searchLower = search.toLowerCase().trim();
            const textToSearch = [
              opt.label,
              opt.value,
              opt.description || '',
              ...(opt.keywords || []),
            ]
              .join(' ')
              .toLowerCase();
            return textToSearch.includes(searchLower) ? 1 : 0;
          }}
        >
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList className="max-h-56 p-1">
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className="flex items-center justify-between py-2 px-2.5"
                  >
                    <div className="flex flex-col min-w-0 pr-2">
                      <span
                        className={cn(
                          'text-xs tracking-tight truncate',
                          isSelected ? 'font-bold text-brand-icewhite' : 'text-brand-icewhite'
                        )}
                      >
                        {opt.label}
                      </span>
                      {opt.description && (
                        <span className="text-[10px] text-brand-muted truncate">
                          {opt.description}
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-brand-cyan shrink-0" />
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
