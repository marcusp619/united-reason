/**
 * Every number the showcase states about time.
 *
 * It lives in one place so the stat row and the run happening above it can
 * never disagree: the cost of a built run is *derived* from the share of work
 * it hands back, rather than asserted alongside it. A flow that flags nothing
 * would be a flow with no dashed edge on the canvas.
 */

import type { Flow } from "@/content/flows";

const MINUTES_PER_HOUR = 60;
const PER_HUNDRED = 100;
/** Under two hours, rounding to whole hours flatters more than it informs. */
const HOURS_FROM_MINUTES = 120;

export type TimeFigure = {
  value: number;
  unit: string;
};

/**
 * What one item costs you once the run is built. Not zero, and it cannot be
 * written as zero: the flagged ones still come to a person.
 */
export function minutesAutomatedEach(flow: Flow): number {
  return (flow.flaggedPerHundred / PER_HUNDRED) * flow.minutesPerFlagEach;
}

function minutesByHandPerWeek(flow: Flow): number {
  return flow.minutesByHandEach * flow.itemsPerWeek;
}

/**
 * One unit per flow, chosen from the by-hand total.
 *
 * Both figures have to answer to the same basis, or toggling between the two
 * modes swaps the unit under the reader: an hour saved and sixty minutes saved
 * are the same fact, and printing them differently makes them incomparable.
 */
function unitFor(flow: Flow): TimeFigure["unit"] {
  return minutesByHandPerWeek(flow) < HOURS_FROM_MINUTES ? "min" : "hrs";
}

/**
 * Floor, not round. Rounding sent three of the five flows up — 3.55 hours
 * saved printed as 4 — which is invisible until money sits next to it, and
 * then it is either a monetised rounding-up or a figure a visitor can't
 * reproduce from the two numbers above it. A figure on screen never exceeds
 * the truth.
 */
function toFigure(minutes: number, unit: TimeFigure["unit"]): TimeFigure {
  const value = unit === "min" ? minutes : minutes / MINUTES_PER_HOUR;
  return { value: Math.floor(value), unit };
}

/** Time a week the job costs a person today. */
export function timeSpentPerWeek(flow: Flow): TimeFigure {
  return toFigure(minutesByHandPerWeek(flow), unitFor(flow));
}

/** Time a week the built run gives back, after the flagged ones take theirs. */
export function timeSavedPerWeek(flow: Flow): TimeFigure {
  const savedEach = flow.minutesByHandEach - minutesAutomatedEach(flow);
  return toFigure(savedEach * flow.itemsPerWeek, unitFor(flow));
}

/** "about one in twelve" — the flag rate said the way a person would say it. */
export function oneInHowMany(flow: Flow): number {
  return Math.round(PER_HUNDRED / flow.flaggedPerHundred);
}

/** The figure as hours, whichever unit it prints in. What money multiplies. */
export function hoursOf(figure: TimeFigure): number {
  return figure.unit === "min" ? figure.value / MINUTES_PER_HOUR : figure.value;
}

/**
 * The same flow at a visitor's own volume. Every time figure follows from a
 * flow, so handing the panel a re-based flow keeps the stat row and the money
 * under it answering to one number rather than two.
 */
export function flowAtVolume(flow: Flow, itemsPerWeek: number): Flow {
  return { ...flow, itemsPerWeek };
}
