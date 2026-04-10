---
name: swoosh-frontend-feature
description: Create and refactor frontend features in the Swoosh client using the project's App Router and feature-sliced house style. Use when adding or reorganizing feature folders, pages, components, config, hooks, queries, schemas, services, types, providers, or shared UI integration in the Next.js client.
---

# Swoosh Frontend Feature

## Overview

Use `docs/rules/frontend-architecture.md` for the stable frontend architecture rules. This skill covers the task-specific workflow for creating or reorganizing a frontend feature without drifting from nearby Swoosh patterns.

## Use with Other Skills

- If the feature includes forms, also use `$swoosh-form-flow`.
- If the feature includes API requests, queries, or mutations, also use `$swoosh-react-query-api`.
- If the task is reviewing an existing frontend change, also use `$swoosh-frontend-review`.
- Treat this skill as the main structural guide for the feature, and use the others only for the parts they specialize in.

## Workflow

1. Read neighboring features first.
- Compare `auth`, `product`, and `profile`.
- Mirror the existing folder layout and naming patterns.
- Pick the closest existing feature shape before adding files.

2. Create only the files the feature actually needs.
- Common folders include `components`, `config`, `constants`, `hooks`, `queries`, `schemas`, `services`, `types`, `utils`, `providers`, and `data`.
- Do not create every folder by default.
- Add a folder only when the feature truly needs that concern.

3. Follow the existing naming and export style.
- Feature-local files keep the feature prefix, such as `profile.queries.ts` or `product.services.ts`.
- `index.ts` and `index.tsx` files are used for clean exports when the surrounding feature already follows that pattern.
- When a slice grows multiple constants, types, or utility files, prefer dedicated `constants/`, `types/`, and `utils/` folders with local `index.ts` barrels and explicit filenames such as `server.constants.ts` or `server.types.ts`.
- Keep frontend import order aligned with `docs/rules/code-conventions.md`: external libs first, then other project imports, then local feature imports, with local `types` near the bottom and CSS Module imports last.

4. Keep reuse decisions grounded.
- Prefer feature-local code when reuse is still speculative.
- If you think something belongs in `shared`, sanity-check that at least one nearby feature would benefit too.

5. Keep render files focused.
- When a component or hook starts accumulating pure helper logic such as pagination math, URL shaping, or display mapping, move that logic into feature-local `utils/` or a dedicated hook.

6. Verify before finishing.
- Run the client build or lint when practical.
- Check imports and route composition.
- Make sure the final feature still feels consistent with nearby features in the repo.

## Avoid

- Inventing a new folder layout when nearby Swoosh features already show the preferred pattern.
- Creating shared abstractions before the reuse case is real.
- Turning the skill into a reason to override the stable rules in `docs/rules/frontend-architecture.md`.
