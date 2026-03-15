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

## Skills

- Use repo-local skills from `.codex/skills` when the task clearly matches them
- Keep `AGENTS.md` focused on stable repo rules, not long step-by-step workflows

## Verification

- After frontend changes, run the relevant checks in `client`
- After backend changes, run the relevant checks in `server`
- If backend logic changes, prefer running tests in addition to lint when possible

## Documentation

- Keep README files concise and human-readable
- Put setup and repo overview in README files
- Put working rules and coding expectations in `AGENTS.md`
