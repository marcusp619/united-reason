import { Kicker } from "@/components/primitives";

export type ServiceUse = { title: string; body: string };

/** The "what people use it for" column that sits beside a service's demo. */
export function ServiceUses({ uses }: { uses: readonly ServiceUse[] }) {
  return (
    <>
      <Kicker as="h2" tone="muted">
        What people use it for
      </Kicker>
      <div className="flex flex-col">
        {uses.map((use, i) => (
          <div
            key={use.title}
            className={`border-t-2 border-[var(--color-divider)] py-4 ${
              i === uses.length - 1 ? "border-b-2" : ""
            }`}
          >
            <h3 className="m-0 mb-1 text-[17px] md:text-[19px]">{use.title}</h3>
            <p className="text-muted m-0 text-sm">{use.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}
