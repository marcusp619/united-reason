# united-reason — stack decisions & setup

The site for **unitedreason.org**, built from the UnitedReason Modernist mockups.

## Running it

```bash
unzip united-reason-bootstrap.zip && cd united-reason-bootstrap
chmod +x bootstrap.sh && ./bootstrap.sh
```

Requires node ≥ 20, `pnpm`, `git`, and `gh` authenticated as `marcusp619`. It scaffolds Next.js,
installs deps, initialises shadcn/ui, lays the site source from `app-src/` over the top,
verifies (lint → typecheck → test → build), then creates `marcusp619/united-reason` as
**private** and pushes `main`.

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

- **All three homepage directions are built.** `/` is variant C (the offer as a promise, which
  the deck itself suggested taking forward); variants A and B live at `/v/person` and
  `/v/problems`, both `noindex` so they can't compete in search. Pick one, promote it to `/`,
  delete `src/app/v/`.
- **The owner is "Mark"** — set once in `src/content/site.ts`, referenced everywhere else.
- **Cal.com embed rather than a custom picker.** The mockup drew its own day/time grid; this is
  the real widget wearing that design. No scheduling, timezone, or invite logic to own.

## Known gaps

- The **assistant demo** on the AI assistants page is scripted — it answers unscripted questions
  with a holding reply that says so. Wire it to a server action and a model when you're ready.
- The **newsletter form** validates and resets but only `console.info`s the address. Point it at
  Buttondown / Resend audiences / whatever you pick.
- **Note bodies aren't written.** `/notes/[slug]` renders a shell with title and metadata.
- The **demo videos** referenced on the home and examples pages ("Play the 2-minute run") are
  static diagrams — there's no video file yet.
- `bootstrap.sh` was **syntax-checked but never executed** — the sandbox this was authored in
  had no npm registry access. Treat the first run as the real test.

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
