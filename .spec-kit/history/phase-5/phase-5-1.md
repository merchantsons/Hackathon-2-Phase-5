# Phase V — Step 1: Advanced task model and API

## Scope

Extend Task model and REST API with Phase V fields: priority, tags, due_at, recurrence_rule, parent_task_id, reminder_minutes_before. Add query params for filter/sort; publish task lifecycle events via Dapr when configured.

## Spec references (source of truth)

- `specs/phase-v/phase-v-spec.md`
- `specs/phase-v/reusable-intelligence.md` (event schema).
- `.specify/data-model.md` (Task and filter state).

## Artifacts produced

- Task model and migration: priority, tags (array or JSON), due_at, recurrence_rule (e.g. daily|weekly|monthly), parent_task_id, reminder_minutes_before.
- Task routes: create/update accept new fields; list supports filter (status, priority, tag, date) and sort.
- Dapr publish for task created/updated/completed/deleted when Dapr enabled (topic and payload per spec).
- Health/metrics updates (e.g. `app/routes/health.py`).

## Key decisions

- Event payload and topic names aligned with phase-v-spec (e.g. task-events); app uses Dapr sidecar when available.
- MCP tools extended for new fields (create/update with tags, recurrence_rule, reminder_minutes_before).

## Validation performed

- Create/update tasks with new fields; list with filters and sort; events published when Dapr configured.

## Provenance

Step implemented spec-first using Claude Code; model and API aligned with Phase V spec and event schema.
