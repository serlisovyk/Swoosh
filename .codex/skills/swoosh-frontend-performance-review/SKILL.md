---
name: swoosh-frontend-performance-review
description: Review Swoosh frontend code for performance risks on weak devices and slow networks. Use when analyzing bundle size impact, re-render frequency, memory leaks, network waterfalls, TTI, FCP, CLS, heavy client components, list rendering, image loading, route composition, or cache and request behavior in the Next.js client.
---

# Swoosh Frontend Performance Review

## Overview

Review Swoosh frontend changes through a performance lens, with special attention to weak devices, slow CPUs, limited memory, and slow mobile networks. Prioritize concrete bottlenecks and user-visible latency over generic micro-optimizations.

## Use with Other Skills

- Use `$swoosh-frontend-feature` when the review depends on feature boundaries, route composition, or code placement.
- Use `$swoosh-form-flow` when forms may cause unnecessary rerenders or heavy submit flows.
- Use `$swoosh-react-query-api` when request patterns, cache behavior, or waterfalls are part of the problem.
- Use `$swoosh-auth-flow` when performance issues touch `me`, login, refresh, logout, or protected flow behavior.
- Use `$swoosh-frontend-review` for broader correctness and architecture review alongside performance review.
- Treat this skill as the performance rubric, and use the others only for the layers they specialize in.

## Review Workflow

1. Start with user-visible cost.
- Focus first on what hurts weak devices and slow networks: delayed first paint, delayed interactivity, heavy hydration, layout shifts, and unnecessary waiting on requests.
- Prefer concrete bottlenecks over speculative micro-tweaks.

2. Review bundle and route cost.
- Look for heavy imports in route-critical code.
- Look for client components that could stay smaller or move work off the critical path.
- Call out large libraries, duplicated helpers, or eager imports that inflate bundle size.
- Recommend dynamic import only when it meaningfully reduces route-critical cost.

3. Review rendering cost.
- Look for avoidable rerenders from unstable props, broad state ownership, expensive derived values in render, or overly large client components.
- Check whether list rendering, filters, sliders, and form interactions may become expensive on weak devices.
- Prefer structural fixes over defensive `useMemo` everywhere.

4. Review network behavior.
- Look for request waterfalls, duplicate fetches, retry loops, unnecessary auth-dependent blocking, and over-fetching.
- Check whether React Query usage keeps requests predictable and whether cache reuse is helping or hurting.
- Check whether slow-network behavior is acceptable when images, profile data, or product data load late.

5. Review memory and lifecycle issues.
- Look for event listeners, timers, subscriptions, or long-lived async flows that are not cleaned up.
- Look for components that retain too much state or data longer than needed.
- Call out obvious leak risks, but do not claim a confirmed leak without evidence.

6. Review visual stability and interactivity.
- Check for obvious CLS risks from images, async content swaps, unstable layout containers, or delayed content injection.
- Check whether loading states, skeletons, and empty states help avoid layout jumps and blocked interaction.
- Consider TTI and FCP impact when large client trees or slow queries sit on the critical path.

7. Report findings with honest confidence.
- Group findings into critical problems, likely bottlenecks, and lower-priority ideas.
- Do not invent exact percentages or timing improvements without measurements.
- If no profiler, Lighthouse, or trace data is available, describe impact qualitatively or as a hypothesis to verify.

## Output Guidance

- Start with critical performance problems first.
- Then list probable bottlenecks.
- Then provide prioritized optimizations:
- quick wins
- medium effort
- major refactors
- When useful, mention which metrics are most likely affected, such as bundle size, rerenders, FCP, TTI, CLS, or network waterfalls.
- Only give numeric estimates when they come from actual measurement data.

## Review Checklist

- Does route-critical code pull in too much JavaScript?
- Are there obvious rerender hotspots or oversized client components?
- Do queries create waterfalls, duplicate requests, or block important UI?
- Are images, async sections, and loading states stable enough to avoid CLS?
- Are there memory or lifecycle cleanup risks?
- Would this feel slow on a low-end phone over a weak connection?

## Avoid

- Recommending generic memoization without a concrete rerender problem.
- Inventing Lighthouse-style numbers, percent gains, or bundle deltas without measurement.
- Treating every optimization idea as equally urgent.
- Ignoring UX tradeoffs just to reduce theoretical render cost.
