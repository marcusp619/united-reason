import { MessageSquare, Workflow } from "lucide-react";

import { Kicker } from "@/components/primitives";
import { AssistantDemo } from "@/components/sections/assistant-demo";
import { WalkthroughPlayer } from "@/components/sections/walkthrough-player";
import { invoiceRun, plumbingAssistant } from "@/content/demos";

/**
 * The two things a visitor can actually operate: a run stepped through one
 * stage at a time, and an assistant that will admit when it doesn't know.
 *
 * The showcase above them draws the shape of a job; these are two instances of
 * one, small enough to poke at and try to break.
 */
export function DemoPair() {
  return (
    <div data-reveal className="rule-draw grid md:grid-cols-2">
      <article className="rule-draw-y-end border-b-2 border-[var(--color-divider)] md:border-b-0">
        <div className="bg-brand-100 flex flex-col justify-center gap-5.5 border-b-2 border-[var(--color-divider)] px-5 py-8 md:px-10">
          <WalkthroughPlayer run={invoiceRun} />
          <div className="flex items-center gap-3 border-t-2 border-[var(--color-divider)] pt-4">
            <Workflow size={26} strokeWidth={2} className="text-brand" />
            <span className="text-[13px] font-bold tracking-[0.14em] uppercase">
              Every step, in order
            </span>
          </div>
        </div>
        <div className="px-5 py-7 md:px-10">
          <Kicker as="h2" className="mb-3">
            Walkthrough
          </Kicker>
          <h3 className="m-0 mb-2.5 text-[22px] md:text-[28px]">
            Invoice inbox → spreadsheet, untouched by human hands
          </h3>
          <p className="text-muted m-0 text-[15px] leading-[1.55]">
            A PDF arrives, gets read, checked and filed. The kind of thing that takes an afternoon,
            on tools most businesses are already paying for.
          </p>
        </div>
      </article>

      <article>
        <div className="flex flex-col justify-center gap-3 border-b-2 border-[var(--color-divider)] px-5 py-8 md:px-10">
          <AssistantDemo script={plumbingAssistant} />
          <div className="mt-1.5 flex items-center gap-2.5 border-t-2 border-[var(--color-divider)] pt-3.5">
            <MessageSquare size={22} strokeWidth={2} className="text-brand" />
            <span className="text-xs font-bold tracking-[0.14em] uppercase">
              Answers from your own material
            </span>
          </div>
        </div>
        <div className="px-5 py-7 md:px-10">
          <Kicker as="h2" className="mb-3">
            Demo &middot; try it
          </Kicker>
          <h3 className="m-0 mb-2.5 text-[22px] md:text-[28px]">
            An FAQ assistant answering from a price list
          </h3>
          <p className="text-muted m-0 text-[15px] leading-[1.55]">
            A stand-in firm with a stand-in price list, so nothing here is anyone&rsquo;s real
            pricing. Ask it something the list doesn&rsquo;t cover &mdash; admitting that is the
            part worth testing.
          </p>
        </div>
      </article>
    </div>
  );
}
