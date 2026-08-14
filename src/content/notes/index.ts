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
  "what-a-website-should-cost": () => import("./what-a-website-should-cost.mdx"),
};
