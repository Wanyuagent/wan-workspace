---
name: wan-deploy-ops
description: Use for Railway deployment, Railway PostgreSQL, Aliyun OSS/CDN deployment, Cloudflare DNS/CDN, env variables, logs, health checks, build/start commands, and production debugging across wan-workspace.
---

# Wan Deploy Ops

Use this Skill for deployment, runtime configuration, DNS/CDN, and production incident work.

## Provider Map

- Railway: `IPProxy`, `IPProxy/backend`, `IPProxy/Agent`, `IPcheap`, PostgreSQL.
- Aliyun OSS/CDN: `wanyu-FPBrowser` web marketing/console deployment.
- Cloudflare: DNS/CDN in front of public sites where configured outside repo.
- GitHub Actions: Wanyu OSS deploy workflow and IPProxy GitHub Pages workflow.

## Workflow

1. Identify the target service and deployment config:
   - `IPProxy/backend/Dockerfile`
   - `IPProxy/backend/nixpacks.toml`
   - `IPProxy/frontend.railway.toml`
   - `IPProxy/Agent/railway.toml`
   - `IPcheap/railway.json`
   - `wanyu-FPBrowser/.github/workflows/web-deploy-oss.yml`
   - `wanyu-FPBrowser/scripts/oss`
2. Read env examples and deployment scripts before changing config.
3. Validate build/start commands from package files or deployment config.
4. For database work, prefer backups and migrations. Avoid direct mutation unless the user explicitly asks.
5. Report what was verified locally and what still requires provider-side confirmation.

## Railway Service Names

- `Frontend`: ztproxy frontend.
- `Backend`: ztproxy backend.
- `IPcheap`: IPcheap frontend.

TODO: confirm exact Railway environment variable naming conventions for each service.

## Production Database Sync Checks

For IPcheap dynamic proxy pricing, production PostgreSQL must include:

- `global_tier_prices.site_code`, defaulting to `ztproxy`.
- Unique constraint on
  `(site_code, product_id, min_traffic, max_traffic)` for global tier prices.
- `dynamic_orders.source_site`, defaulting to `ztproxy`.
- Indexes on both new site/source columns.

Use migrations where possible. If the user explicitly authorizes direct
production repair, keep SQL idempotent, disable GSS for Railway PostgreSQL
clients, force SSL, and report only schema/object names and outcomes.

## Safety

- Never reveal real secret values from `.env`, Railway variables, Cloudflare, Aliyun, payment, email, or supplier configs.
- Use secret names and placeholders only.
- For commands that need network or provider access, request approval if sandbox/network restrictions block progress.
- Treat logs as sensitive; redact tokens, database URLs, emails where needed, and payment identifiers if not necessary.

## References

- Read `../../references/env-deployment.md` for known deployment and env files.
- Read `../../references/commands-and-validation.md` before running deploy/build checks.
