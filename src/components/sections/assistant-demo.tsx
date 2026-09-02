"use client";

import { useEffect, useId, useState } from "react";

import { cn } from "@/lib/utils";
import type { AssistantScript, DemoTurn } from "@/content/demos";

type Status = "idle" | "thinking" | "typing";

/** The pause before a reply begins. Long enough to read as thought. */
const THINKING_MS = 600;
const TYPE_STEP_MS = 16;
const CHARS_PER_STEP = 2;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Picks the scripted answer sharing the most keywords with the question.
 *
 * Deliberately dumb: a real assistant retrieves from the client's own
 * material, and pretending otherwise here would be the same lie as a
 * hardcoded transcript. Nothing matching returns the fallback, which says it
 * doesn't know — the behaviour the surrounding copy invites people to test.
 */
export function findAnswer(question: string, script: AssistantScript): string {
  const asked: readonly string[] = question.toLowerCase().match(/[a-z']+/g) ?? [];
  let bestAnswer = script.fallback;
  let bestScore = 0;

  for (const candidate of script.answers) {
    const score = candidate.keywords.filter((keyword) => asked.includes(keyword)).length;
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = candidate.answer;
    }
  }

  return bestAnswer;
}

/**
 * A scripted assistant that thinks, then types.
 *
 * The typing is not decoration. Every real assistant on earth types, so a
 * canned string appearing whole reads as a picture of a product rather than a
 * product — which is exactly what this panel used to be.
 */
export function AssistantDemo({ script }: { script: AssistantScript }) {
  const inputId = useId();
  const [turns, setTurns] = useState<readonly DemoTurn[]>(script.seed);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [pendingReply, setPendingReply] = useState("");
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    if (status !== "thinking") return;
    const reduced = prefersReducedMotion();
    const id = window.setTimeout(
      () => {
        setTurns((prev) => [...prev, { role: "assistant", text: pendingReply }]);
        setTypedCount(reduced ? pendingReply.length : 0);
        setStatus("typing");
      },
      reduced ? 0 : THINKING_MS,
    );
    return () => window.clearTimeout(id);
  }, [status, pendingReply]);

  useEffect(() => {
    if (status !== "typing") return;
    const full = turns[turns.length - 1]?.text.length ?? 0;
    // Both the advance and the finish happen in the timer, never in the effect
    // body: a synchronous setState here would cascade a render per keystroke.
    const id = window.setTimeout(() => {
      const next = typedCount + CHARS_PER_STEP;
      if (next >= full) {
        setTypedCount(full);
        setStatus("idle");
        return;
      }
      setTypedCount(next);
    }, TYPE_STEP_MS);
    return () => window.clearTimeout(id);
  }, [status, typedCount, turns]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const question = draft.trim();
    if (!question || status !== "idle") return;
    setTurns((prev) => [...prev, { role: "user", text: question }]);
    setPendingReply(findAnswer(question, script));
    setDraft("");
    setStatus("thinking");
  }

  const lastIndex = turns.length - 1;

  return (
    <div className="border-2 border-[var(--color-divider)] bg-[var(--color-surface)]">
      <div className="border-b-2 border-[var(--color-divider)] px-4.5 py-3.5 text-[13px] tracking-[0.1em] uppercase">
        {script.title}
      </div>

      {/* aria-busy holds the announcement until the reply has finished
          arriving — a live region fed two characters at a time is unusable. */}
      <div
        className="flex max-h-[340px] flex-col gap-3.5 overflow-y-auto px-4.5 py-5.5"
        aria-live="polite"
        aria-busy={status !== "idle"}
      >
        {turns.map((turn, i) => {
          const isStreaming = status === "typing" && i === lastIndex;
          return (
            <div
              key={i}
              className={cn(
                "px-4 py-3 text-[15px] leading-[1.5]",
                isStreaming && "caret",
                turn.role === "user"
                  ? "bg-ink text-ground max-w-[70%] self-end"
                  : "bg-ground max-w-[85%] self-start border border-[var(--color-divider)]",
              )}
            >
              {isStreaming ? turn.text.slice(0, typedCount) : turn.text}
            </div>
          );
        })}

        {status === "thinking" && (
          <div
            className="bg-ground flex max-w-[85%] items-center gap-1.5 self-start border border-[var(--color-divider)] px-4 py-4"
            aria-label="Thinking"
          >
            <span className="thinking-dot" />
            <span className="thinking-dot" />
            <span className="thinking-dot" />
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2.5 border-t-2 border-[var(--color-divider)] px-4.5 py-3.5"
      >
        <label htmlFor={inputId} className="sr-only">
          Ask the assistant something
        </label>
        <input
          id={inputId}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={script.placeholder}
          className="caret-brand focus-visible:border-brand min-h-9 w-full border border-[var(--color-divider)] bg-[var(--color-surface)] px-2.5 py-1.5 text-sm"
        />
        <button
          type="submit"
          disabled={status !== "idle"}
          className="bg-brand font-heading text-ground shrink-0 cursor-pointer px-4 py-2 text-sm font-extrabold hover:bg-[var(--color-accent-600)] disabled:cursor-default disabled:opacity-45"
        >
          Send
        </button>
      </form>
    </div>
  );
}
