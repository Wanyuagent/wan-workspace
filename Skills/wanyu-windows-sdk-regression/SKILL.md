---
name: wanyu-windows-sdk-regression
description: Diagnose, repair, validate, and release Wanyu Windows desktop failures involving environment lists, launch-config, WYSDK authorization or roles, system proxies, kernel catalogs, plugin APIs, request IDs, and diagnostic-log redaction. Use for evidence-backed Windows regression reports; do not use for ordinary UI-only changes or unrelated IPProxy incidents.
---

# Wanyu Windows SDK Regression

Use this Skill when a Windows client report mixes backend API failures, desktop transport behavior, WYSDK initialization, environment creation, kernel state, and release verification.

## Establish the failing layer

Treat these as separate evidence domains:

- Wanyu business API: environment list, launch-config, plugin catalog, user plugins.
- Wanyu control-plane transport: direct, system proxy, explicit HTTP CONNECT.
- WYSDK authorization and initialization: userSig issuance, SDK ready, local service state.
- WYSDK business operations: environment creation and browser open/close.
- Local state: installed kernels, cached catalog, historical logs.

Do not label every HTTP 500, timeout, `ECONNRESET`, or cached response as “offline.” A successful health check proves only that route, not authenticated database queries or supplier permissions.

## Diagnose with controlled comparisons

1. Preserve the Windows system proxy and product state unless the user authorizes changes.
2. Compare the same authenticated endpoint through direct and explicit CONNECT routes.
3. Distinguish HTTP status from a business `code` inside a response body.
4. Record local request ID, backend request ID, upstream `reqId`, duration, route, error code, and status without recording credentials.
5. Use A/B/A when a route or environment variable is suspected; restore the original state after the probe.

## Repair rules

- For HTTPS through an HTTP system proxy, use an explicit CONNECT-capable agent and set Axios `proxy: false`; setting `HTTP_PROXY` or `HTTPS_PROXY` alone is not proof of compatible tunneling.
- Preserve structured `code` and `cause` when wrapping errors. Retry classification must inspect the cause chain, not translated UI text.
- Keep local installed-kernel visibility independent of remote authorization. Use live SDK data when ready and a trusted local snapshot when it is not.
- Fall back to the locally generated launch request ID when the server provides no trace ID. Preserve an upstream WYSDK `reqId` when available.
- Redact diagnostic exports again at export time. Cover JWT-like strings, userSig, authorization headers, launch tokens, proxy passwords, and escaped or nested JSON from older logs.
- When plugin models gained columns that production migration history did not apply, verify the exact schema and use narrowly scoped idempotent compatibility DDL only as an interim repair.
- WYSDK `getUserSig` must explicitly request `role: "user"` when environment creation requires that supplier role. A successful userSig response or SDK-ready state does not prove environment-creation permission.

Never log or export the API key, login token, userSig, proxy password, or complete authorization response.

## Validation

Before release, cover the affected boundaries:

- Desktop targeted tests, full desktop suite, typecheck, and production build.
- Shared API client typecheck and at least one consumer check.
- Web Console typecheck/test/build when shared client behavior changed.
- Backend focused contract test or isolated payload assertion plus Python compilation.
- Windows release workflow: NSIS packaging, install/upgrade registration, release contract, OSS upload, CDN refresh, and public metadata version.
- Railway: serving deployment success, startup/schema log, `/health`, and authenticated affected routes when a session is available.

An unsigned installer can be a successful test artifact but must be reported as unsigned, not production-signed.

## userSig refresh procedure

After deploying a userSig contract change:

1. Install the new Windows client if transport behavior also changed.
2. Fully exit the client and its WYSDK background process; a page refresh is insufficient.
3. Restart and sign in.
4. Trigger SDK initialization or environment launch. The client requests a new userSig automatically.
5. If the supplier still rejects the role, capture the new upstream `reqId` and time; do not reuse or expose the signature.

## Release reporting

Report source commit, remote ancestry, desktop tag, CI run, Railway deployment, public installer metadata, tests, authenticated E2E status, and remaining supplier blocker separately.

For the incident that established these rules, read [references/incident-summary.md](references/incident-summary.md) only when historical context or prior evidence is needed.
