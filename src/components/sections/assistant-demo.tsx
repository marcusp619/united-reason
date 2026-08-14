"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type Turn = { role: "user" | "assistant"; text: string };

const SEED: Turn[] = [
  { role: "user", text: "Do you work with businesses in the trades?" },
  {
    role: "assistant",
    text: "Yes. Plumbers, electricians and small building firms are most of the automation work. Usually it's quoting and job scheduling. Want me to book you a call about it?",
  },
];

/**
 * The "try it" panel on the AI assistants page.
 *
 * Ships as a scripted demo: it echoes a fixed holding reply rather than
 * pretending to be a live model. Swap `respond()` for a call to a server
 * action + your model of choice when the real assistant exists.
 */
export function AssistantDemo() {
  const [turns, setTurns] = useState<Turn[]>(SEED);
  const [draft, setDraft] = useState("");

  function respond(question: string) {
    setTurns((prev) => [
      ...prev,
      { role: "user", text: question },
      {
        role: "assistant",
        text: "This demo only carries a couple of scripted answers. The real one reads your own material. Book a call and I'll show you a live one trained on your site.",
      },
    ]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = draft.trim();
    if (!q) return;
    respond(q);
    setDraft("");
  }

  return (
    <div className="border-2 border-[var(--color-divider)] bg-[var(--color-surface)]">
      <div className="border-b-2 border-[var(--color-divider)] px-4.5 py-3.5 text-[13px] tracking-[0.1em] uppercase">
        Ask {"UnitedReason"}
      </div>

      <div className="flex flex-col gap-3.5 px-4.5 py-5.5" aria-live="polite">
        {turns.map((t, i) => (
          <div
            key={i}
            className={cn(
              "px-4 py-3 text-[15px] leading-[1.5]",
              t.role === "user"
                ? "bg-ink text-ground max-w-[70%] self-end"
                : "bg-ground max-w-[80%] self-start border border-[var(--color-divider)]",
            )}
          >
            {t.text}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2.5 border-t-2 border-[var(--color-divider)] px-4.5 py-3.5"
      >
        <label htmlFor="assistant-q" className="sr-only">
          Ask the assistant something
        </label>
        <input
          id="assistant-q"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask it something"
          className="caret-brand focus-visible:border-brand min-h-9 w-full border border-[var(--color-divider)] bg-[var(--color-surface)] px-2.5 py-1.5 text-sm"
        />
        <button
          type="submit"
          className="bg-brand font-heading text-ground shrink-0 cursor-pointer px-4 py-2 text-sm font-extrabold hover:bg-[var(--color-accent-600)]"
        >
          Send
        </button>
      </form>
    </div>
  );
}
