export const categories = ["All", "Automation", "AI", "Websites"] as const;
export type Category = (typeof categories)[number];

export type Post = {
  slug: string;
  cat: Exclude<Category, "All">;
  title: string;
  read: string;
  /** One sentence. Doubles as the page's meta description, so it has to stand
   *  alone in a search result, not lead into the body. */
  excerpt: string;
};

/**
 * The card at the top of /notes. It carries a slug so it links somewhere —
 * previously it rendered a title, excerpt and read time for a post that had
 * no route at all.
 */
export const featured = {
  slug: "five-tasks-to-automate-first",
  cat: "Automation",
  title: "The five tasks I'd automate first in any small business",
  excerpt:
    "None of them are clever. All of them are being done by hand somewhere in your business right now, and the arithmetic on whether they're worth fixing takes about two minutes.",
  read: "4 min read",
  date: "August 2026",
} as const;

export const posts: readonly Post[] = [
  {
    slug: featured.slug,
    cat: featured.cat,
    title: featured.title,
    read: "4 min",
    excerpt:
      "The same five jobs are being done by hand in almost every small business. None of them need AI, a migration or a consultant with a deck.",
  },
  {
    slug: "three-hours-a-week",
    cat: "Automation",
    title: "Three hours a week, back: the boring math",
    read: "3 min",
    excerpt:
      "Whether automating something is worth it is arithmetic, and it takes two minutes to do yourself. Four numbers, multiplied out, before you talk to anyone.",
  },
  {
    slug: "do-you-need-an-ai-bot",
    cat: "AI",
    title: "Do you actually need an AI bot?",
    read: "3 min",
    excerpt:
      "Probably not, and I build them for a living. How to tell whether an assistant solves your problem or is just the thing every agency is selling.",
  },
  {
    slug: "what-a-website-should-cost",
    cat: "Websites",
    title: "What a website should cost in 2026",
    read: "5 min",
    excerpt:
      "Ask five people and you get five honest numbers between two hundred dollars and fifty thousand. Here is the actual landscape, and where I sit in it.",
  },
  {
    slug: "the-spreadsheet",
    cat: "Automation",
    title: "The spreadsheet everyone's afraid to touch",
    read: "4 min",
    excerpt:
      "The one that runs something important, that one person understands, that everyone else closes without saving. I am not going to tell you to throw it away.",
  },
  {
    slug: "stop-an-assistant-making-things-up",
    cat: "AI",
    title: "How I stop an assistant making things up",
    read: "4 min",
    excerpt:
      "The right question is what happens when it gets something wrong. Not if. When. The answer is that you design for being wrong from the start.",
  },
];
