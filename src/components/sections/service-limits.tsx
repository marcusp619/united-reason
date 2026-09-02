/**
 * What a service won't do.
 *
 * On a site aimed at owners who have been oversold before, this is the section
 * that does the most work, so every service page carries one and the limits are
 * specific rather than modest-sounding.
 */
export function ServiceLimits({ limits }: { limits: readonly string[] }) {
  return (
    <div className="bg-brand-100 grid gap-6 border-b-2 border-[var(--color-divider)] px-5 py-8 md:grid-cols-[340px_1fr] md:gap-10 md:px-16 md:py-12">
      <h2 className="m-0 max-w-[12ch] text-[28px] md:text-[36px]">What it won&rsquo;t do</h2>
      <div className="flex flex-col gap-3.5">
        {limits.map((limit) => (
          <p key={limit} className="m-0 text-base leading-[1.55] md:text-[17px]">
            {limit}
          </p>
        ))}
      </div>
    </div>
  );
}
