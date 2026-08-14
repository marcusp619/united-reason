export const categories = ["All", "Automation", "AI", "Websites"] as const;
export type Category = (typeof categories)[number];

export type Post = {
  slug: string;
  cat: Exclude<Category, "All">;
  title: string;
  read: string;
};

export const featured = {
  cat: "Automation",
  title: "The five tasks I'd automate first in any small business",
  excerpt:
    "None of them are clever. All of them are being done by hand somewhere in your business right now, and all five pay for themselves inside a month.",
  read: "6 min read",
  date: "August 2026",
} as const;

export const posts: readonly Post[] = [
  {
    slug: "three-hours-a-week",
    cat: "Automation",
    title: "Three hours a week, back — the boring maths",
    read: "3 min",
  },
  {
    slug: "do-you-need-an-ai-bot",
    cat: "AI",
    title: "Do you actually need an AI bot?",
    read: "4 min",
  },
  {
    slug: "what-a-website-should-cost",
    cat: "Websites",
    title: "What a website should cost in 2026",
    read: "5 min",
  },
  {
    slug: "the-spreadsheet",
    cat: "Automation",
    title: "The spreadsheet everyone's afraid to touch",
    read: "7 min",
  },
  {
    slug: "stop-an-assistant-making-things-up",
    cat: "AI",
    title: "How I stop an assistant making things up",
    read: "6 min",
  },
];
