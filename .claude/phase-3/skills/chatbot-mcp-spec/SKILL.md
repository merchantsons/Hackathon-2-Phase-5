---
name: chatbot-mcp-spec
description: MCP tools and chat API spec for Phase III Todo AI chatbot. Use when implementing or documenting the MCP server, chat endpoint, or agent behavior for natural-language todo management.
---

# Phase III Chatbot & MCP Spec

## Architecture

- **Frontend**: OpenAI ChatKit → calls backend `POST /api/{user_id}/chat`.
- **Backend**: FastAPI chat endpoint → load conversation history from DB → OpenAI Agents SDK (Agent + Runner) → MCP Server (task tools) → Neon DB for tasks and conversation state.
- **Stateless**: Server holds no in-memory state; conversation and task state in database.

## Chat API

- **POST /api/{user_id}/chat**
- Request: `conversation_id` (optional), `message` (required).
- Response: `conversation_id`, `response`, `tool_calls` (list of MCP tools invoked).

## MCP Tools (Official MCP SDK)

| Tool          | Purpose       | Params | Returns |
|---------------|---------------|--------|---------|
| add_task      | Create task   | user_id, title, description? | task_id, status, title |
| list_tasks    | Get tasks     | user_id, status? ("all"\|"pending"\|"completed") | Array of tasks |
| complete_task | Mark complete | user_id, task_id | task_id, status, title |
| delete_task   | Remove task   | user_id, task_id | task_id, status, title |
| update_task   | Modify task   | user_id, task_id, title?, description? | task_id, status, title |

All tools must be stateless and persist via database (Neon).

## Agent Behavior

- **Task creation**: User says add/create/remember → use add_task.
- **Listing**: show/list tasks, what's pending → list_tasks with appropriate status.
- **Complete**: done/complete/finished → complete_task.
- **Delete**: delete/remove/cancel → delete_task (may need list_tasks first to resolve "the meeting task").
- **Update**: change/update/rename → update_task.
- Confirm actions with a short, friendly response; handle errors (e.g. task not found) gracefully.

## Conversation Flow (Stateless)

1. Receive message → fetch conversation history from DB.
2. Build message array (history + new user message); store user message.
3. Run agent with MCP tools; agent may call one or more tools.
4. Store assistant response in DB; return response to client.
