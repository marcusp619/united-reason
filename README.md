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
cp .env.example .env.local   # set NEXT_PUBLIC_CAL_LINK
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

| Route                      | Mockup | Notes                                                |
| -------------------------- | ------ | ---------------------------------------------------- |
| `/`                        | 1c     | Homepage — "the offer as a promise"                  |
| `/v/person`                | 1a     | Homepage variant — "the person, plainly" (`noindex`) |
| `/v/problems`              | 1b     | Homepage variant — "the problem list" (`noindex`)    |
| `/what-i-do`               | 1d     | Services overview                                    |
| `/what-i-do/ai-assistants` | 1e     | Service detail                                       |
| `/how-it-works`            | 1f     | Four steps + FAQs                                    |
| `/examples`                | 1g     | Demos, before/after, founding-client offer           |
| `/notes`                   | 1h     | Blog index with working filters                      |
| `/notes/[slug]`            | —      | Post shell; bodies not written yet                   |
| `/book`                    | 1i     | Cal.com embed, themed                                |

All three homepage variants are live so you can compare them in a real browser. When you pick
one, move it to `/` and delete `src/app/v/`. The two variants carry `robots: { index: false }`
so they can't compete with `/` in search while they're up.

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
- `services.ts` — the three services, the four process steps, the FAQs
- `problems.ts` — the problem list driving `/v/problems`
- `posts.ts` — notes index and categories

No copy is hardcoded in a component. Changing the owner's name is a one-line edit in `site.ts`.

## Forms

Each form has one Zod schema in `src/lib/schemas/forms.ts`, used by the client form and — when
you add one — the server action. `enquirySchema` includes a honeypot field.

The newsletter form currently logs instead of subscribing; point `onSubmit` at your list
provider. The assistant demo on `/what-i-do/ai-assistants` is scripted, not a live model — it
says so when you ask it something unscripted.

## Booking

`/book` embeds Cal.com via `@calcom/embed-react`, themed to the Modernist palette through
`cssVarsPerTheme`. Set `NEXT_PUBLIC_CAL_LINK` to your event (e.g. `unitedreason/intro`).

## Deploying

Import at [vercel.com/new](https://vercel.com/new) — framework auto-detects, no `vercel.json`
needed. Set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_CAL_LINK` in project env vars, add the
domain, then add the records Vercel shows you to the Bluehost zone.
