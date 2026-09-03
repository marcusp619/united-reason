# united-reason — stack decisions & setup

The site for **unitedreason.org**, built from the UnitedReason Modernist mockups.

## Running it

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Requires node ≥ 20 and `pnpm`. The repo was originally laid down by a `bootstrap.sh` that
scaffolded Next.js, installed deps and initialised shadcn/ui over the source in `app-src/`;
that script has served its purpose and is gone.

## Stack

| Concern    | Choice                                      | Why                                                                           |
| ---------- | ------------------------------------------- | ----------------------------------------------------------------------------- |
| Framework  | Next.js, App Router                         | Marketing surface is mostly static; only three components need `"use client"` |
| Language   | TypeScript, `strict`                        | Your primary language                                                         |
| Styling    | Tailwind + Modernist tokens                 | Tokens ported verbatim from the design bundle into `globals.css`              |
| Components | shadcn/ui                                   | Token-bridged, so anything added later inherits the design system             |
| Validation | Zod                                         | Form schemas and build-time env validation                                    |
| Forms      | react-hook-form + `@hookform/resolvers/zod` | One schema drives client validation, server validation, and the type          |
| Env        | `@t3-oss/env-nextjs`                        | A missing var fails the build, not production                                 |
| Booking    | `@calcom/embed-react`                       | Real availability and invites; themed to Modernist via `cssVarsPerTheme`      |
| Tests      | Vitest + Testing Library                    | Fast, ESM-native                                                              |
| CI         | GitHub Actions                              | format → lint → typecheck → test → build on every PR                          |
| Host       | Vercel                                      | First-party Next.js target; zero adapter config                               |

### Deliberately left out

- **No database / ORM.** Nothing on the site persists anything yet. Add Drizzle + Postgres when
  the newsletter or enquiry form needs to store rather than forward.
- **No CMS.** Content is typed data in `src/content/`. Move to MDX or a content collection when
  the notes get real bodies.
- **No auth.** Nothing sits behind a login.

## Decisions taken

- **The homepage merges variants A and B.** All three directions were built and compared in a
  browser; the chosen shape is A's fold (the person, the promise, the UR mark panel) running
  into the interactive showcase, then A's services trio and demo. A's static "Sound like you?"
  quotes were dropped because the showcase does that job better, and B's "just me" panel
  because the fold already establishes it. Variant C and the `/v/` routes are deleted.
- **Figures derive, they never get asserted.** `flow-figures.ts` and `flow-worth.ts` compute
  every number the showcase states from the flow definitions, so the hours can't contradict the
  flagged items beside them and the money can't contradict the hours above it. Property tests
  hold the honesty: nothing is free, a figure never exceeds the truth, and at least one of the
  five flows still says don't build it.
- **The published prices live in `src/content/pricing.ts`,** and a test asserts the FAQ prose
  quotes the same figures. They used to exist only inside one FAQ answer.
- **The owner is "Mark"** — set once in `src/content/site.ts`, referenced everywhere else.
- **Cal.com embed rather than a custom picker.** The mockup drew its own day/time grid; this is
  the real widget wearing that design. No scheduling, timezone, or invite logic to own.

## Known gaps

- **Delivery is off until `RESEND_API_KEY` is set.** Both forms post to a server action; with no
  key it returns `notConfigured` and they fall back to composing the message in the visitor's own
  mail client, saying so on screen. Set the key — and verify the domain in Resend, since it sends
  from `hello@unitedreason.org` — and they start delivering with no code change.
- The **assistant demos** are scripted — they answer unscripted questions with a holding reply
  that says so. Wire to a model when you're ready.
- The **assistant demos are still scripted.** Wire them to a model when you're ready.

## Deploying

1. Import the repo at [vercel.com/new](https://vercel.com/new). Framework auto-detects.
2. Set `NEXT_PUBLIC_CAL_LINK` in Vercel env once the Cal.com event exists. Leave it unset until
   then — `/book` falls back to email rather than showing Cal's "event type not found" screen.
   The site URL is not an env var; it lives in `src/content/site.ts`.
3. Add the domain in Vercel → Project → Domains.
4. In **Bluehost DNS** (the zone is empty after the Aug 2026 Netlify teardown), add the records
   Vercel shows you — typically `A @ → 76.76.21.21` and `CNAME www → cname.vercel-dns.com`. Use
   what Vercel displays; those values do change.

Bluehost remains the authoritative nameserver. Moving nameservers to Vercel would automate
cert and record management but also moves any future email/DNS for the domain — worth deciding
deliberately rather than by default.
