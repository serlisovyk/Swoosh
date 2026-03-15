---
name: swoosh-form-flow
description: Build and refactor form flows in the Swoosh client using the project's React Hook Form, Zod, field config, and shared UI patterns. Use when adding auth, profile, or other validated forms with submit state, toasts, and mutation-driven UX.
---

# Swoosh Form Flow

## Overview

Build forms in the Swoosh client using the current project pattern: Zod schema, React Hook Form wiring, field config arrays, shared input primitives, and submit flows driven by mutations and toasts.

## Use with Other Skills

- If the form is part of a larger feature or page flow, also use `$swoosh-frontend-feature`.
- If the form submits data through queries or mutations, also use `$swoosh-react-query-api`.
- If the task is reviewing an existing form flow, also use `$swoosh-frontend-review`.
- Keep this skill focused on the form pipeline itself: schema, fields, hooks, component wiring, and submit UX.

## Workflow

1. Start from the nearest existing form flow.
- Compare auth and profile forms before inventing a new structure.
- Reuse `src/shared/form` primitives when they already solve part of the problem.
- Keep the final shape consistent with the surrounding feature.

2. Define validation in schemas first.
- Use Zod schemas in `schemas/`.
- Reuse shared field schemas such as email, password, and name when they already exist.
- Keep form-specific validation inside the feature unless it is truly reusable.

3. Keep field definitions declarative.
- Store repeated field metadata in `config/` when the form renders from a field array.
- Prefer config-driven forms when the feature already follows that pattern.
- Keep labels, placeholders, and field ordering out of the submit handler.

4. Use hooks to connect schema and UI.
- Put React Hook Form wiring inside feature hooks when the project already does that.
- Keep components focused on rendering fields, submit buttons, and small local interactions.
- Surface `errors`, `register`, `handleSubmit`, and loading state cleanly.

5. Reuse shared UI components.
- Use `shared/ui` inputs, buttons, and other primitives before creating feature-local inputs.
- Keep CSS Modules local to the form component.
- Keep loading, disabled, and success states easy to scan in the JSX.

6. Keep submit flows predictable.
- Submit handlers should stay small.
- Success and error feedback should be consistent with the existing toast pattern.
- Router transitions and success messages belong near the mutation hook or feature query hook, not spread across many layers.

7. Verify before finishing.
- Check schema and DTO shape alignment.
- Check validation messages and field configs.
- Check loading, disabled, and error states in the rendered form.

## Preferred Pattern

- schema in `schemas/`
- field definitions in `config/` when useful
- hook in `hooks/`
- form component in `components/`
- mutation or submit side effects in feature queries
- shared primitives from `shared/form` and `shared/ui`

## Avoid

- Inline validation rules spread across JSX.
- Duplicating the same email, password, or confirm-password logic across features.
- Putting business side effects into generic shared form helpers.
- Mixing schema creation, mutation logic, and full UI rendering in one file.
