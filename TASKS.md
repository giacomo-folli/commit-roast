# Project Tasks

This document outlines the complete plan to build the GitHub Activity Viewer using Next.js 14, TypeScript, and related tooling.

## 1. Project Setup
- [ ] Initialize Next.js 14 App Router project with TypeScript and Tailwind CSS.
- [ ] Configure ESLint, Prettier, and Vitest for code quality and testing.
- [ ] Add core dependencies: `next`, `react`, `react-dom`, `tailwindcss`, `autoprefixer`, `postcss`, `recharts`, `swr`, `octokit`, `zod`, `next-auth`, `@vercel/kv`, `typescript`.
- [ ] Set up `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, and `postcss.config.mjs`.
- [ ] Create `styles/globals.css` and ensure dark mode support.

## 2. Utility Libraries
- [ ] `lib/cache.ts` – KV or in-memory cache with TTL helpers.
- [ ] `lib/github.ts` – Octokit clients, GraphQL/REST helpers, ETag handling, transformers (`transformCalendar`, `transformEvents`).
- [ ] `lib/date.ts` – date range helpers (UTC normalization, last 365 days).
- [ ] `lib/validation.ts` – Zod schemas for usernames and API inputs.

## 3. API Routes
- [ ] `/app/api/github/contributions/route.ts`
  - Validate payload `{ username, from, to }` with Zod.
  - Fetch contributions via GraphQL using Octokit.
  - Apply caching (KV or memory) with 10‑minute TTL.
  - Return normalized JSON.
- [ ] `/app/api/github/recent/route.ts`
  - Validate `username` query.
  - Fetch recent commits via REST events with ETag support.
  - Apply caching with 10‑minute TTL.
  - Return top 20 normalized commits.

## 4. Pages & Navigation
- [ ] `/app/layout.tsx` – global layout, theme classes, NextAuth provider.
- [ ] `/app/page.tsx` – landing page with username form and examples.
- [ ] `/app/[username]/page.tsx` – server component that fetches contributions and recent commits on the server.

## 5. UI Components
- [ ] `UsernameForm` – input with Zod validation and navigation.
- [ ] `ProfileCard` – avatar, name, login, totals.
- [ ] `Heatmap` – 7×N grid using Recharts, tooltip, legend.
- [ ] `RepoTable` – per‑repo commit counts, sortable.
- [ ] `RecentCommits` – list of up to 20 recent commits with repo, message, date, link.
- [ ] Loading and error states with `aria-busy` for accessibility.

## 6. Authentication
- [ ] Configure NextAuth GitHub provider under `/app/api/auth/[...nextauth]/route.ts`.
- [ ] Add login/logout button in header; use session token for API calls when available.
- [ ] Support unauthenticated usage with optional `GITHUB_TOKEN` PAT.

## 7. Caching & Rate Limits
- [ ] Implement KV (Upstash/Vercel) caching with fallback to in-memory Map.
- [ ] Use short TTL (10 min) for contributions and recent commits.
- [ ] Respect REST ETags to minimize rate usage.

## 8. Testing
- [ ] Add unit tests for `transformCalendar` and `transformEvents` with Vitest.
- [ ] Ensure `pnpm test` runs and passes.

## 9. Documentation
- [ ] Write comprehensive `README.md` with setup, env vars, dev/build commands, and deployment instructions.
- [ ] Include screenshot or demo link when available.

## 10. Deployment
- [ ] Create Vercel configuration and verify build (`pnpm build`).
- [ ] Ensure app functions without env vars but improves with PAT/NextAuth.

## 11. Stretch Features
- [ ] Add repo include/exclude filters and custom date range options.
- [ ] Display banner on rate‑limit hits with retry window.
- [ ] Label counts as “includes private” when GitHub data indicates.

---
Following this task list will result in a production‑ready GitHub Activity Viewer that meets all functional, performance, and usability requirements.
