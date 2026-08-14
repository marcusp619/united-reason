import type { MetadataRoute } from "next";

import { site } from "@/content/site";

/**
 * The note shells are deliberately absent: they carry `noindex` until the
 * bodies are written, and listing a noindexed URL in a sitemap is a
 * contradictory signal. Add them here when they have content.
 */
const routes = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/what-i-do", changeFrequency: "monthly", priority: 0.9 },
  { path: "/what-i-do/ai-assistants", changeFrequency: "monthly", priority: 0.8 },
  { path: "/how-it-works", changeFrequency: "monthly", priority: 0.8 },
  { path: "/examples", changeFrequency: "monthly", priority: 0.7 },
  { path: "/book", changeFrequency: "yearly", priority: 0.9 },
  { path: "/notes", changeFrequency: "weekly", priority: 0.6 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
