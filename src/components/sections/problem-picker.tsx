"use client";

import { useState } from "react";

import { Button } from "@/components/primitives";
import { problems } from "@/content/problems";
import { cta } from "@/content/site";
import { cn } from "@/lib/utils";

const jobsToday = [
  { label: "Cut list · Ward St", status: "Done" },
  { label: "Invoice 1182", status: "Sent" },
  { label: "Quote · Alder Rd", status: "Waiting" },
  { label: "Site visit 14:30", status: "Next" },
];

/**
 * Homepage variant B's interactive core: pick a problem, the panel below
 * swaps. Client-only because it's the one genuinely stateful thing on the page.
 */
export function ProblemPicker() {
  const [selected, setSelected] = useState(1);
  const sel = problems[selected];

  return (
    <>
      <div
        className="border-t-2 border-[var(--color-divider)]"
        role="tablist"
        aria-label="Common problems"
      >
        {problems.map((p, i) => {
          const on = i === selected;
          return (
            <button
              key={p.title}
              type="button"
              role="tab"
              id={`problem-tab-${i}`}
              aria-selected={on}
              aria-controls="problem-panel"
              onClick={() => setSelected(i)}
              className={cn(
                "flex w-full cursor-pointer items-center gap-5 border-b-2 border-[var(--color-divider)] px-5 py-5 text-left transition-colors md:gap-7 md:px-16 md:py-6.5",
                on ? "bg-brand text-ground" : "bg-transparent text-ink hover:bg-brand-100",
              )}
            >
              <span
                className={cn(
                  "w-8.5 shrink-0 text-[11px] tracking-[0.16em]",
                  on ? "text-ground" : "text-brand",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-heading text-[20px] font-extrabold tracking-[-0.015em] md:text-[28px]">
                {p.title}
              </span>
              <span aria-hidden="true" className={cn("text-2xl", on ? "opacity-100" : "opacity-35")}>
                →
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="problem-panel"
        role="tabpanel"
        aria-labelledby={`problem-tab-${selected}`}
        className="grid border-b-2 border-[var(--color-divider)] bg-brand-100 md:grid-cols-2"
      >
        <div className="px-5 py-8 md:py-12 md:pr-11 md:pl-16">
          <p className="m-0 mb-4.5 text-[11px] tracking-[0.16em] uppercase text-brand-700">
            What I&rsquo;d build for that
          </p>
          <h2 className="m-0 mb-4 max-w-[18ch] text-[26px] md:text-[34px]">{sel.build}</h2>
          <p className="m-0 mb-6 max-w-[44ch] text-base leading-[1.55]">{sel.blurb}</p>
          <div className="flex flex-wrap items-center gap-2.5">
            <Button href={cta.href}>Book a call about this</Button>
            <span className="text-sm text-muted">{sel.timeline} · fixed quote</span>
          </div>
        </div>

        <div className="flex min-h-[300px] items-center border-t-2 border-[var(--color-divider)] p-5 md:border-t-0 md:border-l-2 md:p-10">
          <div className="w-full border-2 border-[var(--color-divider)] bg-ground">
            <div className="flex items-center justify-between border-b-2 border-[var(--color-divider)] bg-brand px-3.5 py-3 text-ground">
              <span className="text-[11px] font-bold tracking-[0.16em] uppercase">Jobs today</span>
              <span className="text-[11px] tracking-[0.16em]">
                {String(jobsToday.length).padStart(2, "0")}
              </span>
            </div>
            {jobsToday.map((job, i) => (
              <div
                key={job.label}
                className={cn(
                  "flex justify-between px-3.5 py-3 text-[13px]",
                  i > 0 && "border-t-2 border-[var(--color-divider)]",
                )}
              >
                <span>{job.label}</span>
                <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-brand-700">
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
