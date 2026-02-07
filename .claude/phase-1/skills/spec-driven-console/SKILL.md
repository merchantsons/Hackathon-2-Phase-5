---
name: spec-driven-console
description: Spec-driven development for Phase I Todo console app. Use when writing or refining specs, constitution, or implementing from specs for the in-memory Python console todo application.
---

# Spec-Driven Console (Phase I)

## When to Use

- Writing or updating the Phase I constitution or specification files.
- Implementing Basic Level features (Add, Delete, Update, View, Mark Complete) from specs.
- Refining specs until Claude Code generates the correct implementation (no manual code writing).

## Constraints

- **No manual code**: You must refine the Spec until Claude Code generates the correct output. Do not write implementation code by hand.
- All features must be traceable to a Markdown constitution and spec in `specs` or `.spec-kit/history/phase-1/`.

## Phase I Deliverables

1. **Repository structure**
   - Constitution file
   - `specs` or `.spec-kit/history/phase-1/` with all specification files
   - `/src` with Python source code
   - README.md with setup instructions
   - CLAUDE.md with Claude Code instructions

2. **Console behavior**
   - Add tasks (title, description)
   - List all tasks with status indicators
   - Update task details
   - Delete tasks by ID
   - Mark tasks complete/incomplete

## Tech Stack (Phase I)

- UV
- Python 3.13+
- Claude Code
- Spec-Kit Plus

## Workflow

1. Read or create spec: `@specs/...` or `.spec-kit/history/phase-1/*.md`.
2. Implement via Claude Code: "Implement @specs/... per constitution."
3. Test; if output is wrong, refine the spec and re-run implementation.
