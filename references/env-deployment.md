# Env And Deployment Reference

Do not store real secrets in this repository-level documentation.

## Env Files Found

- `IPProxy/.env.example`
- `IPProxy/.env.development`
- `IPProxy/.env.production`
- `IPProxy/.env.test`
- `IPProxy/backend/.env.example`
- `IPProxy/Agent/.env.example`
- `IPcheap/.env.example`
- `wanyu-FPBrowser/apps/web-marketing/.env.oss.example`
- `wanyu-FPBrowser/apps/web-marketing/.env.development`
- `wanyu-FPBrowser/apps/web-marketing/.env.production`
- `wanyu-FPBrowser/apps/desktop/.env.development`

When documenting env, copy names from examples and replace values with placeholders.

## Railway

Known Railway-related files:

- `IPProxy/backend/Dockerfile`
- `IPProxy/backend/nixpacks.toml`
- `IPProxy/frontend.railway.toml`
- `IPProxy/start-railway.sh`
- `IPProxy/Agent/railway.toml`
- `IPcheap/railway.json`

Known IPcheap Railway behavior from `railway.json`:

- Build command: `npm run build`
- Start command: `npm run start`
- Healthcheck path: `/healthz`

TODO: confirm current Railway service names and production variable names.

## Aliyun OSS/CDN

Known Wanyu web deployment files:

- `wanyu-FPBrowser/.github/workflows/web-deploy-oss.yml`
- `wanyu-FPBrowser/scripts/oss/deploy-web.sh`
- `wanyu-FPBrowser/scripts/oss/configure-web-website.sh`
- `wanyu-FPBrowser/doc/ops/aliyun-oss-static-web.md`
- `wanyu-FPBrowser/doc/ops/web-deploy-oss.yml.example`

Secret names referenced by the workflow include:

- `ALIYUN_OSS_BUCKET_WEB`
- `ALIYUN_OSS_REGION`
- `ALIYUN_OSS_KEY_ID`
- `ALIYUN_OSS_KEY_SECRET`
- `ALIYUN_CDN_REFRESH_URLS`
- `WEB_VITE_API_BASE`
- `WEB_VITE_DOWNLOAD_BASE`

## Cloudflare

Cloudflare DNS/CDN is part of the operating environment but provider config was not found in the scanned repository files.

TODO: document zone names, DNS records, proxied status, SSL mode, cache rules, and origin mapping when the user provides them.

## Sensitive Areas

Redact or avoid:

- PostgreSQL URLs and passwords.
- Railway tokens and service variables.
- Aliyun access keys.
- Cloudflare API tokens.
- Payment provider keys and webhook secrets.
- Supplier API keys and account identifiers.
- JWT/session/email credentials.
