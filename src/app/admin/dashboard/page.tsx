'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Users, CalendarDays, DoorOpen, Hotel } from 'lucide-react';
import { adminService } from '@/services';
import { DashboardStats, ActivityRegistrationStat } from '@/types';
import {
  DashboardHeaderBanner,
  DashboardStatCard,
  ActivityRegistrationsList,
  OperationalShortcuts,
} from '@/components/admin/dashboard';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [registrations, setRegistrations] = useState<ActivityRegistrationStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    try {
      const [statsData, regsData] = await Promise.all([
        adminService.getDashboardStats().catch(() => ({
          totalDelegations: 0,
          totalActivities: 0,
          totalRooms: 0,
          totalHotels: 0,
        })),
        adminService.getActivityRegistrations().catch(() => []),
      ]);
      setStats(statsData);
      setRegistrations(regsData);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const [statsData, regsData] = await Promise.all([
          adminService.getDashboardStats().catch(() => ({
            totalDelegations: 0,
            totalActivities: 0,
            totalRooms: 0,
            totalHotels: 0,
          })),
          adminService.getActivityRegistrations().catch(() => []),
        ]);
        if (!ignore) {
          setStats(statsData);
          setRegistrations(regsData);
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  const statCards = [
    {
      title: 'Total Delegations',
      value: stats?.totalDelegations ?? 0,
      icon: Users,
      color: 'bg-brand-chip text-brand-icewhite',
      link: '/admin/delegations',
      desc: 'Registered ASEAN delegates',
    },
    {
      title: 'HWG 5 Activities',
      value: stats?.totalActivities ?? 0,
      icon: CalendarDays,
      color: 'bg-brand-gold/40 text-brand-gold',
      link: '/admin/activities',
      desc: 'Sessions & technical site visits',
    },
    {
      title: 'Meeting Rooms',
      value: stats?.totalRooms ?? 0,
      icon: DoorOpen,
      color: 'bg-brand-surface-3 text-brand-icewhite',
      link: '/admin/rooms',
      desc: 'Configured breakout & plenary halls',
    },
    {
      title: 'Hotels Partnered',
      value: stats?.totalHotels ?? 0,
      icon: Hotel,
      color: 'bg-brand-chip text-brand-icewhite',
      link: '/admin/hotels',
      desc: 'Accommodations in Vientiane',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <DashboardHeaderBanner refreshing={refreshing} onRefresh={handleRefresh} />

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => (
          <DashboardStatCard
            key={idx}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
            link={card.link}
            desc={card.desc}
            loading={loading}
          />
        ))}
      </div>

      {/* Quick Action Shortcuts & Activity Registrations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <ActivityRegistrationsList registrations={registrations} loading={loading} />
        <OperationalShortcuts />
      </div>
    </div>
  );
}
