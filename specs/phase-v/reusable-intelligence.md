# Phase V — Reusable Intelligence

This document describes the reusable intelligence artifacts required by the Phase V specification.

---

## 1. MCP Tools (Reused Across Services)

The **Todo MCP Server** (`server/src/mcp-server.ts`) exposes tools that are reused by:

- **Chat server** (chat API) — when the frontend sends messages, the chat service can invoke the same MCP tools to list/create/update/delete/complete tasks.
- **REST API** — the backend implements the same operations; the MCP tools call the backend REST API, so behavior is consistent.

### Tool Contract (Stable)

| Tool           | Purpose                    | Inputs (required in bold)     |
|----------------|----------------------------|-------------------------------|
| `list_tasks`   | List all tasks for user    | —                             |
| `get_task`     | Get one task by ID         | **task_id**                   |
| `create_task`  | Create a task              | **title**, description, priority, due_date, tags, recurrence_rule, reminder_minutes_before |
| `update_task`  | Update a task              | **task_id**, title, description, priority, due_date, status, tags, recurrence_rule, reminder_minutes_before |
| `delete_task`  | Delete a task              | **task_id**                   |
| `complete_task`| Mark task completed        | **task_id**                   |

These tools are **reusable across REST and chat flows**: any agent or service that has access to the MCP server can perform the same task operations with the same semantics.

---

## 2. Agent Skill (REST + Chat)

The **chat parser** and **command handling** (`frontend/src/utils/chatParser.ts`) infer intent from natural language and map to the same operations as the REST API and MCP tools:

- Create todo (title, priority, due date, etc.)
- List / filter / sort
- Complete / delete

Natural language intent is translated into the same task metadata (priority, tags, due_date, recurrence, reminder) supported by the API and MCP. This constitutes a **reusable intelligence**: one set of intents and attributes used across UI, API, and chatbot.

---

## 3. Infrastructure Blueprint (Environments)

The **Helm charts** and **values files** form a reusable infrastructure blueprint:

- `helm/todo-backend/` — backend deployment with optional Dapr and HPA.
- `helm/todo-frontend/` — frontend deployment.
- `values-minikube.yaml` — local/Minikube (single replica, no Dapr, no HPA).
- `values-cloud.yaml` — managed K8s (replicas, Dapr enabled, HPA enabled).

The same charts can be used across Minikube and cloud with environment-specific values, satisfying the “reusable across environments” requirement.

---

## 4. Event Schema (Canonical)

The **canonical task event** payload is defined in `specs/phase-v/phase-v-spec.md` and emitted by the backend when Dapr is configured:

```json
{
  "event_type": "created | updated | completed | deleted",
  "task_id": number,
  "user_id": string,
  "task_data": object,
  "timestamp": datetime
}
```

Consumers (recurrence service, audit, notification service) subscribe to the `task-events` topic via Dapr Pub/Sub and use this schema. Evolution must remain backward compatible.
