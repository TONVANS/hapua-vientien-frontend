'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  CalendarDays,
  Clock,
  MapPin,
  QrCode,
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Globe2,
  Building2,
  AlertCircle,
} from 'lucide-react';
import { Activity, Delegation } from '@/types';
import { publicService } from '@/services';
import { formatEventDate, isActivityDateReached } from '@/components/admin/activities/utils';
import { motion, AnimatePresence } from 'motion/react';

const STORAGE_DELEGATE_CODE = 'hapua_delegate_code';
const STORAGE_VERIFIED_DELEGATE = 'hapua_verified_delegate';
const STORAGE_REGISTERED_ACTIVITIES = 'hapua_registered_activities';

export interface ActivityRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Activity;
  initialDelegate?: Delegation | null;
  initialCode?: string;
  isRegistered?: boolean;
  onRegisterSuccess?: (activityId: string, delegate: Delegation) => void;
}

export function ActivityRegisterModal({
  isOpen,
  onClose,
  activity,
  initialDelegate,
  initialCode,
  isRegistered: initialIsRegistered = false,
  onRegisterSuccess,
}: ActivityRegisterModalProps) {
  const router = useRouter();

  const [delegationCode, setDelegationCode] = useState('');
  const [verifiedDelegate, setVerifiedDelegate] = useState<Delegation | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(initialIsRegistered);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const hasReachedStartDate = isActivityDateReached(activity);
  const isCompleted = activity?.status === 'COMPLETED';
  const isCanceled = activity?.status === 'CANCELED';
  const isRegistrationDisabled = !hasReachedStartDate || isCompleted || isCanceled;

  // Sync initial props or local storage on open
  useEffect(() => {
    if (!isOpen) return;

    setIsRegistered(initialIsRegistered);
    setVerifyError(null);

    // If delegate is passed from props
    if (initialDelegate) {
      setVerifiedDelegate(initialDelegate);
      if (initialCode) {
        setDelegationCode(initialCode);
      } else if (initialDelegate.delegationCode) {
        setDelegationCode(initialDelegate.delegationCode);
      }
      return;
    }

    // Try reading from localStorage
    try {
      const savedCode = localStorage.getItem(STORAGE_DELEGATE_CODE);
      const savedDelegateStr = localStorage.getItem(STORAGE_VERIFIED_DELEGATE);
      if (savedCode) {
        setDelegationCode(savedCode);
      }
      if (savedDelegateStr) {
        const parsed = JSON.parse(savedDelegateStr);
        if (parsed && parsed.id) {
          setVerifiedDelegate(parsed);
        }
      }

      const savedRegs = localStorage.getItem(STORAGE_REGISTERED_ACTIVITIES);
      if (savedRegs) {
        const regs: string[] = JSON.parse(savedRegs);
        if (Array.isArray(regs) && activity?.id && regs.includes(activity.id)) {
          setIsRegistered(true);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, [isOpen, initialDelegate, initialCode, initialIsRegistered, activity?.id]);

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistrationDisabled) return;
    const cleanCode = delegationCode.trim().toUpperCase();
    if (!cleanCode) return;

    setVerifying(true);
    setVerifyError(null);

    try {
      const res = await publicService.checkDelegation(cleanCode);
      if (res && res.id) {
        setVerifiedDelegate(res);
        try {
          localStorage.setItem(STORAGE_DELEGATE_CODE, cleanCode);
          localStorage.setItem(STORAGE_VERIFIED_DELEGATE, JSON.stringify(res));
        } catch {
          // Ignore storage errors
        }
      } else {
        setVerifyError('Delegation code not found in HWG 5 records.');
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setVerifyError(
        axiosErr.response?.data?.message ||
          'Delegation code not recognized. Please check your badge confirmation email.'
      );
    } finally {
      setVerifying(false);
    }
  };

  const handleConfirmRegistration = async () => {
    if (isRegistrationDisabled) return;
    const cleanCode = (verifiedDelegate?.delegationCode || delegationCode).trim().toUpperCase();
    if (!cleanCode || !activity?.id) return;

    setRegistering(true);
    setVerifyError(null);

    try {
      await publicService.registerForActivity({
        delegationCode: cleanCode,
        activityId: activity.id,
      });

      setIsRegistered(true);

      // Save registered activity to local storage
      try {
        const savedRegs = localStorage.getItem(STORAGE_REGISTERED_ACTIVITIES);
        const prev: string[] = savedRegs ? JSON.parse(savedRegs) : [];
        const next = Array.from(new Set([...prev, activity.id]));
        localStorage.setItem(STORAGE_REGISTERED_ACTIVITIES, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }

      if (verifiedDelegate && onRegisterSuccess) {
        onRegisterSuccess(activity.id, verifiedDelegate);
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      const msg = axiosErr.response?.data?.message || 'Registration failed or session limit reached.';

      if (msg.toLowerCase().includes('already registered')) {
        setIsRegistered(true);
        if (verifiedDelegate && onRegisterSuccess) {
          onRegisterSuccess(activity.id, verifiedDelegate);
        }
      } else {
        setVerifyError(msg);
      }
    } finally {
      setRegistering(false);
    }
  };

  const handleResetDelegate = () => {
    setVerifiedDelegate(null);
    setDelegationCode('');
    setVerifyError(null);
    try {
      localStorage.removeItem(STORAGE_DELEGATE_CODE);
      localStorage.removeItem(STORAGE_VERIFIED_DELEGATE);
    } catch {
      // Ignore storage errors
    }
  };

  const handleNavigateToAgenda = () => {
    onClose();
    router.push(`/agenda/${activity.id}`);
  };

  const formatTimeRange = () => {
    try {
      return `${new Date(activity.startTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })} - ${new Date(activity.endTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    } catch {
      return '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg bg-brand-surface/95 backdrop-blur-2xl border-brand-line p-6 sm:p-8 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-left space-y-2 mb-2">
          <div className="flex items-center justify-between gap-2">
            <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-chip text-brand-icewhite">
              {activity.status || 'HWG 5 Session'}
            </span>
            {activity.qrCode && (
              <span className="font-mono text-[10px] text-brand-silver flex items-center gap-1 bg-brand-surface-2 px-2 py-0.5 rounded-md">
                <QrCode className="w-3 h-3 text-brand-cyan" /> {activity.qrCode}
              </span>
            )}
          </div>

          <DialogTitle className="text-xl font-bold text-brand-icewhite leading-snug">
            {activity.name}
          </DialogTitle>

          <DialogDescription className="text-xs text-brand-silver space-y-1.5 pt-1">
            <span className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-brand-silver block">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5 text-brand-cyan" />
                {formatEventDate(activity.date)}
              </span>
              {activity.startTime && activity.endTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-cyan" />
                  {formatTimeRange()}
                </span>
              )}
              {activity.room?.name && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-cyan" />
                  {activity.room.name}
                </span>
              )}
            </span>
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isRegistered ? (
            /* Success State */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-4 pt-4 border-t border-brand-line text-center space-y-4"
            >
              <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-teal-400 text-white rounded-3xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/25">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-brand-icewhite">Check-in Confirmed!</h3>
                <p className="text-xs text-brand-silver mt-1">
                  You are officially accredited and registered for this HWG 5 session.
                </p>
              </div>

              {verifiedDelegate && (
                <div className="bg-brand-darknavy p-3.5 rounded-2xl border border-brand-line text-xs text-left space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-brand-muted text-[11px]">Accredited Delegate</span>
                    <span className="font-mono font-bold text-brand-icewhite text-[11px] bg-brand-surface px-2 py-0.5 rounded border border-brand-line">
                      {verifiedDelegate.delegationCode}
                    </span>
                  </div>
                  <p className="font-bold text-brand-icewhite">
                    {verifiedDelegate.title ? `${verifiedDelegate.title} ` : ''}
                    {verifiedDelegate.firstName} {verifiedDelegate.lastName}
                  </p>
                  {verifiedDelegate.organization?.name && (
                    <p className="text-brand-silver text-[11px]">
                      {verifiedDelegate.organization.name}
                      {verifiedDelegate.country?.name ? ` • ${verifiedDelegate.country.name}` : ''}
                    </p>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-2 pt-2">
                <Button
                  onClick={handleNavigateToAgenda}
                  className="w-full h-11 rounded-xl bg-brand-electric hover:bg-brand-royal text-white font-bold text-xs shadow-md cursor-pointer transition-all active:scale-[0.98]"
                >
                  <span>View Details & Agenda Photos</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>

                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="w-full h-9 rounded-xl text-xs text-brand-muted hover:text-brand-icewhite cursor-pointer"
                >
                  Done
                </Button>
              </div>
            </motion.div>
          ) : !verifiedDelegate ? (
            /* Step 1: Enter & Verify Code */
            <motion.div
              key="verify-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 pt-4 border-t border-brand-line"
            >
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div className="text-center space-y-1">
                  <div className="w-10 h-10 rounded-2xl bg-brand-electric/5 text-brand-icewhite flex items-center justify-center mx-auto mb-2">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-brand-icewhite">Delegate Accreditation</h4>
                  <p className="text-xs text-brand-muted">
                    Enter your unique delegation code to verify and register for this activity.
                  </p>
                </div>

                {!hasReachedStartDate ? (
                  <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs flex items-start gap-2.5">
                    <Clock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <div className="space-y-0.5 text-left">
                      <p className="font-bold">Registration Not Open Yet</p>
                      <p className="text-[11px] text-amber-300 leading-relaxed">
                        Registration for this session opens on {formatEventDate(activity.date)}. Delegate accreditation will be enabled on the activity start date.
                      </p>
                    </div>
                  </div>
                ) : isCompleted ? (
                  <div className="p-3.5 rounded-2xl bg-brand-surface-2 border border-brand-line text-brand-icewhite text-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-brand-silver mt-0.5" />
                    <div className="space-y-0.5 text-left">
                      <p className="font-bold">Session Concluded</p>
                      <p className="text-[11px] text-brand-silver leading-relaxed">
                        This HWG 5 session has completed. Delegate registration is closed.
                      </p>
                    </div>
                  </div>
                ) : isCanceled ? (
                  <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/35 text-rose-300 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                    <div className="space-y-0.5 text-left">
                      <p className="font-bold">Session Canceled</p>
                      <p className="text-[11px] text-rose-300 leading-relaxed">
                        This session has been canceled. Registration is not available.
                      </p>
                    </div>
                  </div>
                ) : null}

                <div>
                  <Input
                    placeholder="Enter your ID badge number (ID: XXXX)"
                    value={delegationCode}
                    disabled={isRegistrationDisabled}
                    onChange={(e) => setDelegationCode(e.target.value.toUpperCase())}
                    className={`h-12 text-center text-sm tracking-widest font-mono font-bold uppercase bg-brand-darknavy border-brand-line rounded-xl shadow-inner focus-visible:ring-brand-cyan ${
                      isRegistrationDisabled ? 'opacity-60 cursor-not-allowed bg-brand-surface-2' : ''
                    }`}
                    autoFocus={!isRegistrationDisabled}
                  />
                  {verifyError && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[11px] text-brand-error mt-2 flex items-center gap-1.5 justify-center bg-brand-error-container/40 py-2 px-3 rounded-xl font-medium border border-brand-error-line"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{verifyError}</span>
                    </motion.div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={verifying || !delegationCode.trim() || isRegistrationDisabled}
                  className={`w-full h-11 rounded-xl font-bold text-xs shadow-md transition-all ${
                    isRegistrationDisabled
                      ? 'bg-brand-surface-3 text-brand-silver cursor-not-allowed shadow-none'
                      : 'bg-brand-electric hover:bg-brand-royal text-white active:scale-[0.98] cursor-pointer'
                  }`}
                >
                  {!hasReachedStartDate ? (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Registration Opens on Activity Date</span>
                    </div>
                  ) : isCompleted ? (
                    <span>Session Concluded</span>
                  ) : isCanceled ? (
                    <span>Session Canceled</span>
                  ) : verifying ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying Accreditation...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Verify Delegate Code</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </form>
            </motion.div>
          ) : (
            /* Step 2: Confirm Registration */
            <motion.div
              key="confirm-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 pt-4 border-t border-brand-line space-y-4"
            >
              <div className="text-center space-y-1">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/35 mb-2">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-brand-icewhite">Verified Delegate</h4>
                <p className="text-xs text-brand-muted">
                  Please confirm your participation in this activity.
                </p>
              </div>

              {/* Delegate Summary Box */}
              <div className="bg-brand-darknavy p-4 rounded-2xl border border-brand-line text-left space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-brand-line">
                  <span className="text-[11px] text-brand-muted">Code</span>
                  <span className="font-mono text-xs font-bold text-brand-icewhite bg-brand-surface px-2 py-0.5 rounded border border-brand-line">
                    {verifiedDelegate.delegationCode}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-brand-muted">Name</span>
                  <span className="font-bold text-brand-icewhite">
                    {verifiedDelegate.title ? `${verifiedDelegate.title} ` : ''}
                    {verifiedDelegate.firstName} {verifiedDelegate.lastName}
                  </span>
                </div>

                {verifiedDelegate.position && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-brand-muted">Position</span>
                    <span className="font-medium text-brand-icewhite max-w-[220px] truncate text-right">
                      {verifiedDelegate.position}
                    </span>
                  </div>
                )}

                {verifiedDelegate.country?.name && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-brand-muted flex items-center gap-1">
                      <Globe2 className="w-3 h-3" /> Country
                    </span>
                    <span className="font-medium text-brand-icewhite">
                      {verifiedDelegate.country.name}
                    </span>
                  </div>
                )}

                {verifiedDelegate.organization?.name && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-brand-muted flex items-center gap-1">
                      <Building2 className="w-3 h-3" /> Utility
                    </span>
                    <span className="font-medium text-brand-icewhite max-w-[220px] truncate text-right">
                      {verifiedDelegate.organization.shortName || verifiedDelegate.organization.name}
                    </span>
                  </div>
                )}
              </div>

              {verifyError && (
                <div className="text-[11px] text-brand-error bg-brand-error-container/40 py-2 px-3 rounded-xl font-medium border border-brand-error-line flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{verifyError}</span>
                </div>
              )}

              <div className="flex flex-col gap-2 pt-1">
                <Button
                  onClick={handleConfirmRegistration}
                  disabled={registering || isRegistrationDisabled}
                  className={`h-11 rounded-xl font-bold text-xs shadow-md transition-all ${
                    isRegistrationDisabled
                      ? 'bg-brand-surface-3 text-brand-silver cursor-not-allowed shadow-none'
                      : 'bg-brand-electric hover:bg-brand-royal text-white active:scale-[0.98] cursor-pointer'
                  }`}
                >
                  {!hasReachedStartDate ? (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Registration Opens on Activity Date</span>
                    </div>
                  ) : isCompleted ? (
                    <span>Session Concluded</span>
                  ) : isCanceled ? (
                    <span>Session Canceled</span>
                  ) : registering ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming Check-in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Check-in & Register</span>
                    </div>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetDelegate}
                  className="text-xs text-brand-muted hover:text-brand-icewhite rounded-xl h-8 cursor-pointer"
                >
                  Use a different delegation code
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

export default ActivityRegisterModal;
