# Phase V — Event & Reminder Consumers

This document specifies the event-driven consumers referenced in the Phase V architecture. Application code does **not** import Kafka directly; all messaging is via **Dapr Pub/Sub** (and optionally Dapr Bindings for cron).

---

## Topic: task-events

- **Producer**: Todo Backend (on create/update/complete/delete).
- **Dapr component**: Pub/Sub component named `task-events` (backed by Kafka or another broker in deployment).
- **Payload**: Canonical event schema (see phase-v-spec.md).

### Consumers (Logical)

1. **Recurrence service**  
   - Subscribes to `task-events`.  
   - On `event_type: "completed"`, if `task_data.recurrence_rule` is set (daily/weekly/monthly), generates the next occurrence asynchronously and creates a new task (via backend API or Dapr service invocation).  
   - Does not block the request/response path.

2. **Audit service**  
   - Subscribes to `task-events`.  
   - Persists or forwards events for audit/logging.

---

## Topic: reminders

- **Producer**: A **reminder scheduler** (separate service or Dapr cron binding).  
- The scheduler evaluates tasks with `reminder_minutes_before` and `due_date`, and when the reminder time is reached, publishes to `reminders`.
- **Consumers**: **Notification service** — consumes reminder events and delivers notifications (e.g. in-app, email, push). Reminder failures must not affect core task CRUD.

---

## Topic: task-updates (Realtime Sync)

- **Producer**: Task Service (backend) on relevant updates.  
- **Consumers**: WebSocket Gateway or frontend subscription layer for real-time task list updates.

---

## Implementation Notes

- **Local / Minikube**: Dapr can be disabled (`dapr.enabled: false`); event publishing is no-op when `DAPR_HTTP_PORT` is unset.  
- **Cloud**: Enable Dapr and configure a Dapr Pub/Sub component for Kafka (or Redis Streams, etc.). Deploy recurrence and notification consumers as separate services that subscribe via Dapr.  
- **Recurrence logic**: Implement in a small service that subscribes to `task-events`, filters for `completed` + `recurrence_rule`, computes next due date, and creates the next task via the task API.
