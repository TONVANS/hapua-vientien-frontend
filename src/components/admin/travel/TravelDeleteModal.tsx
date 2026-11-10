import React from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TravelRecommend } from '@/types';

interface TravelDeleteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedTravel: TravelRecommend | null;
  submitting: boolean;
  onDelete: () => Promise<void>;
}

export function TravelDeleteModal({
  open,
  setOpen,
  selectedTravel,
  submitting,
  onDelete,
}: TravelDeleteModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-brand-surface rounded-3xl p-6 border border-brand-line shadow-2xl">
        <DialogHeader className="space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-error-container text-brand-error flex items-center justify-center mb-1">
            <Trash2 className="w-6 h-6" />
          </div>
          <DialogTitle className="text-lg font-bold text-brand-error">Remove Travel Destination</DialogTitle>
          <DialogDescription className="text-xs text-brand-silver leading-relaxed">
            Are you sure you want to remove <strong className="text-brand-icewhite">{selectedTravel?.placeName}</strong>?
            This place will no longer appear in the cultural tourism recommendation guide for delegates.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-4 flex items-center justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="text-xs rounded-xl h-10 px-4 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={onDelete}
            disabled={submitting}
            className="bg-brand-danger hover:bg-brand-danger text-white text-xs rounded-xl h-10 px-5 font-semibold cursor-pointer shadow-sm"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : null}
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
