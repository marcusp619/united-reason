import { describe, expect, it } from "vitest";

import { noteBodies } from "./notes";
import { formatMoney, priceBands, prices } from "./pricing";
import { categories, featured, posts } from "./posts";
import { problems } from "./problems";
import { faqs, services } from "./services";
import { nav } from "./site";

describe("content integrity", () => {
  it("gives every post a category the filter chips can select", () => {
    const selectable = new Set<string>(categories);
    for (const p of posts) {
      expect(selectable.has(p.cat), `${p.title} has an unfilterable category`).toBe(true);
    }
  });

  it("keeps post slugs unique so routes don't collide", () => {
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("gives the featured card a post to link to", () => {
    expect(posts.some((p) => p.slug === featured.slug)).toBe(true);
  });

  it("registers note bodies only against real post slugs", () => {
    const slugs = new Set(posts.map((p) => p.slug));
    for (const slug of Object.keys(noteBodies)) {
      expect(slugs.has(slug), `${slug} has a body but no entry in posts.ts`).toBe(true);
    }
  });

  it("keeps service slugs unique", () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has a problem list for the picker to render", () => {
    expect(problems.length).toBeGreaterThan(0);
    for (const p of problems) {
      expect(p.build.length).toBeGreaterThan(0);
      expect(p.timeline.length).toBeGreaterThan(0);
    }
  });

  it("points every nav item at an absolute path", () => {
    for (const item of nav) {
      expect(item.href.startsWith("/")).toBe(true);
    }
  });

  /*
   * The prices are stated in three places — the FAQ, the pricing page and the
   * notes. Two of those are prose, so the only way they stay in step is if a
   * test reads them from the same values.
   */
  it("quotes the same figures in the FAQ as on the pricing page", () => {
    const costAnswer = faqs.find((f) => f.q.includes("cost"))?.a;
    expect(costAnswer).toBeDefined();

    for (const amount of Object.values(prices)) {
      expect(costAnswer).toContain(formatMoney(amount));
    }
  });

  it("gives every price band a starting figure and what it includes", () => {
    for (const band of priceBands) {
      expect(band.from).toMatch(/^From \$[\d,]+$/);
      expect(band.includes.length).toBeGreaterThan(0);
    }
  });
});
