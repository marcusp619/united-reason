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
   * A form was submitted, with what became of it: `sent` means it was
   * delivered, anything else means the visitor was handed to their own mail
   * client and it may quietly evaporate there. The split between the two is
   * the whole reason to record it.
   */
  EnquirySubmitted: "enquiry submitted",
} as const;
export type Event = (typeof Event)[keyof typeof Event];

export function record(event: Event, properties?: Record<string, string | number>): void {
  track(event, properties);
}
