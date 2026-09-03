/**
 * The numbers the site commits to.
 *
 * They were previously stated in exactly one place — an FAQ answer — and
 * repeated as prose in two notes. Here they are values, so the pricing page,
 * the FAQ and (later) any arithmetic the site does all read the same figures.
 * `content.test.ts` asserts the FAQ answer still contains them.
 */
export const prices = {
  workflowFrom: 2500,
  websiteFrom: 4000,
  websiteTypicalTo: 12000,
} as const;

export function formatMoney(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

/**
 * What a build is, for the purpose of pricing it. A classification rather than
 * a new claim — it maps a flow onto a figure the site already publishes, so no
 * per-flow price has to be invented.
 */
export const BuildKind = { Workflow: "workflow", Site: "site" } as const;
export type BuildKind = (typeof BuildKind)[keyof typeof BuildKind];

export const buildPriceFrom: Record<BuildKind, number> = {
  [BuildKind.Workflow]: prices.workflowFrom,
  [BuildKind.Site]: prices.websiteFrom,
};

/**
 * From "Three hours a week": the loaded cost of an hour, which is wage plus
 * tax plus everything else — not the wage. `typical` is the default the panel
 * opens with, and it sits in the bottom half of the range the note publishes.
 */
export const loadedHourlyCost = { least: 25, typical: 30, most: 45 } as const;

/**
 * Outside these an input has stopped describing a small business's admin hour,
 * so the panel clamps rather than arguing with the visitor.
 */
export const hourlyCostLimits = { least: 10, most: 200 } as const;

/** Two weeks nobody works. The multiplier the note uses. */
export const WORKING_WEEKS_PER_YEAR = 50;

export type PriceBand = {
  what: string;
  from: string;
  body: string;
  includes: readonly string[];
};

export const priceBands: readonly PriceBand[] = [
  {
    what: "Automating one workflow",
    from: `From ${formatMoney(prices.workflowFrom)}`,
    body: "One job that happens over and over, done by a machine instead. The re-typing, the chasing, the Monday spreadsheet.",
    includes: [
      "The build, on tools you already pay for",
      "The exception path, so the ones it isn't sure about reach you",
      "Handover, documentation and the accounts in your name",
    ],
  },
  {
    what: "An assistant",
    from: `From ${formatMoney(prices.workflowFrom)}`,
    body: "Answers from your own material — your prices, your policies, your way of saying things. It hands over rather than guessing.",
    includes: [
      "Your material gathered and structured",
      "The limits set, and tested against questions it can't answer",
      "Somewhere for it to hand over to",
    ],
  },
  {
    what: "A website or small app",
    from: `From ${formatMoney(prices.websiteFrom)}`,
    body: `Most land between ${formatMoney(prices.websiteFrom)} and ${formatMoney(prices.websiteTypicalTo)}. Payments roughly double a simple build; so does a site that has to talk to something else.`,
    includes: [
      "Design, build and launch",
      "Migration with your search rankings intact",
      "No retainer — most people need me about twice a year",
    ],
  },
];

/** What the one number actually promises. The reason there's a page at all. */
export const priceTerms = [
  {
    title: "One number, in writing, before you commit",
    body: "Not a range that firms up later. You see the scope and the price together, and you decide with both in front of you.",
  },
  {
    title: "No hourly rate",
    body: "You're not paying for how long it takes me. If I'm slow that week, that's my problem.",
  },
  {
    title: "No change-request games",
    body: "The scope says what it does and what it doesn't. If what I build doesn't match, I fix it, and that isn't extra.",
  },
  {
    title: "Half up front, half on handover",
    body: "Nothing in between, and nothing that renews on its own.",
  },
];
