# /review

Use this command to run a focused review. Prefer one command with a clear mode instead of separate commands for every review flavor.

## Supported Forms

- `/review diff`
- `/review module <name-or-path>`
- `/review security <scope>`
- `/review performance <scope>`
- `/review project`
- `/review project <client|server|path>`

Treat `<scope>` as a module name, feature name, or repo path when possible.

## Workflow

1. Resolve the scope first.
- For `diff`, review the current local changes.
- For `module`, review the named module, feature, or path.
- For `security`, focus on auth, validation, exposure, redirects, unsafe rendering, cookies, and other security-sensitive paths in the requested scope.
- For `performance`, focus on latency, payload size, waterfalls, rerenders, hydration cost, and weak-device behavior in the requested scope.
- For `project`, do a broad review of the whole repo or the requested side of it.

2. Load the right rubric.
- Use `swoosh-frontend-review` for general frontend review.
- Use `swoosh-backend-review` for general backend review.
- Use `swoosh-frontend-security-review` or `swoosh-backend-security-review` for security review.
- Use `swoosh-frontend-performance-review` or `swoosh-backend-performance-review` for performance review.
- Pull in narrower skills only when the scope clearly touches auth, forms, React Query, Swagger, or query filters.

3. Review for concrete risk first.
- Prioritize bugs, regressions, unsafe contract changes, authorization gaps, stale assumptions, and missing verification.
- Focus findings on impact, not taste.
- Compare changes against `rules/*.md` and the surrounding implementation, not against personal preference.

4. Return findings in review mode.
- Put findings first, ordered by severity.
- Include file references and explain the risk.
- If there are no findings, say so explicitly and mention residual risk or unverified areas.

## Output Expectations

- `diff`: findings on the current local diff only
- `module`: findings limited to the requested module or feature unless broader context is required to explain the issue
- `security`: concrete risks, plausible weaknesses, and lower-priority hardening ideas
- `performance`: critical bottlenecks, likely bottlenecks, and prioritized optimization ideas
- `project`: the highest-signal issues first; do not dump a low-value checklist

## Avoid

- Mixing implementation with review unless the user explicitly asks for fixes
- Reporting style preferences as findings without a concrete downside
- Running a whole-project audit when the requested scope is narrow
- Claiming security or performance impact with false precision when evidence is weak
