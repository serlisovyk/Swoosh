# Frontend Instructions

## Scope

These instructions apply to everything under `client`.

## Architecture

- The frontend uses Next.js App Router
- Keep route entry files in `src/app`
- Keep feature logic in `src/features`
- Keep reusable code in `src/shared`

## Feature structure

Prefer the existing feature-first pattern:

- `components` for UI
- `hooks` for local state and form logic
- `queries` for React Query hooks
- `schemas` for Zod validation
- `services` for thin feature API service instances and request methods
- `types` for feature types

## Skills

- Use `swoosh-frontend-feature` for feature structure and page-to-feature composition changes
- Use `swoosh-form-flow` for validated form flows built with React Hook Form and Zod
- Use `swoosh-react-query-api` for shared API, query, mutation, and cache-flow changes
- Use `swoosh-auth-flow` for cross-stack auth changes that span cookies, queries, protected flow, or reset-password UX
- Use `swoosh-frontend-review` for frontend code review focused on regressions, architecture fit, and docs or skill drift
- Use `swoosh-frontend-performance-review` for performance-focused frontend review on weak devices and slow networks
- Use `swoosh-frontend-security-review` for security-focused frontend review on auth-aware UI, rendering, redirects, and data exposure
- If a change materially reshapes one of those frontend patterns, update the corresponding repo-local skill under `.codex/skills`

## API and state

- Reuse the shared API layer in `src/shared/api`
- Do not scatter raw API route strings across components
- Keep page files thin and move logic into feature folders

## UI rules

- Reuse shared UI from `src/shared/ui` before creating new primitives
- Keep styles colocated with components
- Follow the existing CSS Modules approach

## Frontend Conventions

- Destructure props in components
- Keep components reasonably small and split them when they become hard to scan or combine too many responsibilities
- Prefer simple and readable UI logic over clever abstractions
- Avoid introducing new UI libraries unless clearly justified
- Do not define interfaces or types next to components unless there is a strong local-only reason
- Prefer dedicated `types.ts` or `types/` files for component and feature contracts

## Verification

- Run frontend checks from `client`
- Prefer `npm run lint` after frontend code changes
- If frontend structure, setup, or workflow conventions changed, update the relevant frontend README or `AGENTS.md` as part of the task
