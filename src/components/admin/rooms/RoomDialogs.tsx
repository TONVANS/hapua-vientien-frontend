import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Room } from '@/types';
import { CreateRoomFormData, UpdateRoomFormData } from '@/lib/validations';

interface RoomDialogsProps {
  createOpen: boolean;
  setCreateOpen: (open: boolean) => void;
  createForm: UseFormReturn<CreateRoomFormData>;
  onCreateSubmit: (data: CreateRoomFormData) => Promise<void>;

  editOpen: boolean;
  setEditOpen: (open: boolean) => void;
  editForm: UseFormReturn<UpdateRoomFormData>;
  onEditSubmit: (data: UpdateRoomFormData) => Promise<void>;

  deleteOpen: boolean;
  setDeleteOpen: (open: boolean) => void;
  selectedRoom: Room | null;
  onDeleteSubmit: () => Promise<void>;

  submitting: boolean;
}

export function RoomDialogs({
  createOpen,
  setCreateOpen,
  createForm,
  onCreateSubmit,
  editOpen,
  setEditOpen,
  editForm,
  onEditSubmit,
  deleteOpen,
  setDeleteOpen,
  selectedRoom,
  onDeleteSubmit,
  submitting,
}: RoomDialogsProps) {
  return (
    <>
      {/* Create Modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-[600px] bg-brand-surface rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-brand-icewhite">Add Meeting Room</DialogTitle>
            <DialogDescription className="text-xs text-brand-silver">
              Configure hall or breakout meeting room details.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-5 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-brand-icewhite">
                Room Name <span className="text-brand-error">*</span>
              </Label>
              <Input
                placeholder="e.g. Mekong Plenary Hall A"
                className="h-10 text-xs bg-brand-darknavy border-brand-line rounded-xl focus-visible:ring-brand-cyan/20 transition-all"
                {...createForm.register('name')}
              />
              {createForm.formState.errors.name && (
                <p className="text-[11px] text-brand-error font-medium">
                  {createForm.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-icewhite">Location / Floor</Label>
                <Input
                  placeholder="e.g. Floor 2, West Wing"
                  className="h-10 text-xs bg-brand-darknavy border-brand-line rounded-xl focus-visible:ring-brand-cyan/20 transition-all"
                  {...createForm.register('location')}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-icewhite">
                  Capacity (Seats) <span className="text-brand-error">*</span>
                </Label>
                <Input
                  type="number"
                  placeholder="100"
                  className="h-10 text-xs bg-brand-darknavy border-brand-line rounded-xl focus-visible:ring-brand-cyan/20 transition-all"
                  {...createForm.register('capacity', { valueAsNumber: true })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-brand-icewhite">Description</Label>
              <Textarea
                placeholder="Audio/visual equipment, translation booth info..."
                className="text-xs bg-brand-darknavy border-brand-line rounded-xl focus-visible:ring-brand-cyan/20 transition-all min-h-[70px]"
                {...createForm.register('description')}
              />
            </div>

            <DialogFooter className="pt-4 mt-2 border-t border-brand-line">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateOpen(false)}
                className="text-xs rounded-xl h-10 font-medium hover:bg-brand-surface-2 transition-colors cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-brand-electric hover:bg-brand-royal text-white text-xs rounded-xl h-10 font-medium shadow-sm transition-all cursor-pointer"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : null}
                Save Room
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[600px] bg-brand-surface rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-brand-icewhite">Edit Room</DialogTitle>
            <DialogDescription className="text-xs text-brand-silver">
              Update {selectedRoom?.name} configurations.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-5 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-brand-icewhite">
                Room Name <span className="text-brand-error">*</span>
              </Label>
              <Input
                className="h-10 text-xs bg-brand-darknavy border-brand-line rounded-xl focus-visible:ring-brand-cyan/20 transition-all"
                {...editForm.register('name')}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-icewhite">Location / Floor</Label>
                <Input
                  className="h-10 text-xs bg-brand-darknavy border-brand-line rounded-xl focus-visible:ring-brand-cyan/20 transition-all"
                  {...editForm.register('location')}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-icewhite">Capacity</Label>
                <Input
                  type="number"
                  className="h-10 text-xs bg-brand-darknavy border-brand-line rounded-xl focus-visible:ring-brand-cyan/20 transition-all"
                  {...editForm.register('capacity', { valueAsNumber: true })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-brand-icewhite">Description</Label>
              <Textarea
                className="text-xs bg-brand-darknavy border-brand-line rounded-xl focus-visible:ring-brand-cyan/20 transition-all min-h-[70px]"
                {...editForm.register('description')}
              />
            </div>

            <DialogFooter className="pt-4 mt-2 border-t border-brand-line">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditOpen(false)}
                className="text-xs rounded-xl h-10 font-medium hover:bg-brand-surface-2 transition-colors cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-brand-electric hover:bg-brand-royal text-white text-xs rounded-xl h-10 font-medium shadow-sm transition-all cursor-pointer"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : null}
                Update Room
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-md bg-brand-surface rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-brand-error">Remove Meeting Room</DialogTitle>
            <DialogDescription className="text-xs text-brand-silver">
              Are you sure you want to remove <strong className="text-brand-icewhite">{selectedRoom?.name}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              className="text-xs rounded-xl cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={onDeleteSubmit}
              disabled={submitting}
              className="bg-brand-danger hover:bg-brand-danger text-white text-xs rounded-xl cursor-pointer"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : null}
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
