# wan-workspace Codex Engineering Guide

This workspace coordinates three related products:

- `IPProxy/`: core IP proxy platform, admin/frontend app, FastAPI backend, PostgreSQL/Railway deployment, and `Agent/（Agent not used）`.
- `IPcheap/`: low-price IP proxy sales frontend, deployed on Railway, consuming IPProxy APIs.
- `wanyu-FPBrowser/`: Wanyu fingerprint browser for the China market, deployed to Aliyun OSS/CDN for web and built as an Electron desktop app. It consumes IPProxy APIs through shared clients.

The core production dependency is `IPProxy/backend` and its Railway PostgreSQL database. Treat `IPcheap` and `wanyu-FPBrowser` as API consumers unless the task proves otherwise.

Current IPProxy API:

- Base path: `/api`
- Current frontend/client entrypoint: `https://backend-production-127a.up.railway.app`
- Planned reverse-proxy entrypoint: `https://api.wanyuagent.com/v1/api`

## First Steps

1. Read this file before editing.
2. Use `rg --files` and targeted reads before changing anything.
3. Check the nearest project files (`package.json`, `requirements.txt`, `README.md`, `.env.example`, deployment config) instead of guessing commands.
4. Do not edit business code when the request is about docs, rules, Skills, deployment notes, or investigation.
5. Never print, commit, or invent real secrets. Use `.env.example` and secret names only.

## Project Map

- Frontend apps:
  - `IPProxy/src`, `IPProxy/index.html`, `IPProxy/vite.config.ts` is the active ztproxy frontend.
  - `IPProxy/frontend` is not currently used.
  - `IPcheap/src`, `IPcheap/index.html`, `IPcheap/vite.config.ts`
  - `wanyu-FPBrowser/apps/web-marketing/src`
  - `wanyu-FPBrowser/apps/desktop/src/renderer/src`
- Backend apps:
  - `IPProxy/backend/app` FastAPI app
  - `IPProxy/server.js` Node/Express helper for IPProxy frontend deployment
  - `IPProxy/Agent/src` Fastify/Prisma agent service
- Desktop app:
  - `wanyu-FPBrowser/apps/desktop` Electron + React
  - BroSDK and sidecar assets under `wanyu-FPBrowser/apps/desktop/libs` and `wanyu-FPBrowser/apps/desktop/resources/brosdk`
- Shared/API packages:
  - `wanyu-FPBrowser/packages/api-client`
  - `wanyu-FPBrowser/packages/i18n`
  - `wanyu-FPBrowser/packages/wanyu-ui`
  - `IPProxy/src/services`, `IPProxy/src/api`, `IPcheap/src/services`
- Tests:
  - `IPProxy/backend/tests`, plus selected root-level `IPProxy/test_*.py` and `IPProxy/tests`
  - `IPProxy/Agent/tests`
  - `wanyu-FPBrowser/scripts/qa`
  - `wanyu-FPBrowser/packages/api-client/src/proxy-adapter.test.ts`
  - TODO: confirm whether `IPcheap` has an intended automated test setup; no test script was found in `IPcheap/package.json`.
- Deployment and ops:
  - Railway: `IPProxy/backend/Dockerfile`, `IPProxy/backend/nixpacks.toml`, `IPProxy/frontend.railway.toml`, `IPProxy/start-railway.sh`, `IPProxy/Agent/railway.toml`, `IPcheap/railway.json`
  - Aliyun: `wanyu-FPBrowser/scripts/oss`, `wanyu-FPBrowser/.github/workflows/web-deploy-oss.yml`
  - Database: `IPProxy/backend/alembic`, `IPProxy/database`, `IPProxy/scripts/db_backup*.sh`
- Env examples:
  - `IPProxy/.env.example`, `IPProxy/backend/.env.example`, `IPProxy/Agent/.env.example`
  - `IPcheap/.env.example`
  - `wanyu-FPBrowser/apps/web-marketing/.env.oss.example`
  - TODO: create sanitized examples for `wanyu-FPBrowser/apps/desktop` if desktop env variables become stable.

Railway service names:

- `Frontend`: ztproxy frontend.
- `Backend`: ztproxy backend.
- `IPcheap`: IPcheap frontend.

More detail lives in `references/`.

## Real Commands Found

Run commands from the directory shown.

### IPProxy frontend

- `cd IPProxy && npm run dev`
- `cd IPProxy && npm run build`
- `cd IPProxy && npm run preview`
- `cd IPProxy && npm run test`
- `cd IPProxy && npm run test:watch`
- `cd IPProxy && npm run test:coverage`

