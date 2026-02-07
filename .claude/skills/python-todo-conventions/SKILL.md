---
name: python-todo-conventions
description: Python project structure and code conventions for the Phase I Todo console app. Use when implementing or reviewing Python code for the in-memory todo CLI.
---

# Python Todo Console Conventions (Phase I)

## Project Structure

- `/src` — Python source code (e.g. `src/main.py`, `src/models.py`, `src/tasks.py`).
- Use UV for dependency and environment management.
- Prefer a single entry point (e.g. `main.py` or `cli.py`) for the console app.

## Code Style

- Follow PEP 8 and clean code principles.
- Use type hints for function signatures.
- Prefer small, single-purpose functions.

## Data Model (In-Memory)

- Task: `id`, `title`, `description`, `completed`, `created_at` (or equivalent).
- Store tasks in an in-memory structure (list or dict keyed by id); no database in Phase I.

## CLI Behavior

- **Add**: Prompt or accept title (required), description (optional); assign id; add to store.
- **View/List**: Display all tasks with status (e.g. [ ] / [x]) and id.
- **Update**: Select by id; allow editing title and/or description.
- **Delete**: Select by id; remove from store.
- **Mark complete**: Toggle `completed` by id.

## Windows / WSL

- Windows users should use WSL 2 for development (per hackathon spec). Do not assume Windows-only paths or shell.
