/** Shared shapes for the interactive showcase. */

/** One piece of work travelling the schematic. */
export type LiveItem = {
  key: number;
  label: string;
  isException: boolean;
  /**
   * Which of the drawn flow's normal routes this item takes. Held as an index
   * rather than the route itself so the token always resolves against the graph
   * currently on screen — the by-hand graph has entirely different node ids, and
   * a baked-in route would send an item looking for nodes that aren't there.
   */
  routeIndex: number;
};

/** One line of the run log, written when an item arrives. */
export type LogEntry = {
  key: number;
  label: string;
  outcome: string;
  isException: boolean;
};

/** One figure in the result row. */
export type RunStat = {
  value: number;
  unit: string;
  label: string;
};

/** Which version of the job is on screen: today's, or the built one. */
export type ShowcaseMode = "automated" | "byHand";
