# Phase V — Step 2: Frontend filters, form, reminders

## Scope

Update frontend types and API client for Phase V fields; add FilterBar (priority, tags, status, sort), SearchBar, extended TodoForm (due date, reminder, recurrence), TodoItem display for new fields; ReminderChecker for due/reminder notifications.

## Spec references (source of truth)

- `specs/phase-v/phase-v-spec.md`
- `specs/frontend/chatbot-commands.md` (chat parsing, filters).
- `.specify/data-model.md`

## Artifacts produced

- `frontend/src/types/todo.ts`: priority, tags, dueAt, recurrenceRule, reminderMinutesBefore, etc.
- `frontend/src/services/api.ts`: new query params and request body fields.
- FilterBar (priority, tags, status, sort); SearchBar; TodoForm (due date, reminder, recurrence); TodoItem (display new fields).
- ReminderChecker: check due/reminder times; browser notifications or in-app alerts.
- Chat parser and filters (e.g. `chatParser.ts`, `filters.ts`) aligned with chatbot-commands spec.

## Key decisions

- Reminders: remind_at or due_at minus reminder_minutes_before; client checks periodically or uses ReminderChecker.
- Chat commands support filter/sort and new fields where specified.

## Validation performed

- Filters and search; create/edit tasks with due date, reminder, recurrence; reminder notifications; chatbot commands for new fields.

## Provenance

Step implemented spec-first using Claude Code; frontend aligned with Phase V and chatbot-commands specs.
