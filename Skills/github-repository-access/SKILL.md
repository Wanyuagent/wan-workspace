---
name: wan-github-repository-access
description: Diagnose, grant, and verify GitHub repository access for wan-workspace projects when a user cannot push, receives 403, or appears to have the wrong Read/Write role. Use for repository collaborator and organization-member permissions; do not use for branch-protection failures after repository Write access is already proven.
---

# Wan GitHub Repository Access

Use this Skill to resolve repository-level GitHub permission failures without confusing related repositories or mistaking authentication for authorization.

## Establish the exact target

1. Identify the checkout from which the failing push is run.
2. Read that checkout's `git remote -v`; do not infer the repository from the workspace root, a screenshot, branch name, or a neighboring project.
3. Record the exact `owner/repo`, GitHub username, requested role, and failing operation before changing access.
4. In this workspace, treat these as independent permission targets:
   - `Wanyuagent/wan-workspace`
   - `Wanyuagent/wanyu-FPBrowser`
   - Any other nested repository discovered from its own remote.

## Diagnose effective access

- Distinguish authentication from authorization. OAuth success, CLI login, organization membership, and accepting an invitation do not prove repository Write access.
- Check the user's effective access page for the exact repository. Treat an explicit `read` result or “Nothing explicitly gives ... write access” as evidence that push is not authorized.
- Distinguish the organization base role from direct repository access and team-derived access. A base `Read` role remains Read until a repository, team, or organization rule grants more.
- If effective repository access is already Write, investigate branch rules, token scopes or SSO authorization, credential selection, and the exact remote URL instead of repeatedly re-inviting the user.

## Grant access safely

1. Confirm the exact repository and intended role immediately before the external permission change.
2. Prefer the least privilege that satisfies the request. For ordinary development pushes, use `Write`, not `Maintain` or `Admin`.
3. Add or update the named GitHub account on the exact repository. Do not change the organization base role merely to fix one repository.
4. If GitHub requires sudo-mode authentication, pause for the owner to complete it; never handle their passkey, OTP, or authenticator code.

## Verify the outcome

Do not stop at a success toast or invitation state.

1. Reopen the named account's effective-access page for the exact `owner/repo`.
2. Confirm it states `write access over this repository` and that the grant is active.
3. When the user still reports `403`, ask for or reproduce the exact `git push` command and inspect:
   - the checkout's push remote;
   - which GitHub credential/account Git is using;
   - SSO/token authorization where applicable;
   - branch protection or ruleset rejection text.
4. Report separately: authentication status, effective repository role, invitation status, and whether a real push was verified.

## Evidence boundary

- A repository settings success message proves that GitHub accepted the permission change, not that the user's local credential is correct.
- An effective-access page proving Write still does not prove a protected branch accepts direct pushes.
- A successful push is the final proof for the user's actual local path and credential.

