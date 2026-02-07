# Phase III — Step 3: Agent integration and ChatKit UI

## Scope

Integrate OpenAI Agents SDK runner with MCP tool invocation so the agent can fulfill user intent (add, list, update, delete, complete). Add ChatKit-based frontend: send user message to chat endpoint, display assistant response and optional tool-call feedback.

## Spec references (source of truth)

- Phase III architecture (ChatKit → FastAPI chat → Agents SDK → MCP tools → DB).
- Agent behavior spec (confirmations, error handling).
- ChatKit setup and domain allowlist if hosted.

## Artifacts produced

- Backend: Agents SDK runner wired to MCP server tools; run agent with conversation history + new message; return assistant reply and tool_calls.
- Frontend: ChatKit UI (floating widget or dedicated view); call POST chat with conversation_id and message; render assistant messages and tool feedback.
- Specs under `specs/` for agent behavior and chat API (e.g. `specs/frontend/chatbot-commands.md`).

## Key decisions

- Agent receives user_id (from request/session) and passes it to MCP tools.
- ChatKit configured with domain allowlist for production; localhost for dev.

## Validation performed

- “Add a task to buy groceries” → task created and confirmation in reply; “Show my tasks” → list_tasks invoked and summarized; tool calls visible in UI where specified.

## Provenance

Step implemented spec-first using Claude Code; agent and ChatKit aligned with Phase III architecture and behavior spec.
