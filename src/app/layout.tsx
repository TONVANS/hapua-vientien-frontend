import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "HWG 5 Meeting | Vientiane, Lao PDR",
  description: "Official portal for the HAPUA Working Group 5 (HWG 5) Meeting, Vientiane, Lao PDR, 25-27 November 2026. Theme: Human Capital in the Age of Intelligence: Unlocking Skills, Innovation and Resilience.",
  keywords: ["HAPUA", "ASEAN", "Energy Summit", "Vientiane", "Lao PDR", "Power Utilities", "Human Capital", "HWG 5 Meeting 2026"],
  authors: [{ name: "HAPUA Secretariat" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
