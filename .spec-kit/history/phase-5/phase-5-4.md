# Phase V — Step 4: Cloud deployment and validation

## Scope

Deploy to DigitalOcean Kubernetes (DOKS) or GKE/AKS using Helm charts from Phase IV/V; Dapr on cluster; Kafka (e.g. Redpanda Cloud) and Dapr components; monitoring and logging as specified. Document and validate Phase V acceptance criteria.

## Spec references (source of truth)

- `specs/phase-v/phase-v-spec.md`
- `specs/deployment/` (Helm, containerization); cloud-specific values.
- `docs/VALIDATION_CHECKLIST.md`

## Artifacts produced

- Helm values for cloud (e.g. `helm/todo-backend/values-cloud.yaml`): image pull, env, Dapr annotations, resource limits.
- README Phase V section: DOKS (or GKE/AKS) setup, kubectl config, Helm install, Dapr init, Kafka/Redpanda config.
- `docs/PHASE_V_IMPLEMENTATION.md` (summary of Phase V implementation and artifacts).
- Validation checklist: all Phase V completion criteria from spec.

## Key decisions

- Same Helm charts as Phase IV; cloud-specific values override for registry, domain, Dapr, Kafka.
- CI/CD may build and push images; deploy to cluster manual or via workflow per spec.

## Validation performed

- Deploy to DOKS (or target cloud); Dapr components and Kafka connected; app and chat work; filters, reminders, recurrence; checklist items verified.

## Provenance

Step completed spec-first using Claude Code; Phase V cloud deployment and validation aligned with acceptance criteria.
