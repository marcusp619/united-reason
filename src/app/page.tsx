import { Clock, LayoutGrid, MessageSquare, Play, Zap } from "lucide-react";

import { Band, Button, Kicker, PosterCta, UrMark } from "@/components/primitives";
import { PipelineDiagram } from "@/components/sections/pipeline-diagram";
import { ProblemPicker } from "@/components/sections/problem-picker";
import { services } from "@/content/services";
import { cta, site } from "@/content/site";

/**
 * Homepage — variant A's fold running into variant B's problem list.
 *
 * The person introduces the offer, then the picker lets an owner recognise
 * their own week in it. Variant A's static "Sound like you?" quotes are gone:
 * the picker does that job interactively, and variant B's "just me" panel is
 * gone too, since the fold already establishes who you'd be working with.
 */

const markPoints = [
  { Icon: Zap, label: "Automations that run themselves" },
  { Icon: MessageSquare, label: "Assistants trained on your own material" },
  { Icon: LayoutGrid, label: "Sites and small internal tools" },
  { Icon: Clock, label: "Fixed quote, fixed date" },
];

const serviceIcons = [Zap, MessageSquare, LayoutGrid];

export default function HomePage() {
  return (
    <>
      <div className="grid border-b-2 border-[var(--color-divider)] md:grid-cols-[minmax(0,1fr)_460px]">
        <div className="border-b-2 border-[var(--color-divider)] px-5 py-8 md:border-r-2 md:border-b-0 md:py-16 md:pr-14 md:pl-16">
          <Kicker>
            {site.owner} · {site.name}
          </Kicker>
          <h1 className="m-0 mb-6 max-w-[11ch] text-[34px] leading-[1.02] tracking-[-0.025em] md:text-[58px]">
            I build the software small businesses keep asking for.
          </h1>
          <p className="m-0 mb-8 max-w-[44ch] text-base leading-[1.5] md:text-[19px]">
            One person, start to finish. Tell me what&rsquo;s eating your week and I&rsquo;ll tell
            you honestly whether software fixes it, roughly what it takes, and what it costs.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button href={cta.href} size="lg">
              {cta.long}
            </Button>
            <Button href="/what-i-do" variant="secondary" size="lg">
              See what I do
            </Button>
          </div>
          <p className="text-muted mt-5 mb-0 text-sm">
            No pitch deck, no sales script. If it isn&rsquo;t worth building, I&rsquo;ll say so on
            the call.
          </p>
        </div>

        <UrMark className="min-h-[260px] md:min-h-[620px]">
          <div className="grid grid-cols-2 border-t-2 border-white/50">
            {markPoints.map(({ Icon, label }, i) => (
              <div
                key={label}
                className={`pt-5 ${i % 2 === 0 ? "pr-4" : "border-l-2 border-white/50 pl-4"} ${
                  i > 1 ? "border-t-2 border-white/50" : ""
                }`}
              >
                <Icon size={30} strokeWidth={2} />
                <p className="mt-3 mb-0 text-sm leading-[1.4]">{label}</p>
              </div>
            ))}
          </div>
        </UrMark>
      </div>

      <Band rule={false} className="md:pb-10">
        <h2 className="m-0 mb-4 text-[32px] leading-[1.02] tracking-[-0.03em] md:text-[52px]">
          What are you still doing by hand?
        </h2>
        <p className="text-muted m-0 max-w-[52ch] text-base md:text-lg">
          Pick the one that stings. I&rsquo;ll show you what it turns into.
        </p>
      </Band>

      <ProblemPicker />

      <Band>
        <Kicker tone="muted">Three things people hire me for</Kicker>
        <div className="grid gap-8 md:grid-cols-3 md:gap-0">
          {services.map((s, i) => {
            const Icon = serviceIcons[i];
            return (
              <div
                key={s.slug}
                className={
                  i === 0
                    ? "md:pr-9"
                    : "border-t-2 border-[var(--color-divider)] pt-6 md:border-t-0 md:border-l-2 md:pt-0 md:pr-9 md:pl-9"
                }
              >
                <div className="text-brand mb-3 flex items-center gap-2.5">
                  <Icon size={22} strokeWidth={2} />
                  <span className="text-[11px] tracking-[0.16em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="m-0 mb-3 text-[22px] md:text-[26px]">{s.title}</h3>
                <p className="m-0 text-[15px] leading-[1.55]">{s.short}</p>
              </div>
            );
          })}
        </div>
      </Band>

      <div className="bg-brand-100 grid border-b-2 border-[var(--color-divider)] md:grid-cols-2">
        <div className="flex min-h-[280px] items-center border-b-2 border-[var(--color-divider)] px-5 py-8 md:border-r-2 md:border-b-0 md:px-10 md:py-11">
          <div className="flex w-full flex-col gap-5.5">
            <PipelineDiagram steps={["Inbox", "Read", "Match", "Books"]} />
            <div className="flex items-center gap-3 border-t-2 border-[var(--color-divider)] pt-4">
              <Play size={26} className="fill-brand text-brand" />
              <span className="text-[13px] font-bold tracking-[0.14em] uppercase">
                Play the 2-minute run
              </span>
            </div>
          </div>
        </div>
        <div className="px-5 py-8 md:px-12 md:py-13">
          <Kicker tone="deep">Instead of a case study</Kicker>
          <h2 className="m-0 mb-4 max-w-[16ch] text-[26px] md:text-[34px]">
            Watch a real automation run, start to finish.
          </h2>
          <p className="m-0 mb-6.5 max-w-[42ch] text-base leading-[1.55]">
            Two minutes, no narration over stock footage. An invoice lands in an inbox and ends up
            in the books without anyone touching it.
          </p>
          <Button href="/examples">Play the demo</Button>
        </div>
      </div>

      <PosterCta headline="Tell me what's eating your week." label={cta.long} href={cta.href} />
    </>
  );
}
