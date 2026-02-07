---
name: helm-and-docker-spec
description: Docker and Helm chart conventions for Phase IV. Use when writing or updating specs for containerization and Helm (artifacts, values, Minikube vs cloud).
---

# Helm & Docker Spec (Phase IV)

## Docker

- **Backend**: Dockerfile in `backend/`; run FastAPI (e.g. uvicorn); expose app port; use env for DATABASE_URL, BETTER_AUTH_SECRET, OpenAI, etc.
- **Frontend**: Dockerfile in `frontend/`; build Next.js (or static); serve with nginx or Node; expose port; env for API URL and domain key.
- Prefer multi-stage builds to keep image size down. Use `.dockerignore` to exclude dev deps and unnecessary files.

## Helm

- **Charts**: One chart per component (e.g. `todo-frontend`, `todo-backend`). Standard structure: Chart.yaml, values.yaml, templates/ (deployment, service, configmap, secret as needed).
- **Values**: Separate values for Minikube (e.g. image pull policy, nodePort or LoadBalancer for local access) vs cloud (e.g. ingress, secrets from provider).
- **Artifacts**: Align with `.spec-kit/config.yaml` if present — e.g. artifacts.dockerfiles, artifacts.helm mapping from specs to files.

## Minikube

- Images: build in Minikube’s Docker env (`eval $(minikube docker-env)`) or push to a registry Minikube can pull from.
- Access: NodePort or `minikube service` for local testing. Document how to open frontend and hit backend/chat.

## Validation

- Checklist: deployments from specs, Helm installs cleanly, frontend → backend → MCP flow works, stateless backend, kubectl-ai/kagent usage documented.
