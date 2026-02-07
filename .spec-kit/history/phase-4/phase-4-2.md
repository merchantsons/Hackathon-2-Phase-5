# Phase IV — Step 2: Helm charts

## Scope

Create Helm charts for frontend and backend: deployments, services, ConfigMaps, Secrets, probes. No PV/PVC; state in external Neon DB. Optional HPA for backend.

## Spec references (source of truth)

- `specs/deployment/helm-chart.md`
- `specs/deployment/containerization.md` (image, ports, health).
- `specs/architecture/kubernetes-overview.md`

## Artifacts produced

- `helm/todo-frontend/`: Chart.yaml, values.yaml, templates (deployment, service, configmap, etc.).
- `helm/todo-backend/`: deployment, service, configmap, secret, liveness/readiness probes, optional HPA.
- Values for image, replica count, env (Neon URL, auth secret, API URL for frontend).
- Probes: backend `/api/health`, frontend `/health`.

## Key decisions

- Stateless backend; no PV/PVC. Secrets for DB and auth; ConfigMap for non-sensitive config.
- Frontend ConfigMap or env for backend API URL (e.g. injected into config.js).

## Validation performed

- `helm lint` for both charts; `helm template` renders valid manifests; optional `helm install` in Minikube.

## Provenance

Step implemented spec-first using Claude Code; Helm charts aligned with deployment and architecture specs.
