import { Fragment } from "react";

/**
 * The boxed "Inbox → Read → Match → Books" run used on the home and examples
 * pages. Last step is the accent fill — it's the outcome.
 *
 * `data-sequence` hands the whole run to the motion runtime, which stamps an
 * index onto every box and arrow. Because they are siblings, that single index
 * gives the alternating box-arrow-box rhythm without any per-element timing
 * here. It executes rather than depicts: the automation promise, performed.
 */
export function PipelineDiagram({ steps }: { steps: readonly string[] }) {
  return (
    <div data-sequence className="flex flex-wrap items-center gap-2.5">
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        return (
          <Fragment key={step}>
            <div
              data-step
              data-outcome={last ? "" : undefined}
              className={`border-2 border-[var(--color-divider)] px-3 py-2.5 text-xs font-bold tracking-[0.1em] whitespace-nowrap uppercase ${
                last ? "bg-brand text-ground" : "bg-ground text-ink"
              }`}
            >
              {step}
            </div>
            {!last && (
              <svg
                data-arrow
                width="34"
                height="16"
                viewBox="0 0 34 16"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2"
                className="shrink-0"
                aria-hidden="true"
              >
                <path d="M0 8h30M24 2l6 6-6 6" />
              </svg>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
