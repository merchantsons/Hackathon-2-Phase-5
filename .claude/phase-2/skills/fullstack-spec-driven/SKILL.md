---
name: fullstack-spec-driven
description: Spec-driven full-stack workflow for Phase II Todo web app. Use when writing specs, implementing features, or coordinating frontend (Next.js) and backend (FastAPI) from specs.
---

# Full-Stack Spec-Driven (Phase II)

## When to Use

- Writing or updating specs for Phase II (web app): features, API, database, UI.
- Implementing Basic Level features across frontend and backend from specs.
- Coordinating monorepo work: `/frontend` (Next.js), `/backend` (FastAPI).

## Spec-Kit Monorepo Layout

- **Specs**: `/specs` — overview, architecture, `features/`, `api/`, `database/`, `ui/`.
- **Root**: CLAUDE.md (overview, how to use specs, commands).
- **Frontend**: `frontend/CLAUDE.md` — Next.js patterns, API client usage.
- **Backend**: `backend/CLAUDE.md` — FastAPI, SQLModel, Neon, routes.

## Constraints

- Implement from specs; reference with `@specs/features/...`, `@specs/api/...`, `@specs/database/...`.
- All endpoints require JWT (Better Auth); filter all task data by authenticated user.

## Phase II Stack

| Layer        | Technology                    |
|-------------|-------------------------------|
| Frontend    | Next.js 16+ (App Router)      |
| Backend     | Python FastAPI                |
| ORM         | SQLModel                      |
| Database    | Neon Serverless PostgreSQL   |
| Auth        | Better Auth (JWT)             |
| Spec-Driven | Claude Code + Spec-Kit Plus  |

## API Conventions

- Base: `/api/{user_id}/tasks` (user_id from JWT; validate token and match URL).
- GET list, POST create, GET one, PUT update, DELETE delete, PATCH .../complete for toggle.
- Auth header: `Authorization: Bearer <token>`; shared secret `BETTER_AUTH_SECRET` for signing/verification.
