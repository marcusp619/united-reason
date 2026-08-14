import type { ComponentType } from "react";

/**
 * Slug → note body. A post appears here only once it has a real body.
 *
 * An explicit registry rather than a dynamic `import(\`./${slug}.mdx\`)`: the
 * template-literal form makes the bundler build a context over the whole
 * directory, which fails when it's empty and hides typos when it isn't. This
 * way an unwritten post simply isn't a key, and `/notes/[slug]` falls back to
 * the shell and stays noindexed until a body exists.
 */
export const noteBodies: Record<string, () => Promise<{ default: ComponentType }>> = {
  "five-tasks-to-automate-first": () => import("./five-tasks-to-automate-first.mdx"),
  "three-hours-a-week": () => import("./three-hours-a-week.mdx"),
  "do-you-need-an-ai-bot": () => import("./do-you-need-an-ai-bot.mdx"),
  "what-a-website-should-cost": () => import("./what-a-website-should-cost.mdx"),
  "the-spreadsheet": () => import("./the-spreadsheet.mdx"),
  "stop-an-assistant-making-things-up": () => import("./stop-an-assistant-making-things-up.mdx"),
};
