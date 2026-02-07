# Phase II — Step 4: Todo and auth UI components

## Scope

Build responsive UI for task list, task form, task item (with update/delete/complete), and auth (signin, signup, user menu). Protected routes so only authenticated users see the todo app.

## Spec references (source of truth)

- `specs/features/task-crud.md`
- `specs/ui/` or equivalent (components, pages).
- Authentication spec (Better Auth UI).

## Artifacts produced

- Todo list, form, and item components (e.g. `frontend/src/components/TodoList/`, `TodoForm/`, `TodoItem/`).
- Auth UI: signin/signup modal or page; user menu or header.
- Protected route wrapper: redirect to signin when unauthenticated.
- Styling (globals, modules, toast for feedback).

## Key decisions

- All five basic actions (add, view, update, delete, complete) available in UI; only own tasks shown.
- Better Auth for session; frontend passes token to API client.

## Validation performed

- Signin → todo list loads; create/edit/delete/complete tasks; signout → redirect; only own data visible.

## Provenance

Step implemented spec-first using Claude Code; components aligned with feature and UI specs.
