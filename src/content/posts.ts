export const categories = ["All", "Automation", "AI", "Websites"] as const;
export type Category = (typeof categories)[number];

export type Post = {
  slug: string;
  cat: Exclude<Category, "All">;
  title: string;
  read: string;
  /**
   * One sentence. Doubles as the page's meta description, so it has to stand
   * alone in a search result rather than lead into the body.
   */
  excerpt: string;
  /**
   * ISO date. The one place a note's date is written — the MDX files used to
   * carry a `meta` block nothing imported, which is a second truth waiting to
   * disagree with this one. Drives the page, the index, the feed and the
   * sitemap's lastModified.
   */
  published: string;
};

/**
 * Newest first. The index, the feed and the featured card all read this order
 * rather than sorting their own way.
 */
export const posts: readonly Post[] = [
  {
    slug: "five-tasks-to-automate-first",
    cat: "Automation",
    title: "The five tasks I'd automate first in any small business",
    read: "4 min",
    excerpt:
      "The same five jobs are being done by hand in almost every small business. None of them need AI, a migration or a consultant with a deck.",
    published: "2026-08-14",
  },
  {
    slug: "three-hours-a-week",
    cat: "Automation",
    title: "Three hours a week, back: the boring math",
    read: "3 min",
    excerpt:
      "Whether automating something is worth it is arithmetic, and it takes two minutes to do yourself. Four numbers, multiplied out, before you talk to anyone.",
    published: "2026-08-14",
  },
  {
    slug: "do-you-need-an-ai-bot",
    cat: "AI",
    title: "Do you actually need an AI bot?",
    read: "3 min",
    excerpt:
      "Probably not, and I build them for a living. How to tell whether an assistant solves your problem or is just the thing every agency is selling.",
    published: "2026-08-14",
  },
  {
    slug: "what-a-website-should-cost",
    cat: "Websites",
    title: "What a website should cost in 2026",
    read: "5 min",
    excerpt:
      "Ask five people and you get five honest numbers between two hundred dollars and fifty thousand. Here is the actual landscape, and where I sit in it.",
    published: "2026-08-14",
  },
  {
    slug: "the-spreadsheet",
    cat: "Automation",
    title: "The spreadsheet everyone's afraid to touch",
    read: "4 min",
    excerpt:
      "The one that runs something important, that one person understands, that everyone else closes without saving. I am not going to tell you to throw it away.",
    published: "2026-08-14",
  },
  {
    slug: "stop-an-assistant-making-things-up",
    cat: "AI",
    title: "How I stop an assistant making things up",
    read: "4 min",
    excerpt:
      "The right question is what happens when it gets something wrong. Not if. When. The answer is that you design for being wrong from the start.",
    published: "2026-08-14",
  },
];

/**
 * The card at the top of /notes. The newest post, not a hand-kept copy of one
 * — the copy used to carry its own title, read time and date, in a different
 * format from the post it was standing in for.
 */
export const featured: Post = posts[0];

/** "14 August 2026". The site writes dates the way a person says them. */
export function formatPublished(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function postAt(slug: string): { post: Post; previous?: Post; next?: Post } | null {
  const at = posts.findIndex((post) => post.slug === slug);
  if (at < 0) return null;
  // Newest first, so the *next* one to read is the one below it in the list.
  return { post: posts[at], previous: posts[at - 1], next: posts[at + 1] };
}
