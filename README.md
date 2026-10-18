# Stress Relief Games

Free online stress relief games — pop bubble wrap, stretch slime, rake sand, squeeze stress balls.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4
- Web Audio API for procedural sound effects
- HTML5 Canvas for game rendering

## Games

- `/games/bubble-wrap` — Pop bubble wrap
- `/games/slime-simulator` — Stretch slime
- `/games/zen-garden` — Rake sand, arrange stones
- `/games/stress-ball` — Squeeze and throw stress balls

## Develop

```bash
npm install
npm run dev
```

Requires Node.js 22, or at least 20.9 (Next.js 16 minimum).

## Deploy

Configured for Railway (Nixpacks). Push to `master` triggers an automatic build.

The Node.js version is pinned to 22 via the `engines.node` field in `package.json`,
so Nixpacks provisions a compatible runtime.
