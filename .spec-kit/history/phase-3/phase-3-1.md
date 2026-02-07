# Phase III — Step 1: MCP server and task tools

## Scope

Build MCP server with Official MCP SDK exposing task operations as tools: add_task, list_tasks, complete_task, delete_task, update_task. Tools receive user_id and perform operations against the same data store as the web app.

## Spec references (source of truth)

- Phase III MCP tools spec (parameters, return shape for each tool).
- Backend task API or DB access pattern.

## Artifacts produced

- MCP server project (e.g. `server/` with Official MCP SDK).
- Tool implementations: add_task(user_id, title, description?), list_tasks(user_id, status?), complete_task(user_id, task_id), delete_task(user_id, task_id), update_task(user_id, task_id, title?, description?).
- Server invokes backend HTTP API or DB so task state is shared with web app.

## Key decisions

- user_id passed into every tool (from chat context/session); tools stateless.
- Tool schemas match spec (e.g. task_id, status, title in responses).

## Validation performed

- MCP server runs; tools callable; create/list/update/delete/complete reflect in DB and web UI.

## Provenance

Step implemented spec-first using Claude Code; tool definitions aligned with Phase III MCP spec.
