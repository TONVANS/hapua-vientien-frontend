import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardStatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  link: string;
  desc: string;
  loading: boolean;
}

export function DashboardStatCard({
  title,
  value,
  icon: Icon,
  color,
  link,
  desc,
  loading,
}: DashboardStatCardProps) {
  return (
    <Link href={link}>
      <Card className="border border-brand-line bg-brand-surface hover-lift transition-all rounded-2xl cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-5 px-5">
          <CardTitle className="text-xs font-semibold text-brand-silver uppercase tracking-wider">
            {title}
          </CardTitle>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
            <Icon className="w-4 h-4" />
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5 pt-1">
          {loading ? (
            <div className="h-8 w-16 bg-brand-surface-2 animate-pulse rounded my-1" />
          ) : (
            <div className="text-3xl font-extrabold text-brand-icewhite tracking-tight">{value}</div>
          )}
          <p className="text-xs text-brand-muted mt-1 flex items-center justify-between">
            <span>{desc}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-brand-cyan" />
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
