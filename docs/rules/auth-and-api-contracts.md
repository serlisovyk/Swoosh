# Auth And API Contract Rules

## Scope

These rules apply to auth behavior, Swagger, public request and response contracts, password reset, and other cross-stack API changes.

## Auth model

- The project uses cookie-based auth
- Keep frontend auth state derived from backend auth state, the shared API behavior, and the `me` query
- Do not reintroduce local token storage or a separate client-side token source of truth
- Keep frontend and backend auth assumptions aligned when changing login, register, logout, refresh, `me`, or password reset behavior
- If an auth contract changes on one side, check the other side in the same task

## Auth requests

- Reuse the shared API instance with credentials and the existing refresh-token behavior
- Keep auth request and response handling aligned with the actual cookie and refresh flow
- When auth flows use Cloudflare Turnstile, keep the client site key in validated env handling and send the token through the `cf-turnstile-token` header the backend validates
- Keep auth-specific throttling aligned with the current backend auth flow when changing login, register, or password-recovery endpoints

## Public API contracts

- Keep public request and response contracts explicit
- If request or response shapes change, update Swagger docs
- Keep Swagger auth documentation aligned with runtime behavior
- Use cookie auth in Swagger when runtime reads cookies
- Do not document bearer auth for endpoints that do not actually use `Authorization` headers
- Do not expose passwords, reset tokens, hashed values, or internal-only fields in public responses or docs
- Keep password-reset tokens generated server-side and stored hashed before persistence
- Keep DTO behavior, Swagger docs, and real endpoint behavior aligned
