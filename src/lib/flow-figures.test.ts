import { describe, expect, it } from "vitest";

import { flows } from "@/content/flows";
import {
  minutesAutomatedEach,
  oneInHowMany,
  timeSavedPerWeek,
  timeSpentPerWeek,
} from "./flow-figures";

/** A week a small business would recognise. Above this, the owner reads past it. */
const MOST_ITEMS_PER_WEEK = 60;
/** Below this a flag rate is a boast; above it, the automation isn't worth buying. */
const FLAG_RANGE = { least: 5, most: 25 };

const cases = flows.map((flow, i) => ({ i, flow }));

describe("flow figures", () => {
  it.each(cases)("flow $i never claims to cost you nothing", ({ flow }) => {
    // The canvas shows items peeling off to a person. A zero here would be
    // contradicted by the drawing directly above it.
    expect(minutesAutomatedEach(flow)).toBeGreaterThan(0);
    expect(flow.edges.some((edge) => edge.exception)).toBe(true);
  });

  it.each(cases)("flow $i states a defensible flag rate", ({ flow }) => {
    expect(flow.flaggedPerHundred).toBeGreaterThanOrEqual(FLAG_RANGE.least);
    expect(flow.flaggedPerHundred).toBeLessThanOrEqual(FLAG_RANGE.most);
    expect(oneInHowMany(flow)).toBeGreaterThan(1);
  });

  it.each(cases)("flow $i saves less than the job costs", ({ flow }) => {
    const saved = timeSavedPerWeek(flow);
    const spent = timeSpentPerWeek(flow);
    expect(saved.unit).toBe(spent.unit);
    expect(saved.value).toBeGreaterThan(0);
    expect(saved.value).toBeLessThanOrEqual(spent.value);
  });

  it.each(cases)("flow $i is sized for a small business", ({ flow }) => {
    expect(flow.itemsPerWeek).toBeLessThanOrEqual(MOST_ITEMS_PER_WEEK);
    expect(flow.minutesByHandEach).toBeGreaterThan(flow.minutesPerFlagEach);
  });

  it("reads minutes rather than rounding a short job up to an hour", () => {
    const shortest = flows.reduce((least, flow) =>
      flow.minutesByHandEach * flow.itemsPerWeek < least.minutesByHandEach * least.itemsPerWeek
        ? flow
        : least,
    );
    expect(timeSpentPerWeek(shortest).unit).toBe("min");
  });
});
