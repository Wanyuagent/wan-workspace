# Commands And Validation

Only use commands that exist in project files unless the user authorizes adding new scripts.

## IPProxy Frontend

Directory: `IPProxy`

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run test`
- `npm run test:watch`
- `npm run test:coverage`

## IPProxy Backend

Directory: `IPProxy/backend`

- `pytest`
- `pytest tests`
- `alembic upgrade head`
- `./run_lm_tests.sh`
- `./run_usdt_tests.sh`
- `./run_lm_query_tests.sh`
- `./run_lm_range_test.sh`
- `./run_lm_sync_test.sh`
- From `IPProxy` root: `./start-service.sh`

The project owner uses `cd IPProxy && ./start-service.sh` as the standard local backend start command.

## IPProxy Agent

Directory: `IPProxy/Agent`

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run test`
- `npm run test:watch`
- `npm run test:smoke`
- `npm run db:generate`
- `npm run db:migrate`
- `npm run db:push`

## IPcheap

Directory: `IPcheap`

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run start`

TODO: no test script is currently declared in `IPcheap/package.json`.

## wanyu-FPBrowser

Directory: `wanyu-FPBrowser`

- `pnpm install`
- `pnpm dev`
- `pnpm dev:web`
- `pnpm dev:desktop`
- `pnpm build`
- `pnpm build:web`
- `pnpm build:desktop`
- `pnpm build:desktop:mac`
- `pnpm build:desktop:win`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:console`
- `pnpm deploy:web:oss:configure`
- `pnpm deploy:web:oss`
- `pnpm deploy:web:oss:skip-build`

## Validation Selection

- Docs/Skills only: verify paths and commands exist.
- Small frontend change: build/typecheck for the app; run dev server only when visual verification is needed.
- Backend route/service change: targeted pytest file or test class.
- Database schema change: migration creation/review plus `alembic upgrade head` in a safe local/test environment.
- Shared Wanyu package change: monorepo typecheck/test plus relevant app build when feasible.
- Deployment change: run the build command and inspect start/healthcheck config. Provider-side verification may require Railway/Aliyun/Cloudflare access.
