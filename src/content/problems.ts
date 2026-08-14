/** The clickable problem list that drives homepage variant B (mockup 1b). */

export type Problem = {
  title: string;
  build: string;
  blurb: string;
  timeline: string;
};

export const problems: readonly Problem[] = [
  {
    title: "Re-typing orders, invoices or forms",
    build: "A quiet automation that reads the document and files it",
    blurb:
      "The paperwork arrives, gets read, checked against what you already have, and lands where it belongs. Nobody types anything twice.",
    timeline: "Usually 2–3 weeks",
  },
  {
    title: "Answering the same customer questions",
    build: "An assistant that answers from your own material",
    blurb:
      "Your prices, your policies, your opening hours. Answered the way you'd answer, at eleven at night, and handed to you when it isn't sure.",
    timeline: "Usually 2–3 weeks",
  },
  {
    title: "Chasing quotes, bookings and follow-ups",
    build: "A follow-up system that never forgets",
    blurb:
      "Every enquiry gets chased on schedule, in your tone, until someone says yes or no. Most businesses find money in this within two weeks.",
    timeline: "Usually 2–4 weeks",
  },
  {
    title: "Pulling numbers into a spreadsheet",
    build: "A report that builds itself every Monday",
    blurb:
      "The numbers you check each week, gathered overnight and waiting in your inbox. Same shape, same time, no one's morning spent on it.",
    timeline: "Usually 1–2 weeks",
  },
  {
    title: "My website. Honestly, it's embarrassing",
    build: "A site that looks like the business you actually run",
    blurb:
      "Fast on a phone, honest about what you do, and easy for you to change without ringing anyone. Bookings and enquiries built in.",
    timeline: "Usually 3–5 weeks",
  },
];
