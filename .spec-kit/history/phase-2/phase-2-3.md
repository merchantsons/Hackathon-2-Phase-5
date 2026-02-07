# Phase II — Step 3: Frontend app shell and API client

## Scope

Create frontend application shell (routing, layout) and API client that attaches JWT to every backend request. Prepare for todo and auth UI components.

## Spec references (source of truth)

- `specs/overview.md`; frontend stack (e.g. Next.js App Router or Vite/React).
- `specs/api/rest-endpoints.md` (base URL, auth header).
- UI/specs for app structure.

## Artifacts produced

- App entry and routing (e.g. `frontend/src/App.tsx`, `main.tsx`).
- API client module (e.g. `frontend/src/services/api.ts`): getTasks, createTask, updateTask, deleteTask, toggleComplete; all requests include `Authorization: Bearer <token>`.
- Auth context or hook to provide token (e.g. from Better Auth session).
- Base layout and global styles.

## Key decisions

- Token from auth layer; API client reads token and sets header on every call.
- Base URL configurable (env or config) for dev vs production.

## Validation performed

- Logged-in user: API client calls succeed with token; 401 when token missing or expired.

## Provenance

Step implemented spec-first using Claude Code; app shell and API client aligned with Phase II spec.
