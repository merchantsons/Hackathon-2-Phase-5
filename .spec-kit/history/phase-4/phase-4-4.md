# Phase IV — Step 4: AIOps and validation

## Scope

Document and optionally demonstrate AI-assisted Kubernetes operations (kubectl-ai, kagent); update Spec-Kit config with Phase IV specs and artifact mappings; confirm Phase IV acceptance criteria.

## Spec references (source of truth)

- `specs/aiops/ai-operations.md`
- `.spec-kit/config.yaml` (phases, specs, artifacts).

## Artifacts produced

- `docs/AIOPS_QUICK_REFERENCE.md` (kubectl-ai, kagent usage examples/workflows).
- `.spec-kit/config.yaml` updated: Phase IV specs (architecture, deployment, aiops), artifact mappings (dockerfiles, helm, scripts, history).
- History entry or references to phase-4 step files in `.spec-kit/history/phase-4/`.

## Key decisions

- AIOps doc enables judges to try kubectl-ai/kagent for deploy, scale, troubleshoot.
- Config links each Phase IV artifact to source spec.

## Validation performed

- Helm lint and deploy on Minikube; frontend → backend → chat flow; checklist items in docs verified.

## Provenance

Step completed spec-first using Claude Code; Phase IV AIOps and Spec-Kit config aligned with acceptance criteria.
