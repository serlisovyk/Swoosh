---
name: swoosh-frontend-review
description: Review Swoosh frontend changes for bugs, regressions, architecture drift, and stale docs or skills. Use when reviewing Next.js client code, checking feature boundaries, form and query flows, shared abstraction hygiene, user-facing states, or deciding whether frontend README, AGENTS, or repo-local skills should be updated after meaningful changes.
---

# Swoosh Frontend Review

## Overview

Review Swoosh frontend changes like a project-aware reviewer, not a generic linter. Prioritize bugs, regressions, architecture fit, and stale workflow documentation before style nits.

## Use with Other Skills

- Use `$swoosh-frontend-feature` when the review involves feature structure, page composition, or folder layout.
- Use `$swoosh-form-flow` when the change affects validated forms, field config, or submit UX.
- Use `$swoosh-react-query-api` when the change affects services, queries, mutations, cache behavior, or auth-aware request flows.
- Use `$swoosh-frontend-performance-review` when performance on weak devices or slow networks is a primary concern.
- Use `$swoosh-frontend-security-review` when auth-aware browser behavior, rendering safety, or data exposure is a primary concern.
- Treat this skill as the review rubric, and use the others only to judge whether the implementation still follows the intended pattern.

## Review Workflow

1. Start with correctness and regressions.
- Look for behavior changes, broken states, missing error handling, stale assumptions, and user-facing regressions.
- Focus findings on concrete risk, not taste.

2. Check Swoosh frontend boundaries.
- Keep route files in `src/app` thin.
- Keep feature logic in `src/features`.
- Keep `src/shared` reserved for code that is truly reused.
- Call out abstractions that were moved into `shared` too early.

3. Review form flow when forms are touched.
- Check whether Zod schemas, form hooks, field config, and rendered fields still align.
- Check loading, disabled, success, and error states.
- Check whether submit side effects are spread across too many layers.

4. Review API and query flow when data fetching is touched.
- Check whether services stay thin and React Query orchestration stays in `queries/`.
- Check whether cache invalidation or updates are correct.
- Check whether the shared API layer and shared route or query key constants are still being reused.
- Check whether auth-aware requests still respect the shared cookie-based flow.

5. Review UI composition and reuse.
- Check whether components are doing too much at once.
- Check whether feature-local UI was pushed into shared too early.
- Check whether CSS Modules remain colocated and readable.
- Check essential accessibility basics when relevant, such as button semantics, labels, and obvious disabled-state issues.

6. Check documentation and skills drift.
- If a change materially alters frontend setup, folder structure, workflow conventions, or a stable implementation pattern, check whether the relevant `README`, `AGENTS.md`, and repo-local skill should also change.
- Only raise this when the pattern itself changed, not for routine feature work.
- Examples: changed feature layout, changed form pipeline, changed API query flow, changed setup or environment assumptions.

7. Finish with verification gaps.
- Note missing lint or runtime checks when they matter to confidence.
- If there are no findings, say so explicitly and mention any residual risk or unverified area.

## Review Checklist

- Are route files still thin and feature-oriented?
- Is code staying in the right layer: `app`, `features`, or `shared`?
- Did the change introduce premature shared abstractions?
- Do forms still follow the schema, hook, config, component split?
- Do services, queries, and mutations still follow the shared API pattern?
- Are loading, error, empty, and success states handled?
- Did the change alter a stable pattern enough that `README`, `AGENTS.md`, or a repo-local skill is now stale?

## Avoid

- Treating stylistic preference as a review finding without a concrete downside.
- Requiring README or skill updates for routine feature work that did not change a stable pattern.
- Ignoring cache, auth, or disabled-state regressions because the code "looks clean".
- Focusing on formatting while missing architecture drift or user-facing breakage.
