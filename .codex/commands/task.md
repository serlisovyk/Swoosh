# /task

Use this command to implement a Linear task from its issue ID or URL, for example `/task LIN-123`.

## Inputs

- Accept a Linear issue identifier such as `LIN-123` or a Linear issue URL
- Treat the Linear issue as the starting point, not as proof that the requirements are complete

## Workflow

1. Read the Linear issue first.
- Use the `linear` skill and Linear MCP tools to load the issue, description, comments, links, and other relevant context.
- If essential detail is missing and the risk of guessing is high, ask one short clarifying question. Otherwise proceed with reasonable assumptions and state them.

2. Map the task to the codebase.
- Find the affected app area in `client` or `server`.
- Read the relevant `AGENTS.md`, `rules/*.md`, and the nearest existing feature or module before editing.
- Choose the minimum relevant repo-local skills for the task instead of loading unrelated ones.

3. Implement the task end to end.
- Make the smallest reliable change that satisfies the issue.
- Keep frontend, backend, auth, and Swagger changes aligned when the issue crosses boundaries.
- Do not close the issue, deploy, or mutate Linear state unless the user explicitly asks for that.

4. Verify the result.
- Run the relevant checks in the touched area.
- If the task changes auth or public API contracts across the stack, verify both sides.
- If you cannot run an important check, say so explicitly.

5. Report clearly.
- Summarize what was changed.
- List assumptions, unresolved risks, or follow-up work.
- Reference the Linear issue ID in the summary.

## Skills to Consider

- `linear` for reading the task and related issue context
- `swoosh-frontend-feature` for frontend feature work
- `swoosh-backend-module` for backend module work
- `swoosh-auth-flow` for cross-stack auth work
- `swoosh-form-flow` for validated form work
- `swoosh-react-query-api` for shared API and React Query flows
- `swoosh-query-filters` for list and search endpoints
- `nestjs-swagger-docs` for Swagger contract work

## Avoid

- Treating the Linear issue text as complete truth when the codebase or comments show otherwise
- Making wide speculative refactors when the issue calls for a targeted fix
- Touching unrelated parts of the repo just because the issue is broad
- Pretending a task is complete when verification was skipped
