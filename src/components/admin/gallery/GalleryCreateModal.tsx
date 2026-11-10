import React, { useRef, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Upload, ImagePlus, Film, X, Loader2, CalendarDays, Globe, Lock, Image as ImageIcon } from 'lucide-react';
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
import { Activity } from '@/types';
import { CreateGalleryFormData } from '@/lib/validations';
import { formatEventDate } from '@/components/admin/activities/utils';

interface GalleryCreateModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  form: UseFormReturn<CreateGalleryFormData>;
  activities: Activity[];
  mediaFiles: File[];
  filePreviews: { name: string; size: string; url: string; type: string }[];
  onFilesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
  onClearFiles: () => void;
  submitting: boolean;
  onSubmit: (data: CreateGalleryFormData) => Promise<void>;
}

export function GalleryCreateModal({
  open,
  setOpen,
  form,
  activities,
  mediaFiles,
  filePreviews,
  onFilesChange,
  onRemoveFile,
  onClearFiles,
  submitting,
  onSubmit,
}: GalleryCreateModalProps) {
  const mediaInputRef = useRef<HTMLInputElement | null>(null);

  const activityOptions = useMemo(() => {
    return activities.map((a) => ({
      value: a.id,
      label: `${a.name} (${formatEventDate(a.date)})`,
      description: a.room?.location || a.room?.name || undefined,
      keywords: [a.name, a.date || '', a.room?.location || '', a.room?.name || ''],
    }));
  }, [activities]);

  const mediaTypeOptions = useMemo(() => [
    { value: 'IMAGE', label: 'Photography (Images)', keywords: ['image', 'photo', 'picture'] },
    { value: 'VIDEO', label: 'Plenary Recording (Video)', keywords: ['video', 'recording', 'clip'] },
  ], []);

  const visibilityOptions = useMemo(() => [
    { value: 'PUBLIC', label: 'Public (All Attendees)', description: 'Visible to all portal visitors' },
    { value: 'PRIVATE', label: 'Private (Delegates Only)', description: 'Restricted to accredited delegates' },
  ], []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[650px] bg-brand-surface rounded-3xl p-0 overflow-hidden border border-brand-line shadow-2xl">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-brand-electric to-brand-royal text-white">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
              <Upload className="w-5 h-5 text-brand-gold" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-white">Upload Session Media</DialogTitle>
              <DialogDescription className="text-xs text-white/80 mt-0.5">
                Add photography or recording assets to activity albums.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Activity Session Selection */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-brand-icewhite flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-brand-cyan" />
              Activity Session <span className="text-brand-error">*</span>
            </Label>
            <Combobox
              value={form.watch('activityId')}
              onChange={(val) => form.setValue('activityId', val, { shouldValidate: true, shouldDirty: true })}
              options={activityOptions}
              placeholder="Select activity session..."
              searchPlaceholder="Type activity title or date to filter..."
              error={Boolean(form.formState.errors.activityId)}
              icon={CalendarDays}
            />
            {form.formState.errors.activityId && (
              <p className="text-[11px] text-brand-error font-medium">
                {form.formState.errors.activityId.message}
              </p>
            )}
          </div>

          {/* Media Title */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-brand-icewhite">Media Title / Subject</Label>
            <Input
              placeholder="e.g. HWG 5 Plenary Opening Address"
              className="h-10 text-xs bg-brand-darknavy border-brand-line rounded-xl focus-visible:ring-brand-cyan/20"
              {...form.register('title')}
            />
          </div>

          {/* Classification: Media Type & Visibility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-brand-icewhite flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-brand-cyan" />
                Media Type
              </Label>
              <Combobox
                value={form.watch('mediaType')}
                onChange={(val) => form.setValue('mediaType', val as 'IMAGE' | 'VIDEO', { shouldDirty: true })}
                options={mediaTypeOptions}
                placeholder="Select media type..."
                searchPlaceholder="Search media type..."
                icon={form.watch('mediaType') === 'VIDEO' ? Film : ImageIcon}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-brand-icewhite flex items-center gap-1.5">
                {form.watch('visibility') === 'PRIVATE' ? (
                  <Lock className="w-3.5 h-3.5 text-brand-cyan" />
                ) : (
                  <Globe className="w-3.5 h-3.5 text-brand-cyan" />
                )}
                Access Visibility
              </Label>
              <Combobox
                value={form.watch('visibility')}
                onChange={(val) => form.setValue('visibility', val as 'PUBLIC' | 'PRIVATE', { shouldDirty: true })}
                options={visibilityOptions}
                placeholder="Select visibility..."
                searchPlaceholder="Search visibility..."
                icon={form.watch('visibility') === 'PRIVATE' ? Lock : Globe}
              />
            </div>
          </div>

          {/* File Dropzone & Previews */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold text-brand-icewhite">
                Select Media Files (Multiple supported) <span className="text-brand-error">*</span>
              </Label>
              <Badge className="bg-brand-surface-2 text-brand-icewhite text-[10px] font-semibold">
                {mediaFiles.length} file(s) staged
              </Badge>
            </div>

            <input
              type="file"
              ref={mediaInputRef}
              multiple
              accept="image/*,video/*"
              onChange={onFilesChange}
              className="hidden"
            />

            <div className="p-3.5 rounded-2xl border border-brand-line bg-brand-darknavy space-y-3">
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => mediaInputRef.current?.click()}
                  className="h-8 text-xs rounded-xl border-brand-line text-brand-cyan hover:bg-brand-surface cursor-pointer font-semibold shadow-xs"
                >
                  <ImagePlus className="w-3.5 h-3.5 mr-1.5" />
                  {mediaFiles.length > 0 ? '+ Add More Files' : '+ Select Image / Video Files'}
                </Button>
                {mediaFiles.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearFiles}
                    className="text-[11px] text-brand-error hover:underline cursor-pointer font-medium"
                  >
                    Clear All ({mediaFiles.length})
                  </button>
                )}
              </div>

              {filePreviews.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-44 overflow-y-auto pt-1">
                  {filePreviews.map((preview, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-xl border border-brand-line bg-brand-surface overflow-hidden p-1.5 flex items-center gap-2 group shadow-xs"
                    >
                      <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                        {preview.type === 'IMAGE' ? (
                          <img src={preview.url} alt="staged" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white">
                            <Film className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-brand-icewhite truncate">{preview.name}</p>
                        <p className="text-[9px] text-brand-muted">{preview.size}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveFile(idx)}
                        className="w-5 h-5 rounded-full bg-red-500/15 text-red-400 flex items-center justify-center hover:bg-red-500/25 cursor-pointer shrink-0"
                        title="Remove file"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-brand-muted italic text-center py-3">
                  No files staged for upload. Click button above to choose files.
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-brand-icewhite">Description & Credits</Label>
            <Textarea
              placeholder="Speaker mentions, photo credits, conference agenda session notes..."
              className="text-xs min-h-[80px] bg-brand-darknavy border-brand-line rounded-xl focus-visible:ring-brand-cyan/20 leading-relaxed"
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
              disabled={submitting || mediaFiles.length === 0}
              className="bg-brand-electric hover:bg-brand-royal text-white text-xs rounded-xl h-11 px-6 font-semibold shadow-md shadow-brand-electric/20 cursor-pointer"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
              ) : (
                <Upload className="w-4 h-4 mr-1.5" />
              )}
              Upload Media ({mediaFiles.length})
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
