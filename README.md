# GitHub Activity Viewer

This project demonstrates a simple GitHub activity viewer built with Next.js 14, TypeScript and Tailwind CSS.

## Getting Started

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

## Tests

```bash
pnpm test
```

## Environment Variables

The following variables enable authentication and higher API limits:

- `GITHUB_ID` and `GITHUB_SECRET` – GitHub OAuth credentials for NextAuth.
- `GITHUB_TOKEN` – Personal Access Token used for API requests.

## Deployment

The app can be deployed to platforms like Vercel using `pnpm build`.
