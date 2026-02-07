# Hackathon II: Spec-Driven Todo — Claude Code & Spec-Kit Plus

This folder contains **Skills**, **Agents**, and **Subagents** for each phase of the "Evolution of Todo" project, organized for use with **Spec-Kit Plus** and **Claude Code**.

---

## Official Claude CLI paths (code.claude.com)

**Claude Code only discovers agents and skills from these locations:**

| Type   | Project (this repo)     | User (all projects)      |
|--------|-------------------------|---------------------------|
| **Agents** | `.claude/agents/`       | `~/.claude/agents/`       |
| **Skills** | `.claude/skills/<skill-name>/SKILL.md` | `~/.claude/skills/<skill-name>/SKILL.md` |

- **Agents**: Single `.md` files with YAML frontmatter (`name`, `description`, `tools`, etc.). No subfolders required; all agent and subagent files go in the same `agents/` directory.
- **Skills**: Each skill is a **directory** named after the skill, with a **`SKILL.md`** file inside (e.g. `.claude/skills/spec-driven-console/SKILL.md`).
- **Nested skills**: If you work in a subdirectory (e.g. `frontend/`), Claude also discovers `frontend/.claude/skills/`. That does **not** apply to agents; agents are only loaded from the project root `.claude/agents/` or `~/.claude/agents/`.
- **`--add-dir`**: Skills inside a directory added with `claude --add-dir <path>` are loaded only if that path contains a **`.claude/skills/`** subtree (e.g. `claude --add-dir .claude/phase-1` would look for `.claude/phase-1/.claude/skills/`, not `.claude/phase-1/skills/`). So for this repo, the reliable way to use phase content is to **copy** into the project-level `agents/` and `skills/` below.

**References:** [Create custom subagents](https://code.claude.com/docs/en/sub-agents), [Extend Claude with skills](https://code.claude.com/docs/en/skills).

---

## Structure

```
.claude/
├── README.md                 # This file
├── agents/                   # ← Claude CLI loads agents from HERE (copy from phase-N)
├── skills/                   # ← Claude CLI loads skills from HERE (copy from phase-N)
├── phase-1/                  # In-Memory Python Console App (source)
│   ├── skills/
│   ├── agents/
│   └── subagents/
├── phase-2/                  # Full-Stack Web Application (source)
│   ├── skills/
│   ├── agents/
│   └── subagents/
├── phase-3/                  # AI-Powered Todo Chatbot (source)
│   ├── skills/
│   ├── agents/
│   └── subagents/
├── phase-4/                  # Local Kubernetes Deployment (source)
│   ├── skills/
│   ├── agents/
│   └── subagents/
└── phase-5/                  # Advanced Cloud Deployment (source)
    ├── skills/
    ├── agents/
    └── subagents/
```

## How to use with Claude CLI

1. **Activate a phase** by copying that phase’s agents and skills into the **canonical** directories so Claude Code can see them:
   - **PowerShell (Windows):**
     ```powershell
     # From repo root; e.g. Phase 1
     New-Item -ItemType Directory -Force -Path .claude/agents, .claude/skills
     Copy-Item .claude/phase-1/agents/* .claude/agents/ -Force
     Copy-Item .claude/phase-1/subagents/* .claude/agents/ -Force
     Copy-Item .claude/phase-1/skills/* .claude/skills/ -Recurse -Force
     ```
   - **Bash:**
     ```bash
     mkdir -p .claude/agents .claude/skills
     cp .claude/phase-1/agents/*.md .claude/agents/
     cp .claude/phase-1/subagents/*.md .claude/agents/
     cp -r .claude/phase-1/skills/* .claude/skills/
     ```
2. Run **`claude`** (or `claude .`) from the repo root. Agents in `.claude/agents/` and skills in `.claude/skills/<name>/SKILL.md` are loaded automatically.
3. Invoke by name, e.g. “Use the phase-1-console-agent to implement the next spec” or `/skill-name` for skills.

## How to use with Spec-Kit Plus

1. **Slash commands**: Ensure Spec-Kit Plus is installed (`pip install specifyplus`) and your project has `.claude/commands/` with `sp.specify`, `sp.plan`, `sp.implement`, etc. (or run `specifyplus init` in project root if needed).
2. Use the same **activate a phase** copy steps above so that the phase’s skills and agents are in `.claude/agents/` and `.claude/skills/` when working with Claude Code.

## Phase Overview

| Phase | Focus | Key stack |
|-------|--------|-----------|
| I | Console app (in-memory) | Python 3.13+, UV, Spec-Kit Plus |
| II | Full-stack web app | Next.js 16+, FastAPI, SQLModel, Neon, Better Auth |
| III | AI chatbot | OpenAI ChatKit, Agents SDK, MCP SDK |
| IV | Local K8s | Docker, Minikube, Helm, kubectl-ai, kagent |
| V | Cloud + event-driven | DOKS/GKE/AKS, Kafka (Redpanda), Dapr |

Each phase folder contains skills (domain knowledge and workflows), one main agent, and subagents for spec-writing, implementation, and review.
