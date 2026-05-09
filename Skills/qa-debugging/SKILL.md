---
name: wan-qa-debugging
description: Use for bug reproduction, regression testing, smoke tests, Playwright/Vitest/Jest/Pytest workflows, test reports, and choosing validation commands across IPProxy, IPcheap, and wanyu-FPBrowser.
---

# Wan QA Debugging

Use this Skill when asked to test, reproduce, verify, or debug regressions.

## Workflow

1. Identify the product and layer: frontend, backend, shared client, desktop, deployment.
2. Find an existing test that is closest to the affected behavior before writing a new one.
3. Reproduce with the narrowest command first.
4. Fix only the cause, then rerun the targeted test/build.
5. If a full suite is expensive or unavailable, state the exact narrower validation used.

## Known Test Locations

- `IPProxy/backend/tests`
- `IPProxy/tests`
- Root-level selected `IPProxy/test_*.py`
- `IPProxy/Agent/tests`
- `wanyu-FPBrowser/scripts/qa`
- `wanyu-FPBrowser/packages/api-client/src/proxy-adapter.test.ts`

TODO: confirm `IPcheap` test strategy; no test script was found in `IPcheap/package.json`.

## Known Commands

- `cd IPProxy/backend && pytest`
- `cd IPProxy/backend && pytest tests/path_or_file.py`
- `cd IPProxy && npm run test`
- `cd IPProxy/Agent && npm run test`
- `cd IPProxy/Agent && npm run test:smoke`
- `cd wanyu-FPBrowser && pnpm test`
- `cd wanyu-FPBrowser && pnpm test:console`
- `cd wanyu-FPBrowser && pnpm typecheck`
- `cd IPcheap && npm run build`

## Production Smoke Checks

Use only when the user explicitly asks for production validation. Never paste
real credentials, tokens, database URLs, or proxy passwords into docs or final
reports; use environment variables and redact command output.

### IPcheap Dynamic Proxy Purchase

Prerequisites:

- Backend URL in `IPPROXY_BACKEND_URL`, for example the Railway backend origin.
- IPcheap smoke account credentials in local-only variables such as
  `IPCHEAP_SMOKE_EMAIL` and `IPCHEAP_SMOKE_PASSWORD`.
- Production PostgreSQL connection in `DATABASE_URL`, with SSL required and
  GSS disabled when using `psql`.
- IPcheap dynamic tier prices must exist in `global_tier_prices` with
  `site_code='ipcheap'` for product `dynamic_ipweb`.

Suggested checks:

- Confirm schema has `global_tier_prices.site_code` and
  `dynamic_orders.source_site`.
- Confirm `GET /api/ipcheap/dynamic-products` returns `dynamic_ipweb` with
  `tierPrices`.
- Log in with `POST /api/ipcheap/auth/login`; use `data.token` only in local
  shell variables.
- Open a small dynamic order with
  `POST /api/ipcheap/dynamic-orders` using `productNo=dynamic_ipweb` and
  `flow=3`.
- Confirm the order row has `source_site='ipcheap'` and transactions were
  written for the user, agent, and admin cost where applicable.
- Verify the returned proxy by making an HTTP request through it, for example
  `curl --proxy "$PROXY_URL" "http://api.ipify.org?format=json"`.

Notes:

- Some dynamic proxy endpoints support HTTP proxying but reject HTTPS CONNECT;
  use an HTTP target for the smoke check unless the supplier documents HTTPS
  CONNECT support.
- For open-ended dynamic price tiers, prefer deploying code that handles
  `max_traffic=NULL`; until then, a large numeric maximum such as `999999` can
  be used as an operational workaround.

## Reporting

Final responses should include:

- What was tested.
- Result.
- Any skipped validation and why.
- Residual risk when provider services, secrets, or real supplier APIs were not exercised.

## References

- Read `../../references/commands-and-validation.md` for validation choices.
- Read `../../references/project-map.md` if the affected area is unclear.
