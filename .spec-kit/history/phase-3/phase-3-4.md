# Phase III — Step 4: Natural language flows and validation

## Scope

Confirm chatbot handles natural language as specified: add/list/update/delete/complete via varied phrasings; confirmations and error handling; resume after restart. Document and validate Phase III acceptance criteria.

## Spec references (source of truth)

- Agent behavior spec; natural language command examples.
- `specs/frontend/chatbot-commands.md` (or equivalent).

## Artifacts produced

- Agent prompt or system message tuned for task intent detection and tool selection.
- Error handling: task not found, invalid input; graceful replies.
- Any parser or tests for command extraction (e.g. delete by title, complete by id).
- Phase III section in README; setup for ChatKit and MCP server.

## Key decisions

- “Delete the meeting task” may require list_tasks then delete_task by id or title matching.
- Always confirm actions with friendly response; no raw tool output only.

## Validation performed

- “Add …”, “Show my tasks”, “What’s pending?”, “Mark task 3 complete”, “Delete the … task”, “Change task 1 to …” → correct tool calls and confirmations; errors handled; conversation resumes after restart.

## Provenance

Step completed spec-first using Claude Code; Phase III natural language flows validated against acceptance criteria.
