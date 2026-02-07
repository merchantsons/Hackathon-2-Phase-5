# Phase II — Step 5: Integration and validation

## Scope

Wire frontend and backend end-to-end; add docker-compose and env examples; update README for Phase II. Confirm all Phase II acceptance criteria.

## Spec references (source of truth)

- `specs/overview.md`; Phase II deliverables.
- API and auth specs.

## Artifacts produced

- `docker-compose.yml` (optional) for local run.
- `.env.example` for backend and frontend (Neon URL, Better Auth secret, etc.).
- `README.md` updated with Phase II setup and run commands.
- Root and/or `frontend/`, `backend/` `CLAUDE.md` as applicable.

## Key decisions

- Single source of truth for run instructions; judges can run full stack from README.
- BETTER_AUTH_SECRET shared between frontend and backend for JWT.

## Validation performed

- Full flow: signup/signin → create/list/update/delete/complete tasks; 401 without token; only own tasks visible.

## Provenance

Step completed spec-first using Claude Code; Phase II integration validated against acceptance criteria.
