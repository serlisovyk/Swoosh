---
name: swoosh-frontend-security-review
description: Review Swoosh frontend code for security risks in auth-aware UI and browser behavior. Use when analyzing token assumptions, cookie-auth flows, unsafe rendering, user input handling, redirect behavior, sensitive data exposure, client-side auth state, public vs protected UI flow, or frontend changes that could amplify XSS, CSRF, or information leakage risks.
---

# Swoosh Frontend Security Review

## Overview

Use `docs/rules/auth-and-api-contracts.md` and `docs/rules/forms-and-data-fetching.md` as the baseline for auth-aware frontend behavior. This skill covers how to review frontend code through a browser-security lens.

## Use with Other Skills

- Use `$swoosh-auth-flow` when the review touches login, register, refresh, logout, `me`, or protected route behavior.
- Use `$swoosh-form-flow` when user input, validation, or password-related forms are part of the risk surface.
- Use `$swoosh-react-query-api` when request flow, interceptor behavior, or auth-aware network handling matters.
- Use `$swoosh-frontend-review` for broader correctness and architecture review alongside security review.
- Use `$swoosh-frontend-performance-review` only when security-related mitigations may also affect UX cost.
- Treat this skill as the frontend security rubric, and use the others only for the layers they specialize in.

## Review Workflow

1. Start with the trust boundary.
- Identify what the browser receives, stores, renders, and sends back.
- Focus on whether the client assumes trust it should not have, especially around auth state and protected UI.

2. Review auth-aware frontend behavior.
- Check whether refresh and retry behavior could unintentionally loop, hide auth failures, or leak sensitive assumptions.
- Check whether logout and auth failure flows really clear or stop using cached sensitive data.

3. Review rendering and input handling.
- Look for unsafe HTML injection, untrusted URLs, unsafe redirect targets, or places where user-controlled content could reach the DOM unsafely.
- Check whether user input is validated and handled predictably before being used in navigation or rendering logic.
- Call out risk patterns clearly, but do not claim exploitable XSS without a credible path.

4. Review sensitive data exposure in the client.
- Look for secrets, token-like values, raw error dumps, or internal fields leaking into client-visible state.
- Check whether frontend code assumes it can safely inspect or store values that should remain server-controlled.
- Check whether debug logging or toast/error handling may expose too much detail.

5. Review protected flow and navigation.
- Look for protected pages or components that may briefly reveal sensitive UI before auth state settles.
- Check whether redirects, guards, or loading gates avoid leaking protected content or behavior.
- Check whether public pages accidentally depend on protected requests in a way that leaks information.

6. Review docs and skill drift when relevant.
- If a change materially alters auth-aware frontend behavior or a stable security-sensitive pattern, check whether the relevant `AGENTS.md`, repo-local skill, or auth documentation assumptions should also change.
- Raise this only when the pattern changed, not for routine UI work.

7. Report findings with honest confidence.
- Group findings into concrete risks, probable weaknesses, and lower-priority hardening ideas.
- Distinguish between confirmed exposure, plausible risk, and hardening suggestion.

## Review Checklist

- Does the frontend avoid storing or handling auth state in unsafe ways?
- Could user-controlled content reach the DOM, URL handling, or redirects unsafely?
- Could protected UI flash or leak before auth state settles?
- Are sensitive errors, fields, or internal details exposed in logs, toasts, or rendered state?
- Did the change alter a stable auth or security-sensitive pattern enough that docs or skills are now stale?

## Avoid

- Claiming XSS, CSRF, or token compromise without a plausible path.
- Treating every client-side auth check as security theater without considering UX purpose.
- Recommending localStorage token patterns when the project already relies on cookies.
- Giving purely generic browser security advice that does not map to the actual code path.
