import type { Metadata } from "next";
import { GitBranch, Hand, Repeat, Zap } from "lucide-react";

import { Band, Kicker, PosterCta } from "@/components/primitives";
import { BeforeAfter } from "@/components/sections/before-after";
import { DemoPair } from "@/components/sections/demo-pair";
import { AutomationShowcase } from "@/components/showcase/automation-showcase";
import { cta } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = {
  ...pageMetadata("/showcase"),
  title: "Showcase",
  description:
    "Pick the thing eating your week and watch the automation get built and run, then work out what it's worth. Demos you can operate rather than screenshots of somebody else's project.",
};

const readingNotes = [
  {
    Icon: Zap,
    title: "The solid line is the normal day",
    body: "Work arrives, gets read, gets checked, and lands where it belongs. Nobody is at a keyboard while any of that happens.",
  },
  {
    Icon: GitBranch,
    title: "The dashed line is the interesting one",
    body: "That's the path an item takes when the automation isn't certain. Every honest system needs one, and most demos quietly leave it out.",
  },
  {
    Icon: Hand,
    title: "A person is still in the picture",
    body: "The point was never to remove you. It's to make sure the only things reaching you are the ones that genuinely need a decision.",
  },
  {
    Icon: Repeat,
    title: "It runs whether or not anyone remembers",
    body: "That's the difference between a process you wrote down once and a process that actually happens every week.",
  },
];

export default function ShowcasePage() {
  return (
    <>
      <Band reveal={false} rule={false}>
        <Kicker>Showcase</Kicker>
        <h1 className="m-0 mb-5 max-w-[17ch] text-[40px] leading-none tracking-[-0.04em] md:text-[66px] xl:text-[78px]">
          Don&rsquo;t take my word for it. Watch it run.
        </h1>
        <p className="m-0 max-w-[58ch] text-base md:text-lg">
          Pick the thing that&rsquo;s eating your week. The automation I&rsquo;d build for it gets
          drawn, then it runs, with the work moving through it, and then you can put your own
          numbers against it. Below that are two demos you can operate yourself. This practice is
          new, so there&rsquo;s no logo wall &mdash; what you get instead is the working thing.
        </p>
      </Band>

      <AutomationShowcase headingLevel="h2" />

      <Band>
        <Kicker as="h2" tone="muted">
          How to read it
        </Kicker>
        <div data-stagger className="grid gap-8 md:grid-cols-2 md:gap-x-14 md:gap-y-9">
          {readingNotes.map(({ Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <Icon size={24} strokeWidth={2} className="text-brand mt-1 shrink-0" />
              <div>
                <h3 className="m-0 mb-2 text-[19px] tracking-[-0.02em] md:text-[22px]">{title}</h3>
                <p className="text-muted m-0 max-w-[46ch] text-[15px] leading-[1.55]">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Band>

      <DemoPair />

      <BeforeAfter />

      <Band tone="ink" rule={false} reveal={false}>
        <div data-stagger>
          <Kicker as="h2" tone="muted">
            The honest part
          </Kicker>
          <h2 className="m-0 mb-4 max-w-[24ch] text-[28px] tracking-[-0.03em] md:text-[40px]">
            These are demonstrations, not case studies.
          </h2>
          <p className="m-0 max-w-[62ch] text-base leading-[1.55]">
            This practice is new, so the graphs above are built from what these projects actually
            look like rather than from a client&rsquo;s live system. The shapes are real. The
            figures are the shape of a typical small business&rsquo;s week, not a measurement of
            anyone&rsquo;s. Yours get worked out properly on the call, in writing, before you commit
            to anything &mdash; and if a template would do the job, I&rsquo;ll tell you that
            instead.
          </p>
        </div>
      </Band>

      <PosterCta headline="Let's work out your actual numbers." label={cta.long} href={cta.href} />
    </>
  );
}
