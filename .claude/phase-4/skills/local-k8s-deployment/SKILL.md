---
name: local-k8s-deployment
description: Local Kubernetes deployment for Phase IV Todo chatbot (Minikube, Helm, Docker). Use when containerizing, building Helm charts, or deploying the Phase III chatbot on Minikube.
---

# Phase IV Local Kubernetes Deployment

## Objective

Deploy the **Phase III Todo Chatbot** on a **local Kubernetes cluster** (Minikube) using containers and Helm charts. Use AI-assisted tooling where available (Gordon, kubectl-ai, kagent).

## Requirements

- **Containerize** frontend and backend (Docker); use Gordon (Docker AI Agent) if available, else standard Docker/Claude-generated Dockerfiles.
- **Helm charts** for frontend and backend (use kubectl-ai and/or kagent to generate or refine).
- **Deploy on Minikube** locally.
- **AIOps**: Use kubectl-ai and kagent for AI-assisted Kubernetes operations (e.g. deploy, scale, troubleshoot).

## Stack

| Component       | Technology              |
|----------------|-------------------------|
| Containerization | Docker (Docker Desktop) |
| Docker AI      | Gordon (if available)    |
| Orchestration  | Kubernetes (Minikube)   |
| Package manager| Helm Charts             |
| AI DevOps      | kubectl-ai, kagent      |
| Application    | Phase III Todo Chatbot  |

## Commands (Reference)

- Gordon: `docker ai "What can you do?"`; enable in Docker Desktop 4.53+ Beta.
- kubectl-ai: `kubectl-ai "deploy the todo frontend with 2 replicas"`, `kubectl-ai "check why the pods are failing"`.
- kagent: `kagent "analyze the cluster health"`, `kagent "optimize resource allocation"`.

## Deliverables

- Dockerfiles for frontend and backend.
- Helm charts (e.g. `helm/todo-frontend`, `helm/todo-backend`) with values for Minikube.
- Scripts or docs for: start Minikube, build images, install Helm releases, validate (frontend → backend → MCP flow, stateless backend).
