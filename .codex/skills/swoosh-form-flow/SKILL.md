---
name: swoosh-form-flow
description: Build and refactor form flows in the Swoosh client using the project's React Hook Form, Zod, field config, and shared UI patterns. Use when adding auth, profile, or other validated forms with submit state, toasts, and mutation-driven UX.
---

# Swoosh Form Flow

## Overview

Use `docs/rules/forms-and-data-fetching.md` for the stable form and submit-flow rules. This skill covers the task-specific workflow for building or refactoring a concrete form flow in Swoosh.

## Use with Other Skills

- If the form is part of a larger feature or page flow, also use `$swoosh-frontend-feature`.
- If the form is part of the auth flow, also use `$swoosh-auth-flow`.
- If the form submits data through queries or mutations, also use `$swoosh-react-query-api`.
- If the task is reviewing an existing form flow, also use `$swoosh-frontend-review`.
- Keep this skill focused on the form pipeline itself: schema, fields, hooks, component wiring, and submit UX.

## Workflow

1. Start from the nearest existing form flow.
- Compare auth and profile forms before inventing a new structure.
- Keep the final shape consistent with the surrounding feature.

2. Define validation in schemas first.
- Start with the feature schema and reuse shared field schemas such as email, password, and name when they already exist.

3. Keep field definitions declarative.
- Prefer config-driven forms when the feature already follows that pattern.

4. Use hooks to connect schema and UI.
- Surface `errors`, `register`, `handleSubmit`, and loading state cleanly.

5. Keep submit feedback easy to follow.
- Success and error feedback should be consistent with the existing toast pattern.
- Make the success path, failure path, and disabled state obvious in the rendered UI.

6. Verify before finishing.
- Check schema and DTO shape alignment.
- Check validation messages and field configs.
- Check loading, disabled, and error states in the rendered form.

## Avoid

- Inline validation rules spread across JSX.
- Duplicating the same email, password, or confirm-password logic across features.
- Mixing schema creation, mutation logic, and full UI rendering in one file.
