import { track } from "@vercel/analytics";

/**
 * The four things worth knowing about this site.
 *
 * Named here rather than typed at each call site so the set stays small and
 * the names stay stable — an event whose name drifts is a chart with a gap in
 * it. Vercel Analytics is cookieless, and nothing here carries anything a
 * visitor typed: the showcase's hourly cost and volume are their business, and
 * a funnel measurement is not a reason to collect them.
 */
export const Event = {
  /** Which of the five problems people actually recognise. */
  ProblemPicked: "problem picked",
  /** Whether the most expensive component on the site is ever touched. */
  RunStarted: "run started",
  /** Whether anyone reaches the panel that prices it. */
  WorthChanged: "worth changed",
  /** The funnel dead-ends at a mailto, so knowing people get this far matters. */
  BookClicked: "book clicked",
  /**
   * A form handed off to the visitor's mail client. It is not a lead — it is
   * the last thing this site can see before one either arrives or evaporates,
   * and the gap between this count and the inbox is the cost of the mailto.
   */
  FormHandedOff: "form handed off",
} as const;
export type Event = (typeof Event)[keyof typeof Event];

export function record(event: Event, properties?: Record<string, string | number>): void {
  track(event, properties);
}
