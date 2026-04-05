# Code Conventions Rules

## Scope

These rules apply across the whole repository.

## Code conventions

- Prefer simple, readable, and maintainable solutions over clever or overly complex ones
- Use clear names and explicit boundaries of responsibility
- Keep logic testable
- Avoid dead code and hidden side effects

## TypeScript conventions

- Keep TypeScript strict
- Prefer `interface` for object-shaped public contracts when practical
- Prefer `type` for unions, mapped types, utility composition, and literal-based variants
- Avoid `any` unless there is a strong reason
- Prefer narrowing over assertions
- Keep types explicit and easy to follow

## Naming

- Use PascalCase for components and exported interfaces or types
- Use camelCase for variables and functions
- Use ALL_CAPS for constants
- Use handler names like `onClick`
- Use state setter names like `setX`

## Variant constants

- Prefer `as const` objects with derived union types over enums when the project already follows that pattern
