import React from 'react';
import {
  CalendarDays,
  Plus,
  Edit2,
  Trash2,
  DoorOpen,
  Clock,
  Calendar,
  Loader2,
  QrCode,
  Eye,
  Users,
  Printer,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Activity } from '@/types';
import { toTimeInputValue, getTimeDuration, getActivityStatusBadge, formatEventDate } from './utils';
import { PrintQRCodeDialog } from './PrintQRCodeDialog';

interface ActivitiesTableProps {
  activities: Activity[];
  isLoading: boolean;
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onView: (activity: Activity) => void;
  onEdit: (activity: Activity) => void;
  onDelete: (activity: Activity) => void;
  onOpenCreate: () => void;
  hasFilters: boolean;
}

export function ActivitiesTable({
  activities,
  isLoading,
  total,
  page,
  limit,
  onPageChange,
  onView,
  onEdit,
  onDelete,
  onOpenCreate,
  hasFilters,
}: ActivitiesTableProps) {
  const [printActivity, setPrintActivity] = useState<Activity | null>(null);

  return (
    <div className="bg-brand-surface rounded-2xl border border-brand-line overflow-hidden shadow-xs">
      <Table>
        <TableHeader className="bg-brand-darknavy border-b border-brand-line">
          <TableRow>
            <TableHead className="text-xs font-bold text-brand-icewhite">Activity Name</TableHead>
            <TableHead className="text-xs font-bold text-brand-icewhite">Date & Schedule</TableHead>
            <TableHead className="text-xs font-bold text-brand-icewhite">Venue / Room</TableHead>
            <TableHead className="text-xs font-bold text-brand-icewhite">Status</TableHead>
            <TableHead className="text-xs font-bold text-brand-icewhite">Delegates</TableHead>
            <TableHead className="text-xs font-bold text-brand-icewhite text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="h-36 text-center text-xs text-brand-muted">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-brand-cyan" />
                Loading HWG 5 activities...
              </TableCell>
            </TableRow>
          ) : activities.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-40 text-center text-xs text-brand-muted">
                <CalendarDays className="w-10 h-10 mx-auto text-brand-muted mb-2" />
                <p className="font-semibold text-brand-icewhite">No activities found</p>
                <p className="text-[11px] text-brand-muted mt-0.5">
                  {hasFilters
                    ? 'Try clearing your search or filter parameters.'
                    : 'Get started by creating your first HWG 5 activity.'}
                </p>
                {!hasFilters && (
                  <Button
                    onClick={onOpenCreate}
                    size="sm"
                    className="mt-3 bg-brand-electric hover:bg-brand-royal text-white rounded-xl text-xs font-medium cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    Create Activity
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ) : (
            activities.map((act) => {
              const startTimeFormatted = toTimeInputValue(act.startTime);
              const endTimeFormatted = toTimeInputValue(act.endTime);
              const duration = getTimeDuration(startTimeFormatted, endTimeFormatted);

              return (
                <TableRow
                  key={act.id}
                  className="hover:bg-brand-chip/20 transition-colors border-b border-brand-line group cursor-pointer"
                  onClick={() => onView(act)}
                >
                  <TableCell className="py-3.5 max-w-xs" onClick={(e) => e.stopPropagation()}>
                    <div className="flex flex-col max-w-[260px]">
                      <button
                        onClick={() => onView(act)}
                        title={act.name}
                        className="text-left font-semibold text-sm text-brand-icewhite hover:underline cursor-pointer truncate"
                      >
                        {act.name}
                      </button>
                      {act.description && (
                        <span
                          title={act.description}
                          className="text-xs text-brand-muted line-clamp-1 mt-0.5"
                        >
                          {act.description}
                        </span>
                      )}
                      {act.qrCode && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-brand-silver mt-1 font-mono">
                          <QrCode className="w-3 h-3 text-brand-cyan shrink-0" /> {act.qrCode}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="py-3.5">
                    <div className="flex flex-col text-xs text-brand-icewhite gap-1">
                      <span className="font-medium flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-silver shrink-0" />
                        {formatEventDate(act.date)}
                      </span>
                      <div className="flex items-center gap-1.5 text-brand-muted">
                        <Clock className="w-3 h-3 text-brand-muted shrink-0" />
                        <span className="whitespace-nowrap">
                          {new Date(act.startTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}{' '}
                          -{' '}
                          {new Date(act.endTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        {duration.formatted && !duration.isInvalid && (
                          <span className="px-1.5 py-0.2 text-[10px] font-medium bg-brand-surface-2 text-brand-silver rounded whitespace-nowrap">
                            {duration.formatted}
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-3.5">
                    {act.room?.name ? (
                      <div className="flex flex-col max-w-[180px]">
                        <div className="flex items-center gap-1.5 text-xs text-brand-icewhite font-medium" title={act.room.name}>
                          <DoorOpen className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                          <span className="truncate">{act.room.name}</span>
                        </div>
                        {act.room.capacity && (
                          <span className="text-[10px] text-brand-muted ml-5">
                            Cap: {act.room.capacity} pax
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-brand-muted italic">Off-site / Virtual</span>
                    )}
                  </TableCell>

                  <TableCell className="py-3.5">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getActivityStatusBadge(
                        act.status
                      )}`}
                    >
                      {act.status}
                    </span>
                  </TableCell>

                  <TableCell className="py-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-surface-2 text-brand-icewhite text-xs font-bold font-mono">
                      <Users className="w-3 h-3 text-brand-muted" />
                      {act._count?.delegations ?? act.delegations?.length ?? 0}
                    </span>
                  </TableCell>

                  <TableCell className="py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(act)}
                        className="h-8 w-8 p-0 text-brand-cyan hover:bg-brand-chip/50 rounded-lg cursor-pointer transition-colors"
                        title="View details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(act)}
                        className="h-8 w-8 p-0 text-brand-cyan hover:bg-brand-chip/50 rounded-lg cursor-pointer transition-colors"
                        title="Edit activity"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPrintActivity(act)}
                        className="h-8 w-8 p-0 text-brand-cyan hover:bg-brand-chip/50 rounded-lg cursor-pointer transition-colors"
                        title="Print QR Code"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(act)}
                        className="h-8 w-8 p-0 text-brand-error hover:bg-brand-error-container/40 rounded-lg cursor-pointer transition-colors"
                        title="Delete activity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      {/* Pagination Bar */}
      <div className="px-6 py-4 border-t border-brand-line flex items-center justify-between text-xs text-brand-muted">
        <span>
          Showing <strong className="text-brand-icewhite">{activities.length}</strong> of{' '}
          <strong className="text-brand-icewhite">{total}</strong> scheduled activities
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="h-8 text-xs rounded-lg cursor-pointer"
          >
            Previous
          </Button>
          <span className="font-semibold text-brand-icewhite px-1">Page {page}</span>
          <Button
            variant="outline"
            size="sm"
            disabled={activities.length < limit || page * limit >= total}
            onClick={() => onPageChange(page + 1)}
            className="h-8 text-xs rounded-lg cursor-pointer"
          >
            Next
          </Button>
        </div>
      </div>

      <PrintQRCodeDialog 
        isOpen={!!printActivity} 
        onClose={() => setPrintActivity(null)} 
        activity={printActivity} 
      />
    </div>
  );
}
