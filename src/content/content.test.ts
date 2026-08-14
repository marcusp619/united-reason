import { describe, expect, it } from "vitest";

import { categories, posts } from "./posts";
import { problems } from "./problems";
import { services } from "./services";
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
});
