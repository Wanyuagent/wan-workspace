---
name: wan-ipproxy-backend
description: Use for IPProxy FastAPI backend, PostgreSQL, Alembic migrations, Railway backend deployment, ztproxy inventory, supplier APIs, orders, payments, users, browser environment APIs, and backend debugging.
---

# IPProxy Backend

Use this Skill for changes or investigations under `IPProxy/backend`, database schema, Railway backend behavior, and API contracts consumed by IPcheap or wanyu-FPBrowser.

## Workflow

1. Start in `IPProxy/backend` unless the task explicitly targets root-level IPProxy scripts.
2. Inspect the affected router, schema, model, service, and CRUD/database code before editing:
   - Routers: `app/routers`
   - Schemas: `app/schemas`
   - Models: `app/models`
   - Services: `app/services`
   - Migrations: `alembic/versions`
3. For API contract changes, check consumers:
   - `IPProxy/src/services` and `IPProxy/src/api`
   - `IPcheap/src/services`
   - `wanyu-FPBrowser/packages/api-client`
   - Wanyu app-local clients under `apps/*/src/**/api`
4. For schema changes, add or update an Alembic migration. Do not rely on ad hoc SQL as the long-term fix.
5. Validate with targeted `pytest` where possible.

## Known Commands

- `cd IPProxy/backend && pytest`
- `cd IPProxy/backend && pytest tests`
- `cd IPProxy/backend && alembic upgrade head`
- `cd IPProxy/backend && ./run_lm_tests.sh`
- `cd IPProxy/backend && ./run_usdt_tests.sh`

TODO: confirm canonical local FastAPI start command before documenting it as required.

## Safety

- Never print or commit real `DATABASE_URL`, supplier API keys, payment keys, SMTP secrets, JWT secrets, Railway tokens, or Cloudflare tokens.
- Be careful with Railway PostgreSQL: prefer read-only inspection unless the user asks for a data mutation.
- For order/payment/refund/inventory changes, include rollback or reconciliation considerations in the final note.
- For supplier APIs, preserve retry/idempotency semantics unless the task is specifically about changing them.

## References

- Read `../../references/project-map.md` for directory context.
- Read `../../references/commands-and-validation.md` for validation choices.
- Read `../../references/env-deployment.md` for Railway/env notes.
