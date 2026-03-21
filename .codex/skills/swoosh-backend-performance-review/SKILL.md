---
name: swoosh-backend-performance-review
description: Review Swoosh backend code for performance risks that affect latency, throughput, and client-perceived speed on slow networks. Use when analyzing database query cost, payload size, N+1 patterns, serialization overhead, pagination, filtering, repeated user lookups, auth refresh cost, expensive service logic, or endpoint designs that create frontend waterfalls.
---

# Swoosh Backend Performance Review

## Overview

Review Swoosh backend changes through a performance lens, with attention to API latency, database cost, payload size, and the way backend behavior amplifies slow networks on the client. Prioritize bottlenecks that affect real request paths over low-value micro-optimizations.

## Use with Other Skills

- Use `$swoosh-backend-module` when the review depends on controller, service, DTO, or module boundaries.
- Use `$swoosh-query-filters` when the issue involves list endpoints, query DTO transforms, or MongoDB filter building.
- Use `$swoosh-auth-flow` when the issue involves login, refresh, `me`, logout, or repeated auth-related lookups.
- Use `$nestjs-swagger-docs` when response shape or endpoint design affects payload size and client behavior.
- Use `$swoosh-backend-review` for broader correctness and contract review alongside performance review.
- Treat this skill as the backend performance rubric, and use the others only for the layers they specialize in.

## Review Workflow

1. Start with request-path cost.
- Focus first on slow endpoints, repeated DB work, oversized responses, and backend behavior that forces extra client round-trips.
- Prioritize latency on common user paths over theoretical micro-optimizations.

2. Review database access patterns.
- Look for repeated queries that could be collapsed, unnecessary population, missing projection, missing limits, or expensive regex or filter patterns.
- Check whether list endpoints keep filter building explicit and predictable.
- Check whether auth or user lookups repeat unnecessary work across a request path.

3. Review payload and serialization cost.
- Look for responses that include more data than the client needs.
- Look for large nested objects, repeated relationship data, or fields that should stay out of public responses.
- Check whether response shape causes extra transfer cost on slow networks.

4. Review endpoint design and waterfall risk.
- Look for APIs that force the frontend to chain requests unnecessarily.
- Check whether auth, profile, product, or list flows could create avoidable waterfalls from backend contract design.
- Consider whether the API shape helps or hurts client-perceived performance.

5. Review CPU and lifecycle cost in services.
- Look for expensive mapping, repeated validation, unnecessary token work, repeated hashing or verification, or heavy orchestration in hot paths.
- Keep controllers thin and avoid moving parsing or repeated work into every request path.

6. Review caching, pagination, and limits where relevant.
- Check whether list endpoints have sane defaults for limit and sort.
- Check whether endpoint behavior could degrade badly as data volume grows.
- Call out places where caching or lighter response shapes may matter, but keep suggestions grounded in the current architecture.

7. Report findings with honest confidence.
- Group findings into critical problems, likely bottlenecks, and lower-priority ideas.
- Do not invent exact latency reductions or throughput gains without measurement.
- If there is no profiling, tracing, or load data, describe impact qualitatively or as a hypothesis to verify.

## Output Guidance

- Start with critical performance problems first.
- Then list likely bottlenecks.
- Then provide prioritized optimizations:
- quick wins
- medium effort
- major refactors
- When useful, mention which backend concerns are most affected, such as query count, payload size, serialization cost, latency, or client-side waterfalls.
- Only give numeric estimates when they come from actual measurements.

## Review Checklist

- Does the request path do more database work than necessary?
- Are payloads larger than they need to be?
- Does the endpoint shape create avoidable client waterfalls?
- Are list endpoints safe as data volume grows?
- Are auth and current-user flows doing repeated work?
- Would this endpoint still feel acceptable on a weak connection and a busy database?

## Avoid

- Inventing latency percentages or throughput gains without measurement.
- Treating every populate or extra query as equally important without considering the request path.
- Suggesting major architecture changes before identifying smaller fixes.
- Ignoring frontend-perceived latency just because backend code looks structurally clean.
