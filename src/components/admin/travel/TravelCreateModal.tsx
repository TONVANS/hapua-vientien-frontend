import React, { useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  Compass,
  MapPin,
  Clock,
  Calendar,
  Camera,
  Upload,
  ImagePlus,
  X,
  Loader2,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Combobox } from '@/components/ui/combobox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Weekday } from '@/types';
import { CreateTravelFormData } from '@/lib/validations';
import { ALL_WEEKDAYS, TIME_OPTIONS } from './utils';

interface TravelCreateModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  form: UseFormReturn<CreateTravelFormData>;
  selectedOpenDays: Weekday[];
  onToggleOpenDay: (day: Weekday) => void;
  coverImageFile: File | null;
  coverImagePreview: string | null;
  imageFiles: File[];
  imagePreviews: string[];
  onCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveCover: () => void;
  onGalleryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveGalleryFile: (index: number) => void;
  onClearGallery: () => void;
  submitting: boolean;
  onSubmit: (data: CreateTravelFormData) => Promise<void>;
}

export function TravelCreateModal({
  open,
  setOpen,
  form,
  selectedOpenDays,
  onToggleOpenDay,
  coverImageFile,
  coverImagePreview,
  imageFiles,
  imagePreviews,
  onCoverChange,
  onRemoveCover,
  onGalleryChange,
  onRemoveGalleryFile,
  onClearGallery,
  submitting,
  onSubmit,
}: TravelCreateModalProps) {
  const createCoverInputRef = useRef<HTMLInputElement | null>(null);
  const createGalleryInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px] bg-brand-surface rounded-3xl p-0 overflow-hidden border border-brand-line shadow-2xl">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-brand-electric to-brand-royal text-white">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
              <Compass className="w-5 h-5 text-brand-gold" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-white">Add Travel Destination</DialogTitle>
              <DialogDescription className="text-xs text-white/80 mt-0.5">
                Register historical landmark, temple, or attraction for summit delegates.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Section 1: Overview */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-icewhite flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-brand-gold" /> 1. Destination Overview
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-icewhite">
                  Place / Landmark Name <span className="text-brand-error">*</span>
                </Label>
                <Input
                  placeholder="e.g. Pha That Luang"
                  className="h-10 text-xs bg-brand-darknavy border-brand-line rounded-xl focus-visible:ring-brand-cyan/20"
                  {...form.register('placeName')}
                />
                {form.formState.errors.placeName && (
                  <p className="text-[11px] text-brand-error font-medium">
                    {form.formState.errors.placeName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-icewhite">
                  Location & Area <span className="text-brand-error">*</span>
                </Label>
                <Input
                  placeholder="e.g. That Luang Road, Vientiane"
                  className="h-10 text-xs bg-brand-darknavy border-brand-line rounded-xl focus-visible:ring-brand-cyan/20"
                  {...form.register('location')}
                />
                {form.formState.errors.location && (
                  <p className="text-[11px] text-brand-error font-medium">
                    {form.formState.errors.location.message}
                  </p>
                )}
              </div>
            </div>

            {/* Google Map Link */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-brand-icewhite">Google Maps Link</Label>
              <Input
                placeholder="https://maps.google.com/..."
                className="h-10 text-xs bg-brand-darknavy border-brand-line rounded-xl focus-visible:ring-brand-cyan/20 font-mono text-[11px]"
                {...form.register('mapUrl')}
              />
            </div>
          </div>

          {/* Section 2: Timing & Schedule */}
          <div className="space-y-4 pt-2 border-t border-brand-line">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-icewhite flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-gold" /> 2. Visiting Hours & Schedule
              </h3>
              {(form.watch('openTime') || form.watch('closeTime')) && (
                <button
                  type="button"
                  onClick={() => {
                    form.setValue('openTime', '', { shouldDirty: true });
                    form.setValue('closeTime', '', { shouldDirty: true });
                  }}
                  className="text-[11px] text-brand-error hover:underline font-semibold cursor-pointer"
                >
                  Clear Hours
                </button>
              )}
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1.5 bg-brand-surface-2 p-2.5 rounded-xl border border-brand-line">
              <span className="text-[11px] text-brand-silver font-semibold mr-1">Quick Presets:</span>
              {[
                { label: '08:00 – 17:00', open: '08:00', close: '17:00' },
                { label: '08:30 – 17:30', open: '08:30', close: '17:30' },
                { label: '09:00 – 18:00', open: '09:00', close: '18:00' },
                { label: '09:00 – 21:00', open: '09:00', close: '21:00' },
              ].map((p) => {
                const isActive =
                  form.watch('openTime') === p.open && form.watch('closeTime') === p.close;
                return (
                  <button
                    type="button"
                    key={p.label}
                    onClick={() => {
                      form.setValue('openTime', p.open, { shouldDirty: true });
                      form.setValue('closeTime', p.close, { shouldDirty: true });
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-brand-electric text-white shadow-xs'
                        : 'bg-brand-surface text-brand-icewhite border border-brand-line hover:border-brand-cyan/40'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="create-openTime" className="text-xs font-semibold text-brand-icewhite flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-cyan" />
                  Opening Time
                </Label>
                <Combobox
                  value={form.watch('openTime') || ''}
                  onChange={(val) => form.setValue('openTime', val, { shouldDirty: true })}
                  options={TIME_OPTIONS}
                  placeholder="-- Flexible / Not specified --"
                  searchPlaceholder="Search opening time (e.g. 08, 8am)..."
                  allowClear
                  icon={Clock}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="create-closeTime" className="text-xs font-semibold text-brand-icewhite flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-cyan" />
                  Closing Time
                </Label>
                <Combobox
                  value={form.watch('closeTime') || ''}
                  onChange={(val) => form.setValue('closeTime', val, { shouldDirty: true })}
                  options={TIME_OPTIONS}
                  placeholder="-- Flexible / Not specified --"
                  searchPlaceholder="Search closing time (e.g. 17, 5pm)..."
                  allowClear
                  icon={Clock}
                />
              </div>
            </div>

            {/* Operating Days Selector */}
            <div className="p-3.5 bg-brand-surface-2 rounded-2xl border border-brand-line space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-brand-icewhite flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>Open Days (Select all that apply)</span>
                </Label>
                <span className="text-[10px] text-brand-muted">
                  {selectedOpenDays.length === 0 ? 'Open Everyday' : `${selectedOpenDays.length} days selected`}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {ALL_WEEKDAYS.map((day) => {
                  const isSelected = selectedOpenDays.includes(day.key);
                  return (
                    <button
                      type="button"
                      key={day.key}
                      onClick={() => onToggleOpenDay(day.key)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-brand-electric text-white shadow-xs'
                          : 'bg-brand-surface text-brand-silver border border-brand-line hover:border-brand-cyan/30'
                      }`}
                    >
                      {day.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 3: Media Uploads */}
          <div className="space-y-4 pt-2 border-t border-brand-line">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-icewhite flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-brand-gold" /> 3. Destination Photos & Media
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Cover Image */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-brand-icewhite">Cover Image</Label>
                  {coverImageFile && (
                    <Badge className="bg-brand-chip text-brand-icewhite text-[10px] font-medium">
                      1 Selected
                    </Badge>
                  )}
                </div>
                <input
                  type="file"
                  ref={createCoverInputRef}
                  accept="image/*"
                  onChange={onCoverChange}
                  className="hidden"
                />
                {coverImagePreview ? (
                  <div className="relative w-full h-32 rounded-2xl border border-brand-line overflow-hidden group bg-brand-surface-2 shadow-xs">
                    <img src={coverImagePreview} alt="Cover preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() => createCoverInputRef.current?.click()}
                        className="h-8 text-xs rounded-xl"
                      >
                        Change
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={onRemoveCover}
                        className="h-8 text-xs rounded-xl"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => createCoverInputRef.current?.click()}
                    className="w-full h-32 rounded-2xl border-2 border-dashed border-brand-line hover:border-brand-cyan bg-brand-darknavy hover:bg-brand-surface-2 flex flex-col items-center justify-center gap-1.5 transition-all text-brand-silver hover:text-brand-icewhite cursor-pointer"
                  >
                    <Upload className="w-5 h-5" />
                    <span className="text-xs font-semibold">Click to select Cover Image</span>
                    <span className="text-[10px] text-brand-muted">JPG, PNG, WebP up to 10MB</span>
                  </button>
                )}
              </div>

              {/* Gallery Photos */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-brand-icewhite">Gallery Photos (Multiple)</Label>
                  <Badge className="bg-brand-surface-2 text-brand-icewhite text-[10px] font-semibold">
                    {imageFiles.length} photo(s) selected
                  </Badge>
                </div>
                <input
                  type="file"
                  ref={createGalleryInputRef}
                  multiple
                  accept="image/*"
                  onChange={onGalleryChange}
                  className="hidden"
                />

                <div className="min-h-[128px] p-3 rounded-2xl border border-brand-line bg-brand-darknavy space-y-2.5">
                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => createGalleryInputRef.current?.click()}
                      className="h-8 text-xs rounded-xl border-brand-line text-brand-cyan hover:bg-brand-surface cursor-pointer font-semibold shadow-xs"
                    >
                      <ImagePlus className="w-3.5 h-3.5 mr-1.5" />
                      {imageFiles.length > 0 ? '+ Add More Photos' : '+ Select Photos'}
                    </Button>
                    {imageFiles.length > 0 && (
                      <button
                        type="button"
                        onClick={onClearGallery}
                        className="text-[11px] text-brand-error hover:underline cursor-pointer font-medium"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  {imagePreviews.length > 0 ? (
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pt-1">
                      {imagePreviews.map((preview, idx) => (
                        <div
                          key={idx}
                          className="relative w-14 h-14 rounded-xl overflow-hidden border border-brand-line group shadow-xs bg-slate-900 shrink-0"
                        >
                          <img src={preview} alt={`preview ${idx}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => onRemoveGalleryFile(idx)}
                            className="absolute inset-0 bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-brand-muted italic text-center py-4">
                      No gallery photos staged. Click button above to add photos.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Description */}
          <div className="space-y-2 pt-2 border-t border-brand-line">
            <Label className="text-xs font-semibold text-brand-icewhite">Historical Context & Travel Tips</Label>
            <Textarea
              placeholder="Cultural etiquette, heritage highlights, recommended arrival times..."
              className="text-xs min-h-[90px] bg-brand-darknavy border-brand-line rounded-xl focus-visible:ring-brand-cyan/20 leading-relaxed"
              {...form.register('description')}
            />
          </div>

          <DialogFooter className="pt-4 border-t border-brand-line bg-brand-surface sticky bottom-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="text-xs rounded-xl h-11 px-5 font-semibold hover:bg-brand-surface-2 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-brand-electric hover:bg-brand-royal text-white text-xs rounded-xl h-11 px-6 font-semibold shadow-md shadow-brand-electric/20 cursor-pointer"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <Upload className="w-4 h-4 mr-1.5" />}
              Publish Destination
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
