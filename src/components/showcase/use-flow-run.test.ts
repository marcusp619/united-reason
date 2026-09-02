import { describe, expect, it } from "vitest";

import { flows } from "@/content/flows";
import { isExceptionItem, routeIndexFor } from "./use-flow-run";

describe("item routing", () => {
  it("sends every third item down the exception path", () => {
    expect([0, 1, 2, 3, 4, 5].map(isExceptionItem)).toEqual([
      false,
      false,
      true,
      false,
      false,
      true,
    ]);
  });

  /*
   * Cycling on the raw item index would give 0,1,0,1 across a run — route 2 of
   * 3 lands only on indices the exception rule has already taken, so a third of
   * a fan-in's sources would never once light up. Counting normal items fixes it.
   */
  it("uses every route a flow has", () => {
    for (const flow of flows) {
      const used = new Set<number>();
      for (let i = 0; i < flow.items.length; i += 1) {
        if (isExceptionItem(i)) continue;
        used.add(routeIndexFor(i) % flow.routes.length);
      }
      expect(used.size, "a route never carries any work").toBe(flow.routes.length);
    }
  });

  it("counts normal items in order, skipping the exceptions", () => {
    expect([0, 1, 3, 4].map(routeIndexFor)).toEqual([0, 1, 2, 3]);
  });
});