### IPProxy backend

- `cd IPProxy/backend && pytest`
- `cd IPProxy/backend && pytest tests`
- `cd IPProxy/backend && alembic upgrade head`
- `cd IPProxy/backend && ./run_lm_tests.sh`
- `cd IPProxy/backend && ./run_usdt_tests.sh`
- `cd IPProxy && ./start-service.sh`

Python dependencies are declared in `IPProxy/backend/requirements.txt` and `IPProxy/backend/requirements-test.txt`.
The standard local IPProxy backend start command used by the project owner is `cd IPProxy && ./start-service.sh`.

### IPProxy Agent(Not used)

- `cd IPProxy/Agent && npm run dev`
- `cd IPProxy/Agent && npm run build`
- `cd IPProxy/Agent && npm run start`
- `cd IPProxy/Agent && npm run test`
- `cd IPProxy/Agent && npm run test:smoke`
- `cd IPProxy/Agent && npm run db:generate`
- `cd IPProxy/Agent && npm run db:migrate`

### IPcheap

- `cd IPcheap && npm run dev`
- `cd IPcheap && npm run build`
- `cd IPcheap && npm run preview`
- `cd IPcheap && npm run start`

### wanyu-FPBrowser

- `cd wanyu-FPBrowser && pnpm install`
- `cd wanyu-FPBrowser && pnpm dev`
- `cd wanyu-FPBrowser && pnpm dev:web`
- `cd wanyu-FPBrowser && pnpm dev:desktop`
- `cd wanyu-FPBrowser && pnpm build`
- `cd wanyu-FPBrowser && pnpm build:web`
- `cd wanyu-FPBrowser && pnpm build:desktop`
- `cd wanyu-FPBrowser && pnpm typecheck`
- `cd wanyu-FPBrowser && pnpm test`
- `cd wanyu-FPBrowser && pnpm test:console`
- `cd wanyu-FPBrowser && pnpm deploy:web:oss`

## Engineering Rules

- Keep changes scoped to the product being touched. Cross-project API changes require checking both provider and consumers.
- Preserve existing stacks: React/Vite/Ant Design for web, Electron/Vite for desktop, FastAPI/SQLAlchemy/Alembic for backend, Prisma/Fastify for Agent.
- For IPProxy API changes, inspect `IPProxy/backend/app/routers`, `schemas`, `models`, and affected frontend service/client files.
- For database changes, prefer Alembic migrations in `IPProxy/backend/alembic/versions`; do not hand-edit production databases from code changes.
- For browser/desktop proxy flows, check `wanyu-FPBrowser/packages/api-client` before duplicating request logic.
- For UI work, keep operational screens dense and task-oriented. Avoid marketing-style layouts in admin consoles.
- For Railway/Aliyun/Cloudflare work, document required env/secret names but never include secret values.
- Do not remove user-created logs, backups, local env files, or generated files unless explicitly asked.

## Validation Expectations

Choose the smallest meaningful validation:

- Frontend UI change: relevant build or typecheck; run local dev server only when useful for visual verification.
- Backend API/model change: targeted `pytest`; include migration validation for schema changes.
- Shared API client change: affected package test/typecheck plus at least one consumer sanity check.
- Deployment config change: build command or dry-run style validation when available; otherwise inspect config and document unverified runtime risks.
- Docs/Skills-only change: check file paths and commands exist; no business tests required.

## Skills

Project Skills live under `Skills/`:

- `Skills/project-orientation`: use at the start of broad tasks to map affected projects and risk.
- `Skills/ipproxy-backend`: use for FastAPI, PostgreSQL, Alembic, Railway backend, ztproxy, supplier API, order, payment, and user flows.
- `Skills/frontend-apps`: use for IPProxy frontend, IPcheap, Wanyu web, Electron renderer, shared UI, i18n, and API clients.
- `Skills/deploy-ops`: use for Railway, Aliyun OSS/CDN, Cloudflare, env, logs, and deployment investigations.
- `Skills/qa-debugging`: use for tests, regressions, smoke checks, and bug reproduction.

When a Skill references `../../references/*.md`, load only the reference needed for the task.

## Open TODOs

- TODO: confirm detailed Railway variable naming conventions beyond service names.
- TODO: confirm Cloudflare production DNS/CDN rules.
- TODO: confirm intended test runner for `IPcheap`.
