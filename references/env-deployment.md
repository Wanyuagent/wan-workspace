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

Known Railway service names:

- `Frontend`: ztproxy frontend.
- `Backend`: ztproxy backend.
- `IPcheap`: IPcheap frontend.

Known IPProxy API routing:

- Base path: `/api`
- Current frontend/client entrypoint: `https://backend-production-127a.up.railway.app`
- Planned reverse-proxy entrypoint: `https://api.wanyuagent.com/v1/api`

## IPProxy Environment Access

Do not store real admin passwords, database passwords, Railway tokens, or full PostgreSQL URLs in this file. Keep secret values in the team password manager, Railway variables, or MCP-backed secret/log access.

### Production

- Backend host: `https://backend-production-127a.up.railway.app`
- Login endpoint: `POST /api/auth/login`
- Admin username: `admin`
- Admin password: get from the password manager or Railway/MCP secret source.
- Auth token response path: `data.token`
- Railway logs: prefer MCP Railway log access when available; otherwise use the approved Railway CLI/log workflow.
- Database access:
  - Preferred: MCP database access.
  - Fallback: Python or `psql` with GSS disabled and SSL required.
  - DSN template: `postgresql://postgres:<PRODUCTION_DB_PASSWORD>@ballast.proxy.rlwy.net:55627/railway`
  - Required connection flags when using libpq-compatible tools: `gssencmode=disable` and `sslmode=require`

Example login shape:

```bash
curl -sS https://backend-production-127a.up.railway.app/api/auth/login \
  -H 'content-type: application/json' \
  -d '{"username":"admin","password":"<ADMIN_PASSWORD>"}'
```

Expected token extraction:

```text
data.token
```

### Staging

- Backend host: `https://backend-staging-3785.up.railway.app`
- Login endpoint: `POST /api/auth/login`
- Admin username: `admin`
- Admin password: get from the password manager or Railway/MCP secret source.
- Auth token response path: `data.token`
- Status note: user-provided latest check says this environment is available.
- Railway logs: prefer MCP Railway log access when available; otherwise use the approved Railway CLI/log workflow.
- Database access:
  - Preferred: MCP database access.
  - Fallback: Python or `psql` with GSS disabled and SSL required.
  - DSN template: `postgresql://postgres:<STAGING_DB_PASSWORD>@kodama.proxy.rlwy.net:20782/railway`
  - Required connection flags when using libpq-compatible tools: `gssencmode=disable` and `sslmode=require`

Example login shape:

```bash
curl -sS https://backend-staging-3785.up.railway.app/api/auth/login \
  -H 'content-type: application/json' \
  -d '{"username":"admin","password":"<ADMIN_PASSWORD>"}'
```

Expected token extraction:

```text
data.token
```

### Python DB Fallback Pattern

Use this only when MCP database access is unavailable. Read the actual database password from a local secret source, not from repository files.

```python
import psycopg2

conn = psycopg2.connect(
    "postgresql://postgres:<DB_PASSWORD>@<HOST>:<PORT>/railway",
    sslmode="require",
    gssencmode="disable",
)

with conn, conn.cursor() as cur:
    cur.execute("select 1")
    print(cur.fetchone())
```

Known IPcheap Railway behavior from `railway.json`:

- Build command: `npm run build`
- Start command: `npm run start`
- Healthcheck path: `/healthz`

IPcheap dynamic proxy production checks require local-only values for:

- `IPPROXY_BACKEND_URL`
- `IPCHEAP_SMOKE_EMAIL`
- `IPCHEAP_SMOKE_PASSWORD`
- `DATABASE_URL`
- Optional Railway access token or logged-in Railway CLI session for logs.

TODO: confirm detailed Railway production variable naming conventions.

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
