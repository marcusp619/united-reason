"use client";

import Link from "next/link";

import { Kicker } from "@/components/primitives";
import type { Flow } from "@/content/flows";
import { formatMoney, loadedHourlyCost } from "@/content/pricing";
import { PaybackVerdict, worthOf, type WorthInputs, type Worth } from "@/lib/flow-worth";

const MONTHS_PER_YEAR = 12;

/**
 * The verdict, in words. Kept beside the panel rather than inside the layout
 * so the sentences can be read as sentences — this is the part that has to be
 * true, and two of the four say don't.
 */
function verdictLine(worth: Worth): string {
  const price = formatMoney(worth.buildPriceFrom);
  const wait = `about ${sayMonths(worth.months ?? 0)}`;

  switch (worth.verdict) {
    case PaybackVerdict.DoItNow:
      return `A build like this starts at ${price}. On your numbers you're square in ${wait}. Under six months, I'd do it now.`;
    case PaybackVerdict.WorthDoing:
      return `A build like this starts at ${price}. On your numbers you're square in ${wait}, and under a year is almost always worth doing. If yours costs more than that, the wait grows in proportion.`;
    case PaybackVerdict.NotWorthIt:
      return worth.months
        ? `A build like this starts at ${price}, and on your numbers that's ${wait}. I'd leave this one, or start with something that happens more often. I'd rather tell you that now than build it.`
        : `A build like this starts at ${price}, and on your numbers it doesn't repay it. I'd leave this one, or start with something that happens more often.`;
    case PaybackVerdict.NotByHoursAlone:
      return `A site like this starts at ${price}. The saved hours on their own don't cover that inside a year, and I'm not going to pretend they do. What pays for a site is the work you win with it, and that number is yours, not mine.`;
  }
}

function sayMonths(months: number): string {
  if (months < MONTHS_PER_YEAR) return `${months} months`;
  const years = months / MONTHS_PER_YEAR;
  return years === 1 ? "a year" : `${years.toFixed(years % 1 === 0 ? 0 : 1)} years`;
}

function Figure({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex-1 px-4.5 py-4">
      <p className="m-0 text-[26px] leading-none tracking-[-0.03em] md:text-[34px]">{value}</p>
      <p className="text-muted m-0 mt-2 text-[11px] tracking-[0.16em] uppercase">{label}</p>
    </div>
  );
}

function NumberField({
  id,
  label,
  hint,
  prefix,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint: string;
  prefix?: string;
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] tracking-[0.02em]">
        {label}
      </label>
      <div className="flex items-center border border-[var(--color-divider)] bg-[var(--color-surface)] px-3">
        {prefix && <span className="text-muted shrink-0 text-[15px]">{prefix}</span>}
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(event) => onChange(Number(event.target.value.replace(/[^\d]/g, "")))}
          className="caret-brand w-full bg-transparent py-2.5 text-[15px] outline-none"
        />
      </div>
      <p className="text-muted m-0 mt-1.5 max-w-[42ch] text-[12px] leading-[1.45]">{hint}</p>
    </div>
  );
}

/**
 * What the hours above are worth, and how long the build takes to repay
 * itself. Two inputs, because the note the figures come from says frequency is
 * the number everyone guesses low — and the panel is worth more to an owner
 * who has typed their own.
 *
 * Nothing here counts the invoice that went out wrong, the quote nobody
 * chased, or what the time turns into instead. Those are usually the bigger
 * numbers, which is exactly why they're left out.
 */
export function WorthPanel({
  flow,
  inputs,
  onChange,
}: {
  flow: Flow;
  inputs: WorthInputs;
  onChange: (next: WorthInputs) => void;
}) {
  const worth = worthOf(flow, inputs);

  return (
    <div className="grid gap-8 border-t-2 border-[var(--color-divider)] px-5 py-8 md:grid-cols-[minmax(0,340px)_1fr] md:gap-12 md:px-16 md:py-11">
      <div>
        <Kicker as="h2" tone="deep">
          What that&rsquo;s worth
        </Kicker>
        <p className="m-0 mb-6 max-w-[38ch] text-[15px] leading-[1.55]">
          Change these two and everything follows them. The hours already have the flagged ones
          taken back out.
        </p>
        <div className="flex flex-col gap-5">
          <NumberField
            id="worth-hourly"
            label="What an hour of that person costs you"
            prefix="$"
            hint={`Wage plus tax plus everything else, which for most small businesses lands between ${formatMoney(loadedHourlyCost.least)} and ${formatMoney(loadedHourlyCost.most)} for admin work.`}
            value={inputs.hourlyCost}
            onChange={(hourlyCost) => onChange({ ...inputs, hourlyCost })}
          />
          <NumberField
            id="worth-volume"
            label="How many a week"
            hint="Count them for one day and multiply. This is the one nearly everyone guesses low."
            value={inputs.itemsPerWeek}
            onChange={(itemsPerWeek) => onChange({ ...inputs, itemsPerWeek })}
          />
        </div>
      </div>

      <div className="border-2 border-[var(--color-divider)]">
        <div className="flex flex-wrap divide-x-2 divide-[var(--color-divider)]">
          <Figure value={formatMoney(worth.savedPerWeek)} label="A week, back" />
          <Figure value={formatMoney(worth.savedPerYear)} label="A year, back" />
          <Figure
            value={worth.months ? sayMonths(worth.months) : "Not from hours"}
            label="To pay for itself"
          />
        </div>
        <p
          aria-live="polite"
          className="m-0 border-t-2 border-[var(--color-divider)] px-4.5 py-4 text-[15px] leading-[1.55]"
        >
          {verdictLine(worth)}
        </p>
        <p className="text-muted m-0 border-t-2 border-[var(--color-divider)] px-4.5 py-3.5 text-[12px] leading-[1.5]">
          Counted over 50 weeks rather than 52, because you take holidays. Only the hours are in
          here. The invoice that went out wrong, the quote nobody chased and what you&rsquo;d do
          with the time instead are all left out on purpose, and they&rsquo;re usually worth more.
          The whole calculation is in{" "}
          <Link href="/notes/three-hours-a-week">Three hours a week</Link>.
        </p>
      </div>
    </div>
  );
}
