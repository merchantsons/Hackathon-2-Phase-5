---
name: better-auth-jwt-fastapi
description: Better Auth and JWT verification with FastAPI for Phase II. Use when implementing or debugging auth: JWT issuance (frontend), token attachment to API calls, and backend verification.
---

# Better Auth + FastAPI JWT (Phase II)

## Flow

1. User logs in on **frontend** → Better Auth creates session and issues **JWT**.
2. Frontend sends API requests with header: `Authorization: Bearer <token>`.
3. **Backend** (FastAPI): extract token, verify signature with shared secret, decode user id; enforce that URL `user_id` matches token.

## Required Changes

| Component           | Change |
|--------------------|--------|
| Better Auth config | Enable JWT plugin; issue tokens on login. |
| Frontend API client| Attach JWT to every request (e.g. from session). |
| FastAPI backend   | Middleware or dependency: verify JWT, extract user; return 401 if invalid. |
| API routes        | Filter all queries by authenticated user id. |

## Shared Secret

- Env: `BETTER_AUTH_SECRET` — same value in frontend and backend for signing/verification.

## Security

- User isolation: each user only sees/edits own tasks.
- Stateless: backend does not call frontend to verify users.
- Token expiry (e.g. 7 days) handled by Better Auth/JWT.

## After Auth

- All task endpoints require valid JWT.
- Requests without token → 401 Unauthorized.
- Task ownership enforced on every operation.
