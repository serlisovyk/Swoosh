# Auth And API Contract Rules

## Scope

These rules apply to auth behavior, Swagger, public request and response contracts, password reset, and other cross-stack API changes.

## Auth model

- The project uses cookie-based auth
- Keep frontend auth state derived from backend auth state, the shared API behavior, and the `me` query
- Keep email-verification state derived from the backend user shape such as `isEmailVerified`, not from ad-hoc client flags
- Do not reintroduce local token storage or a separate client-side token source of truth
- Keep frontend and backend auth assumptions aligned when changing login, register, logout, refresh, `me`, email verification, or password reset behavior
- If an auth contract changes on one side, check the other side in the same task

## Auth requests

- Reuse the shared API instance with credentials and the existing refresh-token behavior
- Keep auth request and response handling aligned with the actual cookie and refresh flow
- When auth flows use Cloudflare Turnstile, keep the client site key in validated env handling and send the token through the `cf-turnstile-token` header the backend validates
- Keep auth-specific throttling aligned with the current backend auth flow when changing login, register, email-verification, or password-recovery endpoints

## Email verification

- Treat email verification as part of the auth flow, not as a disconnected profile feature
- Keep registration, resend-verification, verify-email, profile gating, and `me` response shape aligned as one flow
- Keep email-verification tokens generated server-side and stored hashed before persistence
- If registration remains successful when verification-email sending fails, keep resend behavior available and do not silently invent a different fallback contract on the client
- If profile mutations require verified email, enforce that rule server-side and keep client route or UI gating aligned with the same backend rule
- Keep verify-email links and resend behavior documented and throttled consistently with runtime behavior

## Public API contracts

- Keep public request and response contracts explicit
- If request or response shapes change, update Swagger docs
- Keep Swagger auth documentation aligned with runtime behavior
- Use cookie auth in Swagger when runtime reads cookies
- Do not document bearer auth for endpoints that do not actually use `Authorization` headers
- Do not expose email-verification tokens, reset tokens, hashed values, or internal-only fields in public responses or docs
- Keep public user responses aligned with the real auth-aware fields the client depends on, such as `isEmailVerified`
- Keep password-reset and email-verification tokens generated server-side and stored hashed before persistence
- Keep DTO behavior, Swagger docs, and real endpoint behavior aligned
