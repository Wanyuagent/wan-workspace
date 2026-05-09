---
name: wan-frontend-apps
description: Use for IPProxy frontend, IPcheap frontend, wanyu-FPBrowser web-marketing, Electron renderer UI, shared Wanyu UI/i18n/api-client packages, React/Vite/Ant Design work, and API client integration.
---

# Wan Frontend Apps

Use this Skill for UI, client-side API, routing, i18n, and desktop renderer work.

## Pick The App

- IPProxy admin/proxy frontend: `IPProxy/src`
- `IPProxy/frontend` is not currently used.
- IPcheap sales frontend: `IPcheap/src`
- Wanyu web/console: `wanyu-FPBrowser/apps/web-marketing/src`
- Wanyu desktop renderer: `wanyu-FPBrowser/apps/desktop/src/renderer/src`
- Shared Wanyu API/UI/i18n: `wanyu-FPBrowser/packages`
- Electron main/preload/SDK: `wanyu-FPBrowser/apps/desktop/src/main`, `src/preload`, `libs`, `resources/brosdk`

## Workflow

1. Read the app's `package.json` and nearest env example before choosing commands.
2. For API changes, find the existing service/client pattern first; avoid duplicating HTTP helpers.
3. For shared Wanyu behavior, prefer `packages/api-client`, `packages/wanyu-ui`, or `packages/i18n` when multiple Wanyu apps need the same behavior.
4. For IPcheap, remember it is an API consumer of IPProxy. Check backend contract before changing assumptions.
5. For Electron desktop, separate main/preload/renderer concerns and preserve BroSDK sidecar packaging paths.
6. Validate with the smallest existing build/typecheck/test command.

## Known Commands

- `cd IPProxy && npm run dev`
- `cd IPProxy && npm run build`
- `cd IPProxy && npm run test`
- `cd IPcheap && npm run dev`
- `cd IPcheap && npm run build`
- `cd wanyu-FPBrowser && pnpm dev:web`
- `cd wanyu-FPBrowser && pnpm dev:desktop`
- `cd wanyu-FPBrowser && pnpm build:web`
- `cd wanyu-FPBrowser && pnpm build:desktop`
- `cd wanyu-FPBrowser && pnpm typecheck`
- `cd wanyu-FPBrowser && pnpm test`

## UI Guardrails

- Keep admin/ops screens compact, scannable, and work-focused.
- Use existing Ant Design and local component patterns.
- Do not introduce new UI frameworks without explicit approval.
- Do not hardcode production API URLs when env-based configuration exists.
- IPProxy API base path is `/api`; current frontend/client entrypoint is `https://backend-production-127a.up.railway.app`, with planned reverse proxy `https://api.wanyuagent.com/v1/api`.

## References

- Read `../../references/commands-and-validation.md` for command details.
- Read `../../references/env-deployment.md` for known env/deployment files.
