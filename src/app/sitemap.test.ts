import { describe, expect, it } from "vitest";

import { noteBodies } from "@/content/notes";
import { posts } from "@/content/posts";
import { site } from "@/content/site";
import sitemap from "./sitemap";

/**
 * `/notes/[slug]` noindexes a post with no body, and the sitemap lists only
 * posts that have one. Both files carefully explain why; neither proved it.
 * Listing a noindexed URL is a contradictory signal, and the two rules live in
 * different files, so this is exactly the pair that drifts.
 */
describe("the sitemap", () => {
  const entries = sitemap();
  const listed = new Set(entries.map((entry) => entry.url));

  it("lists a note if and only if it has a body", () => {
    for (const post of posts) {
      const url = `${site.url}/notes/${post.slug}`;
      expect(listed.has(url)).toBe(post.slug in noteBodies);
    }
  });

  it("dates a note from its publication, not from the build", () => {
    for (const post of posts) {
      if (!(post.slug in noteBodies)) continue;
      const entry = entries.find((e) => e.url === `${site.url}/notes/${post.slug}`);

      expect(new Date(String(entry?.lastModified)).toISOString()).toContain(post.published);
    }
  });

  it("gives every entry an absolute URL on this site", () => {
    for (const entry of entries) {
      expect(entry.url.startsWith(`${site.url}/`)).toBe(true);
    }
  });

  it("lists each URL once", () => {
    expect(listed.size).toBe(entries.length);
  });
});
