---
name: event-driven-kafka-dapr
description: Event-driven architecture for Phase V: Kafka topics, Dapr building blocks, and service boundaries. Use when implementing or specifying Kafka producers/consumers, Dapr Pub/Sub/State/Bindings/Secrets, or event schemas.
---

# Phase V Event-Driven (Kafka & Dapr)

## Part A: Advanced Features

- **Intermediate**: Priorities, tags/categories; search & filter; sort tasks.
- **Advanced**: Recurring tasks (auto-reschedule); due dates & time reminders (browser notifications).

## Part B & C: Deployment

- **Local**: Deploy to Minikube; Dapr on Minikube — Pub/Sub, State, Bindings (cron), Secrets, Service Invocation.
- **Cloud**: Deploy to DOKS/GKE/AKS; Dapr on cloud; Kafka (Redpanda Cloud); CI/CD (e.g. GitHub Actions); monitoring and logging.

## Kafka Use Cases

| Topic         | Producer        | Consumer(s)           | Purpose                    |
|---------------|-----------------|------------------------|----------------------------|
| task-events   | Chat API / MCP  | Recurring Task, Audit | All task CRUD events       |
| reminders     | Chat API (due)  | Notification Service  | Scheduled reminders        |
| task-updates  | Chat API        | WebSocket Service      | Real-time client sync      |

## Event Schemas

- **Task event**: event_type, task_id, task_data, user_id, timestamp.
- **Reminder event**: task_id, title, due_at, remind_at, user_id.

## Dapr Building Blocks

- **Pub/Sub**: Kafka abstraction; publish/subscribe without embedding Kafka client in app.
- **State**: Conversation or task cache (e.g. state.postgresql or state.redis).
- **Bindings**: Cron for scheduled reminder checks.
- **Secrets**: API keys, DB credentials (e.g. secretstores.kubernetes).
- **Service Invocation**: Frontend → Backend with discovery and retries.

## Recommended Setup

- **Kafka**: Redpanda Cloud (serverless) or Redpanda Docker for local.
- **Dapr**: dapr init -k; deploy components (pubsub, state, bindings, secrets); app talks to Dapr sidecar via HTTP.
