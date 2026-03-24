---
name: swoosh-auth-flow
description: Build, refactor, and review Swoosh authentication flows across the NestJS backend and Next.js frontend. Use when changing login, register, logout, refresh-token rotation, current-user fetches, password reset flows, cookie-based auth, protected route behavior, auth-aware React Query flows, or auth-related Swagger documentation.
---

# Swoosh Auth Flow

## Overview

Work on Swoosh auth as one cross-stack flow, not as isolated frontend and backend changes. Keep cookie-based runtime behavior, frontend query behavior, protected user flow, and Swagger docs aligned.

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
- Keep runtime behavior, frontend assumptions, and Swagger docs aligned.

2. Keep backend auth honest.
- Keep login, register, refresh, and logout behavior centered in the auth module.
- Keep guards and decorators aligned with cookie-based access token extraction.
- Keep auth cookie naming, expiry, and response behavior consistent with the existing auth service pattern.
- Keep access-token and refresh-token signing separated the way the backend already does it: access uses the main JWT secret, refresh uses the refresh secret.
- Keep current-user and role-aware behavior aligned with the real JWT payload and runtime user lookup.

3. Keep frontend auth honest.
- Reuse the shared API instance with `withCredentials` and the refresh-token interceptor flow.
- Keep auth requests in feature `services/` and mutation or query orchestration in feature `queries/`.
- Keep redirects, toasts, and cache updates close to the auth mutation that needs them.
- Keep the current-user query aligned with backend auth state rather than inventing duplicate client auth state.

4. Treat protected user flow as part of auth.
- Consider `get me`, profile access, logout, and auth-aware redirects as part of the same flow.
- When login or logout behavior changes, check whether `me` cache behavior and protected route expectations also change.

5. Handle password-reset flow as first-class auth.
- Keep request-password-reset and reset-password flows aligned across DTOs, forms, query hooks, and email-driven token handling.
- Keep token parsing and reset form validation explicit and easy to follow.
- Keep password-reset tokens generated server-side and stored hashed on the backend rather than persisted in raw form.

6. Keep docs and contract drift low.
- If auth request or response shape changes, update Swagger docs.
- If auth workflow or house-style implementation changes materially, update the relevant repo-local skill as well.
- Do not let frontend assumptions drift away from the real cookie and refresh behavior.

7. Verify before finishing.
- Check one success path and one failure path for the auth flow you changed.
- Check that frontend auth mutations, `me` query behavior, and backend cookies still line up.
- Build or lint the side you touched, and prefer checking both sides when the change crosses the boundary.

## Preferred Pattern

- backend auth orchestration in `server/src/modules/auth`
- cookie-based token handling in the auth service and JWT strategy
- access-token signing on `JWT_SECRET` and refresh-token signing on `JWT_REFRESH_SECRET`
- password-reset tokens generated server-side and stored hashed before DB persistence
- auth docs in `auth.swagger.ts`
- auth forms in `client/src/features/auth/components` plus `schemas/`, `config/`, and `hooks/`
- auth requests in `client/src/features/auth/services`
- auth query and mutation orchestration in `client/src/features/auth/queries`
- current-user state derived from the `me` query and shared API instance behavior

## Avoid

- Treating auth as only a backend or only a frontend change when the contract crosses both.
- Bypassing the shared API instance for normal authenticated frontend requests.
- Reintroducing token handling in local frontend state when cookies and `me` query already define auth state.
- Changing auth cookies or refresh behavior without checking Swagger docs and frontend retry logic.
- Splitting auth side effects across too many layers to follow the real flow.
