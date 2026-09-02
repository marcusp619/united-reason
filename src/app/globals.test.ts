import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * Contrast is a property of the tokens, so it is asserted against the tokens
 * rather than eyeballed in a browser. Every one of these failed at some point:
 * the primary button was 3.76:1 and .text-muted was 3.66:1, both under the
 * 4.5:1 that 13–16px text needs. Retuning the palette should fail here first.
 */

const AA_TEXT = 4.5;
/** 18.66px bold and above. Only the display type on an accent field qualifies. */
const AA_LARGE_TEXT = 3;

const css = readFileSync(join(import.meta.dirname, "globals.css"), "utf8");

type Rgb = { r: number; g: number; b: number };

function tokenHex(name: string): Rgb {
  const found = css.match(new RegExp(`${name}:\\s*(#[0-9a-f]{6})`, "i"));
  if (!found) throw new Error(`No hex value for ${name} in globals.css`);
  return hexToRgb(found[1]);
}

function hexToRgb(hex: string): Rgb {
  const n = Number.parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

/** What `color-mix(in srgb, ink <share>%, transparent)` resolves to over a ground. */
function mixOver(ink: Rgb, ground: Rgb, share: number): Rgb {
  const blend = (a: number, b: number) => Math.round(a * share + b * (1 - share));
  return { r: blend(ink.r, ground.r), g: blend(ink.g, ground.g), b: blend(ink.b, ground.b) };
}

function luminance({ r, g, b }: Rgb): number {
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(a: Rgb, b: Rgb): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function mutedShare(): number {
  const found = css.match(
    /\.text-muted\s*\{\s*color:\s*color-mix\(in srgb, var\(--color-text\) (\d+)%/,
  );
  if (!found) throw new Error("Could not read .text-muted's mix share from globals.css");
  return Number(found[1]) / 100;
}

describe("palette contrast", () => {
  const ground = tokenHex("--color-bg");
  const ink = tokenHex("--color-text");

  it("carries a button label at body size", () => {
    // Every primary action on the site: the header CTA, "Book a free call",
    // "Run it", "Send it", "Add me". Labels are 14px and 16px bold.
    expect(contrast(ground, tokenHex("--color-brand-700"))).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it("carries muted body copy", () => {
    expect(contrast(mixOver(ink, ground, mutedShare()), ground)).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it("carries display type on an accent field", () => {
    // The poster blocks and the UrMark panel. The bright accent stays here —
    // it only clears the bar because the type is display-sized.
    expect(contrast(ground, tokenHex("--color-accent"))).toBeGreaterThanOrEqual(AA_LARGE_TEXT);
  });

  it("keeps full ink well clear on the ground", () => {
    expect(contrast(ink, ground)).toBeGreaterThanOrEqual(AA_TEXT);
  });

  /*
   * The tokens passing is only half of it — the button has to actually use the
   * one that passes. This reads the fill straight out of the primitive, so
   * putting `bg-brand` back on the primary variant fails here.
   */
  it("fills the primary button from a token that carries its label", () => {
    const primitives = readFileSync(
      join(import.meta.dirname, "..", "components", "primitives.tsx"),
      "utf8",
    );
    const primary = primitives.match(/primary:\s*\n?\s*"([^"]+)"/);
    if (!primary) throw new Error("Could not find the Button primary variant");

    const fill = primary[1].match(/\bbg-(brand[\w-]*)/);
    if (!fill) throw new Error(`No brand fill in the primary variant: ${primary[1]}`);

    expect(contrast(ground, tokenHex(`--color-${fill[1]}`))).toBeGreaterThanOrEqual(AA_TEXT);
  });
});
