# Phase V — Step 3: Event-driven and CI/CD pipeline

## Scope

Wire Dapr Pub/Sub (and optional Bindings) for task-events and reminders per spec; add GitHub Actions pipeline for spec validation, build, image build, Helm lint/template. Event consumers specified; app publishes only (consumers in event-consumers.md).

## Spec references (source of truth)

- `specs/phase-v/phase-v-spec.md`
- `specs/phase-v/event-consumers.md`
- `specs/phase-v/reusable-intelligence.md`

## Artifacts produced

- Backend: publish to Dapr topics (task-events, reminders) when Dapr sidecar configured; component config (YAML) for Pub/Sub and optional cron binding.
- `.github/workflows/phase-v-pipeline.yml` (or equivalent): checkout, spec validation if any, frontend build, backend build, Docker build for frontend/backend, Helm lint and template; optional push to registry.
- Helm values for cloud vs Minikube (e.g. `values-cloud.yaml`, `values-minikube.yaml`); HPA or scaling as specified.
- Consumer behavior documented in event-consumers.md (recurrence, notification, audit); no consumer code in main app if out of scope.

## Key decisions

- Pipeline is declarative and environment-aware; no hardcoded secrets in workflow.
- Dapr components (Kafka/Redpanda, state, secrets) configured per environment.

## Validation performed

- Workflow runs on push/PR; Helm templates render; optional deploy to Minikube with Dapr; events visible in topic or consumer when configured.

## Provenance

Step implemented spec-first using Claude Code; event-driven design and pipeline aligned with Phase V and event-consumers specs.
