---
name: swoosh-query-filters
description: Build and refactor list and search query handling in the Swoosh backend using the project's DTO-to-query-options pattern. Use when adding filtered list endpoints, query DTOs, query transforms, sort and limit options, or feature-local filter builders for Mongoose queries.
---

# Swoosh Query Filters

## Overview

Use `docs/rules/backend-architecture.md` for the stable query-endpoint boundaries and `docs/rules/auth-and-api-contracts.md` when the endpoint contract is public or documented. This skill covers the task-specific workflow for building a filtered list flow.

## Use with Other Skills

- If the query work is part of creating or reorganizing a whole feature module, also use `$swoosh-backend-module`.
- If query parameters or list responses must be documented in Swagger, also use `$nestjs-swagger-docs`.
- If the task is reviewing an existing filter or list flow, also use `$swoosh-backend-review`.
- Keep this skill focused on the query pipeline itself: DTO, transforms, filter builder, and service query execution.

## Workflow

1. Start from the existing list flow.
- Read the nearest `FindAll...Dto`, `src/shared/utils/query.utils.ts`, and the module's `<module>.utils.ts`.
- Reuse existing query transforms before adding new ones.
- Keep the endpoint contract consistent with Swagger and Postman.

2. Parse query input in the DTO.
- Use explicit DTO names like `FindAllProductsDto`.
- Use `class-transformer` and `class-validator`.
- Convert repeated params or comma-separated params in the DTO layer.
- Keep DTO properties typed to the normalized result, not the raw query string shape.
- Keep validation messages in module constants.

3. Document query fields in module Swagger docs.
- Add query property docs in `<module>.swagger.ts`.
- Reuse named `...PropertyDocs` wrappers instead of raw `ApiProperty` blocks.
- Keep examples realistic and aligned with the DTO contract.

4. Normalize shared query formats in shared utils.
- Use helpers like `toStringArrayQueryParam` and `toNumberArrayQueryParam` for array-like query values.
- Promote transforms to `src/shared/utils` only when multiple modules benefit.

5. Build database query options in a feature utility.
- Create a function like `buildProductListQueryOptions(dto)`.
- Return a small object such as `{ filters, sort, limit }`.
- Keep default sort and default limit in module constants.
- Keep string matching rules explicit, such as exact case-insensitive regex helpers when needed.
- Keep range handling deterministic, for example by sorting min and max before building `$gte` and `$lte`.

6. Keep services thin.
- Services should call the query-options builder, then apply `.find(filters).sort(sort).limit(limit)`.
- Populate and select logic can stay in the service, but raw query normalization should not.

7. Verify before finishing.
- Build the backend.
- Check that invalid query input fails in DTO validation.
- Check that Swagger examples still match the DTO shape.

## Avoid

- Parsing raw `req.query` inside services
- Duplicating comma splitting and trimming logic in every module
- Hiding business-specific filtering rules inside shared utilities
- Mixing validation, normalization, and DB querying in one large method
- Letting Swagger docs drift away from DTO behavior
