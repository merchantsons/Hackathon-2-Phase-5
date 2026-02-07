# Phase II — Step 2: Task routes and JWT auth

## Scope

Implement REST endpoints for task CRUD and completion; secure all `/api/*` routes with JWT verification. Enforce user isolation: only tasks belonging to the authenticated user are accessible.

## Spec references (source of truth)

- `specs/api/rest-endpoints.md`
- Authentication spec (Better Auth + JWT); shared secret for verification.
- `specs/features/task-crud.md`

## Artifacts produced

- Route modules: tasks (e.g. `backend/app/routes/tasks.py`), health (e.g. `health.py`).
- Endpoints: GET/POST `/api/{user_id}/tasks`, GET/PUT/DELETE `/api/{user_id}/tasks/{id}`, PATCH for complete.
- JWT verification dependency/middleware: extract user from `Authorization: Bearer <token>`; validate URL user_id matches token.
- 401 for missing or invalid token.

## Key decisions

- All task endpoints scoped by user_id; JWT verified on every request; user_id in URL must match token.
- REST: GET list, POST create, GET one, PUT update, DELETE remove, PATCH toggle complete.

## Validation performed

- Valid token → CRUD and complete work; 401 without token or when user_id mismatch.

## Provenance

Step implemented spec-first using Claude Code; routes and auth aligned with API and auth specs.
