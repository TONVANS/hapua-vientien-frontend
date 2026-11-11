import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://hapua.edl.com.la/vientiane";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "14th HAPUA Working Group No. 5 Meeting 2026 | Vientiane, Lao PDR",
    template: "%s | 14th HAPUA WG5 Vientiane 2026",
  },
  description:
    "Official portal for the 14th Meeting of the Heads of ASEAN Power Utilities / Authorities (HAPUA) Working Group No. 5 in Vientiane Capital, Lao PDR, 25-27 November 2026. Theme: Human Capital in the Age of Intelligence: Unlocking Skills, Innovation and Resilience. Hosted & Organized by Electricité du Laos (EDL) and HAPUA.",
  keywords: [
    "HAPUA",
    "HAPUA 2026",
    "14th HAPUA",
    "14th HAPUA Working Group No. 5",
    "HWG 5",
    "Working Group 5",
    "ASEAN Power Utilities",
    "Electricité du Laos",
    "EDL",
    "Crowne Plaza Hotel Vientiane",
    "Vientiane Capital",
    "Lao PDR Energy",
    "Human Capital in the Age of Intelligence",
    "ASEAN Energy",
    "Heads of ASEAN Power Utilities Authorities",
  ],
  authors: [
    { name: "HAPUA Secretariat", url: "http://hapua.org" },
    { name: "Electricité du Laos (EDL)", url: "https://edl.com.la" },
  ],
  creator: "Electricité du Laos (EDL) & HAPUA Secretariat",
  publisher: "HAPUA Secretariat",
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "14th HAPUA Working Group No. 5 Meeting",
    title: "14th Meeting of the Heads of ASEAN Power Utilities / Authorities (HAPUA) Working Group No. 5",
    description:
      "Official portal for the 14th HAPUA Working Group No. 5 Meeting, 25-27 November 2026 at Crowne Plaza Hotel, Vientiane Capital, Lao PDR. Theme: Human Capital in the Age of Intelligence: Unlocking Skills, Innovation and Resilience.",
    images: [
      {
        url: "/OG/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "14th HAPUA Working Group No. 5 Meeting 2026 - Crowne Plaza Hotel Vientiane",
        type: "image/jpeg",
      },
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "14th HAPUA Working Group No. 5 Meeting 2026",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "14th HAPUA Working Group No. 5 Meeting 2026 | Vientiane, Lao PDR",
    description:
      "14th Meeting of the Heads of ASEAN Power Utilities / Authorities (HAPUA) Working Group No. 5 - 25-27 November 2026 at Crowne Plaza Hotel, Vientiane Capital, Lao PDR.",
    images: ["/OG/og-image.jpg"],
    creator: "@HAPUA_ASEAN",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: ["/favicon.ico"],
    apple: ["/favicon.ico"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A1D45",
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "BusinessEvent",
  name: "14th Meeting of the Heads of ASEAN Power Utilities / Authorities (HAPUA) Working Group No. 5",
  description:
    "Official summit of the Heads of ASEAN Power Utilities/Authorities Working Group No. 5 on Human Resources and Capacity Building in Vientiane Capital, Lao PDR. Theme: Human Capital in the Age of Intelligence: Unlocking Skills, Innovation and Resilience.",
  startDate: "2026-11-25T08:30:00+07:00",
  endDate: "2026-11-27T17:00:00+07:00",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "Crowne Plaza Hotel Vientiane",
    address: {
      "@type": "PostalAddress",
      streetAddress: "20 Samsenthai Road, Nongduang Nua Village, Sikhottabong District",
      addressLocality: "Vientiane Capital",
      addressRegion: "Vientiane",
      addressCountry: "LA",
    },
  },
  image: [
    `${siteUrl}/OG/og-image.jpg`,
    `${siteUrl}/images/og-image.jpg`,
  ],
  organizer: [
    {
      "@type": "Organization",
      name: "Electricité du Laos (EDL)",
      url: "https://edl.com.la",
      logo: `${siteUrl}/logo_organization/EDL.webp`,
    },
    {
      "@type": "Organization",
      name: "HAPUA Secretariat",
      url: "http://hapua.org",
      logo: `${siteUrl}/images/hapua_logo.webp`,
    },
  ],
  performer: {
    "@type": "Organization",
    name: "Heads of ASEAN Power Utilities / Authorities (HAPUA)",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
