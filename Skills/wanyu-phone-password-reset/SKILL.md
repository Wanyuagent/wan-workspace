---
name: wanyu-phone-password-reset
description: Implement, review, test, or release Wanyu phone-account self-service password reset using the existing SMS verification system. Use for forgot-password UI, reset-password APIs, SMS scene binding, session revocation, and related configuration; do not use for email-only recovery or administrator-driven password changes.
---

# Wanyu Phone Password Reset

Implement the complete phone-account recovery path across IPProxy and the Wanyu public web app. Treat deployment and real SMS delivery as separate external actions that require the user's request.

## Project boundaries

- Backend provider: `IPProxy/backend`.
- Shared client: `wanyu-FPBrowser/packages/api-client`.
- Public recovery UI: `wanyu-FPBrowser/apps/web-marketing/src/pages/auth`.
- This workflow is public-web account recovery, not a desktop-renderer feature. Do not add a desktop page unless the product requirement explicitly includes it.
- Preserve the existing email recovery path and registration SMS behavior.

## Required behavior

Use the existing SMS verification service instead of creating another OTP store. A complete implementation should:

- accept a distinct `reset_password` SMS scene;
- bind every challenge to the phone, code, verification id, and scene;
- retain existing expiry, resend cooldown, phone/IP rate limits, maximum attempts, and one-time consumption;
- update the stored password only after successful challenge consumption;
- hash the password with the project's existing password helper;
- invalidate prior login sessions after a successful reset;
- expose the reset endpoint through both backend public-path allowlists;
- add matching payloads and methods to the shared API client;
- connect the login page's forgot-password route to a working phone, SMS code, new-password, and confirmation form.

Do not log plaintext phone numbers, SMS codes, passwords, access keys, or Redis values.

## Enumeration resistance

The SMS-send response must not reveal whether a phone exists. For an unknown phone, return the same public success wording and a plausible temporary verification id without sending an SMS. The reset submission should use a generic invalid-or-expired-code error for unknown accounts.

Keep timing and payload differences small enough that the ordinary client cannot trivially distinguish registered and unregistered numbers. Do not claim stronger side-channel protection unless it was specifically measured.

## SMS templates and configuration

The existing variables remain authoritative:

- `ALIBABA_CLOUD_ACCESS_KEY_ID`
- `ALIBABA_CLOUD_ACCESS_KEY_SECRET`
- `ALIYUN_SMS_SIGN_NAME`
- `ALIYUN_SMS_REGISTER_TEMPLATE_CODE`
- `ALIYUN_SMS_ENDPOINT`
- `SMS_HASH_SECRET`
- `REDIS_URL`

Support `ALIYUN_SMS_RESET_PASSWORD_TEMPLATE_CODE` for reset-specific wording. It may fall back to the existing registration template for compatibility, but call out that production should configure a reset-password template if the existing template says “注册”. Document names only; never copy real secret values into code, tests, output, or commits.

## Files to inspect

Start with targeted reads of:

- `IPProxy/backend/app/routers/auth.py`
- `IPProxy/backend/app/services/sms_verification.py`
- `IPProxy/backend/app/main.py`
- `IPProxy/backend/.env.example`
- `wanyu-FPBrowser/packages/api-client/src/api.ts`
- `wanyu-FPBrowser/packages/api-client/src/types.ts`
- `wanyu-FPBrowser/apps/web-marketing/src/App.tsx`
- `wanyu-FPBrowser/apps/web-marketing/src/pages/auth/LoginPage.tsx`
- the current forgot-password page and auth styles

Adapt to current code rather than assuming the exact endpoint or component shape recorded here still exists.

## Validation

Add focused backend tests that prove:

- a reset challenge is scene-bound and consumed once;
- successful reset hashes the new password, commits it, and records session revocation;
- an unknown phone does not call the SMS provider and receives a non-enumerating response;
- the SMS provider receives the reset scene so it can choose the correct template.

Add a frontend test that proves the page sends `scene: 'reset_password'`, retains the returned verification id, and submits it with the phone, code, and new password.

Run the smallest relevant checks:

```bash
cd IPProxy/backend && pytest -q tests/test_sms_verification.py tests/test_phone_password_reset.py
cd wanyu-FPBrowser && pnpm --filter @wanyu/api-client typecheck
cd wanyu-FPBrowser && pnpm --filter @wanyu/web-marketing typecheck
cd wanyu-FPBrowser && pnpm --filter @wanyu/web-marketing test
cd wanyu-FPBrowser && pnpm --filter @wanyu/web-marketing build
```

If local backend imports are missing but declared project dependencies cannot safely be changed, install only the test-time packages into a temporary directory and use `PYTHONPATH`. Match the project's Python version and compatible dependency versions; do not convert that workaround into production dependencies.

Report pre-existing deprecation warnings and bundle-size warnings separately from functional failures. Do not send a real SMS, modify production environment variables, deploy, or claim live acceptance unless those actions were explicitly requested and verified.
