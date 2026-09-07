import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The house style, enforced rather than remembered.
 *
 * Em dashes were swept out of every visitor-facing string once. Without a test
 * they come back one paragraph at a time, because each individual one looks
 * fine in isolation. Comments are exempt: nobody reads those on the site.
 */

const SRC = join(import.meta.dirname, "..");
const EM_DASH = /—|&mdash;/;

/** Block comments, line comments, and the JSX `{/* … *\/}` form. */
function withoutComments(source: string): string {
  return source
    .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^[ \t]*\/\/.*$/gm, "");
}

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    if (/\.test\.tsx?$/.test(name)) return [];
    return /\.(ts|tsx|mdx)$/.test(name) ? [path] : [];
  });
}

describe("house style", () => {
  const files = sourceFiles(SRC);

  it("has files to check, so a broken walk can't pass silently", () => {
    expect(files.length).toBeGreaterThan(40);
  });

  it.each(files.map((path) => [path.slice(SRC.length + 1), path] as const))(
    "%s writes no em dashes outside comments",
    (_name, path) => {
      const offending = withoutComments(readFileSync(path, "utf8"))
        .split("\n")
        .map((line, i) => [i + 1, line] as const)
        .filter(([, line]) => EM_DASH.test(line))
        .map(([n, line]) => `  line ${n}: ${line.trim()}`);

      expect(offending.join("\n"), `em dash in copy:\n${offending.join("\n")}`).toBe("");
    },
  );
});
