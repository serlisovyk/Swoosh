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
- `services` for API requests
- `types` for feature types

## API and state

- Reuse the shared API layer in `src/shared/api`
- Do not scatter raw API route strings across components
- Keep page files thin and move logic into feature folders

## UI rules

- Reuse shared UI from `src/shared/ui` before creating new primitives
- Keep styles colocated with components
- Follow the existing CSS Modules approach

## Verification

- Run frontend checks from `client`
- Prefer `npm run lint` after frontend code changes
