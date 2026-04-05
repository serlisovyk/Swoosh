---
name: swoosh-backend-module
description: Create and refactor NestJS feature modules in the Swoosh backend using the project's house style. Use when adding a new backend module, reorganizing module files, introducing DTOs, models, constants, types, utils, or aligning controllers, services, and module-local Swagger docs with the existing Swoosh conventions.
---

# Swoosh Backend Module

## Overview

Use `docs/rules/backend-architecture.md` for the stable backend module rules and `docs/rules/auth-and-api-contracts.md` when public contracts or auth are involved. This skill covers the task-specific workflow for creating or reorganizing a backend module in Swoosh.

## Use with Other Skills

- If the task includes Swagger or OpenAPI work, also use `$nestjs-swagger-docs`.
- If the task includes login, register, refresh, logout, or current-user auth behavior, also use `$swoosh-auth-flow`.
- If the task includes filtered list endpoints, query DTO transforms, or filter builders, also use `$swoosh-query-filters`.
- If the task is reviewing an existing backend change, also use `$swoosh-backend-review`.
- Treat this skill as the main structural guide for the module, and use the others only for the parts they specialize in.

## Workflow

1. Read neighboring modules before editing.

- Compare `auth`, `products`, and `user`.
- Mirror the current folder layout and naming patterns.

2. Create only the files the module actually needs.

- The usual baseline is `<module>.module.ts`, `<module>.controller.ts`, `<module>.service.ts`, `<module>.constants.ts`, `<module>.types.ts`, and `<module>.swagger.ts`.
- Add `dto/`, `models/`, and `utils/` only when the feature really needs them.

3. Follow the Swoosh naming style.

- Name feature files with the module prefix, such as `products.service.ts`, `products.constants.ts`, and `products.swagger.ts`.
- Keep DTO names explicit: `CreateXDto`, `UpdateXDto`, `FindAllXDto`.
- Store validation messages in module constants when the module already follows that pattern.

4. Follow the existing Swagger style when the module exposes or changes public contracts.

- Use module-local named `...Docs` wrappers.
- Avoid long inline Swagger decorators in DTOs and controllers when the docs file already exists.

5. Keep module-local implementation details close to the module.

- Keep module builders and helpers close to the module until reuse is proven.
- Promote helpers to `src/shared/utils` only after they are clearly reused across modules.

6. Verify before finishing.

- Build the backend.
- Check path aliases and imports.
- Wire the module into `AppModule` only if it is a top-level feature.

## Avoid

- Default Nest scaffolding names that ignore the module prefix.
- Moving feature-specific helpers into `shared` too early.
- Creating empty placeholder files just because another module has them.
