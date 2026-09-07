import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { MotionConfig } from "motion/react";

import { FunnelEvents } from "@/components/funnel-events";
import { Motion } from "@/components/motion";
import { PageTransition } from "@/components/page-transition";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";

import "./globals.css";

/* Self-hosted by next/font — no layout shift, no Google Fonts request at runtime. */
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description:
    "One person, start to finish. Tell me what's eating your week and I'll tell you honestly whether software fixes it, roughly what it takes, and what it costs.",
  /*
   * Canonicals are set per page, never here: page metadata merges shallowly
   * over the layout's, so a canonical at this level would be inherited by every
   * page that doesn't override it and point the whole site at "/".
   */
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  /* So a reader's browser and any aggregator can find the notes feed. */
  alternates: {
    types: { "application/rss+xml": [{ url: "/feed.xml", title: `${site.name} · notes` }] },
  },
  /**
   * Search Console. The same token verifies either property type: as a DNS TXT
   * record for the domain property, or as this tag for the URL-prefix one.
   * Having both means verification survives losing access to either.
   */
  verification: { google: "A8P6-lc63jG6_rdRCyAE3FArqNlsgHYuchQvpZjxrtQ" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="min-h-dvh">
        {/*
         * The CSS reveals respect prefers-reduced-motion on their own, but
         * everything driven by `motion` — the whole showcase, the run log,
         * the page transition — does not: the library's default is "never".
         * One config here covers all of it.
         */}
        <MotionConfig reducedMotion="user">
          <a href="#main" className="skip-link">
            Skip to the content
          </a>
          <Motion />
          <FunnelEvents />
          <SiteHeader />
          <main id="main">
            <PageTransition>{children}</PageTransition>
          </main>
          <SiteFooter />
        </MotionConfig>
        {/* Cookieless by design — no consent banner needed, unlike GA. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
