# Phase IV — Step 3: Minikube scripts and docs

## Scope

Provide scripts and documentation to run the stack on Minikube: start cluster, deploy with Helm, validate. Windows prerequisites (WSL2, Docker) and optional install scripts.

## Spec references (source of truth)

- `specs/deployment/minikube.md`
- `specs/architecture/kubernetes-overview.md`

## Artifacts produced

- `scripts/deploy-minikube.ps1`, `scripts/deploy-minikube.sh` (minikube start, helm install, port-forward or ingress).
- `scripts/install-k8s-windows.ps1` (or equivalent) for tool install.
- `scripts/validate-deployment.sh` (pods, svc, health checks).
- `scripts/test-docker-build.sh` if applicable.
- README Phase IV section; `docs/VALIDATION_CHECKLIST.md`; optional `docs/PHASE_V_SUMMARY.md` or Phase IV summary.

## Key decisions

- Single-command or few-command deploy path for judges; Minikube profile (e.g. todo-hackathon) and driver (e.g. docker) documented.
- Backend and frontend accessible via port-forward or ingress for validation.

## Validation performed

- Run deploy script on clean Minikube → pods running; backend and frontend health OK; app flow (list tasks, chat) works.

## Provenance

Step implemented spec-first using Claude Code; scripts and docs aligned with Minikube and validation specs.
