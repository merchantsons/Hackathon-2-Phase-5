---
name: cloud-deployment-cicd
description: Cloud Kubernetes deployment and CI/CD for Phase V. Use when deploying to DOKS/GKE/AKS, setting up GitHub Actions, or configuring monitoring and logging.
---

# Phase V Cloud Deployment & CI/CD

## Cloud Options

- **DigitalOcean (DOKS)**: $200 credit 60 days; create cluster, configure kubectl, deploy with Helm from Phase IV.
- **Google Cloud (GKE)**: $300 credits 90 days.
- **Azure (AKS)**: $200 credit 30 days + selected free services.

## Deployment

- Reuse Phase IV Helm charts; use cloud-specific values (ingress, secrets from provider, image registry).
- Deploy Dapr on cluster: full set — Pub/Sub, State, Bindings (cron), Secrets, Service Invocation.
- Kafka: Redpanda Cloud (serverless) or managed Kafka; create topics task-events, reminders, task-updates.

## CI/CD

- **GitHub Actions**: Build images, push to registry, deploy to cluster (e.g. on push to main or tag). Use cluster credentials (e.g. OIDC or stored secrets) for kubectl/Helm.
- **Validation**: Run tests or smoke checks before/after deploy.

## Monitoring & Logging

- Configure as required by hackathon: e.g. cluster metrics, app logs, alerting. Use provider-native or standard stack (e.g. Prometheus/Grafana, provider log aggregation).

## Security

- Secrets from Kubernetes secrets or provider secret manager; never commit secrets. Use Dapr secret store for app access where applicable.
