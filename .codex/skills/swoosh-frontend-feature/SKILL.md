---
name: swoosh-frontend-feature
description: Create and refactor frontend features in the Swoosh client using the project's App Router and feature-sliced house style. Use when adding or reorganizing feature folders, pages, components, config, hooks, queries, schemas, services, types, providers, or shared UI integration in the Next.js client.
---

# Swoosh Frontend Feature

## Overview

Build frontend features in the Swoosh client using the existing `app`, `features`, and `shared` split instead of ad hoc page-level code. Start by reading the nearest existing feature and keep new work aligned with the current house style.

## Use with Other Skills

- If the feature includes forms, also use `$swoosh-form-flow`.
- If the feature includes API requests, queries, or mutations, also use `$swoosh-react-query-api`.
- If the task is reviewing an existing frontend change, also use `$swoosh-frontend-review`.
- Treat this skill as the main structural guide for the feature, and use the others only for the parts they specialize in.

## Workflow

1. Read neighboring features first.
- Compare `auth`, `product`, and `profile`.
- Mirror the existing folder layout and naming patterns.
- Reuse `shared` primitives before creating new ones.

2. Keep pages thin.
- Use `src/app/(pages)` files to compose feature entrypoints.
- Keep route files focused on page wiring, layout selection, and feature mounting.
- Put most feature logic inside `src/features/<feature>`.

3. Create only the files the feature actually needs.
- Common folders are `components`, `config`, `constants`, `hooks`, `queries`, `schemas`, `services`, `types`, `utils`, `providers`, and `data`.
- Do not create every folder by default.
- Add a folder only when the feature truly needs that concern.

4. Keep responsibility boundaries clear.
- Components render UI and connect hooks.
- Config files hold field definitions and small declarative setup.
- Hooks coordinate form and interaction logic.
- Queries wrap React Query hooks and mutation side effects.
- Services talk to the API layer.
- Schemas define validation rules.
- Types define the feature contract.

5. Follow the Swoosh naming style.
- Feature-local files keep the feature prefix, such as `profile.queries.ts` or `product.services.ts`.
- CSS Modules stay next to the component they style.
- `index.ts` and `index.tsx` files are used for clean exports when the surrounding feature already follows that pattern.

6. Prefer feature-local code before shared abstractions.
- Keep feature-specific data, constants, and helpers inside the feature.
- Move code into `src/shared` only after it is clearly reused across features.
- Avoid turning one successful pattern into a shared abstraction too early.

7. Verify before finishing.
- Run the client build or lint when practical.
- Check imports and route composition.
- Make sure the final feature still feels consistent with nearby features in the repo.

## Structure Checklist

- `components/` for feature UI pieces
- `config/` for declarative field and view configuration
- `hooks/` for feature interaction logic
- `queries/` for React Query hooks
- `schemas/` for Zod validation
- `services/` for API calls
- `types/` for feature contracts
- `providers/` for feature-local guards or contexts
- `data/` for static feature data
- `utils/` for feature-local helpers

## Avoid

- Putting real feature logic directly into `app/(pages)` route files.
- Creating shared abstractions before at least two features need them.
- Mixing API calls, form logic, and rendering into one large component.
- Inventing a new folder layout when nearby Swoosh features already show the preferred pattern.
