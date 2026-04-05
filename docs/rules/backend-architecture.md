# Backend Architecture Rules

## Scope

These rules apply to `server`.

## Architecture

- The backend uses NestJS with a module-based structure
- Keep business code in `src/modules`
- Keep shared infrastructure in `src/common`
- Keep shared config, constants, and helpers in `src/shared`
- Reuse shared helpers before creating parallel abstractions

## Module structure

- Follow the existing module pattern shown by nearby modules before inventing a new layout
- Keep `module`, `controller`, and `service` files as the baseline module entrypoints
- Add `dto`, `models`, `types`, `constants`, `utils`, and `swagger` files only when the module actually needs them
- Keep module-local helpers, constants, and types next to the module until reuse is clear
- Do not move feature-specific helpers into `src/shared` too early

## Responsibility boundaries

- Controllers handle routing, decorators, request extraction, and response handoff
- Services contain business logic and database orchestration
- DTOs define request shape and validation
- Keep public API contracts explicit
- Do not leak persistence shape into public responses
- Keep module-local types in dedicated `types.ts` files when they describe the module contract
- Do not scatter interfaces and types across controllers, services, and DTO files when a module-level `types.ts` is more appropriate

## Query endpoint pattern

- Prefer DTO-based parsing and validation over ad hoc request checks
- Normalize query input in DTOs or dedicated query helpers, not inside services
- Keep module-specific filtering rules in the module
- When a list endpoint already follows a query-options builder pattern, keep using it
- Keep default sort and limit values in module constants when the module already follows that pattern
