# Swoosh Instructions

## Scope

These instructions apply to the whole repository unless a deeper `AGENTS.md` overrides them.

## Repository map

- `client` contains the Next.js frontend
- `server` contains the NestJS backend
- `.codex/skills` contains repo-specific Codex skills

Read the root `README.md` first, then the local README and local `AGENTS.md` in the part of the repo you are changing.

## General rules

- Keep frontend changes inside `client`
- Keep backend changes inside `server`
- Do not edit generated output such as `.next`, `dist`, or `node_modules`
- Do not change `.codex/skills` unless the task is explicitly about skills
- Prefer small, targeted changes that match the existing structure

## Code Conventions

- Prefer simple, readable, and maintainable solutions over clever or overly complex ones
- Use clear names and explicit boundaries of responsibility
- Keep logic testable
- Avoid dead code and hidden side effects

## TypeScript Conventions

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

## Variant Constants

- Prefer `as const` objects with derived union types over enums when the project already follows that pattern

## Skills

- Use repo-local skills from `.codex/skills` when the task clearly matches them
- If a change materially reshapes a stable project pattern, update the relevant repo-local skill when it becomes stale
- Keep `AGENTS.md` focused on stable repo rules, not long step-by-step workflows

## Verification

- After frontend changes, run the relevant checks in `client`
- After backend changes, run the relevant checks in `server`
- If backend logic changes, prefer running tests in addition to lint when possible

## Documentation

- Keep README files concise and human-readable
- Put setup and repo overview in README files
- Put working rules and coding expectations in `AGENTS.md`
- After meaningful changes to setup, architecture, or workflow conventions, update the relevant README, `AGENTS.md`, and repo-local skills if they are now outdated
