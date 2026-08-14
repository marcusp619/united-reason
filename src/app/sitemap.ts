import type { MetadataRoute } from "next";

import { noteBodies } from "@/content/notes";
import { site } from "@/content/site";

/**
 * Notes are included only once they have a body. An unwritten shell carries
 * `noindex`, and listing a noindexed URL in a sitemap is a contradictory
 * signal — so both facts follow from the same registry rather than from two
 * lists that can drift.
 */
const routes = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/what-i-do", changeFrequency: "monthly", priority: 0.9 },
  { path: "/what-i-do/ai-assistants", changeFrequency: "monthly", priority: 0.8 },
  { path: "/how-it-works", changeFrequency: "monthly", priority: 0.8 },
  { path: "/examples", changeFrequency: "monthly", priority: 0.7 },
  { path: "/book", changeFrequency: "yearly", priority: 0.9 },
  { path: "/notes", changeFrequency: "weekly", priority: 0.6 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = routes.map(({ path, changeFrequency, priority }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  const writtenNotes = Object.keys(noteBodies).map((slug) => ({
    url: `${site.url}/notes/${slug}`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...pages, ...writtenNotes];
}
