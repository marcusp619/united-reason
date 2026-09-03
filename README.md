# UnitedReason

The site for **unitedreason.org** — a one-person software consultancy for small business.
Built in the **Modernist** design system: flat, architectural, Archivo throughout, zero corner
radius, 2px rules, a single red accent used sparingly.

## Stack

Next.js (App Router) · TypeScript strict · Tailwind · shadcn/ui · Zod · react-hook-form ·
Vitest · GitHub Actions · Vercel

## Getting started

```bash
pnpm install
cp .env.example .env.local   # NEXT_PUBLIC_CAL_LINK, RESEND_API_KEY
pnpm dev
```

| Script           | What it does                         |
| ---------------- | ------------------------------------ |
| `pnpm dev`       | Dev server on :3000                  |
| `pnpm build`     | Production build                     |
| `pnpm lint`      | ESLint                               |
| `pnpm typecheck` | `tsc --noEmit`                       |
| `pnpm test`      | Vitest                               |
| `pnpm format`    | Prettier (+ Tailwind class ordering) |

## Routes

| Route                      | Notes                                                       |
| -------------------------- | ----------------------------------------------------------- |
| `/`                        | Homepage — the person, then the interactive showcase        |
| `/what-i-do`               | Services overview                                           |
| `/what-i-do/automation`    | Service detail — the invoice walkthrough                    |
| `/what-i-do/ai-assistants` | Service detail — the scripted assistant demo                |
| `/what-i-do/websites`      | Service detail — the four ways to get a website             |
| `/how-it-works`            | Four steps + FAQs                                           |
| `/showcase`                | The showcase, the worth panel, two operable demos           |
| `/pricing`                 | The three figures, what a fixed price means, founding offer |
| `/notes`                   | Blog index with working filters                             |
| `/notes/[slug]`            | Six written notes, MDX bodies                               |
| `/book`                    | Cal.com embed, themed, plus the written route in            |
| `/privacy`                 | Privacy policy                                              |
| `/feed.xml`                | RSS for the notes                                           |

`/examples` redirects here permanently: it and `/showcase` were two pages making the same offer,
and the nav asked visitors to guess which.

The homepage runs variant A's fold (the person, the promise, the UR mark panel) into the
interactive showcase, then the services trio and the demo. Variant C ("the offer as a promise")
and the `/v/` comparison routes have been deleted now that the direction is settled.

## How the design system is wired

`src/app/globals.css` is the one place the look lives. It carries:

1. **The Modernist tokens**, ported verbatim from the Claude Design bundle — colours, the
   100–900 ramps, spacing, the zero-radius scale, shadows.
2. **A shadcn bridge** — `--primary`, `--background`, `--border` and friends point at the
   Modernist tokens, so any shadcn component added later inherits the design system instead of
   needing to be restyled one at a time.
3. **A `@theme inline` block** exposing `bg-brand`, `text-ink`, `border-rule` etc. to Tailwind,
   so components name their colours instead of hardcoding hex.

Retune the look at the top of that file. Don't hardcode a hex, a font, or a radius anywhere else.

**System rules worth not breaking:** no rounded corners (`--radius` is `0` on purpose), button
labels flush left, 2px dividers between major sections rather than whitespace, photographs
through `.grayscale-photo`, and the accent reserved for the primary action, small emphasis, and
the closing poster.

`src/components/primitives.tsx` holds the shared pieces — `Band`, `Button`, `Kicker`, `UrMark`,
`PosterCta`, `Tag`. Compose those rather than restyling per page.

## Content

Everything editable lives in `src/content/`:

- `site.ts` — name, owner, email, nav, CTA labels
- `services.ts` — the three services, the four process steps, the FAQs, the price steps
- `pricing.ts` — the published figures, the loaded-hourly-cost range, the price bands
- `problems.ts` — the problem list driving the showcase tabs
- `flows.ts` — the five graphs behind the showcase, and the figures they derive from
- `posts.ts` — notes index, excerpts, publication dates
- `notes/*.mdx` — the note bodies, registered in `notes/index.ts`

No copy is hardcoded in a component. Changing the owner's name is a one-line edit in `site.ts`.

## Forms

Each form has one Zod schema in `src/lib/schemas/forms.ts`, used by the client form and — when
you add one — the server action. `enquirySchema` includes a honeypot field.

Both forms post to a server action in `src/app/actions/contact.ts`, which delivers through
Resend's REST API. With `RESEND_API_KEY` unset the action returns `notConfigured` and the form
composes the message in the visitor's mail client instead, saying so on screen — nothing claims
to have been received that hasn't been. A delivery that fails falls back the same way. The assistant demo on
`/what-i-do/ai-assistants` is scripted, not a live model, and says so when you ask it something
unscripted.

## Figures

Everything the showcase states about time comes from `src/lib/flow-figures.ts`, and everything
it states about money from `src/lib/flow-worth.ts`. Both derive rather than assert, so no two
numbers on screen can contradict each other, and the honesty properties are locked by tests —
nothing is free, nothing saves more than the job costs, a figure never exceeds the truth, and
at least one of the five flows still tells you not to build it.

## Booking

`/book` embeds Cal.com via `@calcom/embed-react`, themed to the Modernist palette through
`cssVarsPerTheme`. Set `NEXT_PUBLIC_CAL_LINK` to your event (e.g. `unitedreason/intro`).

## Deploying

Import at [vercel.com/new](https://vercel.com/new) — framework auto-detects, no `vercel.json`
needed. Set `NEXT_PUBLIC_CAL_LINK` in project env vars once your Cal.com event exists, add the
domain, then add the records Vercel shows you to the Bluehost zone. The canonical site URL is
not an env var — it lives in `src/content/site.ts`.
