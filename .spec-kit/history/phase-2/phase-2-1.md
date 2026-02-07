# Phase II — Step 1: Backend API, SQLModel, Neon schema

## Scope

Introduce persistent storage and REST API foundation: FastAPI app, SQLModel, Neon Serverless PostgreSQL. Define Task and User models and database connection so task routes can be implemented.

## Spec references (source of truth)

- `specs/database/schema.md` (or equivalent).
- `specs/api/rest-endpoints.md` (or equivalent).
- `specs/overview.md` (or equivalent).

## Artifacts produced

- FastAPI app entry (e.g. `backend/api/index.py`, `backend/run.py`).
- SQLModel models: Task (user_id, title, description, completed, created_at, updated_at), User as needed.
- Database connection module and session handling.
- Migration or init script (e.g. `backend/migrate_db.py`) for tables.

## Key decisions

- Neon PostgreSQL as managed DB; connection string from environment.
- Task ownership by user_id (foreign key to users); users may be managed by Better Auth.

## Validation performed

- Backend starts; DB connection works; tables created; can insert/query Task via session.

## Provenance

Step implemented spec-first using Claude Code; schema aligned with Phase II spec.
