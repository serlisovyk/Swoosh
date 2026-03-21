---
name: swoosh-backend-security-review
description: Review Swoosh backend code for security risks in API behavior, auth, validation, and data exposure. Use when analyzing cookie-based auth, guards, roles, DTO validation, sensitive field leaks, password-reset flows, CORS and cookie setup, Swagger contract safety, secret handling, or backend changes that could introduce authorization, authentication, or information disclosure risks.
---

# Swoosh Backend Security Review

## Overview

Review Swoosh backend changes through an API-security lens. Focus on auth correctness, authorization boundaries, input validation, sensitive data exposure, and configuration risks that matter in real request flows.

## Use with Other Skills

- Use `$swoosh-auth-flow` when the review touches login, register, refresh, logout, guards, current-user behavior, or password-reset flow.
- Use `$nestjs-swagger-docs` when request or response contracts, auth docs, or cookie docs may drift from secure runtime behavior.
- Use `$swoosh-query-filters` when filter inputs or list endpoints may create validation or exposure risks.
- Use `$swoosh-backend-review` for broader correctness and architecture review alongside security review.
- Use `$swoosh-backend-performance-review` only when security fixes may also affect request cost or payload shape.
- Treat this skill as the backend security rubric, and use the others only for the layers they specialize in.

## Review Workflow

1. Start with trust boundaries.
- Identify which endpoints are public, authenticated, role-protected, or token-driven.
- Focus on where untrusted input crosses into auth, DB access, response shaping, or configuration.

2. Review authentication and authorization.
- Check whether guards, role checks, cookie extraction, refresh behavior, and current-user lookup really enforce the intended boundary.
- Check whether public vs protected routes are marked and implemented consistently.
- Look for places where refresh, logout, or password reset could behave incorrectly under malformed or missing tokens.

3. Review input validation and query handling.
- Check that DTO validation is present where untrusted input enters.
- Check that query parsing and filter building stay explicit and do not allow unintended behavior through loose parsing.
- Call out places where raw request data flows too far before validation.

4. Review sensitive data exposure.
- Check whether responses, logs, exceptions, or docs expose fields that should remain private.
- Check whether auth-related responses, user responses, or populated objects leak internal fields.
- Check whether Swagger docs describe only safe public contracts.

5. Review config and transport security assumptions.
- Check cookie options, CORS credentials behavior, secure flags, and environment-driven assumptions for obvious mismatches.
- Check whether secrets, tokens, or environment values are handled safely in code and config.
- Call out suspicious defaults, but separate confirmed risk from environment-dependent concern.

6. Review password-reset and recovery flow when relevant.
- Check token handling, reset request behavior, reset-password validation, and error responses for information leakage or weak boundary checks.
- Check whether the flow leaks account existence or behaves inconsistently for invalid tokens.

7. Review docs and skill drift when relevant.
- If a change materially alters a security-sensitive backend pattern, check whether `AGENTS.md`, Swagger docs, or repo-local skills should also change.
- Raise this only when the security-sensitive pattern itself changed, not for routine endpoint work.

8. Report findings with honest confidence.
- Group findings into concrete risks, probable weaknesses, and lower-priority hardening ideas.
- Distinguish between confirmed vulnerability, plausible weakness, and hardening suggestion.

## Review Checklist

- Are auth and role boundaries enforced where they should be?
- Is untrusted input validated before reaching service or DB logic?
- Do responses and docs avoid leaking sensitive fields?
- Do cookie, CORS, and environment assumptions look coherent for the intended deployment?
- Does password reset or token refresh have obvious abuse or leakage paths?
- Did the change alter a stable security-sensitive pattern enough that docs or skills are now stale?

## Avoid

- Calling something a vulnerability without a plausible exploit path.
- Confusing missing hardening with an immediate critical vulnerability.
- Recommending changes that break the cookie-auth architecture without strong reason.
- Focusing only on DTO decorators while missing response leakage or authorization gaps.
