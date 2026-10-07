---
name: wanyu-plugin-mcp-console
description: Build, review, test, or explain the Wanyu Plugin Center workflow and the user-facing MCP / Agent automation console. Use for plugin-to-environment assignment, Chrome extension synchronization, console tools, recordings, replay, Artifacts, or natural-language capability explanations; use wanyu-codex-mcp-integration instead for MCP authentication, Codex configuration, allowlisting, or connection security.
---

# Wanyu Plugin and MCP Console

Keep the product workflow and the implemented capability aligned. Inspect code and API behavior before treating UI copy or a screenshot as proof.

This skill covers product workflow, console presentation, and evidence-bounded explanations. For local MCP authentication, Codex configuration, external-tool allowlisting, or security/release readiness, use `Skills/wanyu-codex-mcp-integration/SKILL.md` instead.

## Route the task

- Plugin Center UI:
  - Desktop: `wanyu-FPBrowser/apps/desktop/src/renderer/src/pages/PluginCenterPage.tsx`
  - Web Console: `wanyu-FPBrowser/apps/web-marketing/src/pages/console/PluginCenterPage.tsx`
  - Shared client: `wanyu-FPBrowser/packages/api-client/src/api.ts`
  - Backend routes and binding rules: `IPProxy/backend/app/routers/browser.py` and `IPProxy/backend/app/services/browser_env_service.py`
- MCP / Agent UI and runtime:
  - Workbench: `wanyu-FPBrowser/apps/desktop/src/renderer/src/pages/McpAgentPage.tsx`
  - MCP service and tool definitions: `wanyu-FPBrowser/apps/desktop/src/main/mcp/BroSdkMcpAgentService.ts`
  - Renderer bridge: `wanyu-FPBrowser/apps/desktop/src/preload/index.ts`, `apps/desktop/src/shared/ipc.ts`, and `apps/desktop/src/main/ipc/registerIpc.ts`

## Plugin Center interaction invariant

The primary managed-plugin workflow is:

1. Choose a plugin in the outer Plugin Center list.
2. Open the plugin's environment-assignment control.
3. Show the environments where that plugin is currently enabled.
4. Let the user select one or more target environments and confirm once.

Do not make environment selection the first step of the primary workflow. Adding a plugin to the user's account is not the same as applying it to an environment. When confirmation needs both, add or enable the account plugin first, then preserve every environment's other plugin bindings while adding or removing only the selected plugin.

Treat Chrome Web Store extensions as a separate supplemental flow. Opening the store, scanning an installed profile, synchronizing extension metadata, and binding a platform-managed plugin are different actions; label them accordingly. Do not imply that browsing a store page installs or applies an extension to Wanyu environments.

User-visible workflow changes that apply to both products must preserve desktop/Web parity. A desktop-only capability such as reading a local browser profile may remain desktop-specific, but the reason and Web limitation must be explicit.

## MCP / Agent capability boundary

Explain the module as a local browser-automation control surface:

- The global MCP endpoint manages SDK, environments, browser lifecycle, status, and endpoint discovery.
- An environment endpoint scopes page tools to one browser environment.
- Page tools can navigate, inspect tabs, read text or HTML, search, take snapshots or screenshots, upload or download, print PDF, run controlled CDP actions, and execute supported expressions.
- Recording captures MCP tool calls and arguments made after recording starts. It does not automatically capture all manual mouse and keyboard activity.
- Replay re-executes saved tool calls in order; it is not guaranteed to reproduce external websites whose state has changed.
- Artifacts hold large local outputs and are read in chunks by Artifact ID.
- The current natural-language executor is a deterministic step parser for supported commands such as open, navigate, status, snapshot, screenshot, and close. Do not describe it as a general autonomous AI agent unless the implementation changes.

The endpoints bind to loopback by default. Do not describe them as remotely reachable without verifying network configuration and authentication. Tools such as `evaluate`, `run`, upload, download, and CDP commands are powerful; preserve environment scoping and do not weaken authorization or session checks.

Never expose legacy vendor branding in user-facing copy. Use `万域` or `WYSDK`; compatibility-only identifiers may remain internal.

## Validation

For Plugin Center changes:

- Verify current bindings are loaded before editing.
- Confirm applying one plugin does not erase unrelated plugins in the same environment.
- Confirm deselection removes only that plugin.
- Check empty-environment, loading, partial-failure, and account-plugin states.
- Typecheck/build both desktop and `@wanyu/web-marketing`; use real interaction when a deployed environment is in scope.

For MCP changes:

- Run the closest `BroSdkMcpAgentService` tests and affected desktop typecheck/build.
- Distinguish unit results, local endpoint behavior, live browser control, and production behavior in the report.

For explanation-only requests, make no business-code changes. Cite the implementation files and clearly separate implemented behavior, limitations, and intended future capability.
