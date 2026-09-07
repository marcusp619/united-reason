/**
 * Scripts for the demos that run on the site.
 *
 * These are scripted, not model-backed, and the copy says so wherever one
 * appears. They live here rather than inside the components for the same
 * reason every other string does: the words are content, and content is
 * reviewed, not buried in JSX.
 */

export type DemoTurn = { role: "user" | "assistant"; text: string };

/** One scripted answer, chosen by how many of its keywords a question hits. */
export type DemoAnswer = {
  keywords: readonly string[];
  answer: string;
};

export type AssistantScript = {
  title: string;
  placeholder: string;
  seed: readonly DemoTurn[];
  answers: readonly DemoAnswer[];
  /** Said when nothing matches. Admitting ignorance is the feature. */
  fallback: string;
};

/**
 * The assistant on the AI assistants page: it answers about this practice, and
 * is open about being a script rather than the real thing.
 */
export const unitedReasonAssistant: AssistantScript = {
  title: "Ask UnitedReason",
  placeholder: "Ask it something",
  seed: [
    { role: "user", text: "Do you work with businesses in the trades?" },
    {
      role: "assistant",
      text: "Yes. Plumbers, electricians and small building firms are most of the automation work. Usually it's quoting and job scheduling. Want me to book you a call about it?",
    },
  ],
  answers: [
    {
      keywords: ["cost", "price", "much", "expensive", "budget", "charge", "rate"],
      answer:
        "Websites start at $4,000 and most land between $4,000 and $12,000. Automating a single workflow starts around $2,500. You get one fixed number in writing before you commit to anything.",
    },
    {
      keywords: ["long", "time", "when", "timeline", "fast", "quick", "weeks"],
      answer:
        "Automations are usually 2–4 weeks, assistants 2–5, sites 3–8. You'd get a date in writing with the price, and a short demo every week so nothing is a surprise at the end.",
    },
    {
      keywords: ["own", "owns", "ownership", "mine", "keep", "code", "lock"],
      answer:
        "You do. Code, accounts, data, all handed over at the end. There's no lock-in, and nothing stops working if you stop talking to me.",
    },
    {
      keywords: ["who", "team", "you", "agency", "many", "people"],
      answer:
        "Just me, start to finish. You talk to the person building it. There's no account manager relaying things to a developer you never meet.",
    },
    {
      keywords: ["wrong", "break", "broken", "fail", "support", "after", "maintain"],
      answer:
        "You see it weekly, so you'd know long before the end. If it doesn't do what the scope says, I fix it at no charge. After handover I stay on the end of an email, and most people need me about twice a year.",
    },
  ],
  fallback:
    "That one isn't in the handful of answers I've been given. This is a scripted demo rather than the real assistant. The real one reads your own material and would know. Book a call and I'll show you one trained on your site.",
};

/**
 * The FAQ assistant on the examples page, standing in for a plumbing firm.
 * Its whole job is to answer from a price list and refuse to invent anything —
 * which is what the surrounding copy invites a visitor to test.
 */
export const plumbingAssistant: AssistantScript = {
  title: "Northgate Plumbing · customer FAQ",
  placeholder: "Ask about prices, hours or areas",
  seed: [
    { role: "user", text: "Do you deliver to Riverside?" },
    {
      role: "assistant",
      text: "Yes. Tuesdays and Fridays, and delivery is free on orders over $200.",
    },
  ],
  answers: [
    {
      keywords: ["callout", "call", "out", "fee", "visit", "come", "attend"],
      answer:
        "The standard call-out is $95 for the first hour and $70 an hour after that, charged in half-hours. That covers the visit and the diagnosis. Parts are quoted separately before we fit anything.",
    },
    {
      keywords: ["emergency", "urgent", "night", "weekend", "sunday", "holiday", "hours"],
      answer:
        "Emergency call-outs are $150 for the first hour, evenings, weekends and bank holidays. We aim to be with you inside two hours inside our normal service area.",
    },
    {
      keywords: ["open", "opening", "time", "times", "when", "monday", "saturday"],
      answer:
        "The office is open Monday to Friday, 7am to 5pm, and Saturday 8am to noon. Emergency cover runs outside those hours on the same number.",
    },
    {
      keywords: ["boiler", "heating", "water", "radiator", "service", "annual"],
      answer:
        "A standard boiler service is $110 and takes about an hour. If it turns into a repair we'll tell you the price before starting, and the service fee comes off the repair.",
    },
    {
      keywords: ["area", "areas", "where", "cover", "travel", "riverside", "deliver"],
      answer:
        "We cover Riverside, Eastbank, Milton and everything inside the ring road as standard. Further out is fine but adds a $40 travel charge.",
    },
    {
      keywords: ["pay", "payment", "card", "invoice", "cash", "account", "terms"],
      answer:
        "Card or bank transfer on the day for one-off jobs. Account customers are invoiced monthly on 30-day terms. We don't take cash.",
    },
    {
      keywords: ["guarantee", "warranty", "guaranteed", "covered", "insurance"],
      answer:
        "Workmanship is guaranteed for 12 months. Parts carry whatever the manufacturer gives, usually one to two years, and we register that for you.",
    },
  ],
  fallback:
    "I don't have that in the price list I was given, so I'd rather not guess at it. I've noted the question for the office and someone will come back to you.",
};

/** One step of a scripted run. `ms` is how long it holds before the next. */
export type RunStep = {
  n: string;
  label: string;
  detail: string;
  ms: number;
};

export type ScriptedRun = {
  title: string;
  caption: string;
  steps: readonly RunStep[];
  /** Shown once the run finishes. */
  done: string;
};

/**
 * The invoice automation, performed. Same run the examples page describes in
 * prose — an invoice arrives and reaches the ledger without anyone touching it.
 */
export const invoiceRun: ScriptedRun = {
  title: "Invoice inbox → ledger",
  caption: "A scripted walkthrough with stand-in figures, not a recording of a live run.",
  steps: [
    {
      n: "01",
      label: "Email arrives",
      detail: "From supplies@northgate.co · attachment NG-4471.pdf · 214 KB",
      ms: 900,
    },
    {
      n: "02",
      label: "Read the document",
      detail: "Supplier: Northgate Supplies · Total: $1,284.00 · Terms: 30 days",
      ms: 1100,
    },
    {
      n: "03",
      label: "Check it against the books",
      detail: "Matched purchase order #8812 · amounts agree · not a duplicate",
      ms: 1100,
    },
    {
      n: "04",
      label: "File the row",
      detail: "Written to Ledger 2026 · row 218 · flagged for Friday's payment run",
      ms: 900,
    },
  ],
  done: "Four seconds. Nobody opened the attachment, and nobody typed the total.",
};
