'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe2,
  Grid3X3,
  Layers,
  Play,
  Pause,
  Search,
  X,
  Sparkles,
  ChevronRight,
  Building2,
  CheckCircle2,
} from 'lucide-react';

export interface OrganizationMember {
  id: string;
  code: string;
  name: string;
  fullName: string;
  country: string;
  countryCode: string;
  logo: string;
  category: 'National Utility' | 'Distribution & Grid' | 'Regional Body' | 'Generation & Infrastructure';
  role: string;
  highlight: string;
  isHostPartner?: boolean;
}

export const ORGANIZATIONS: OrganizationMember[] = [
  {
    id: 'edl',
    code: 'EDL',
    name: 'Electricité du Laos',
    fullName: 'Electricité du Laos (EDL)',
    country: 'Lao PDR',
    countryCode: 'LA',
    logo: '/logo_organization/EDL.webp',
    category: 'National Utility',
    role: 'State corporation owning and operating power generation, high-voltage transmission lines, and distribution across Lao PDR, serving as the official host utility for HAPUA 2026.',
    highlight: 'HAPUA 2026 Host Utility & Battery of Southeast Asia',
    isHostPartner: true,
  },
  {
    id: 'egat',
    code: 'EGAT',
    name: 'Electricity Generating Authority of Thailand',
    fullName: 'Electricity Generating Authority of Thailand',
    country: 'Thailand',
    countryCode: 'TH',
    logo: '/logo_organization/EGAT.webp',
    category: 'National Utility',
    role: 'Leading power generation and high-voltage transmission system operator across Thailand.',
    highlight: 'Regional Transmission & Power Trade Hub',
  },
  {
    id: 'pln',
    code: 'PLN',
    name: 'PT PLN (Persero)',
    fullName: 'PT Perusahaan Listrik Negara (Persero)',
    country: 'Indonesia',
    countryCode: 'ID',
    logo: '/logo_organization/pln.webp',
    category: 'National Utility',
    role: 'Indonesian state electricity company managing nationwide generation, transmission, and retail distribution.',
    highlight: 'Archipelagic Supergrid & Clean Transition',
  },
  {
    id: 'tnb',
    code: 'TNB',
    name: 'Tenaga Nasional Berhad',
    fullName: 'Tenaga Nasional Berhad',
    country: 'Malaysia',
    countryCode: 'MY',
    logo: '/logo_organization/TNB.webp',
    category: 'National Utility',
    role: 'Malaysia’s premier multinational electricity company and pioneer in cross-border grid interconnections.',
    highlight: 'ASEAN Power Grid Interconnector Pioneer',
  },
  {
    id: 'evn',
    code: 'EVN',
    name: 'Vietnam Electricity',
    fullName: 'Vietnam Electricity (EVN)',
    country: 'Vietnam',
    countryCode: 'VN',
    logo: '/logo_organization/EVN.webp',
    category: 'National Utility',
    role: 'Leading state utility driving national power supply, renewable integration, and cross-border power exchange.',
    highlight: 'Renewable Integration & High-Capacity Grid',
  },
  {
    id: 'sp',
    code: 'SP Group',
    name: 'Singapore Power Group',
    fullName: 'SP Group (Singapore Power)',
    country: 'Singapore',
    countryCode: 'SG',
    logo: '/logo_organization/SP.webp',
    category: 'Distribution & Grid',
    role: 'Top-tier energy utility group operating high-reliability electricity and gas transmission networks.',
    highlight: 'Benchmark Grid Reliability & Urban Energy',
  },
  {
    id: 'edc',
    code: 'EDC',
    name: 'Electricité du Cambodge',
    fullName: 'Electricité du Cambodge (EDC)',
    country: 'Cambodia',
    countryCode: 'KH',
    logo: '/logo_organization/EDC.webp',
    category: 'National Utility',
    role: 'Autonomous state enterprise responsible for power generation, high-voltage transmission, and distribution in Cambodia.',
    highlight: 'Cross-Border Substation & Grid Expansion',
  },
  {
    id: 'npc',
    code: 'NPC',
    name: 'National Power Corporation',
    fullName: 'National Power Corporation (Philippines)',
    country: 'Philippines',
    countryCode: 'PH',
    logo: '/logo_organization/NPC.webp',
    category: 'National Utility',
    role: 'Philippine government-owned corporation driving missionary electrification and strategic hydroelectric generation.',
    highlight: 'Island Energy Access & Hydro Generation',
  },
  {
    id: 'des',
    code: 'DES',
    name: 'Department of Electrical Services',
    fullName: 'Department of Electrical Services, Prime Minister’s Office',
    country: 'Brunei Darussalam',
    countryCode: 'BN',
    logo: '/logo_organization/DES.webp',
    category: 'National Utility',
    role: 'Government authority governing electrical generation, transmission, regulation, and power reliability in Brunei.',
    highlight: 'Sultanate Grid Resilience & Reliability',
  },
  {
    id: 'moee',
    code: 'MOEE',
    name: 'Ministry of Electricity and Energy',
    fullName: 'Ministry of Electricity and Energy (MOEE)',
    country: 'Myanmar',
    countryCode: 'MM',
    logo: '/logo_organization/MOEE.webp',
    category: 'National Utility',
    role: 'Government ministry responsible for electricity generation, high-voltage transmission, and power distribution across Myanmar.',
    highlight: 'National Power Grid & Regional Interconnection',
  },
  {
    id: 'ace',
    code: 'ACE',
    name: 'ASEAN Centre for Energy',
    fullName: 'ASEAN Centre for Energy (ACE)',
    country: 'Regional Body',
    countryCode: 'ASEAN',
    logo: '/logo_organization/ACE.webp',
    category: 'Regional Body',
    role: 'Intergovernmental organisation representing ASEAN Member States’ energy interests and policy studies.',
    highlight: 'ASEAN Plan of Action for Energy Cooperation',
  },
  {
    id: 'asec',
    code: 'ASEC',
    name: 'ASEAN Secretariat',
    fullName: 'Association of Southeast Asian Nations Secretariat',
    country: 'Regional Body',
    countryCode: 'ASEAN',
    logo: '/logo_organization/ASEC.webp',
    category: 'Regional Body',
    role: 'Central coordination and diplomatic administrative organ of ASEAN regional integration and strategic initiatives.',
    highlight: 'Multilateral Diplomatic & Policy Liaison',
  },
  {
    id: 'meralco',
    code: 'MERALCO',
    name: 'Manila Electric Company',
    fullName: 'Manila Electric Railroad and Light Company (MERALCO)',
    country: 'Philippines',
    countryCode: 'PH',
    logo: '/logo_organization/Meralco.webp',
    category: 'Distribution & Grid',
    role: 'The largest electric distribution utility in the Philippines, serving Metro Manila and major economic corridors.',
    highlight: 'Next-Gen Smart Distribution & Customer Power',
  },
  {
    id: 'ngcp',
    code: 'NGCP',
    name: 'National Grid Corporation of the Philippines',
    fullName: 'National Grid Corporation of the Philippines (NGCP)',
    country: 'Philippines',
    countryCode: 'PH',
    logo: '/logo_organization/NGCP.webp',
    category: 'Distribution & Grid',
    role: 'Privately-owned transmission concessionaire operating, maintaining, and developing the Philippine power grid.',
    highlight: 'Nationwide Unified Transmission Backbone',
  },
  {
    id: 'pea',
    code: 'PEA',
    name: 'Provincial Electricity Authority',
    fullName: 'Provincial Electricity Authority (Thailand)',
    country: 'Thailand',
    countryCode: 'TH',
    logo: '/logo_organization/PEA.webp',
    category: 'Distribution & Grid',
    role: 'Thailand’s provincial electric utility distributing electricity across 74 provinces with smart microgrid pilots.',
    highlight: 'Provincial Smart Grid & Microgrid Deployment',
  },
  {
    id: 'mea',
    code: 'MEA',
    name: 'Metropolitan Electricity Authority',
    fullName: 'Metropolitan Electricity Authority (Thailand)',
    country: 'Thailand',
    countryCode: 'TH',
    logo: '/logo_organization/MEA.webp',
    category: 'Distribution & Grid',
    role: 'State enterprise providing electrical power distribution and smart city energy systems in Bangkok metropolis.',
    highlight: 'Bangkok Smart City Underground Cable Networks',
  },
  {
    id: 'seb',
    code: 'Sarawak Energy',
    name: 'Sarawak Energy Berhad',
    fullName: 'Sarawak Energy Berhad (SEB)',
    country: 'Malaysia',
    countryCode: 'MY',
    logo: '/logo_organization/SEB.webp',
    category: 'National Utility',
    role: 'Vertically integrated electricity utility and primary renewable energy developer in the state of Sarawak.',
    highlight: 'Sarawak-West Kalimantan Cross-Border Interconnection',
  },
  {
    id: 'sesb',
    code: 'SESB',
    name: 'Sabah Electricity',
    fullName: 'Sabah Electricity Sdn Bhd (SESB)',
    country: 'Malaysia',
    countryCode: 'MY',
    logo: '/logo_organization/sesb.webp',
    category: 'National Utility',
    role: 'Power utility generating, transmitting, and distributing electricity in the state of Sabah and Federal Territory of Labuan.',
    highlight: 'East Malaysia Grid Reliability & Energy Transition',
  },
  {
    id: 'ip-pln',
    code: 'PLN IP',
    name: 'PLN Indonesia Power',
    fullName: 'PT PLN Indonesia Power',
    country: 'Indonesia',
    countryCode: 'ID',
    logo: '/logo_organization/IP-PLN.webp',
    category: 'Generation & Infrastructure',
    role: 'Leading power generation subholding of PLN operating large-scale thermal, hydro, and renewable energy assets.',
    highlight: 'Clean Energy & Large-Scale Generation Asset Management',
  },
  {
    id: 'edtl',
    code: 'EDTL, E.P.',
    name: 'Electricidade de Timor-Leste',
    fullName: 'Electricidade de Timor-Leste, Empresa Pública (EDTL, E.P.)',
    country: 'Timor-Leste',
    countryCode: 'TL',
    logo: '/logo_organization/EDTL.webp',
    category: 'National Utility',
    role: 'National state power utility managing generation and transmission infrastructure across Timor-Leste.',
    highlight: 'Regional Integration & Infrastructure Modernization',
  },
];

