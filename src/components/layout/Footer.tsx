import React from 'react';
import Link from 'next/link';
import { Globe, Mail, MapPin, Shield, ExternalLink } from 'lucide-react';
import { VisitorCounter } from './VisitorCounter';

export function Footer() {
  return (
    <footer className="w-full bg-brand-navy border-t-2 border-brand-cyan/30 mt-auto text-brand-silver">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-surface p-1 flex items-center justify-center shadow-xs border border-brand-gold/40 overflow-hidden">
                <img
                  src="/logo/logo.webp"
                  alt="HWG 5 Meeting"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-brand-icewhite">HWG 5 Meeting</h3>
                <p className="text-xs text-brand-silver">Vientiane, Lao PDR • 25-27 Nov 2026</p>
              </div>
            </div>
            <p className="text-sm text-brand-silver max-w-sm leading-relaxed">
              Heads of ASEAN Power Utilities/Authorities (HAPUA) advancing regional energy connectivity, multilateral power trading, and sustainable power transition across Southeast Asia.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-gold font-medium bg-brand-gold/15 px-3 py-1.5 rounded-lg w-fit border border-brand-gold/40">
              <span>Host Utility: Electricité du Laos (EDL)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 flex flex-col space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-cyan">Summit Info</h4>
            <ul className="space-y-2 text-sm text-brand-silver">
              <li>
                <Link href="/" className="hover:text-brand-cyan transition-colors">Overview</Link>
              </li>
              <li>
                <Link href="/agenda" className="hover:text-brand-cyan transition-colors">HWG 5 Agenda</Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-brand-cyan transition-colors">Activities</Link>
              </li>
              <li>
                <a
                  href="https://edl-drive.edl.com.la/s/BSCXqM9fz93w6ys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-cyan transition-colors inline-flex items-center gap-1"
                >
                  <span>Galleries</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <Link href="/hotels" className="hover:text-brand-cyan transition-colors">Accommodations</Link>
              </li>
              <li>
                <Link href="/travel" className="hover:text-brand-cyan transition-colors">Travel & Visits</Link>
              </li>
            </ul>
          </div>

          {/* Institutional Links */}
          <div className="md:col-span-2 flex flex-col space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-cyan">Governance</h4>
            <ul className="space-y-2 text-sm text-brand-silver">
              <li>
                <Link href="/#working-groups" className="hover:text-brand-cyan transition-colors">Working Groups (WG 1-5)</Link>
              </li>
              <li>
                <span className="text-brand-muted cursor-not-allowed">Secretariat Notices</span>
              </li>
              <li>
                <span className="text-brand-muted cursor-not-allowed">ASEAN Energy Centre</span>
              </li>
              <li>
                <Link href="/admin/login" className="text-brand-icewhite font-semibold hover:underline flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  Admin Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-3 flex flex-col space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-cyan">Secretariat Contact</h4>
            <div className="space-y-2.5 text-sm text-brand-silver">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                <span>Summit Venue, Vientiane Capital, Lao PDR</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-cyan shrink-0" />
                <span>edlmdo@edl.com.la</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-brand-cyan shrink-0" />
                <span>www.hapua.org</span>
              </div>
              <div className="flex items-center gap-2.5">
                <VisitorCounter />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Visitor Counter */}
        <div className="border-t border-brand-line mt-10 pt-6 flex flex-col lg:flex-row justify-between items-center text-xs text-brand-muted gap-4">
          <p>© 2026 HWG 5 Meeting Secretariat. All rights reserved.</p>
          <p className="flex items-center gap-1 text-brand-silver">
            <span>•</span>
            <span>Vientiane, Lao PDR</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

