# Windows 3.16.15–3.17.3 Incident Summary

## Initial symptoms

The Windows client simultaneously showed an offline environment list, launch-config failure, WYSDK authorization/network warnings, and an empty kernel catalog. The first evidence established that these were multiple failures collapsed into similar UI warnings, not one confirmed Windows networking problem.

## Confirmed causes

- Authenticated environment and launch-config APIs returned a database error because production `browser_envs` lacked six network-connection columns.
- WYSDK authorization and kernel catalog routes independently showed slow responses, upstream 500/502 responses, and timeouts.
- The client marked any cached-list failure as offline and discarded backend context from launch errors.
- The kernel page built its view from the remote catalog, hiding locally installed kernels when authorization or catalog loading failed.
- Diagnostic actions were initially disconnected; a later direct-copy implementation exported a historical JWT-form userSig without secondary redaction.
- On Windows with the system HTTP proxy at `127.0.0.1:10808`, Axios environment-variable proxy rewriting sent an absolute HTTPS URL to the proxy instead of establishing CONNECT. Direct and explicit CONNECT probes succeeded.
- Wrapped Chinese authorization errors dropped the original network code, making transient failures appear non-retryable.
- Plugin APIs still failed after environment-table repair because the deployed plugin table lacked newer model columns.
- After transport was bypassed, WYSDK environment creation returned business error “角色无效.” The supplier confirmed that `getUserSig` must include `role: "user"`; the omitted-role default cannot create environments.

## Implemented resolution

- Added idempotent startup repair for environment network columns and plugin version-policy columns.
- Preserved request IDs and stopped logging authorization response bodies.
- Added explicit HTTPS CONNECT agents for desktop control-plane requests and disabled Axios proxy rewriting.
- Preserved error `code/cause` and made retry classification recursive.
- Added installed-kernel snapshot fallback independent of SDK initialization.
- Added local launch-ID fallback and upstream request-ID preservation.
- Added export-time credential redaction for current and historical logs.
- Changed the backend WYSDK userSig request to include `role: "user"` with a contract assertion.

## Releases and evidence

- `3.17.2` restored database behavior and improved error presentation but failed Windows regression because system-proxy transport still reset authorization requests.
- `3.17.3` contained CONNECT transport, retry, kernel snapshot, diagnostic redaction, and request-ID improvements.
- The backend role fix was deployed with the plugin schema compatibility repair.
- Local desktop verification reached 39 test files and 178 passing tests, plus desktop and Web builds.
- Windows CI completed NSIS packaging, real install/upgrade registration, release-contract validation, OSS upload, CDN refresh, and public metadata verification.
- The published Windows artifact was an unsigned test release; that must remain explicit in release reporting.

## Evidence boundaries

- A build or uploaded installer does not prove authenticated Windows environment creation.
- A 200 userSig response and SDK-ready state do not prove the supplier role can create an environment.
- A `401` without a session proves route reachability and authentication enforcement, not business success.
- Supplier account/role mapping requires the upstream `reqId` and supplier logs; do not infer the internal mapping from local output.
