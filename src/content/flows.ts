/**
 * The node graphs behind the interactive showcase.
 *
 * One flow per entry in `problems.ts`, in the same order — picking a problem
 * picks the flow that gets built and run for it.
 *
 * Each one is deliberately a different *shape*, because each job is: parallel
 * checks, a lookup that dips into your own material and comes back, a chase
 * that loops until someone answers, a gather that pulls from several places at
 * once, a site that fans out into three ways of getting hold of you. Five
 * drawings of the same diagram with different words would be a screensaver.
 *
 * Figures are illustrative and the showcase says so on screen: the shape of a
 * typical small business's week, not a measurement of anyone's.
 */

export type FlowNodeKind = "trigger" | "step" | "outcome" | "human";

/** Placed on a 4×3 schematic grid. Geometry is derived, never hand-tuned. */
export type FlowNode = {
  id: string;
  label: string;
  kind: FlowNodeKind;
  col: number;
  row: number;
};

export type FlowEdge = {
  from: string;
  to: string;
  /** Drawn dashed. The path an item takes when the automation isn't sure. */
  exception?: boolean;
};

export type Flow = {
  /**
   * Normal routes, handed out to items in turn. Several exist wherever work
   * genuinely enters or leaves in more than one place; a node may appear twice
   * in one route, which is how a loop is expressed.
   */
  routes: readonly (readonly string[])[];
  /** Where an item goes when it needs a person. */
  exceptionRoute: readonly string[];
  nodes: readonly FlowNode[];
  edges: readonly FlowEdge[];
  /** Work items that travel the graph. Every third takes the exception path. */
  items: readonly string[];
  /** The two things a person does today, before any of this is built. */
  manualSteps: readonly [string, string];
  /** Set where the job goes round more than once by hand, as chasing does. */
  manualLoop?: boolean;
  minutesByHandEach: number;
  minutesAutomatedEach: number;
  itemsPerWeek: number;
  /** Said under the stats once a run completes. */
  note: string;
};

/** Two checks running side by side, then a merge. */
const READ_AND_FILE: Flow = {
  nodes: [
    { id: "arrive", label: "Document arrives", kind: "trigger", col: 0, row: 1 },
    { id: "read", label: "Reads it", kind: "step", col: 1, row: 1 },
    { id: "match", label: "Matches the order", kind: "step", col: 2, row: 0 },
    { id: "dupe", label: "Checks it's not a repeat", kind: "step", col: 2, row: 2 },
    { id: "file", label: "Filed", kind: "outcome", col: 3, row: 1 },
    { id: "ask", label: "Asks you", kind: "human", col: 3, row: 2 },
  ],
  edges: [
    { from: "arrive", to: "read" },
    { from: "read", to: "match" },
    { from: "read", to: "dupe" },
    { from: "match", to: "file" },
    { from: "dupe", to: "file" },
    { from: "dupe", to: "ask", exception: true },
  ],
  routes: [
    ["arrive", "read", "match", "file"],
    ["arrive", "read", "dupe", "file"],
  ],
  exceptionRoute: ["arrive", "read", "dupe", "ask"],
  items: ["INV-4471", "PO-8812", "INV-4472", "DN-2201", "INV-4473", "PO-8814"],
  manualSteps: ["Someone opens it", "Someone types it in"],
  minutesByHandEach: 6,
  minutesAutomatedEach: 0,
  itemsPerWeek: 90,
  note: "Both checks run on every document. The ones it isn't sure about are the only ones you see.",
};

/** A lookup that goes down into your own material and comes back up. */
const ANSWER_QUESTIONS: Flow = {
  nodes: [
    { id: "asked", label: "Question comes in", kind: "trigger", col: 0, row: 1 },
    { id: "find", label: "Looks it up", kind: "step", col: 1, row: 1 },
    { id: "source", label: "Your own material", kind: "step", col: 1, row: 2 },
    { id: "draft", label: "Answers in your tone", kind: "step", col: 2, row: 1 },
    { id: "you", label: "Handed to you", kind: "human", col: 2, row: 2 },
    { id: "sent", label: "Replied", kind: "outcome", col: 3, row: 1 },
  ],
  edges: [
    { from: "asked", to: "find" },
    { from: "find", to: "source" },
    { from: "source", to: "find" },
    { from: "find", to: "draft" },
    { from: "draft", to: "sent" },
    { from: "find", to: "you", exception: true },
  ],
  routes: [["asked", "find", "source", "find", "draft", "sent"]],
  exceptionRoute: ["asked", "find", "you"],
  items: [
    "Opening hours?",
    "Do you deliver?",
    "Call-out fee?",
    "Warranty length?",
    "Do you do Sundays?",
    "Can you quote?",
  ],
  manualSteps: ["Someone reads it", "Someone writes the same reply"],
  minutesByHandEach: 4,
  minutesAutomatedEach: 0,
  itemsPerWeek: 120,
  note: "Every answer goes down into your own material and back. When it isn't there, it says so instead of guessing.",
};

