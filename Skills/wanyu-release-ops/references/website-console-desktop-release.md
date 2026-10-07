# Website, Web Console, and Desktop Release

Use this reference when one release spans Wanyu's public website, authenticated Web Console, and desktop client.

## Product boundary

Keep three surfaces separate:

- The public website explains the product and links to downloads and help.
- The authenticated Web Console manages cloud configuration and account/team data.
- The desktop client starts and stops the actual fingerprint-browser process and reports runtime status.

Shared backend data does not imply shared UI, local browser state, cookies, cache, kernel, or process state. A Web button must not call `mark-running` or `mark-closed` merely to simulate a client action. Until a complete authenticated client-launch protocol exists, Web run controls may only open guidance.

Treat status shown on the Web as reported state that may lag the real desktop process. Keep runtime-reporting APIs available to the real client.

## Pre-release review

1. Inspect the actual PR heads, merge state, dependency/ancestry, checks, and target branch. Do not assume a related client PR is already merged or deployed.
2. Review the shared API client and both desktop and Web consumers when a cloud configuration field or validation rule changes.
3. Verify environment names, groups, remarks, proxy bindings, team identity, and authorization from saved-and-refetched API data rather than interface wording.
4. Check public claims against implemented behavior. Pricing calculators, plan displays, and employee-seat estimates do not prove checkout, payment, deduction, or entitlement delivery.
5. Keep automation-task submission separate from execution evidence; an accepted request does not prove a browser process started or stopped.

## Required evidence before tagging

- Affected tests, lint, typecheck, and production builds pass on the final heads.
- The client and Web PR heads are both ancestors of the release commit.
- The merged release commit has terminal CI success; a cancelled superseded run is acceptable only when the newer merged-head run succeeds.
- Real API regression covers create, edit, delete, group, search, pagination, proxy modes, validation messages, and cleanup without residual test data.
- A real desktop smoke proves process creation/termination, runtime reporting, and Web refresh where the environment permits it.
- Authenticated second-member authorization is reported separately. Never infer it from a single owner account.

## Release order

1. Merge the client and Web changes according to their dependency order.
2. Wait for merged-main CI on the final release commit.
3. Create and push the desktop tag first.
4. Wait for the desktop workflow to reach terminal success.
5. Verify the public release manifest, updater metadata, installer HTTP response, byte size, checksum metadata, and the version displayed on the download page.
6. Only then create and push the Web tag.
7. Wait for the Web OSS/CDN workflow to reach terminal success.
8. Verify fresh HTML plus its exact hashed JS/CSS assets, public pages, help/download links, and responsive layout.
9. Perform authenticated Web Console regression after deployment. If credentials return `401`, report the authenticated layer as blocked even when public assets are healthy.

Tag names must follow the current workflows rather than this document. Typical forms are `desktop-v<semver>` and `web-v<date><sequence>`.

## Acceptance rules

Do not use any of the following as proof that a browser really ran:

- A successful button click.
- HTTP 2xx from a state or task endpoint.
- A changed status label.
- A submitted automation task.
- A successful Web build or CDN upload.

Runtime acceptance needs a real client process/window transition plus matching server report and refreshed Web state.

For Windows, record whether the installer is code-signed. If unsigned, keep the download-page warning and explicitly report the expected SmartScreen or unknown-publisher prompt.

## Rollback record

Before closing the release, identify:

- The previous desktop version and the OSS stable objects/manifests to restore.
- The previous Web tag or immutable build to redeploy.
- The CDN refresh step for both surfaces.
- Any backend/schema compatibility requirement that prevents independent Web or desktop rollback.

Rollback readiness is evidence, not merely a sentence: retain the exact prior tag/version and verify it still resolves.

## Final report

Report public website, authenticated Web Console, desktop artifact, real desktop runtime, and multi-member authorization as separate rows. Include the release commit, PR status, tags, workflow URLs, public artifact facts, remaining unimplemented capabilities, and rollback target.
