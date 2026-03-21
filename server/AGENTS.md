# Backend Instructions

## Scope

These instructions apply to everything under `server`.

## Architecture

- The backend uses NestJS with a module-based structure
- Keep business code in `src/modules`
- Keep shared infrastructure in `src/common`
- Keep shared config, constants, and helpers in `src/shared`

## Module structure

Prefer the existing NestJS pattern:

- `module` wires dependencies
- `controller` handles routing and request mapping
- `service` contains business logic
- `dto` contains request validation and transport shapes
- `models` contains Mongoose models
- `types`, `constants`, `utils`, and `swagger` stay next to the module when needed

## API rules

- Keep controllers thin
- Put business logic and database orchestration in services
- Prefer DTO-based validation over ad hoc request checks
- Reuse shared helpers from `src/shared` when a pattern already exists

## Backend Conventions

- Keep public API contracts explicit
- Avoid leaking persistence shape into public responses
- Keep module-local types in dedicated `types.ts` files
- Do not scatter interfaces and types across controllers, services, and DTO files when a module-level `types.ts` is more appropriate

## Swagger and docs

- If you change request or response contracts, check whether Swagger docs also need an update
- Keep Swagger-related code near the module or shared Swagger setup already used by the backend

## Skills

- Use `swoosh-backend-module` for backend module structure and house-style alignment
- Use `nestjs-swagger-docs` for Swagger and OpenAPI documentation changes
- Use `swoosh-query-filters` for list, search, and query-filter pipelines
- Use `swoosh-auth-flow` for auth changes that span cookies, Swagger contracts, frontend auth flow, or current-user behavior
- Use `swoosh-backend-review` for backend code review focused on regressions, contract safety, and docs or skill drift
- Use `swoosh-backend-performance-review` for performance-focused backend review on latency, payload size, and database cost
- Use `swoosh-backend-security-review` for security-focused backend review on auth, validation, config, and data exposure
- If a change materially reshapes one of those backend patterns, update the corresponding repo-local skill under `.codex/skills`

## Verification

- Run backend checks from `server`
- Prefer `npm run lint` after backend changes
- If logic changes, prefer `npm run test` as well when possible
