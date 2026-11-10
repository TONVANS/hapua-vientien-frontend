'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CalendarDays, Clock, MapPin, QrCode, CheckCircle2, Users, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Delegation } from '@/types';
import { formatEventDate, isActivityDateReached } from '@/components/admin/activities/utils';
import { ActivityRegisterModal } from './ActivityRegisterModal';

const STORAGE_REGISTERED_ACTIVITIES = 'hapua_registered_activities';

export interface PublicActivityCardProps {
  activity: Activity;
  isRegistered?: boolean;
  verifiedDelegate?: Delegation | null;
  delegationCode?: string;
  registering?: boolean;
  onRegister?: (activityId: string) => Promise<void> | void;
  onRegisterSuccess?: (activityId: string, delegate: Delegation) => void;
}

export function PublicActivityCard({
  activity,
  isRegistered = false,
  verifiedDelegate = null,
  delegationCode = '',
  registering = false,
  onRegister,
  onRegisterSuccess,
}: PublicActivityCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localRegistered, setLocalRegistered] = useState(false);

  // Check saved registrations in localStorage
  useEffect(() => {
    try {
      const savedRegsStr = localStorage.getItem(STORAGE_REGISTERED_ACTIVITIES);
      if (savedRegsStr) {
        const parsedRegs: string[] = JSON.parse(savedRegsStr);
        if (Array.isArray(parsedRegs) && activity?.id && parsedRegs.includes(activity.id)) {
          setLocalRegistered(true);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, [activity?.id]);

  const effectiveIsRegistered = isRegistered || localRegistered;
  const hasReachedStartDate = isActivityDateReached(activity);
  const isCompleted = activity.status === 'COMPLETED';
  const isCanceled = activity.status === 'CANCELED';
  const isNotAvailable = !hasReachedStartDate || isCompleted || isCanceled;

  const handleButtonClick = () => {
    if (!effectiveIsRegistered && isNotAvailable) return;
    setIsModalOpen(true);
  };

  const handleRegisterSuccess = (activityId: string, delegate: Delegation) => {
    setLocalRegistered(true);
    if (onRegisterSuccess) {
      onRegisterSuccess(activityId, delegate);
    }
    if (onRegister) {
      onRegister(activityId);
    }
  };

  return (
    <>
      <Card className="glass-panel rounded-3xl border border-brand-line overflow-hidden hover-lift transition-all flex flex-col justify-between">
        <CardContent className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-chip text-brand-icewhite">
              {activity.status || 'Session'}
            </span>
            {activity.qrCode && (
              <span className="font-mono text-[10px] text-brand-silver flex items-center gap-1 bg-brand-surface-2 px-2 py-0.5 rounded-md">
                <QrCode className="w-3 h-3 text-brand-cyan" /> {activity.qrCode}
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-brand-icewhite leading-snug">{activity.name}</h3>

          <p className="text-xs text-brand-silver leading-relaxed line-clamp-3">
            {activity.description || 'Exclusive session organized for HWG 5 Meeting delegates.'}
          </p>

          <div className="pt-2 border-t border-brand-line/60 space-y-2 text-xs text-brand-silver">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-3.5 h-3.5 text-brand-cyan" />
              <span>
                {formatEventDate(activity.date)}
              </span>
            </div>
            {activity.startTime && activity.endTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand-cyan" />
                <span>
                  {new Date(activity.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                  {new Date(activity.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            )}
            {activity.room?.name && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-cyan" />
                <span>{activity.room.name}</span>
              </div>
            )}
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-between gap-2">
            <Link href={`/agenda/${activity.id}`}>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl border-brand-cyan/20 text-brand-icewhite hover:bg-brand-chip/50 text-xs font-semibold h-10 px-4 cursor-pointer"
              >
                View Details & Photos
              </Button>
            </Link>

            <Button
              onClick={handleButtonClick}
              disabled={registering || (!effectiveIsRegistered && isNotAvailable)}
              title={
                !effectiveIsRegistered && !hasReachedStartDate
                  ? `Registration opens on ${formatEventDate(activity.date)}`
                  : undefined
              }
              className={`text-xs font-semibold rounded-xl h-10 px-4 transition-all ${
                effectiveIsRegistered
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                  : isCanceled
                  ? 'bg-rose-500/15 text-rose-500 border border-rose-500/35 cursor-not-allowed shadow-none'
                  : isCompleted
                  ? 'bg-brand-surface-2 text-brand-muted border border-brand-line cursor-not-allowed shadow-none'
                  : !hasReachedStartDate
                  ? 'bg-brand-surface-2 text-brand-silver border border-brand-line cursor-not-allowed shadow-none hover:bg-brand-surface-2'
                  : 'bg-brand-electric hover:bg-brand-royal text-white shadow-md shadow-brand-electric/20 cursor-pointer'
              }`}
            >
              {effectiveIsRegistered ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Registered
                </>
              ) : isCanceled ? (
                <>
                  <AlertCircle className="w-3.5 h-3.5 mr-1.5 text-rose-500" /> Canceled
                </>
              ) : isCompleted ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-brand-muted" /> Concluded
                </>
              ) : !hasReachedStartDate ? (
                <>
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-brand-muted" />
                  <span>Registration Opens {formatEventDate(activity.date, { month: 'short', day: 'numeric' })}</span>
                </>
              ) : verifiedDelegate ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Sign Up for Session
                </>
              ) : (
                <>
                  <Users className="w-3.5 h-3.5 mr-1.5" /> Sign In with Code
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Activity Registration Modal */}
      <ActivityRegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activity={activity}
        initialDelegate={verifiedDelegate}
        initialCode={delegationCode}
        isRegistered={effectiveIsRegistered}
        onRegisterSuccess={handleRegisterSuccess}
      />
    </>
  );
}

