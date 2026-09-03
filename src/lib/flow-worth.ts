/**
 * What the hours are worth, and how long a build takes to pay for itself.
 *
 * Kept out of `flow-figures.ts` on purpose: that file's promise is about time,
 * and money brings in published prices, a visitor's own numbers and currency
 * formatting. The dependency runs one way — worth → figures → flows.
 *
 * The rule from `flow-figures.ts` carries over and is the whole design here:
 * every figure is *derived* from the one above it rather than asserted beside
 * it. Money comes from the hours the panel already printed, so a visitor with
 * a calculator gets the panel's number and not a different one; and the hours
 * already have the flagged items subtracted, so the dashed edge on the canvas
 * is priced in without anyone having to claim it is.
 */

import type { Flow } from "@/content/flows";
import {
  BuildKind,
  buildPriceFrom,
  hourlyCostLimits,
  loadedHourlyCost,
  WORKING_WEEKS_PER_YEAR,
} from "@/content/pricing";
import { flowAtVolume, hoursOf, timeSavedPerWeek } from "@/lib/flow-figures";

const MONTHS_PER_YEAR = 12;
/** One person, forty hours. Above this the honest advice isn't "automate it". */
const MINUTES_IN_A_WORKING_WEEK = 2400;
/** Straight from the note: under six, do it; under a year, it's worth doing. */
const PAYBACK_MONTHS = { doItNow: 6, worthDoing: 12 } as const;

export type WorthInputs = {
  readonly hourlyCost: number;
  readonly itemsPerWeek: number;
};

export const PaybackVerdict = {
  DoItNow: "doItNow",
  WorthDoing: "worthDoing",
  /** Says no. A panel that can't is a brochure. */
  NotWorthIt: "notWorthIt",
  /** A site. Its return isn't recovered admin hours, so we decline to price it. */
  NotByHoursAlone: "notByHoursAlone",
} as const;
export type PaybackVerdict = (typeof PaybackVerdict)[keyof typeof PaybackVerdict];

export type Worth = {
  readonly savedPerWeek: number;
  readonly savedPerYear: number;
  readonly buildPriceFrom: number;
  readonly verdict: PaybackVerdict;
  /** Absent wherever the verdict declines to state one. */
  readonly months?: number;
};

export function defaultWorthInputs(flow: Flow): WorthInputs {
  return { hourlyCost: loadedHourlyCost.typical, itemsPerWeek: flow.itemsPerWeek };
}

/** The most of this job one person could do in a week. Derived, not chosen. */
export function mostItemsPerWeek(flow: Flow): number {
  return Math.floor(MINUTES_IN_A_WORKING_WEEK / flow.minutesByHandEach);
}

/** Clamped once, here, at the boundary. The functions below trust their inputs. */
export function clampWorthInputs(flow: Flow, inputs: WorthInputs): WorthInputs {
  return {
    hourlyCost: clamp(inputs.hourlyCost, hourlyCostLimits.least, hourlyCostLimits.most),
    itemsPerWeek: clamp(inputs.itemsPerWeek, 1, mostItemsPerWeek(flow)),
  };
}

function clamp(value: number, least: number, most: number): number {
  if (!Number.isFinite(value)) return least;
  return Math.min(Math.max(Math.round(value), least), most);
}

function monthsToPayBack(priceFrom: number, savedPerYear: number): number {
  return Math.ceil(priceFrom / (savedPerYear / MONTHS_PER_YEAR));
}

function verdictFor(months: number): PaybackVerdict {
  if (months <= PAYBACK_MONTHS.doItNow) return PaybackVerdict.DoItNow;
  if (months <= PAYBACK_MONTHS.worthDoing) return PaybackVerdict.WorthDoing;
  return PaybackVerdict.NotWorthIt;
}

export function worthOf(flow: Flow, inputs: WorthInputs): Worth {
  const basis = flowAtVolume(flow, inputs.itemsPerWeek);
  // From the printed hours, not the exact minutes: the visitor has to be able
  // to reproduce this from the two numbers directly above it.
  const savedPerWeek = Math.floor(hoursOf(timeSavedPerWeek(basis)) * inputs.hourlyCost);
  const savedPerYear = savedPerWeek * WORKING_WEEKS_PER_YEAR;
  const priceFrom = buildPriceFrom[flow.build];

  const stated = { savedPerWeek, savedPerYear, buildPriceFrom: priceFrom };

  /*
   * A site states no month count at all, at any input. Its return is the work
   * you win, not the admin hours you got back, and putting a number on
   * recovered hours would be precise about the wrong thing. Checked before
   * anything else, so it holds even where the saving floors to nothing.
   */
  if (flow.build === BuildKind.Site) {
    return { ...stated, verdict: PaybackVerdict.NotByHoursAlone };
  }

  if (savedPerYear <= 0) {
    return { ...stated, verdict: PaybackVerdict.NotWorthIt };
  }

  /*
   * Every other verdict states the figure, including the ones that say don't:
   * "about two years" is more use to an owner than "years, not months".
   */
  const months = monthsToPayBack(priceFrom, savedPerYear);
  return { ...stated, verdict: verdictFor(months), months };
}
