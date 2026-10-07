---
name: wanyu-ai-browser-agent-positioning
description: Explain, position, and plan the Wanyu AI fingerprint browser, its self-developed MCP Server, and its integration with Codex or Tencent WorkBuddy. Use for investor or partner messaging, capability comparisons, local-versus-remote MCP decisions, and Agent integration roadmaps; do not use to claim that planned digital-employee control-plane features are already implemented.
---

# Wanyu AI Browser and Agent Positioning

Anchor every answer on Wanyu's actual product boundary:

- Wanyu owns isolated browser environments, login state, proxy/network context, controlled browser execution, and the local MCP connection.
- Codex or Tencent WorkBuddy is the Agent client that understands a goal and calls permitted tools.
- MCP is an open Agent-to-tool protocol, not a proprietary product from Codex, Tencent, or Wanyu.
- Wanyu's product is the self-developed MCP Server and controlled browser execution layer built on that protocol.

## Start With the Requested Audience

- For investors or partners, lead with the business result: upgrade IP sales into `IP + isolated browser environment + AI-assisted operations + recurring service`.
- For customers, explain the work saved: environment setup, account checks, messages/orders/ads inspection, repetitive entry, cross-platform copying, and report preparation.
- For technical questions, separate the Agent, MCP protocol, Wanyu MCP Server, desktop execution node, and browser environment.
- For roadmap questions, distinguish `available now`, `possible through current tools`, `needs a small adapter`, and `requires a control plane`.

Keep WeChat drafts short and directly forwardable when the user asks for a message.

## Verify Before Making Current-State Claims

For implementation or current-capability questions, inspect the current branch and at least:

- `wanyu-FPBrowser/apps/desktop/src/main/mcp/BroSdkMcpAgentService.ts`
- `wanyu-FPBrowser/apps/desktop/src/main/mcp/mcpAccessStore.ts`
- `wanyu-FPBrowser/apps/desktop/src/main/codex/CodexConnectionService.ts` when present
- `wanyu-FPBrowser/apps/desktop/src/renderer/src/pages/McpAgentPage.tsx`

Do not infer that a tool exists merely because the underlying SDK could support it. Check the actual externally exposed tool allowlist and transport.

Read [references/capability-boundaries.md](references/capability-boundaries.md) when answering architecture, integration, security, roadmap, or “can it already do this?” questions.

## Product and Safety Boundaries

- Do not call the current local MCP, rule-based natural-language helper, or recording UI a completed enterprise digital-employee platform.
- Current recording/replay means recorded MCP tool calls unless current code proves broader human mouse/keyboard capture.
- Never describe the system as granting itself permissions. It may request additional authority; an administrator approves it.
- Payments, refunds, deletion, price changes, publishing, sending, and account-security changes require explicit human confirmation or second-factor control.
- Do not expose arbitrary JavaScript, raw CDP, shell execution, cookies, tokens, passwords, or unrestricted local files to external Agents.
- Preserve Wanyu branding in user-visible text. Do not expose legacy supplier or SDK names.

## Local MCP Decision Rule

Local MCP is basically sufficient when Codex or Tencent WorkBuddy runs on the same logged-in, online computer as Wanyu and operates only local browser environments. Require a real connection test before claiming compatibility.

Recommend a remote HTTPS MCP Gateway only when the request includes cloud/web/mobile initiation, cross-device access, unattended or offline-queued work, centralized enterprise administration, public distribution, multi-tenancy, OAuth, or centralized approval/audit.

If Tencent WorkBuddy cannot consume the existing local HTTP transport, propose a narrow stdio bridge before proposing a complete cloud platform.

## Preferred Capability Roadmap

Prioritize reliability and governance over adding unrestricted low-level commands:

1. Semantic page inspection and stable element references.
2. Structured results, stable identifiers, recoverable error codes, and evidence artifacts.
3. Server-enforced environment authorization and preview-confirm-execute flows.
4. Task status, cancellation, checkpoints, retry, and human takeover.
5. Focused Skills for real workflows such as multi-account inspection, order/message review, and operating reports.
6. Only after validated demand: environment/proxy lifecycle tools, remote gateway, multi-tenant control plane, and digital-employee management.

When discussing WorkBuddy or another fast-moving platform, verify its current official connector and transport documentation before making compatibility claims.