/** A loop: it goes round again until someone actually answers. */
const FOLLOW_UP: Flow = {
  nodes: [
    { id: "enquiry", label: "Enquiry lands", kind: "trigger", col: 0, row: 1 },
    { id: "schedule", label: "On a schedule", kind: "step", col: 1, row: 1 },
    { id: "chase", label: "Chased, in your tone", kind: "step", col: 2, row: 1 },
    { id: "call", label: "Worth your call", kind: "human", col: 3, row: 0 },
    { id: "answer", label: "Yes or no", kind: "outcome", col: 3, row: 1 },
  ],
  edges: [
    { from: "enquiry", to: "schedule" },
    { from: "schedule", to: "chase" },
    { from: "chase", to: "schedule" },
    { from: "chase", to: "answer" },
    { from: "chase", to: "call", exception: true },
  ],
  routes: [["enquiry", "schedule", "chase", "schedule", "chase", "answer"]],
  exceptionRoute: ["enquiry", "schedule", "chase", "call"],
  items: ["Alder Rd", "Ward St", "Kemp & Sons", "Riverside", "Milton Yard", "Eastbank"],
  manualSteps: ["Someone remembers", "Someone writes the chaser"],
  manualLoop: true,
  minutesByHandEach: 9,
  minutesAutomatedEach: 1,
  itemsPerWeek: 40,
  note: "Watch it go round: chased, and chased again. It stops the moment someone replies, and hands you the ones worth a call.",
};

/** Three sources pulled together into one sheet. */
const WEEKLY_REPORT: Flow = {
  nodes: [
    { id: "till", label: "Till takings", kind: "trigger", col: 0, row: 0 },
    { id: "hours", label: "Timesheets", kind: "trigger", col: 0, row: 1 },
    { id: "bank", label: "Bank feed", kind: "trigger", col: 0, row: 2 },
    { id: "gather", label: "Gathers them overnight", kind: "step", col: 1, row: 1 },
    { id: "build", label: "Builds the sheet", kind: "step", col: 2, row: 1 },
    { id: "inbox", label: "In your inbox", kind: "outcome", col: 3, row: 1 },
    { id: "odd", label: "Flags anything odd", kind: "human", col: 3, row: 2 },
  ],
  edges: [
    { from: "till", to: "gather" },
    { from: "hours", to: "gather" },
    { from: "bank", to: "gather" },
    { from: "gather", to: "build" },
    { from: "build", to: "inbox" },
    { from: "build", to: "odd", exception: true },
  ],
  routes: [
    ["till", "gather", "build", "inbox"],
    ["hours", "gather", "build", "inbox"],
    ["bank", "gather", "build", "inbox"],
  ],
  exceptionRoute: ["hours", "gather", "build", "odd"],
  items: ["Till takings", "Timesheets", "Bank feed", "Card takings", "Overtime", "Supplier spend"],
  manualSteps: ["Someone pulls the numbers", "Someone rebuilds the sheet"],
  minutesByHandEach: 55,
  minutesAutomatedEach: 4,
  itemsPerWeek: 2,
  note: "Three places, one sheet, same shape every week — so you read it in a minute instead of rebuilding it in an hour.",
};

/** One arrival fanning out into three ways of getting hold of you. */
const A_REAL_SITE: Flow = {
  nodes: [
    { id: "land", label: "Someone lands on it", kind: "trigger", col: 0, row: 1 },
    { id: "find", label: "Finds what they need", kind: "step", col: 1, row: 1 },
    { id: "gone", label: "Couldn't find it, left", kind: "human", col: 1, row: 2 },
    { id: "book", label: "Books a slot", kind: "step", col: 2, row: 0 },
    { id: "enquire", label: "Sends an enquiry", kind: "step", col: 2, row: 1 },
    { id: "ring", label: "Rings you", kind: "step", col: 2, row: 2 },
    { id: "you", label: "Straight to you", kind: "outcome", col: 3, row: 1 },
  ],
  edges: [
    { from: "land", to: "find" },
    { from: "find", to: "book" },
    { from: "find", to: "enquire" },
    { from: "find", to: "ring" },
    { from: "book", to: "you" },
    { from: "enquire", to: "you" },
    { from: "ring", to: "you" },
    { from: "find", to: "gone", exception: true },
  ],
  routes: [
    ["land", "find", "book", "you"],
    ["land", "find", "enquire", "you"],
    ["land", "find", "ring", "you"],
  ],
  exceptionRoute: ["land", "find", "gone"],
  items: ["Phone · Ward St", "Desktop", "Phone · Riverside", "Tablet", "Phone · Milton", "Desktop"],
  manualSteps: ["They ring instead", "Someone takes a message twice"],
  minutesByHandEach: 12,
  minutesAutomatedEach: 1,
  itemsPerWeek: 15,
  note: "Three ways in, all landing in the same place. The dashed one is the visitor who couldn't find it and left — that's the one costing you money.",
};

/** Indexed to match `problems` in problems.ts, one flow per problem. */
export const flows: readonly Flow[] = [
  READ_AND_FILE,
  ANSWER_QUESTIONS,
  FOLLOW_UP,
  WEEKLY_REPORT,
  A_REAL_SITE,
];
