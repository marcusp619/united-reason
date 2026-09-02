import { describe, expect, it } from "vitest";

import { plumbingAssistant, unitedReasonAssistant } from "@/content/demos";
import { findAnswer } from "./assistant-demo";

const scripts = [
  { name: "unitedReasonAssistant", script: unitedReasonAssistant },
  { name: "plumbingAssistant", script: plumbingAssistant },
];

describe("scripted assistant", () => {
  it("answers a question that hits a keyword", () => {
    const reply = findAnswer("What does a call out cost?", plumbingAssistant);
    expect(reply).toContain("$95");
  });

  it("admits it doesn't know rather than inventing an answer", () => {
    const reply = findAnswer("Can you rewire a hot tub in Peru?", plumbingAssistant);
    expect(reply).toBe(plumbingAssistant.fallback);
  });

  it("prefers the answer sharing the most keywords", () => {
    const reply = findAnswer("what are your opening times on saturday", plumbingAssistant);
    expect(reply).toContain("Saturday");
  });

  it("is unbothered by punctuation and capitals", () => {
    const withNoise = findAnswer("GUARANTEE?!", plumbingAssistant);
    const plain = findAnswer("guarantee", plumbingAssistant);
    expect(withNoise).toBe(plain);
  });

  /*
   * The tokenizer lowercases and splits on /[a-z']+/, so a keyword carrying a
   * capital, a digit, a space or a hyphen can never be matched by anything a
   * visitor types — it would be dead weight that silently never fires.
   */
  it.each(scripts)("keeps every keyword in $name reachable by the tokenizer", ({ script }) => {
    for (const answer of script.answers) {
      for (const keyword of answer.keywords) {
        expect(keyword, `"${keyword}" can never be matched`).toMatch(/^[a-z']+$/);
      }
    }
  });

  it.each(scripts)("gives $name a fallback and something to say", ({ script }) => {
    expect(script.fallback.length).toBeGreaterThan(0);
    expect(script.answers.length).toBeGreaterThan(0);
    expect(script.seed.length).toBeGreaterThan(0);
  });
});
