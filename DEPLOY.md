Vercel Deployment
=================

This project builds static client assets to `dist/client` and server SSR artifacts in `dist/server`.

Recommended (Static) deployment on Vercel

- Build command: `npm ci && npm run build`
- Output directory: `dist/client`
- The project contains `vercel.json` configured to use `@vercel/static-build` with `distDir: "dist/client"`.
- Ensure `package-lock.json` is committed so `npm ci` works in Vercel.
- Node version: `.nvmrc` is set to `22`.

Quick local test

```bash
npm ci
npm run build
npx vercel --prod
```

If you need SSR on Vercel

- Converting the SSR output in `dist/server` into Vercel Serverless Functions requires adapter changes. Ask me and I can prepare a serverless handler or a Docker-based deployment.
