export type Service = {
  slug: string;
  /**
   * The service's own page. Nullable because the href used to be hardcoded
   * inside the card, which sent two of the three services at a third one's
   * page — a service without a page links at the call instead.
   */
  detail: string | null;
  title: string;
  timeline: string;
  blurb: string;
  short: string;
  tags: readonly string[];
};

export const services: readonly Service[] = [
  {
    slug: "automation",
    detail: "/what-i-do/automation",
    title: "Automating the busywork",
    timeline: "Typically 2–4 weeks",
    blurb:
      "If a person is moving information from one screen to another, that's a job for a machine. I connect the things you already use so the work happens without anyone remembering to do it.",
    short:
      "The re-typing, the copying between systems, the Monday-morning spreadsheet. It runs itself from now on.",
    tags: ["Orders & invoices", "Follow-ups", "Weekly reports", "Data entry"],
  },
  {
    slug: "ai-assistants",
    detail: "/what-i-do/ai-assistants",
    title: "AI assistants & bots",
    timeline: "Typically 2–5 weeks",
    blurb:
      "An assistant that knows your business rather than the internet: your prices, your policies, your opening hours. It answers customers, takes enquiries, or helps your staff find things quickly.",
    short:
      "An assistant that answers out of your own material instead of guessing from the internet.",
    tags: ["Customer Q&A", "Lead intake", "Internal helper", "Drafting replies"],
  },
  {
    slug: "websites",
    detail: "/what-i-do/websites",
    title: "Websites & small apps",
    timeline: "Typically 3–8 weeks",
    blurb:
      "A site that reads like you talk and loads on a phone in a car park. Or the small internal tool that finally replaces the spreadsheet everybody's afraid to touch.",
    short:
      "A site or a small internal tool that looks and works like the business you actually run.",
    tags: ["New site", "Booking", "Internal tools", "Rebuilds"],
  },
];

export const steps = [
  {
    n: "01",
    title: "A free 30-minute call",
    body: "You tell me what's slow or broken. I ask about how the work actually happens today, not how it's supposed to. You leave knowing whether it's worth doing.",
    when: "30 minutes",
  },
  {
    n: "02",
    title: "A written plan and one fixed price",
    body: "A short document: what I'll build, what it will and won't do, when it lands, and the price. No hourly rates and no change-request games.",
    when: "3 days later",
  },
  {
    n: "03",
    title: "I build it, and you see it every week",
    body: "A short demo every week, so nothing is a surprise at the end. You can steer it while it's cheap to steer.",
    when: "2–8 weeks",
  },
  {
    n: "04",
    title: "Handover, training, and I stay reachable",
    body: "I show your team how it works, hand over everything, and stay on the end of an email. Most people need me about twice a year after that.",
    when: "Ongoing",
  },
] as const;

export const faqs = [
  {
    q: "What does this usually cost?",
    a: "Websites start at $4,000 and most land between $4,000 and $12,000. Automating a single workflow starts around $2,500. You get one fixed number in writing before you commit to anything, and if a template would do the job I'll tell you that instead.",
  },
  {
    q: "What if it doesn't work?",
    a: "You see it weekly, so you'd know long before the end. If what I build doesn't do what the scope says, I fix it. That's not extra.",
  },
  {
    q: "Do I own it?",
    a: "Yes. Code, accounts and documentation, all in your name and on your systems. No hostage situations.",
  },
  {
    q: "You're one person. What if you disappear?",
    a: "Fair question. I build on ordinary, well-known tools and write things down so any competent developer can pick it up. I'll tell you exactly what's under the hood.",
  },
] as const;

/**
 * The three steps between a visitor and a number. Identical on every service
 * page, so it lives here rather than being retyped on each one.
 */
export const priceSteps = [
  { n: "Step 01", title: "A call", body: "Free, thirty minutes, this week if you like." },
  { n: "Step 02", title: "A written scope", body: "Three days later, in plain English." },
  { n: "Step 03", title: "One fixed price", body: "Yes or no. No pressure either way." },
] as const;
