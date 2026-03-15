---
name: nestjs-swagger-docs
description: Add, refactor, and review Swagger/OpenAPI documentation for NestJS backends that use @nestjs/swagger. Use when documenting controllers, DTOs, response models, auth schemes, shared Swagger config, or cleaning up Swagger structure into module-local docs files and reusable decorators.
---

# NestJS Swagger Docs

## Overview

Add or refactor Swagger in NestJS backends without turning controllers and DTOs into decorator soup. Start by reading the repo's existing Swagger architecture and extend it instead of inventing a parallel style.

## Use with Other Skills

- If the Swagger work is part of creating or reorganizing a Swoosh backend module, also use `$swoosh-backend-module`.
- If the Swagger work covers filtered list endpoints or query DTOs, also use `$swoosh-query-filters`.
- If the task is reviewing backend contract changes, also use `$swoosh-backend-review`.
- Keep this skill focused on API documentation structure, auth documentation, and public contract clarity.

## Workflow

1. Inspect the existing Swagger layout first.
- Find shared config, helpers, constants, and module-local docs files.
- Reuse established naming, security schemes, tag strategy, operationId strategy, and example patterns.
- If the repo already has `common/swagger` and `<module>.swagger.ts`, keep using that structure.

2. Keep runtime code clean.
- Prefer named `...Docs` wrappers over long inline `ApiProperty(...)` and `ApiResponse(...)` blocks.
- Keep DTOs focused on validation and input shape.
- Keep controllers focused on routing and behavior.
- Store module-specific Swagger helpers in `<module>.swagger.ts` when the repo already follows that pattern.

3. Document the public contract, not the persistence model.
- Create response docs for the fields clients should actually receive.
- Do not expose passwords, reset tokens, hashed values, internal timestamps, or ORM/Mongoose-only fields unless intentionally public.
- If documenting a response reveals unsafe data exposure, fix the service/controller contract before finalizing the docs.

4. Keep auth honest.
- Match Swagger security to actual runtime behavior.
- Use cookie auth if guards read cookies.
- Use bearer auth only when the API really expects `Authorization` headers.
- If global security requirements are enabled, explicitly clear `security` for public endpoints and override it for refresh-only routes.

5. Name things consistently.
- Use a stable suffix such as `...Docs`.
- Keep operation summaries short and verb-first.
- Reuse examples and enums from module constants when possible.
- Keep tag names readable and aligned with feature boundaries.

6. Verify before finishing.
- Build the backend.
- If practical, open Swagger UI and spot-check one public route, one protected route, and one mutation route.
- Confirm the generated OpenAPI shape remains readable for Postman import.

## Preferred Patterns

### Shared setup

- Keep one Swagger setup entrypoint for `DocumentBuilder` and `SwaggerModule.setup`.
- Centralize shared auth schemes, site title, operationId logic, and UI options there.
- Use global security requirements only if you are prepared to explicitly mark public endpoints as public.

### Module docs

- Keep one `<module>.swagger.ts` per module when the repo already uses that structure.
- Export tag decorators, property decorators, response docs classes, and endpoint decorators from that file.
- Group related docs in a predictable order: tags, property docs, response docs, endpoint docs.

### DTO docs

- Prefer small named wrappers like `ProductsColorNamePropertyDocs()` over repeated raw `@ApiProperty({...})`.
- Use optional vs required docs decorators deliberately.
- Reuse module constants for examples and enums.

### Endpoint docs

- Wrap route-level docs in named decorators like `AuthLoginDocs()` or `UserGetProfileDocs()`.
- Include status responses that matter for frontend and Postman use: typically `400`, `401`, `403`, `404`, and `409` where relevant.
- Keep descriptions concrete and aligned with business behavior.

## Starter Pattern for Repos Without Conventions

If the repo has no Swagger structure yet, start with:
- one shared Swagger config module
- one shared helper for property decorators
- one `<module>.swagger.ts` per module
- named `...Docs` wrappers for DTO properties and endpoint responses
- response docs classes stored in the module swagger file

Do not introduce extra abstraction unless the repetition is real and recurring.

## Review Checklist

Before finishing, check:
- Are public and protected routes marked correctly?
- Do auth schemes match runtime behavior?
- Do response docs expose only public fields?
- Are examples realistic?
- Are tags and summaries easy to scan in Swagger UI and Postman?
- Does the backend still build cleanly?

## Avoid

- Scatter long inline Swagger decorators across many DTOs when the repo already centralizes docs.
- Reuse database entities or Mongoose models as public response docs without reviewing exposed fields.
- Document bearer auth when runtime reads cookies.
- Create a new Swagger architecture when the repo already has a working one.
- Over-abstract two lines of code into a helper that is harder to read than the duplication.
