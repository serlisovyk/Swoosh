---
name: swoosh-backend-module
description: Create and refactor NestJS feature modules in the Swoosh backend using the project's house style. Use when adding a new backend module, reorganizing module files, introducing DTOs, models, constants, types, utils, or aligning controllers, services, and module-local Swagger docs with the existing Swoosh conventions.
---

# Swoosh Backend Module

## Overview

Build backend features in the Swoosh NestJS style instead of default Nest scaffolding. Start by reading the nearest existing module and extend the current conventions rather than inventing a parallel structure.

## Use with Other Skills

- If the task includes Swagger or OpenAPI work, also use `$nestjs-swagger-docs`.
- If the task includes filtered list endpoints, query DTO transforms, or filter builders, also use `$swoosh-query-filters`.
- Treat this skill as the main structural guide for the module, and use the others only for the parts they specialize in.

## Workflow

1. Read neighboring modules before editing.
- Compare `auth`, `products`, and `user`.
- Mirror the current folder layout and naming patterns.
- Reuse shared helpers from `src/common` and `src/shared` before creating new abstractions.

2. Create only the files the module actually needs.
- The usual baseline is `<module>.module.ts`, `<module>.controller.ts`, `<module>.service.ts`, `<module>.constants.ts`, `<module>.types.ts`, and `<module>.swagger.ts`.
- Add `dto/`, `models/`, and `utils/` only when the feature really needs them.
- Prefer one cohesive module folder over scattering feature logic into unrelated shared folders.

3. Keep boundaries clear.
- Controllers handle routes, decorators, request extraction, and response handoff.
- Services hold business logic and database orchestration.
- DTOs define input shape and validation.
- Swagger docs live in `<module>.swagger.ts`.
- Constants hold error messages, examples, enums, and repeated feature-local values.

4. Follow the Swoosh naming style.
- Name feature files with the module prefix, such as `products.service.ts`, `products.constants.ts`, and `products.swagger.ts`.
- Keep DTO names explicit: `CreateXDto`, `UpdateXDto`, `FindAllXDto`.
- Store validation messages in module constants when the module already follows that pattern.
- Keep feature-local types and model aliases in `<module>.types.ts`.

5. Follow the Swoosh Swagger style.
- Use module-local named `...Docs` wrappers.
- Avoid long inline Swagger decorators in DTOs and controllers when the docs file already exists.
- Document public response shapes, not raw database models.

6. Prefer local feature helpers first.
- If logic is only useful inside one module, keep it in `<module>.utils.ts`.
- Promote helpers to `src/shared/utils` only after they are clearly reused across modules.

7. Verify before finishing.
- Build the backend.
- Check path aliases and imports.
- Wire the module into `AppModule` only if it is a top-level feature.

## Structure Checklist

- `constants.ts` for messages, examples, defaults, and enums
- `types.ts` for feature-local types and model aliases
- `dto/` for validated input contracts
- `models/` for Mongoose schemas
- `utils.ts` for feature-local builders and helpers
- `swagger.ts` for tag, property, response, and endpoint docs

## Avoid

- Default Nest scaffolding names that ignore the module prefix.
- Inline validation messages and Swagger descriptions when the module already centralizes them.
- Moving feature-specific helpers into `shared` too early.
- Mixing persistence shape and public API shape.
- Creating empty placeholder files just because another module has them.
