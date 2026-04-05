# Forms And Data Fetching Rules

## Scope

These rules apply when changing validated forms, shared API usage, React Query flows, or frontend submit handling in `client`.

## Forms

- Build validated forms with Zod and React Hook Form
- Keep schemas in `schemas/`
- Reuse shared field schemas when they already exist
- Keep form-specific validation inside the feature unless it is clearly reusable
- Use `config/` for repeated field metadata when the form is config-driven
- Keep labels, placeholders, and field order out of submit handlers
- Put React Hook Form wiring in feature hooks when the feature already follows that pattern
- Keep form components focused on rendering fields, submit buttons, and small local interactions
- Reuse primitives from `src/shared/form` and `src/shared/ui` before creating feature-local inputs
- Keep loading, disabled, success, and error states explicit

## Submit flows

- Keep submit handlers small
- Keep mutation side effects predictable and easy to trace
- Keep router transitions, success feedback, and toast behavior near the mutation hook or feature query hook
- Do not spread submit side effects across many layers
- Do not put business side effects into generic shared form helpers

## Shared API and React Query

- Reuse the shared API layer in `src/shared/api`
- Do not call `axios` directly from components when the shared API layer already exists
- Reuse shared route constants and query keys instead of inline strings
- Keep services thin: make the HTTP request and return data
- Keep React Query hooks, cache invalidation, optimistic updates, and mutation orchestration in feature `queries/`
- Do not put router redirects, toasts, or React Query cache logic inside services
- Keep request and response contracts in feature `types.ts` files or a `types/` folder instead of scattering them across hooks or components
