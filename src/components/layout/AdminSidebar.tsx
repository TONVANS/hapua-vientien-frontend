'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  DoorOpen,
  Hotel,
  Compass,
  Globe2,
  Building2,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
} from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';

export function AdminSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar, mobileMenuOpen, setMobileMenuOpen } = useUIStore();

  const menuGroups = [
    {
      title: 'Analytics & Overview',
      items: [
        {
          label: 'Dashboard',
          href: '/admin/dashboard',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: 'Event Operations',
      items: [
        {
          label: 'Delegations',
          href: '/admin/delegations',
          icon: Users,
        },
        {
          label: 'Activities',
          href: '/admin/activities',
          icon: CalendarDays,
        },
        {
          label: 'Meeting Rooms',
          href: '/admin/rooms',
          icon: DoorOpen,
        },
        {
          label: 'Media Gallery',
          href: '/admin/gallery',
          icon: ImageIcon,
        },
      ],
    },
    {
      title: 'Hospitality & Travel',
      items: [
        {
          label: 'Hotels',
          href: '/admin/hotels',
          icon: Hotel,
        },
        {
          label: 'Travel Spots',
          href: '/admin/travel',
          icon: Compass,
        },
      ],
    },
    {
      title: 'Master Data',
      items: [
        {
          label: 'Countries',
          href: '/admin/countries',
          icon: Globe2,
        },
        {
          label: 'Organizations',
          href: '/admin/organizations',
          icon: Building2,
        },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-50 bg-brand-navy border-r border-brand-cyan/20 flex flex-col transition-all duration-300 ease-in-out shadow-lg lg:shadow-none ${
        /* Mobile sliding drawer */
        mobileMenuOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
      } ${
        /* Desktop collapsed vs expanded width */
        sidebarOpen ? 'lg:w-64' : 'lg:w-20'
      }`}
    >
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-3.5 border-b border-brand-line shrink-0">
        <Link
          href="/admin/dashboard"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2.5 overflow-hidden group"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-surface p-1 flex items-center justify-center shrink-0 shadow-xs border border-brand-gold/40 ring-2 ring-brand-line-strong/50 group-hover:scale-105 transition-transform overflow-hidden">
            <Image
              src={getAssetPath('/logo_organization/EDL.webp')}
              alt="HWG 5 Meeting Logo"
              width={36}
              height={32}
              style={{ width: 'auto', height: 'auto' }}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div
            className={`flex flex-col truncate transition-opacity duration-200 ${
              sidebarOpen ? 'opacity-100' : 'lg:hidden'
            }`}
          >
            <span className="font-bold text-sm text-brand-icewhite truncate tracking-tight group-hover:text-brand-cyan transition-colors">
              HAPUA Admin
            </span>
            <span className="text-[10px] text-brand-silver uppercase tracking-wider font-semibold">
              HWG 5 Portal
            </span>
          </div>
        </Link>

        {/* Mobile Close Button */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="p-1.5 rounded-lg text-brand-muted hover:bg-brand-surface-2 hover:text-brand-icewhite lg:hidden transition-colors"
          title="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Desktop Collapse / Expand Button */}
        <button
          onClick={toggleSidebar}
          className="hidden lg:flex p-1.5 rounded-lg text-brand-muted hover:bg-brand-surface-2 hover:text-brand-icewhite transition-colors"
          title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            <p
              className={`px-3 text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-2 ${
                sidebarOpen ? 'block' : 'lg:hidden'
              }`}
            >
              {group.title}
            </p>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-chip text-brand-icewhite font-semibold shadow-xs'
                      : 'text-brand-silver hover:bg-brand-surface-2 hover:text-brand-icewhite'
                  }`}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-colors ${
                      isActive ? 'text-brand-icewhite' : 'text-brand-muted'
                    }`}
                  />
                  <span
                    className={`truncate transition-opacity duration-200 ${
                      sidebarOpen ? 'opacity-100' : 'lg:hidden'
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Public Site Link */}
      <div className="p-3 border-t border-brand-line shrink-0 bg-brand-navy">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-brand-silver hover:bg-brand-surface-2 hover:text-brand-icewhite transition-colors"
          title={!sidebarOpen ? 'View Public Site' : undefined}
        >
          <ExternalLink className="w-4 h-4 shrink-0 text-brand-muted" />
          <span
            className={`truncate transition-opacity duration-200 ${
              sidebarOpen ? 'opacity-100' : 'lg:hidden'
            }`}
          >
            View Public Site
          </span>
        </Link>
      </div>
    </aside>
  );
}

