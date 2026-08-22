---
name: wanyu-release-ops
description: Safely release Wanyu fingerprint-browser and IPProxy changes through scoped commits, remote ancestry checks, Web and desktop tags, GitHub Actions, Railway, Aliyun OSS/CDN, database migration verification, and browser regression. Use when the user asks to submit, push, deploy, tag, publish desktop installers, locate release artifacts, or verify the deployed Web Console and backend production path.
---

# Wanyu Release Operations

Close the real release path. Treat source commit, CI build, uploaded artifact, reachable production, and authenticated E2E as separate evidence levels.

## 1. Establish scope and release targets

1. Read the workspace `AGENTS.md`, then the nearest deployment workflow and package files.
2. Inspect every affected repository independently with `git status`, `git diff`, branch, remote, and recent tags.
3. Preserve unrelated or concurrent changes. Stage explicit task files; never use broad staging in a dirty worktree.
4. For user-visible team or console features, confirm desktop/Web parity and backend/shared-client impact before releasing.
5. Record the exact task commit before push. After push, prove it is an ancestor of the remote release branch; a later concurrent commit may legitimately become the deployed head.

## 2. Validate before publishing

Run the smallest meaningful checks for every affected surface:

- Backend: targeted tests and migration/schema checks.
- Shared client: package tests and typecheck.
- Web Console: typecheck/build plus browser interaction.
- Desktop: typecheck/build and relevant release-contract checks.

Do not turn a successful build into a claim that production interaction passed.

## 3. Commit and push safely

1. Stage only named task files.
2. Review `git diff --cached --stat` and `git diff --cached`.
3. Commit each repository with a focused message.
4. Push the intended branch.
5. Re-fetch or inspect the remote and verify ancestry and the final deployed head.
6. Report unrelated working-tree files separately; do not include or discard them.

## 4. Create and verify tags

Inspect `.github/workflows` and existing tags instead of guessing conventions.

- Web tags commonly use `web-vYYYYMMDDN`.
- Desktop tags use `desktop-v<semver>` and trigger Windows/macOS packaging.
- Use annotated tags unless the repository establishes another convention.
- Push each exact tag and verify the remote tag plus workflow head SHA.

For desktop releases, require terminal success for packaging, release-contract validation, OSS upload, CDN refresh, and public-download checks. A successful Web or macOS job does not prove the Windows package is live.

Windows release locations currently follow:

- Builder output: `apps/desktop/release/<version>/`
- Prepared CI installer: `apps/desktop/upload/win/WanyuAI-Setup.exe`
- OSS key: `desktop/stable/win/WanyuAI-Setup.exe`
- Public URL: `https://download.wanyuagent.com/desktop/stable/win/WanyuAI-Setup.exe`

Verify these paths against the current workflow because release configuration can change.

## 5. Deploy the backend

1. Check the linked Railway project, environment, service, root directory, and latest deployments.
2. Prefer the repository's automatic deployment after pushing `main` when it is configured and healthy.
3. Do not start a redundant `railway up` merely because the automatic deployment is still building.
4. If manual upload is necessary, run it from the repository root when the service already has `rootDirectory=backend`; uploading from `backend` nests the source incorrectly.
5. Confirm the serving deployment's status, commit hash, health endpoint, database health, and affected route reachability.
6. Inspect newer `INITIALIZING` or queued deployments. Do not claim the successful deployment is stable if a later upload may replace it; establish whether it has an image and becomes active.

Never print Railway variables or connection URLs. Build commands so credentials are consumed without echoing them. If a credential appears in output, stop exposing it, disclose the incident, and recommend immediate rotation.

## 6. Handle database migrations conservatively

1. Run the intended Alembic upgrade against the correct production connection without printing secrets.
2. Treat the exit code and migration log as evidence, not proof; verify the exact column, index, constraint, and Alembic heads with read-only SQL.
3. If Alembic encounters an already-existing table or divergent heads, do not use `stamp` across unverified intervening migrations.
4. Apply narrowly scoped, idempotent DDL only when required for the released code and explicitly verify the resulting schema.
5. Report schema readiness and Alembic-history health separately. Schedule migration-chain reconciliation rather than hiding drift.

## 7. Regress the Web Console

Use the browser control skill for real interaction.

1. Verify the deployed workflow and actual asset/domain binding.
2. Navigate directly to the affected route and confirm the final URL, visible DOM, network behavior, and console state.
3. Test desktop and mobile layouts when the feature is responsive.
4. If unauthenticated, verify the login redirect preserves the intended return route.
5. Do not type, retrieve, or inspect stored credentials. Ask the user to sign in when authenticated interaction is required.
6. Never bypass TLS. If the intended domain serves another application, has broken TLS, or lacks an authenticated session, mark online E2E `BLOCKED` or `PARTIAL` precisely.
7. A local production preview can verify routing and rendering but cannot replace deployed authenticated E2E.

For team management, authenticated regression should cover at least:

- Phone-number targeted invitation.
- Existing and future environment scope.
- Real-time group authorization inheritance.
- Second confirmation for sensitive permissions.
- Invitation/member status and validation failures.
- Team dissolution with assets left unassigned while departments and roles remain.

Avoid destructive production tests unless the user explicitly authorizes them and the impact is reversible.

## 8. Close with an evidence matrix

Report each item as `PASS`, `PARTIAL`, `BLOCKED`, or `NOT RUN`:

- Local validation.
- Commit and remote ancestry.
- Remote tags.
- Web deployment workflow.
- Windows/macOS desktop workflow and public artifacts.
- Railway serving deployment and commit.
- Production schema and Alembic history.
- Backend health and route reachability.
- Public Web route.
- Authenticated business E2E.

Include exact commit IDs, tag names, workflow URLs, deployment IDs, and blockers. Never describe an uploaded artifact or `401` route reachability as completed business verification.
