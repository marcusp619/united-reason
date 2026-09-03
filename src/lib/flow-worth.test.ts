import { describe, expect, it } from "vitest";

import { flows } from "@/content/flows";
import {
  BuildKind,
  buildPriceFrom,
  hourlyCostLimits,
  loadedHourlyCost,
  prices,
  WORKING_WEEKS_PER_YEAR,
} from "@/content/pricing";
import { flowAtVolume, hoursOf, timeSavedPerWeek, timeSpentPerWeek } from "@/lib/flow-figures";
import {
  clampWorthInputs,
  defaultWorthInputs,
  mostItemsPerWeek,
  PaybackVerdict,
  worthOf,
  type WorthInputs,
} from "@/lib/flow-worth";

const WEEKS_IN_A_YEAR = 52;
const HOURS_IN_A_WORKING_WEEK = 40;
const RATES = [hourlyCostLimits.least, loadedHourlyCost.least, loadedHourlyCost.typical, 45, 200];

/** Every flow crossed with the range of numbers a visitor could actually type. */
const cases = flows.flatMap((flow, i) =>
  RATES.flatMap((hourlyCost) =>
    [1, flow.itemsPerWeek, mostItemsPerWeek(flow)].map((itemsPerWeek) => ({
      i,
      flow,
      inputs: { hourlyCost, itemsPerWeek } satisfies WorthInputs,
    })),
  ),
);

describe("what the hours are worth", () => {
  it.each(cases)(
    "flow $i states no more money than the hours above it ($inputs.hourlyCost/hr, $inputs.itemsPerWeek a week)",
    ({ flow, inputs }) => {
      const basis = flowAtVolume(flow, inputs.itemsPerWeek);
      const fromWhatIsOnScreen = hoursOf(timeSavedPerWeek(basis)) * inputs.hourlyCost;

      // A visitor with a calculator gets our number, not a different one.
      expect(worthOf(flow, inputs).savedPerWeek).toBeLessThanOrEqual(fromWhatIsOnScreen);
      expect(worthOf(flow, inputs).savedPerWeek).toBeGreaterThan(fromWhatIsOnScreen - 1);
    },
  );

  it.each(cases)("flow $i never saves more than the job costs", ({ flow, inputs }) => {
    const basis = flowAtVolume(flow, inputs.itemsPerWeek);
    const spent = hoursOf(timeSpentPerWeek(basis)) * inputs.hourlyCost;

    expect(worthOf(flow, inputs).savedPerWeek).toBeLessThanOrEqual(spent);
  });

  it.each(cases)("flow $i counts a short year", ({ flow, inputs }) => {
    const worth = worthOf(flow, inputs);

    expect(worth.savedPerYear).toBe(worth.savedPerWeek * WORKING_WEEKS_PER_YEAR);
    // Two weeks nobody works. Structural, not a comment — except where the
    // saving floors to nothing, and then there is no year to shorten.
    if (worth.savedPerWeek > 0) {
      expect(worth.savedPerYear).toBeLessThan(worth.savedPerWeek * WEEKS_IN_A_YEAR);
    }
  });

  it.each(cases)("flow $i says no when it saves nothing", ({ flow, inputs }) => {
    const worth = worthOf(flow, inputs);
    if (worth.savedPerWeek > 0) return;

    expect(worth.verdict).toBe(PaybackVerdict.NotWorthIt);
    expect(worth.months).toBeUndefined();
  });

  it.each(cases)("flow $i never understates the wait", ({ flow, inputs }) => {
    const worth = worthOf(flow, inputs);
    if (worth.months === undefined) return;

    const earnedByThen = (worth.savedPerYear / 12) * worth.months;
    expect(earnedByThen).toBeGreaterThanOrEqual(worth.buildPriceFrom);
  });

  it.each(cases)("flow $i prices against a published figure", ({ flow, inputs }) => {
    expect(Object.values(buildPriceFrom)).toContain(worthOf(flow, inputs).buildPriceFrom);
    expect(worthOf(flow, inputs).buildPriceFrom).toBeGreaterThanOrEqual(prices.workflowFrom);
  });

  it.each(cases)("flow $i survives whatever gets typed at it", ({ flow, inputs }) => {
    for (const bad of [0, -1, Number.NaN, 1e9]) {
      const clamped = clampWorthInputs(flow, { hourlyCost: bad, itemsPerWeek: bad });

      expect(clamped.hourlyCost).toBeGreaterThanOrEqual(hourlyCostLimits.least);
      expect(clamped.hourlyCost).toBeLessThanOrEqual(hourlyCostLimits.most);
      expect(clamped.itemsPerWeek).toBeGreaterThanOrEqual(1);
      expect(clamped.itemsPerWeek).toBeLessThanOrEqual(mostItemsPerWeek(flow));
      expect(Number.isFinite(worthOf(flow, clamped).savedPerWeek)).toBe(true);
    }
    expect(clampWorthInputs(flow, inputs)).toEqual(inputs);
  });

  it.each(cases)("flow $i keeps one unit under a visitor's volume", ({ flow, inputs }) => {
    const basis = flowAtVolume(flow, inputs.itemsPerWeek);
    expect(timeSavedPerWeek(basis).unit).toBe(timeSpentPerWeek(basis).unit);
  });

  it.each(cases)("flow $i can't be driven past one person's week", ({ flow, inputs }) => {
    const atTheCeiling = flowAtVolume(flow, mostItemsPerWeek(flow));
    expect(hoursOf(timeSpentPerWeek(atTheCeiling))).toBeLessThanOrEqual(HOURS_IN_A_WORKING_WEEK);
    expect(inputs.itemsPerWeek).toBeLessThanOrEqual(mostItemsPerWeek(flow));
  });

  it("never claims a site pays back in recovered hours", () => {
    for (const { flow, inputs } of cases) {
      if (flow.build !== BuildKind.Site) continue;
      expect(worthOf(flow, inputs).verdict).toBe(PaybackVerdict.NotByHoursAlone);
      expect(worthOf(flow, inputs).months).toBeUndefined();
    }
  });

  it("raising the rate or the volume never lengthens the wait", () => {
    for (const flow of flows) {
      const at = (inputs: WorthInputs) => worthOf(flow, inputs).months ?? Number.POSITIVE_INFINITY;
      const base = defaultWorthInputs(flow);

      expect(at({ ...base, hourlyCost: base.hourlyCost * 2 })).toBeLessThanOrEqual(at(base));
      expect(at({ ...base, itemsPerWeek: base.itemsPerWeek * 2 })).toBeLessThanOrEqual(at(base));
    }
  });

  it("opens on a rate inside the range the note publishes", () => {
    const midpoint = (loadedHourlyCost.least + loadedHourlyCost.most) / 2;

    expect(loadedHourlyCost.typical).toBeGreaterThanOrEqual(loadedHourlyCost.least);
    expect(loadedHourlyCost.typical).toBeLessThanOrEqual(midpoint);
    for (const flow of flows) {
      expect(defaultWorthInputs(flow).itemsPerWeek).toBe(flow.itemsPerWeek);
    }
  });

  /*
   * The one that keeps the rest believable. If a future edit quietly makes
   * every flow a buy, this is what notices.
   */
  it("still says no to at least one of them at the published defaults", () => {
    const verdicts = flows.map((flow) => worthOf(flow, defaultWorthInputs(flow)).verdict);
    expect(verdicts).toContain(PaybackVerdict.NotWorthIt);
  });
});
