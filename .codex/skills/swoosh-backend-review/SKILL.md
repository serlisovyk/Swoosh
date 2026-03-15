---
name: swoosh-backend-review
description: Review Swoosh backend changes for bugs, regressions, architecture drift, and stale docs or skills. Use when reviewing NestJS server code, checking module boundaries, DTO and service design, Swagger or auth contract changes, query filter patterns, or deciding whether backend README, AGENTS, Swagger docs, or repo-local skills should be updated after meaningful changes.
---

# Swoosh Backend Review

## Overview

Review Swoosh backend changes like a project-aware reviewer, not a generic style checker. Prioritize correctness, API contract safety, architecture fit, and stale documentation before low-value nits.

## Use with Other Skills

- Use `$swoosh-backend-module` when the review involves module structure, DTO layout, models, constants, or module-local organization.
- Use `$nestjs-swagger-docs` when the change affects request or response contracts, auth docs, or Swagger structure.
- Use `$swoosh-query-filters` when the change affects list endpoints, query DTO transforms, or filter builders.
- Treat this skill as the review rubric, and use the others only to judge whether the implementation still follows the intended pattern.

## Review Workflow

1. Start with correctness and regressions.
- Look for behavioral bugs, unsafe response changes, missing validation, authorization gaps, and broken edge cases.
- Focus findings on concrete risk, not style preference.

2. Check Swoosh backend boundaries.
- Keep controllers thin.
- Keep business logic and orchestration in services.
- Keep DTOs focused on transport shape and validation.
- Keep feature-specific helpers local unless they are clearly shared.

3. Review public contract safety.
- Check whether public responses expose only intended fields.
- Check whether persistence shape leaked into the API contract.
- Check whether changing request or response shape should have triggered Swagger updates.

4. Review auth, security, and query handling when relevant.
- Check that guards, decorators, cookies, roles, and auth flows still match runtime behavior and docs.
- Check that query parsing stays in DTOs or query helpers rather than drifting into services.
- Check that filtered list logic still follows the DTO-to-query-options pattern when that pattern is already in use.

5. Review docs and skill drift.
- If a change materially alters backend setup, module conventions, auth workflow, Swagger structure, or a stable implementation pattern, check whether the relevant `README`, `AGENTS.md`, Swagger docs, or repo-local skill should also change.
- Only raise this when the pattern itself changed, not for routine endpoint work.
- Examples: changed module file conventions, changed Swagger style, changed auth contract, changed query-filter workflow, changed setup assumptions.

6. Finish with verification gaps.
- Note missing build, lint, or test coverage when they materially affect confidence.
- If there are no findings, say so explicitly and mention residual risk or unverified areas.

## Review Checklist

- Are controllers, services, DTOs, and module helpers staying in the right layer?
- Did the change expose unsafe fields or blur the public API contract?
- Do auth behavior and Swagger docs still match the runtime contract?
- Do query DTOs, transforms, and filter builders still follow the project pattern?
- Did the change alter a stable pattern enough that `README`, `AGENTS.md`, Swagger docs, or a repo-local skill is now stale?

## Avoid

- Treating formatting preference as a review finding without a concrete downside.
- Requiring README or skill updates for routine backend work that did not change a stable pattern.
- Missing auth or contract regressions because the code structure looks tidy.
- Focusing on decorator placement while ignoring runtime behavior and API safety.
