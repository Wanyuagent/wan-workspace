---
name: wan-project-orientation
description: Use at the start of broad wan-workspace tasks to identify affected projects, architecture boundaries, commands, docs, env examples, deployment files, tests, and TODOs before editing.
---

# Wan Project Orientation

Use this Skill before cross-project work or when the affected area is unclear.

## Workflow

1. Read `/Users/minzhenfa/sourceCode/wan-workspace/AGENTS.md`.
2. Run targeted discovery:
   - `rg --files` for files.
   - `find . -maxdepth 3 -type d` for major directories.
   - Read nearest `package.json`, `requirements*.txt`, `README.md`, deployment config, and `.env.example`.
3. Classify the task:
   - Core backend/API/database: `IPProxy/backend`.
   - Admin or proxy frontend: `IPProxy/src`.
   - Low-price sales frontend: `IPcheap/src`.
   - Wanyu web/desktop: `wanyu-FPBrowser/apps`.
   - Shared Wanyu client/UI: `wanyu-FPBrowser/packages`.
4. Identify consumers before changing API contracts.
5. Choose the smallest validation command that exists in the local project files.

## References

- Read `../../references/project-map.md` when you need a fuller directory map.
- Read `../../references/commands-and-validation.md` before running or documenting commands.
- Read `../../references/env-deployment.md` for env/deployment orientation.

## Guardrails

- Do not invent missing commands.
- Do not expose secret values from `.env` files.
- Do not refactor unrelated code while orienting.
- Mark uncertain findings with `TODO:` instead of presenting them as fact.
