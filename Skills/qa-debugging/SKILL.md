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

## Reporting

Final responses should include:

- What was tested.
- Result.
- Any skipped validation and why.
- Residual risk when provider services, secrets, or real supplier APIs were not exercised.

## References

- Read `../../references/commands-and-validation.md` for validation choices.
- Read `../../references/project-map.md` if the affected area is unclear.
