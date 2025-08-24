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

1. Create a GitHub OAuth App at https://github.com/settings/applications/new
   - Application name: GitHub Activity Viewer (Local)
   - Homepage URL: http://localhost:3000
   - Authorization callback URL: http://localhost:3000/api/auth/callback/github

2. Copy `.env.local.example` to `.env.local` and set:
   ```bash
   GITHUB_ID=your_github_oauth_client_id
   GITHUB_SECRET=your_github_oauth_client_secret
   NEXTAUTH_SECRET=generate_a_random_secret # openssl rand -base64 32
   NEXTAUTH_URL=http://localhost:3000
   ```

Optional:

- `GITHUB_TOKEN` – Personal Access Token for higher rate limits

## Deployment

The app can be deployed to platforms like Vercel using `pnpm build`.
