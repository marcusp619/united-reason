import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Motion } from "@/components/motion";
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
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="min-h-dvh">
        <Motion />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        {/* Cookieless by design — no consent banner needed, unlike GA. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
