---
name: swoosh-auth-flow
description: Build, refactor, and review Swoosh authentication flows across the NestJS backend and Next.js frontend. Use when changing login, register, logout, refresh-token rotation, current-user fetches, email verification, password reset flows, cookie-based auth, protected route behavior, auth-aware React Query flows, or auth-related Swagger documentation.
---

# Swoosh Auth Flow

## Overview

Use `docs/rules/auth-and-api-contracts.md` for the stable auth and public-contract rules, plus `docs/rules/forms-and-data-fetching.md` when the task touches frontend auth queries or forms. This skill covers the task-specific workflow for changing auth as one cross-stack flow, including verification-email and token-by-link flows.

## Use with Other Skills

- Use `$swoosh-backend-module` when the task changes backend auth module structure or DTO layout.
- Use `$nestjs-swagger-docs` when the task changes auth contracts, cookie docs, or protected endpoint documentation.
- Use `$swoosh-form-flow` when the task changes login, register, forgot-password, or reset-password forms.
- Use `$swoosh-react-query-api` when the task changes frontend auth queries, mutations, cache behavior, or refresh handling.
- Use `$swoosh-frontend-review` or `$swoosh-backend-review` when the task is review-heavy rather than implementation-heavy.
- Treat this skill as the cross-stack auth guide, and use the others only for the slices they specialize in.

## Workflow

1. Start from the whole auth flow.
- Read both backend auth files and frontend auth feature files before changing only one side.

2. Keep backend auth honest.
- Keep login, register, refresh, and logout behavior centered in the auth module.
- Keep guards and decorators aligned with cookie-based access token extraction.
- When auth endpoints use Cloudflare Turnstile, keep the package-backed decorator, `common/captcha` config, Russian exception messages, and Swagger header docs aligned.
- Keep auth-specific throttling tighter on login, register, email-verification, and password-recovery endpoints than the global default so brute-force protection lives with the auth flow instead of relying only on app-wide limits.
- Keep auth cookie naming, expiry, and response behavior consistent with the existing auth service pattern.
- Keep access-token and refresh-token signing separated the way the backend already does it: access uses the main JWT secret, refresh uses the refresh secret.
- Keep current-user and role-aware behavior aligned with the real JWT payload and runtime user lookup.
- Keep verification-email and password-reset tokens generated server-side and stored hashed before persistence.
- If register sends a verification email, keep failure handling explicit and consistent with the real product decision instead of silently changing whether registration should fail or continue.
- If profile mutations require verified email, keep that protection enforced in the backend instead of relying only on client route guards.

3. Keep frontend auth honest.
- Keep auth requests in feature `services/` and mutation or query orchestration in feature `queries/`.
- Keep redirects, toasts, and cache updates close to the auth mutation that needs them.
- When auth forms use Turnstile, keep the site key in validated `shared/env`, keep captcha state in the auth provider layer, reserve layout space for the widget, and send the token through the same `cf-turnstile-token` header the backend validates.
- Keep email-verification UI state derived from `me` data such as `isEmailVerified` instead of separate client-only flags.
- Keep verify-email token parsing, resend mutations, and profile gating explicit and easy to trace from the auth feature.

4. Treat protected user flow as part of auth.
- Consider `get me`, profile access, logout, and auth-aware redirects as part of the same flow.
- When login, logout, or email-verification behavior changes, check whether `me` cache behavior and protected route expectations also change.

5. Handle token-by-email flows as first-class auth.
- Keep request-password-reset and reset-password flows aligned across DTOs, forms, query hooks, and email-driven token handling.
- Keep request-email-verification and verify-email flows aligned across DTOs, queries, emails, route pages, and token parsing.
- Keep token parsing and token validation explicit and easy to follow.

6. Keep docs and contract drift low.
- If auth request or response shape changes, update Swagger docs.
- If auth user shape changes, update docs and any client-derived auth helpers that depend on it.
- If auth workflow or house-style implementation changes materially, update the relevant repo-local skill as well.

7. Verify before finishing.
- Check one success path and one failure path for the auth flow you changed.
- Check that frontend auth mutations, `me` query behavior, and backend cookies still line up.
- Build or lint the side you touched, and prefer checking both sides when the change crosses the boundary.

## Avoid

- Treating auth as only a backend or only a frontend change when the contract crosses both.
- Changing auth cookies or refresh behavior without checking Swagger docs and frontend retry logic.
- Splitting auth side effects across too many layers to follow the real flow.
