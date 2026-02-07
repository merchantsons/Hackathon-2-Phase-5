# Phase III — Step 2: Chat endpoint and conversation persistence

## Scope

Implement stateless chat API: receive user message, load conversation history from DB, append user message, run agent with MCP tools, persist assistant response, return response. Conversation and Message models stored in database.

## Spec references (source of truth)

- Chat API spec: POST `/api/{user_id}/chat` (conversation_id optional, message required); response with conversation_id, response, tool_calls.
- Database models: Conversation, Message (user_id, conversation_id, role, content, created_at).
- Agent behavior spec (when to call which tool).

## Artifacts produced

- Chat route and handler (e.g. POST `/api/chat` or `/api/{user_id}/chat`).
- Load/save Conversation and Message via SQLModel (or equivalent).
- Build message array for agent: history + new user message; no in-process state.
- Migrations or schema for conversations and messages tables.

## Key decisions

- Stateless: every request loads history from DB and writes new messages; server holds no conversation state.
- New conversation when conversation_id omitted; otherwise append to existing.

## Validation performed

- Send message → response persisted; restart backend → resume same conversation; history intact.

## Provenance

Step implemented spec-first using Claude Code; chat endpoint and persistence aligned with Phase III spec.
