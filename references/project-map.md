# Project Map

This file records discovered structure for wan-workspace. Keep it factual and update it when directories move.

## Root

- `IPProxy/`: core IP proxy platform.
- `IPcheap/`: low-price IP proxy sales frontend.
- `wanyu-FPBrowser/`: Wanyu fingerprint browser monorepo.
- `Skills/`: project-local Codex reusable workflows.
- `AGENTS.md`: root operating rules for Codex.

The root directory is not currently a git repository. `IPProxy`, `IPcheap`, and `wanyu-FPBrowser` each appear to be separate git repositories.

## IPProxy

- Frontend:
  - `src`
  - `index.html`
  - `vite.config.ts`
  - `package.json`
- Backend:
  - `backend/app/main.py`
  - `backend/app/routers`
  - `backend/app/schemas`
  - `backend/app/models`
  - `backend/app/services`
  - `backend/alembic`
  - `backend/requirements.txt`
  - `backend/requirements-test.txt`
- Agent:
  - `Agent/src`
  - `Agent/prisma`
  - `Agent/tests`
  - `Agent/package.json`
- Database and migrations:
  - `database/schema.sql`
  - `database/migrations`
  - `backend/alembic/versions`
- Tests:
  - `backend/tests`
  - `tests`
  - root-level `test_*.py`
  - `Agent/tests`
- Deployment:
  - `backend/Dockerfile`
  - `backend/nixpacks.toml`
  - `frontend.railway.toml`
  - `Agent/railway.toml`
  - `start-railway.sh`
  - `docker-compose.yml`
  - `.github/workflows`

TODO: confirm whether `IPProxy/frontend` is active, legacy, or alternate packaging.

## IPcheap

- Frontend:
  - `src/pages`
  - `src/services`
  - `src/components`
  - `src/i18n`
  - `src/styles`
- Deployment:
  - `railway.json`
  - `scripts/serve-static.mjs`
- Env:
  - `.env.example`

TODO: confirm canonical API base URL configuration and test strategy.

## wanyu-FPBrowser

- Monorepo:
  - `pnpm-workspace.yaml`
  - `package.json`
  - `turbo.json`
- Web:
  - `apps/web-marketing`
  - `apps/web-marketing/src/pages/marketing`
  - `apps/web-marketing/src/pages/console`
- Desktop:
  - `apps/desktop`
  - `apps/desktop/src/main`
  - `apps/desktop/src/preload`
  - `apps/desktop/src/renderer`
  - `apps/desktop/libs`
  - `apps/desktop/resources/brosdk`
- Shared packages:
  - `packages/api-client`
  - `packages/i18n`
  - `packages/wanyu-ui`
- Docs:
  - `doc/tech`
  - `doc/product`
  - `doc/ops`
  - `docs/qa`
  - `docs/test-reports`
- Deployment:
  - `.github/workflows/web-deploy-oss.yml`
  - `scripts/oss`

## Cross-Project API Awareness

When changing IPProxy backend APIs, check consumers in:

- `IPProxy/src/services`
- `IPProxy/src/api`
- `IPcheap/src/services`
- `wanyu-FPBrowser/packages/api-client`
- `wanyu-FPBrowser/apps/web-marketing/src/api`
- `wanyu-FPBrowser/apps/desktop/src/renderer/src/api`
