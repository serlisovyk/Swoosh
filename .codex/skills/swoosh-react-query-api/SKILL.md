---
name: swoosh-react-query-api
description: Build and refactor API services, React Query hooks, and mutation flows in the Swoosh client using the project's shared axios instance and query key conventions. Use when adding data fetching, mutations, cache updates, toast feedback, router redirects, or auth-aware API flows in the frontend.
---

# Swoosh React Query API

## Overview

Use `docs/rules/forms-and-data-fetching.md` for the stable service, query, and mutation boundaries, and `docs/rules/auth-and-api-contracts.md` when the flow is auth-aware. This skill covers the task-specific workflow for building or refactoring a concrete frontend data flow.

## Use with Other Skills

- If the API work is part of a new or refactored feature, also use `$swoosh-frontend-feature`.
- If the API work changes login, register, logout, refresh, or current-user behavior, also use `$swoosh-auth-flow`.
- If the API flow drives a form submission, also use `$swoosh-form-flow`.
- If the backend contract is being documented or changed, also use `$nestjs-swagger-docs`.
- If the task is reviewing an existing frontend data flow, also use `$swoosh-frontend-review`.
- Keep this skill focused on services, queries, mutations, cache behavior, and request-side UX.

## Workflow

1. Start from the shared API layer.
- Read `src/shared/api` before creating new services or hooks.
- Reuse `API`, `API_ROUTES`, `API_QUERY_KEYS`, and error helpers.

2. Shape the service layer around the contract.
- Prefer one thin exported service instance per feature service file instead of scattering request helpers across components.
- Keep route paths and params aligned with shared API config.

3. Keep query orchestration explicit.
- Use `useQuery` and `useMutation` wrappers inside feature query files.
- Keep cache update or invalidation logic next to the query hook.
- Keep router transitions and toast side effects close to the mutation that needs them.

4. Use stable query keys and routes.
- Reuse shared query keys and route constants instead of inline strings.
- Add new query keys centrally when the project pattern requires it.
- Keep feature query files easy to scan and explicit about their dependencies.

5. Handle auth-aware flows consistently.
- Keep auth-specific request exceptions explicit when they differ from the default interceptor behavior.

6. Verify before finishing.
- Check success and error paths.
- Check cache invalidation and optimistic updates if added.
- Check that query keys, routes, and return types stay aligned with the feature contract.

## Avoid

- Hiding router redirects and toast behavior deep inside generic helpers.
- Mixing request code, cache logic, and rendering in one file.
- Inventing one-off query key or route strings when central config already exists.
