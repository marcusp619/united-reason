import type { Metadata } from "next";

import { Band, Button, Kicker, PosterCta } from "@/components/primitives";
import { GettingAPrice } from "@/components/sections/getting-a-price";
import { ServiceLimits } from "@/components/sections/service-limits";
import { ServiceUses, type ServiceUse } from "@/components/sections/service-uses";
import { WalkthroughPlayer } from "@/components/sections/walkthrough-player";
import { invoiceRun } from "@/content/demos";
import { cta } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = {
  ...pageMetadata("/what-i-do/automation"),
  title: "Automating the busywork",
  description:
    "If a person is moving information from one screen to another, that's a job for a machine. The re-typing, the copying between systems, the Monday spreadsheet.",
};

const uses: readonly ServiceUse[] = [
  {
    title: "Orders and invoices, filed on arrival",
    body: "Read, checked against what you already have, and in the right place.",
  },
  {
    title: "Follow-ups that happen without you",
    body: "Every quote chased on schedule until someone answers.",
  },
  {
    title: "The Monday morning report",
    body: "Built overnight and waiting, in the same shape every week.",
  },
  {
    title: "Two systems that never talked",
    body: "The bit where somebody re-types it. That bit goes.",
  },
];

const limits = [
  "It won't handle the judgement calls. The ones it isn't sure about come to you, and that's the design rather than a shortfall. A system with no exception path is one that's guessing quietly.",
  "It won't fix a process nobody agrees on. If two people do the job two different ways, automating it just makes the disagreement faster. Part of the work is settling that first.",
  "It won't pay for itself on something you do twice a year. Frequency beats duration, and if the arithmetic doesn't work I'd rather show you that on the call than build it.",
];

export default function AutomationPage() {
  return (
    <>
      <Band reveal={false}>
        <Kicker>What I do · automation</Kicker>
        <h1 className="m-0 mb-5.5 max-w-[18ch] text-[38px] leading-none tracking-[-0.03em] md:text-[62px]">
          If you&rsquo;re re-typing it, a machine should be doing it.
        </h1>
        <p className="m-0 mb-7 max-w-[56ch] text-base leading-[1.5] md:text-lg">
          I connect the things you already pay for, so the work happens whether or not anyone
          remembers to do it. No new platform to learn, and nothing that needs babysitting.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button href={cta.href} size="lg">
            Book a free call
          </Button>
          <Button href="/showcase" variant="secondary" size="lg">
            Watch one run
          </Button>
        </div>
      </Band>

      <div className="grid border-b-2 border-[var(--color-divider)] md:grid-cols-[1fr_420px]">
        <div className="bg-brand-100 rule-draw-y-end flex flex-col justify-center gap-5.5 border-b-2 border-[var(--color-divider)] px-5 py-8 md:border-b-0 md:py-11 md:pr-12 md:pl-16">
          <Kicker as="h2" tone="deep">
            Step through one: an invoice, start to finish
          </Kicker>
          <WalkthroughPlayer run={invoiceRun} />
        </div>
        <div className="px-5 py-8 md:py-11 md:pr-16 md:pl-11">
          <ServiceUses uses={uses} />
        </div>
      </div>

      <ServiceLimits limits={limits} />

      <Band>
        <Kicker as="h2" tone="muted">
          Whether it&rsquo;s worth it
        </Kicker>
        <p className="m-0 mb-5 max-w-[62ch] text-base leading-[1.55] md:text-[17px]">
          It&rsquo;s arithmetic, and it takes about two minutes to do yourself before you talk to
          anyone: how long the job takes, how often it happens, what an hour of that person costs
          you, and what it costs to fix. The number people get wrong is frequency. A five minute job
          done twelve times a day is an hour a day.
        </p>
        <Button href="/notes/three-hours-a-week" variant="ghost" className="px-1 text-[15px]">
          Read the whole calculation →
        </Button>
      </Band>

      <GettingAPrice />

      <PosterCta headline="What are you still doing by hand?" label={cta.long} href={cta.href} />
    </>
  );
}
