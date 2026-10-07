---
name: wanyu-browser-branding
description: Implement, review, test, or coordinate Wanyu fingerprint-browser branding and launch behavior across WYSDK browser.open payloads, environment serial display, browser icons, search defaults, bookmark chrome, and the branded first-open page. Do not use for ordinary Wanyu console UI work unrelated to the launched browser shell.
---

# Wanyu Browser Branding

Use this Skill for changes involving the browser window opened from the Wanyu desktop app, especially supplier-controlled chrome versus Wanyu-controlled web content.

## Ownership Boundary

- Wanyu controls the desktop launch payload, environment metadata, first-open URL, public first-open page, page title, favicon, and page content.
- The WYSDK supplier controls the browser executable icon and supplier-injected browser chrome unless it exposes a supported configuration field.
- Do not claim that a page favicon or HTML logo changes the Windows executable/title-bar/taskbar icon.
- Never expose `云登`, `YunDeng`, `BroSDK`, or `brosdk` in user-visible content. Compatibility identifiers may remain internal.

## Required Launch Invariants

- Display the Wanyu environment `serial_no`; never substitute the one-time `launch_token` as the visible window serial.
- Send the supplier-supported `yunConfig.shop.shortName` in `browser.open` when configuring the browser chrome.
- Set `yunConfig.finger.fpSwitches.fpBookmark` deliberately: `0` disables the supplier's custom bookmark content. If product wants custom content in that same browser bar, obtain an additional supplier-supported schema instead of assuming HTML can control it.
- Keep the actual default search provider synchronized with the UI choice. For the managed Chromium provider this requires writing the profile preference, not only storing a form field.
- Preserve user-configured startup URLs. Upgrade only the known legacy Wanyu homepage to the current branded first-open route.

## First-open Page

The Wanyu-owned page may show:

- 万域 brand/logo and the title `万域AI指纹浏览器助力跨境电商运营`;
- IPv4 address, country/region, and timezone with copy controls;
- Wanyu environment serial and window remark with copy control;
- network source derived from the window setting: local, Wanyu proxy, or self-owned proxy.

Do not put proxy credentials, launch tokens, internal supplier IDs, or other secrets into the first-open URL.

## Repository Routing

- Launch request and supplier config: `wanyu-FPBrowser/apps/desktop/src/main/ipc/registerIpc.ts`
- Desktop IPC contract: `wanyu-FPBrowser/apps/desktop/src/shared/ipc.ts`
- Browser-provider payloads: `wanyu-FPBrowser/apps/desktop/src/main/sdk` and `wanyu-FPBrowser/packages/wy-sdk/src/brosdk`
- Chromium profile/search handling: `wanyu-FPBrowser/packages/wy-sdk/src/wy/WyBrowserLauncher.ts`
- Startup URL construction: `wanyu-FPBrowser/apps/desktop/src/renderer/src/components/browserHomepage.ts`
- First-open page: `wanyu-FPBrowser/apps/web-marketing/src/pages/BrowserHomePage.tsx`
- Approved PNG icons: `wanyu-FPBrowser/design-assets/generated/logo-v5/windows-png/`

Read [references/supplier-contract-and-acceptance.md](references/supplier-contract-and-acceptance.md) when changing the supplier payload, preparing supplier communication, or checking acceptance.

## Validation

- Run the focused browser-homepage and WYSDK payload tests.
- Run desktop, WYSDK, and Web typechecks for affected packages.
- Build the Web app when the first-open page changes.
- A local build proves code integration only. Report supplier-kernel rendering, Windows executable branding, deployed page behavior, and live proxy/IP display as separate verification boundaries.

