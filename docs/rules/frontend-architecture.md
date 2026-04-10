# Frontend Architecture Rules

## Scope

These rules apply to `client`.

## Architecture

- The frontend uses Next.js App Router
- Keep route entry files in `src/app`
- Keep page and layout files thin and focused on composition
- Keep feature logic in `src/features`
- Keep `src/shared` for code that is clearly reused across features
- Reuse shared primitives before creating new ones

## Feature structure

- Follow the existing feature-first pattern shown by nearby features before inventing a new layout
- Common folders are `components`, `config`, `constants`, `hooks`, `queries`, `schemas`, `services`, `types`, `utils`, `providers`, and `data`
- Do not create every folder by default; add folders only when the feature actually needs them
- Components render UI and connect hooks
- Config files hold declarative field or view setup
- Hooks coordinate form and interaction logic
- Queries hold React Query orchestration and mutation side effects
- Services make API requests
- Schemas define validation rules
- Types define feature contracts
- Keep feature-local data, constants, and helpers inside the feature until reuse is clear
- Do not move code into `src/shared` after a single successful use

## Naming and file placement

- Keep feature-local files aligned with the existing naming style used by nearby features
- Keep CSS Modules colocated with the component they style
- Use `index.ts` or `index.tsx` only when the surrounding feature already follows that export pattern
- Prefer dedicated `types.ts` files or a `types/` folder for component and feature contracts
- When a slice grows separate constants, types, or utils concerns, prefer dedicated folders such as `constants/`, `types/`, and `utils/` with local `index.ts` barrels instead of piling flat sibling files together
- When a shared slice is primarily server-only, prefer a dedicated `server/` subfolder that owns its own `constants/`, `types/`, and `utils/` folders instead of mixing server files at the slice root
- Inside those folders, keep filenames scoped and explicit, such as `server.constants.ts` or `server.types.ts`
- Do not define interfaces or types next to components unless there is a strong local-only reason

## UI conventions

- Reuse shared UI from `src/shared/ui` before creating new primitives
- Keep components reasonably small and split them when they become hard to scan or combine too many responsibilities
- Move pure helper logic such as pagination math, URL shaping, and display transformations into feature-local `utils/` or dedicated hooks when it starts to crowd components or hooks
- Prefer simple, readable UI logic over clever abstractions
- Avoid introducing new UI libraries unless clearly justified
