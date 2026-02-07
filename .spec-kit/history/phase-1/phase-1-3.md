# Phase I — Step 3: CLI commands (add, list, update, delete, complete)

## Scope

Implement all five basic-level operations: add task (title, description), list all tasks with status, update task, delete by ID, mark complete/incomplete. CLI interface via subcommands or menu-driven flow.

## Spec references (source of truth)

- Phase I feature spec: Add, Delete, Update, View, Mark Complete.
- In-memory data model from Step 2.

## Artifacts produced

- Add command: create task, assign ID, append to store.
- List command: display all tasks with status indicators.
- Update command: modify title/description by ID.
- Delete command: remove task by ID.
- Complete command: toggle completion by ID.
- CLI entrypoint (argparse, click, or menu loop).

## Key decisions

- CLI interface: add, list, update, delete, complete subcommands or equivalent menu options.
- User-facing IDs (e.g. 1-based) for update/delete/complete.

## Validation performed

- Add task → list shows it; update/delete/complete → state reflects change; invalid ID handled.

## Provenance

Step implemented spec-first using Claude Code; behavior refined until all five features met acceptance criteria.