const CATEGORIES = [
  'All',
  'National Utility',
  'Distribution & Grid',
  'Regional Body',
  'Generation & Infrastructure',
] as const;

export function AseanTicker() {
  const [viewMode, setViewMode] = useState<'stream' | 'grid'>('stream');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFastSpeed, setIsFastSpeed] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<OrganizationMember | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Track 1 & Track 2 for staggered multi-row infinite marquee
  const track1 = useMemo(() => ORGANIZATIONS.slice(0, 10), []);
  const track2 = useMemo(() => ORGANIZATIONS.slice(10), []);

  // Filtered organizations for Grid mode & Search
  const filteredOrgs = useMemo(() => {
    return ORGANIZATIONS.filter((org) => {
      const matchesCategory =
        activeCategory === 'All' || org.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        org.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.fullName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="relative z-20 py-8 md:py-12 overflow-hidden border-y border-brand-line bg-gradient-to-b from-brand-surface via-brand-surface-2 to-brand-surface shadow-xs">
      {/* Decorative ambient background glows with balanced center luminescence */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-36 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-32 bg-brand-electric/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-32 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header & Interactive Controls Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-brand-line">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-brand-electric/10 via-brand-electric/5 to-transparent border border-brand-cyan/15 text-brand-icewhite text-xs font-bold uppercase tracking-wider mb-2">
              <Globe2 className="w-3.5 h-3.5 text-brand-gold" />
              <span>HAPUA Institutional Interconnectivity</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping" />
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-brand-icewhite tracking-tight flex items-center gap-2">
              Member Utilities & Partner Organizations
            </h2>
            <p className="text-xs sm:text-sm text-brand-silver mt-1 max-w-2xl font-normal">
              {ORGANIZATIONS.length} Member State utilities, regional institutions, and energy authorities advancing the ASEAN Power Grid (APG) interconnectivity.
            </p>
          </div>

          {/* Interactive Mode & Playback Controls */}
          <div className="flex items-center flex-wrap gap-2 shrink-0">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-brand-surface-3/60 border border-brand-line-strong shadow-inner">
              <button
                type="button"
                onClick={() => setViewMode('stream')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'stream'
                    ? 'bg-brand-surface text-brand-icewhite shadow-xs cursor-default'
                    : 'text-brand-silver hover:text-brand-icewhite cursor-pointer'
                }`}
                title="Continuous Slideshow Ribbon"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Slideshow</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-brand-surface text-brand-icewhite shadow-xs cursor-default'
                    : 'text-brand-silver hover:text-brand-icewhite cursor-pointer'
                }`}
                title={`All ${ORGANIZATIONS.length} Organizations Grid`}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span>Grid ({ORGANIZATIONS.length})</span>
              </button>
            </div>

            {/* Slideshow Extra Controls */}
            {viewMode === 'stream' && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsPlaying((prev) => !prev)}
                  className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isPlaying
                      ? 'bg-brand-surface/80 hover:bg-brand-surface text-brand-icewhite border-brand-line shadow-xs'
                      : 'bg-brand-gold text-brand-darknavy border-brand-gold shadow-xs'
                  }`}
                  title={isPlaying ? 'Pause Slideshow' : 'Resume Slideshow'}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span className="hidden sm:inline">Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span className="hidden sm:inline">Play</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsFastSpeed((prev) => !prev)}
                  className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    isFastSpeed
                      ? 'bg-brand-electric text-white border-brand-cyan'
                      : 'bg-brand-surface/80 hover:bg-brand-surface text-brand-silver border-brand-line'
                  }`}
                  title="Toggle slideshow speed"
                >
                  {isFastSpeed ? '2x Fast' : '1x Speed'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Grid Mode Search & Category Filters */}
        {viewMode === 'grid' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3"
          >
            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-brand-electric text-white shadow-xs'
                      : 'bg-brand-surface/80 hover:bg-brand-surface text-brand-silver hover:text-brand-icewhite border border-brand-line'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search utility or country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-brand-surface border border-brand-line rounded-xl text-brand-icewhite placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 focus:border-brand-cyan"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-silver cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* MODE 1: CONTINUOUS DUAL-TRACK SLIDESHOW MARQUEE */}
      {viewMode === 'stream' && (
        <div className="relative w-full space-y-3 sm:space-y-4 marquee-pause-hover">
          {/* Seamless Left & Right Horizon Gradient Edge Masks matching section background */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-brand-surface via-brand-surface/75 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-brand-surface via-brand-surface/75 to-transparent z-10 pointer-events-none" />

          {/* Track 1: Moving Left */}
          <div className="overflow-hidden flex w-full marquee-mask select-none">
            <div
              className={`flex gap-3 sm:gap-4 shrink-0 items-center ${
                isFastSpeed ? 'animate-marquee-left-fast' : 'animate-marquee-left'
              }`}
              style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
            >
              {[...track1, ...track1].map((org, index) => (
                <OrgLogoCard
                  key={`t1-${org.id}-${index}`}
                  org={org}
                  onSelect={() => setSelectedOrg(org)}
                />
              ))}
            </div>
          </div>

          {/* Track 2: Moving Right */}
          <div className="overflow-hidden flex w-full marquee-mask select-none">
            <div
              className={`flex gap-3 sm:gap-4 shrink-0 items-center ${
                isFastSpeed ? 'animate-marquee-right-fast' : 'animate-marquee-right'
              }`}
              style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
            >
              {[...track2, ...track2].map((org, index) => (
                <OrgLogoCard
                  key={`t2-${org.id}-${index}`}
                  org={org}
                  onSelect={() => setSelectedOrg(org)}
                />
              ))}
            </div>
          </div>

          {/* Bottom helper cue */}
          <div className="text-center mt-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-brand-muted">
              <Sparkles className="w-3 h-3 text-brand-gold" />
              Hover to pause • Click any organization logo for full institutional profile
            </span>
          </div>
        </div>
      )}

      {/* MODE 2: INTERACTIVE GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredOrgs.length === 0 ? (
            <div className="py-12 text-center bg-brand-surface/60 rounded-2xl border border-brand-line">
              <Building2 className="w-10 h-10 text-brand-muted mx-auto mb-2" />
              <p className="text-sm font-semibold text-brand-icewhite">No matching organizations found</p>
              <p className="text-xs text-brand-silver mt-1">Try adjusting your search query or category filter.</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="mt-3 px-3 py-1.5 bg-brand-electric text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {filteredOrgs.map((org) => (
                <motion.div
                  key={org.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <OrgGridCard org={org} onSelect={() => setSelectedOrg(org)} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ORGANIZATION DETAIL SPOTLIGHT MODAL */}
      <AnimatePresence>
        {selectedOrg && (
          <OrgDetailModal
            org={selectedOrg}
            onClose={() => setSelectedOrg(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ----------------------------------------------------------------------
// Sub-Components: Logo Card for Infinite Slideshow
// ----------------------------------------------------------------------

interface CardProps {
  org: OrganizationMember;
  onSelect: () => void;
}

function OrgLogoCard({ org, onSelect }: CardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group relative flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-brand-surface-2/90 hover:bg-brand-surface-3 border border-brand-line hover:border-brand-cyan/40 shadow-xs hover:shadow-lg hover:shadow-brand-cyan/10 transition-all duration-300 cursor-pointer text-left min-w-[210px] sm:min-w-[240px] max-w-[280px]"
    >
      {/* High-fidelity Logo Container with crisp white badge for official branding */}
      <div className="relative w-14 h-11 sm:w-16 sm:h-12 bg-white rounded-xl p-1.5 flex items-center justify-center shrink-0 border border-white/20 shadow-xs group-hover:scale-105 group-hover:shadow-md transition-all duration-300">
        <Image
          src={org.logo}
          alt={`${org.name} Logo`}
          width={64}
          height={48}
          className="max-h-full max-w-full w-auto h-auto object-contain"
          style={{ width: 'auto', height: 'auto' }}
          loading="lazy"
        />
      </div>

      {/* Organization Meta */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-xs sm:text-sm text-brand-icewhite group-hover:text-brand-cyan tracking-tight truncate">
            {org.code}
          </span>
          {org.isHostPartner ? (
            <span className="px-1.5 py-0.2 rounded-md bg-brand-gold text-brand-darknavy text-[9px] font-extrabold uppercase tracking-wider shrink-0 border border-brand-gold/40 shadow-2xs">
              Host
            </span>
          ) : (
            <span className="px-1.5 py-0.2 rounded-md bg-brand-chip text-brand-icewhite text-[9px] font-bold uppercase tracking-wider shrink-0">
              {org.countryCode}
            </span>
          )}
        </div>
        <p className="text-[11px] text-brand-silver truncate mt-0.5 font-medium">
          {org.country}
        </p>
      </div>

      {/* Interactive Micro Indicator */}
      <ChevronRight className="w-3.5 h-3.5 text-brand-muted group-hover:text-brand-icewhite group-hover:translate-x-0.5 transition-all shrink-0" />
    </button>
  );
}

// ----------------------------------------------------------------------
// Sub-Components: Grid Card for Bento / Catalog View
// ----------------------------------------------------------------------

function OrgGridCard({ org, onSelect }: CardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative w-full flex flex-col p-3 rounded-2xl transition-all duration-300 cursor-pointer text-left h-full ${
        org.isHostPartner
          ? 'bg-gradient-to-b from-brand-surface-2 to-brand-surface hover:bg-brand-surface border border-brand-gold/60 shadow-xs hover:shadow-xl hover:shadow-brand-gold/15'
          : 'bg-brand-surface hover:bg-brand-surface border border-brand-line hover:border-brand-line-strong/60 shadow-xs hover:shadow-xl hover:shadow-brand-electric/10'
      }`}
    >
      {/* Country Badge */}
      <div className="flex items-center justify-between w-full mb-2">
        {org.isHostPartner ? (
          <span className="px-2 py-0.5 rounded-md bg-brand-gold text-brand-darknavy text-[9px] font-extrabold uppercase tracking-wider border border-brand-gold/40">
            Host Utility
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded-md bg-brand-chip text-brand-icewhite text-[9px] font-extrabold uppercase tracking-wider">
            {org.countryCode}
          </span>
        )}
        <span className="text-[10px] text-brand-muted font-medium truncate max-w-[80px]">
          {org.country}
        </span>
      </div>

      {/* Logo Centerpiece */}
      <div className="relative w-full h-16 bg-white rounded-xl p-2 flex items-center justify-center border border-white/20 shadow-xs group-hover:scale-105 transition-all duration-300 mb-2">
        <Image
          src={org.logo}
          alt={`${org.name} Logo`}
          width={80}
          height={60}
          className="max-h-full max-w-full w-auto h-auto object-contain"
          style={{ width: 'auto', height: 'auto' }}
          loading="lazy"
        />
      </div>

      {/* Org Name & Category */}
      <div className="mt-auto">
        <div className="font-extrabold text-xs text-brand-icewhite group-hover:text-brand-cyan truncate">
          {org.code}
        </div>
        <p className="text-[10px] text-brand-silver truncate mt-0.5">
          {org.name}
        </p>
      </div>
    </button>
  );
}

// ----------------------------------------------------------------------
// Sub-Components: Institutional Detail Spotlight Modal
// ----------------------------------------------------------------------

interface ModalProps {
  org: OrganizationMember;
  onClose: () => void;
}

function OrgDetailModal({ org, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-brand-darknavy/40 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-lg bg-brand-surface rounded-3xl p-6 sm:p-7 shadow-2xl border border-brand-line z-10 overflow-hidden"
      >
        {/* Top Gold Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-electric via-brand-gold to-brand-electric" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-brand-surface-2 hover:bg-brand-surface-3 text-brand-silver hover:text-brand-icewhite transition-colors cursor-pointer"
          aria-label="Close organization details"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with Logo & Basic Metadata */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-20 h-20 bg-white rounded-2xl p-2.5 flex items-center justify-center shrink-0 border border-white/20 shadow-md">
            <Image
              src={org.logo}
              alt={`${org.name} Logo`}
              width={80}
              height={80}
              className="max-h-full max-w-full w-auto h-auto object-contain"
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>

          <div className="min-w-0 pr-6">
            <div className="flex items-center gap-2 mb-1">
              {org.isHostPartner ? (
                <span className="px-2 py-0.5 rounded-full bg-brand-gold text-brand-darknavy text-[10px] font-extrabold uppercase tracking-wider border border-brand-gold/50">
                  Host Utility
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-brand-chip text-brand-icewhite text-[10px] font-extrabold uppercase tracking-wider">
                  {org.countryCode}
                </span>
              )}
              <span className="px-2 py-0.5 rounded-full bg-brand-surface-2 text-brand-silver text-[10px] font-semibold">
                {org.category}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-brand-icewhite leading-tight">
              {org.code}
            </h3>
            <p className="text-xs font-semibold text-brand-gold mt-0.5">
              {org.country}
            </p>
          </div>
        </div>

        {/* Full Official Legal Name */}
        <div className="bg-brand-surface-2 rounded-2xl p-3.5 border border-brand-line mb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block mb-1">
            Official Institution Name
          </span>
          <p className="text-xs font-bold text-brand-icewhite leading-snug">
            {org.fullName}
          </p>
        </div>

        {/* Strategic Role & Highlights */}
        <div className="space-y-3 mb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block mb-1">
              Mandate & Scope in ASEAN
            </span>
            <p className="text-xs text-brand-silver leading-relaxed">
              {org.role}
            </p>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-xl bg-brand-chip/30 border border-brand-line-strong">
            <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-brand-icewhite block">
                Key Strategic Focus
              </span>
              <span className="text-xs text-brand-silver">
                {org.highlight}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-brand-line">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-electric hover:bg-brand-royal text-white text-xs font-bold shadow-xs hover:shadow-md transition-all text-center cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </motion.div>
    </div>
  );
}
