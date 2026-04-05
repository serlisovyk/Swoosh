# Frontend Instructions

## Scope

These instructions apply to everything under `client`.

## Read first

- Read `../docs/rules/frontend-architecture.md` for all frontend changes
- Read `../docs/rules/forms-and-data-fetching.md` when the task touches forms, shared API usage, React Query, or submit handling
- Read `../docs/rules/auth-and-api-contracts.md` when the task touches auth, Swagger-linked contracts, or other cross-stack API behavior

## Skills

- Use `swoosh-frontend-feature` for feature structure and page-to-feature composition changes
- Use `swoosh-form-flow` for validated form flows built with React Hook Form and Zod
- Use `swoosh-react-query-api` for shared API, query, mutation, and cache-flow changes
- Use `swoosh-auth-flow` for cross-stack auth changes that span cookies, queries, protected flow, or reset-password UX
- Use `swoosh-frontend-review` for frontend code review focused on regressions, architecture fit, and docs or skill drift
- Use `swoosh-frontend-performance-review` for performance-focused frontend review on weak devices and slow networks
- Use `swoosh-frontend-security-review` for security-focused frontend review on auth-aware UI, rendering, redirects, and data exposure
- If a change materially reshapes one of those frontend patterns, update the corresponding repo-local skill under `.codex/skills`

## Verification

- Run frontend checks from `client`
- Prefer `npm run lint` after frontend code changes
- If auth or API contract changes affect the backend as well, verify both sides
- If frontend structure, setup, or workflow conventions changed, update the relevant frontend README or `AGENTS.md` as part of the task
