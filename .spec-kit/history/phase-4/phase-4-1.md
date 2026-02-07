# Phase IV — Step 1: Containerization (Dockerfiles)

## Scope

Containerize frontend and backend for Kubernetes deployment. Multi-stage builds; frontend serves runtime config via nginx (`config.js`); backend exposes app port; startup idempotent for restarts.

## Spec references (source of truth)

- `specs/deployment/containerization.md`
- `specs/architecture/kubernetes-overview.md`

## Artifacts produced

- `frontend/Dockerfile`: multi-stage build; nginx serves app and `/health`; runtime config via `config.js` (template + envsubst or default); idempotent startup (template present or absent).
- `frontend/.dockerignore`, `frontend/nginx.conf`, `frontend/public/config.js.template` as needed.
- `backend/Dockerfile`; `backend/.dockerignore`.
- Backend on port 8000; frontend on 3000 or nginx default.

## Key decisions

- Vite build-time envs are fixed; Kubernetes injects runtime config via `config.js`; app reads `window.__RUNTIME_CONFIG__` or equivalent.
- Frontend startup script: if template exists → process and delete; if missing but config.js exists → skip (restart); if both missing → fallback default.

## Validation performed

- `docker build` and `docker run` for frontend and backend; health endpoints respond; frontend restart does not fail.

## Provenance

Step implemented spec-first using Claude Code; containerization aligned with deployment spec.
