# GitHub Contributions Explorer

A web app built with **Next.js 14** that takes a GitHub username and displays their contribution history, commit activity, and repository breakdown.  
It pulls data directly from the **GitHub GraphQL API v4** and **REST API v3**, rendering a heatmap, per-repo stats, and a feed of recent commits.

---

## ✨ Features

- 🔍 Search any GitHub username
- 🗓 Contribution **heatmap** (last 12 months)
- 📊 Commit totals, PRs, issues, reviews
- 📂 Per-repo commit breakdown (sortable table)
- 📝 Recent commits across public repos
- ⚡ Server-side rendered (fast first load), cached results
- 🔑 Optional GitHub login for higher API limits
- 🌗 Clean Tailwind UI with dark mode support
- 🚀 Deploy-ready on [Vercel](https://vercel.com/)

---

## 🖼 Demo

_(Add screenshot or deployed link here)_

---

## 🛠 Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Recharts](https://recharts.org/) for charts & heatmap
- [SWR](https://swr.vercel.app/) for client caching/revalidation
- [Octokit](https://github.com/octokit) (GitHub GraphQL + REST clients)
- [NextAuth.js](https://next-auth.js.org/) (optional GitHub OAuth)
- [Zod](https://zod.dev/) for input validation
- [Vercel KV](https://vercel.com/storage/kv) (optional caching backend)

---

## ⚙️ Setup

### 1. Clone repo
```bash
git clone https://github.com/your-username/github-contributions-explorer.git
cd github-contributions-explorer

