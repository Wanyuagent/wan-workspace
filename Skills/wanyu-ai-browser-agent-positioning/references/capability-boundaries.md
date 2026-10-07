# Capability Boundaries

Use this reference for architecture, current-state, integration, and roadmap answers. Reinspect current code before treating this snapshot as current.

## Current Execution Foundation

The verified design has two scopes:

- A global local MCP surface for service health, environment listing/lookup, browser open/close/status, and obtaining an environment endpoint.
- A per-environment controlled browser surface for navigation, page reading, text search, clicking, typing, screenshots, waiting, window/status operations, and artifacts, subject to the current external allowlist.

The local endpoint is a controlled execution base on `127.0.0.1`. It is not by itself a remote enterprise Agent platform.

Recording/replay is useful as a foundation but historically records MCP tool names, parameters, timestamps, and environment context. Do not describe it as complete human-demonstration capture unless current code proves this.

## What the Agent Can Do Without a New Control Plane

When the Agent and Wanyu run on the same computer, the Agent can compose exposed tools to:

- Find and open an authorized existing environment.
- Navigate, inspect, read, click, fill, wait, and take screenshots.
- Perform supervised multi-account inspection and repetitive browser workflows.
- Prepare replies, entries, and reports while pausing before consequential submission.
- Follow packaged Skills that define tool order, stop conditions, and output format.

It cannot invent missing MCP tools. Environment creation/editing, proxy binding/rotation, durable scheduling, enterprise approvals, centralized audit, multi-device orchestration, and digital-employee lifecycle management require product development unless current code now exposes them.

## Architecture Choices

### Same-device Codex or Tencent WorkBuddy

Use:

`Agent -> Wanyu local MCP -> desktop execution -> browser environment`

Keep the server on loopback, use separate revocable client credentials, authorize environments and actions, add desktop confirmation for high-risk actions, and test the actual client transport. A small stdio-to-local-MCP bridge is the preferred fallback for a client that cannot consume the existing local HTTP transport.

### Cloud, Remote, or Enterprise Operation

Use:

`Agent -> HTTPS MCP Gateway -> policy/task/approval layer -> outbound desktop connection -> local browser execution`

The remote layer needs tenant isolation, OAuth or scoped credentials, device registration, asynchronous task state, callbacks or polling, failure recovery, audit, rate limits, and approval enforcement. Keep it separate from the core IPProxy backend unless an explicit architecture decision changes that boundary.

## Commercial Framing

Lead with these defensible messages:

- The fingerprint browser provides isolated identity, Cookie, proxy/network, and permission boundaries for multi-account work.
- The Agent reduces manual clicking, checking, copying, filling, and report preparation inside those governed environments.
- The product path upgrades traditional IP sales into a higher-retention solution combining IP resources, browser environments, AI-assisted workflows, and ongoing service.

Do not claim autonomous results merely because a build, connection, screenshot, or tool call succeeded. Separate technical execution evidence from customer acceptance and business outcomes.

## Concise External Explanation

When someone asks “which MCP is this?”, answer along these lines:

> 这是万域AI指纹浏览器自研的本地MCP Server，基于标准MCP协议，让Codex、腾讯WorkBuddy等Agent在用户授权范围内调用浏览器环境和受控网页操作能力。MCP是开放的Agent连接协议；万域提供服务端和浏览器执行能力，Codex或WorkBuddy是调用端。
