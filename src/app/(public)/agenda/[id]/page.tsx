'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AlertCircle, Loader2, Share2, Check, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { ActivityDetailContent, useActivityDetailData } from '@/components/agenda';
import { Button } from '@/components/ui/button';

export default function ActivityDetailPage() {
  const params = useParams();
  const activityId = params?.id as string;

  const {
    activity,
    gallery,
    loading,
    error,
    lightboxOpen,
    setLightboxOpen,
    lightboxIndex,
    setLightboxIndex,
    copiedLink,
    copiedCode,
    delegationCode,
    setDelegationCode,
    verifying,
    verifiedDelegate,
    verifyError,
    registering,
    isRegistered,
    registerSuccess,
    relatedActivities,
    handleVerifyAndRegister,
    calculateDuration,
    copySessionLink,
    copyQrCode,
  } = useActivityDetailData(activityId);

  return (
    <main className="pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 relative z-10">
      {/* Navigation Breadcrumb Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 flex items-center justify-between gap-4"
      >
        <Link
          href="/agenda"
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-icewhite hover:text-brand-cyan bg-brand-surface/90 hover:bg-brand-surface px-4 py-2.5 rounded-2xl border border-brand-line transition-all shadow-xs group cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <ArrowLeft className="w-4 h-4 text-brand-gold group-hover:-translate-x-1 transition-transform" />
          <span>Return to 3-Day Agenda</span>
        </Link>

        <Button
          variant="outline"
          size="sm"
          onClick={copySessionLink}
          className="rounded-2xl border-brand-line bg-brand-surface/90 hover:bg-brand-surface text-brand-icewhite text-xs h-10 px-4 cursor-pointer shadow-xs font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {copiedLink ? (
            <Check className="w-4 h-4 mr-2 text-emerald-400" />
          ) : (
            <Share2 className="w-4 h-4 mr-2 text-brand-gold" />
          )}
          <span>{copiedLink ? 'Link Copied!' : 'Share Session'}</span>
        </Button>
      </motion.div>

      {loading ? (
        <div className="py-32 flex flex-col items-center justify-center text-xs text-brand-silver glass-panel rounded-3xl p-12 max-w-xl mx-auto shadow-xl border border-brand-line">
          <div className="w-14 h-14 rounded-2xl bg-brand-electric/5 flex items-center justify-center mb-4">
            <Loader2 className="w-8 h-8 animate-spin text-brand-cyan" />
          </div>
          <span className="font-extrabold text-sm text-brand-icewhite">Loading Session Agenda & Media...</span>
          <span className="text-xs text-brand-muted mt-1">Fetching ministerial briefs and documentation</span>
        </div>
      ) : error || !activity ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-24 text-center glass-panel rounded-3xl p-10 max-w-lg mx-auto space-y-4 shadow-xl border border-brand-line"
        >
          <div className="w-14 h-14 rounded-2xl bg-red-500/15 text-red-400 flex items-center justify-center mx-auto shadow-inner">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-brand-icewhite">Session Not Found</h2>
          <p className="text-xs text-brand-silver leading-relaxed">
            The requested session may have been rescheduled or removed from the official timetable.
          </p>
          <Link href="/agenda" className="inline-block pt-2">
            <Button className="bg-brand-electric hover:bg-brand-royal text-white text-xs font-bold rounded-xl h-11 px-6 shadow-md cursor-pointer">
              Return to Agenda Directory
            </Button>
          </Link>
        </motion.div>
      ) : (
        <ActivityDetailContent
          activity={activity}
          gallery={gallery}
          duration={calculateDuration(activity.startTime, activity.endTime)}
          copiedCode={copiedCode}
          onCopyQrCode={copyQrCode}
          lightboxOpen={lightboxOpen}
          setLightboxOpen={setLightboxOpen}
          lightboxIndex={lightboxIndex}
          setLightboxIndex={setLightboxIndex}
          delegationCode={delegationCode}
          setDelegationCode={setDelegationCode}
          verifying={verifying}
          registering={registering}
          verifiedDelegate={verifiedDelegate}
          isRegistered={isRegistered}
          verifyError={verifyError}
          registerSuccess={registerSuccess}
          onVerifyAndRegister={handleVerifyAndRegister}
          relatedActivities={relatedActivities}
        />
      )}
    </main>
  );
}
