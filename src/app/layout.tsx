import type { Metadata } from "next";
import { Archivo } from "next/font/google";

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
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="min-h-dvh">
        <Motion />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
