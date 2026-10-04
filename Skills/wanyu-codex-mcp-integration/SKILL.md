---
name: wanyu-codex-mcp-integration
description: Build, review, test, or repair Wanyu fingerprint-browser integration with Codex through the local desktop MCP server, including secure authentication, one-click Codex configuration, browser-tool allowlisting, desktop IPC/UI wiring, and release readiness. Do not use for generic Codex questions or unrelated MCP servers.
---

# Wanyu Codex MCP Integration

Deliver a local Codex connection that is safe by default, preserves the user's Codex configuration, and exposes only constrained browser operations.

## Scope and boundaries

- Work in `wanyu-FPBrowser`; treat `IPProxy/backend` as an existing API provider unless the task explicitly requires backend changes.
- This integration is desktop-specific because it manages a local MCP listener and the user's local Codex configuration. Do not invent a Web Console equivalent. Keep Web parity only for capabilities that can actually operate in a browser-only surface.
- Internal compatibility identifiers may remain when required, but user-visible text must use `万域` or `WYSDK`, never vendor names or internal SDK branding.
- Never print, persist, commit, or place real access tokens in UI copy, logs, diagnostics, test fixtures, or release notes.

## Current implementation map

- MCP tool server and allowlist: `apps/desktop/src/main/mcp/BroSdkMcpAgentService.ts`
- Codex config lifecycle: `apps/desktop/src/main/mcp/CodexConnectionService.ts`
- Local token storage: `apps/desktop/src/main/mcp/mcpAccessStore.ts`
- HTTP authentication boundary: `apps/desktop/src/main/openapi/OpenApiServer.ts`
- Main-process initialization: `apps/desktop/src/main/index.ts`
- IPC and preload contracts: `apps/desktop/src/main/ipc/registerIpc.ts`, `apps/desktop/src/shared/ipc.ts`, `apps/desktop/src/preload/index.ts`
- One-click UI: `apps/desktop/src/renderer/src/pages/McpAgentPage.tsx`

Inspect these paths before adding another connection layer or duplicating token/config logic.

## Security invariants

1. Bind the MCP/OpenAPI listener to loopback. Do not expose it on LAN interfaces.
2. Require `Authorization: Bearer <token>` for every external MCP request. There is no anonymous fallback.
3. Generate a high-entropy token locally. Persist it only through Electron `safeStorage`; if encryption is unavailable, fail safely instead of writing plaintext.
4. Compare credentials without ordinary string equality when practical, and never return the token from status APIs.
5. Do not enable permissive CORS for the local control server.
6. External Codex tools must be an explicit allowlist. Do not expose raw script evaluation, arbitrary browser commands, environment destruction, token mutation, installation primitives, or generic command execution.
7. Navigation accepts only `http:` and `https:` URLs. Element actions must be scoped operations such as snapshot, click, and text input; internally generated evaluation must JSON-encode values rather than concatenate untrusted script text.
8. Keep destructive or account-changing operations behind separate product authorization and human confirmation. A Codex connection does not expand the user's authority.

## One-click Codex configuration

- Manage only a clearly marked Wanyu block in the Codex `config.toml`; preserve all unrelated user content byte-for-byte where feasible.
- Use an atomic temp-file replacement and restrictive file permissions.
- Write the loopback MCP URL plus the bearer header and enabled state.
- `connect`, `disconnect`, and `status` must be idempotent. Disconnect removes only the managed Wanyu block.
- Respect `CODEX_HOME` when explicitly set; otherwise resolve the normal local Codex directory from the user's home path.
- After connecting, tell the user when Codex must restart or reload before the new server becomes available.
- Tests must use a temporary directory and synthetic tokens. Never modify the developer's real Codex configuration during automated validation.

## Tool design

Prefer small, auditable tools that map to a single browser intent:

- Read-only discovery: list environments/windows, status, page snapshot, current URL/title.
- Controlled actions: open an existing environment, navigate to an allowed URL, click a resolved element, type text into a resolved element.
- Return structured errors and enough context for recovery without leaking proxy credentials, cookies, tokens, or page secrets.
- If a requested capability requires arbitrary JavaScript or a raw protocol escape hatch, stop and redesign it as a constrained typed operation.

## Validation

Run the smallest relevant checks, then broaden before release:

1. Targeted tests for `CodexConnectionService`, MCP allowlisting/action encoding, and OpenAPI authentication.
2. Desktop main and renderer typechecks.
3. Desktop lint and production build.
4. Full desktop tests. If loopback tests fail with `listen EPERM` in the sandbox, rerun only those socket tests with the required local-network permission; do not treat the sandbox failure as a product defect.
5. `git diff --check`, staged-diff review, and a secret scan before commit.
6. Manual acceptance in a packaged desktop build: connect, restart/reload Codex, enumerate the Wanyu MCP tools, perform a safe browser read/action, disconnect, and confirm unrelated Codex config remains intact.

Do not claim a build or unit test proves real Codex discovery or packaged-app behavior.

## Commit and release

- Preserve unrelated dirty work. Stage explicit files, and use partial staging for mixed files such as `registerIpc.ts`.
- Keep security/integration changes separate from unrelated browser homepage, plugin-center, or SDK work.
- For Git push, desktop tags, GitHub Actions, OSS/CDN upload, and public installer verification, use `Skills/wanyu-release-ops/SKILL.md`.
- Windows and macOS are separate release targets. Publish only the platform requested by the user.
- A successful packaging job is not a completed release until the public update manifest names the intended version and the installer URL returns the matching artifact.
- If OSS upload fails only because a bounded timeout is shorter than observed throughput, update both the workflow limit and its release-contract verifier, validate locally, and retry. Do not silently weaken integrity checks or publish metadata before the matching installer is fully promoted.

## Completion report

Report separately:

- Security boundary and exposed tool set.
- Local automated validation.
- Real Codex/package acceptance status.
- Commit and remote ancestry.
- Requested platform workflow result.
- Public manifest and installer verification.
- Known limitations, especially unsigned Windows artifacts or acceptance steps not run.
