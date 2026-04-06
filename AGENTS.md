# Swoosh Instructions

## Scope

These instructions apply to the whole repository unless a deeper `AGENTS.md` overrides them.

## Repository map

- `client` contains the Next.js frontend
- `server` contains the NestJS backend
- `docs/rules` contains modular stable project rules
- `.codex/skills` contains repo-specific Codex skills

Read the root `README.md` first, then the local README, local `AGENTS.md`, and the relevant files in `docs/rules/` for the part of the repo you are changing.

## Rule files

- Read `docs/rules/code-conventions.md` for TypeScript, naming, and shared code-style conventions
- Read `docs/rules/frontend-architecture.md` for frontend changes in `client`
- Read `docs/rules/backend-architecture.md` for backend changes in `server`
- Read `docs/rules/forms-and-data-fetching.md` for validated forms, shared API usage, React Query flows, and frontend submit handling
- Read `docs/rules/auth-and-api-contracts.md` for auth, Swagger, public contracts, password reset, and other cross-stack API behavior

## General rules

- Keep frontend changes inside `client`
- Keep backend changes inside `server`
- Do not edit generated output such as `.next`, `dist`, or `node_modules`
- Do not change `.codex/skills` unless the task is explicitly about skills
- Prefer small, targeted changes that match the existing structure
- When a code, config, docs, rules, or skill update is directly implied by the task, make that change without asking the user for separate confirmation
- Do not split one logical task into extra confirmation steps unless there is a real product, architectural, destructive, or otherwise non-obvious tradeoff
- Ask follow-up questions only when the decision is genuinely ambiguous or risky enough that guessing would likely cause the wrong result

## Skills

- Use repo-local skills from `.codex/skills` when the task clearly matches them
- If a change materially reshapes a stable project pattern, update the relevant repo-local skill when it becomes stale
- Keep `AGENTS.md` focused on stable repo rules, not long step-by-step workflows

## Verification

- After frontend changes, run the relevant checks in `client`
- After backend changes, run the relevant checks in `server`
- If auth or API contract changes cross the frontend-backend boundary, verify both sides
- If backend logic changes, prefer running tests in addition to lint when possible

## Documentation

- Keep README files concise and human-readable
- Put setup and repo overview in README files
- Put global working rules and coding expectations in `AGENTS.md`
- Put stable domain-specific rules in `docs/rules/`
- After meaningful changes to setup, architecture, or workflow conventions, update the relevant README, `AGENTS.md`, and repo-local skills if they are now outdated
- Before finishing any meaningful functional, architectural, or workflow change, audit documentation surfaces: root `README.md`, local README, relevant `AGENTS.md`, relevant files in `docs/rules/`, and matching repo-local skills in `.codex/skills`
- Update only the documentation files that are actually stale because of the change
- Do not ask the user for separate confirmation before updating stale documentation that is directly implied by the task, unless the user explicitly said not to touch docs
- Treat doc and skill updates as part of the same task when they are needed, not as a separate follow-up decision
- Mention documentation in the final response only when files were actually updated, or when the user explicitly asked about the doc audit
