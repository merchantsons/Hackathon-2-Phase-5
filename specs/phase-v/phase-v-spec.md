# Phase V — Advanced Cloud Deployment & Event-Driven AI Todo System
## Spec-Driven Continuation (Authoritative)

---

## Project Continuity Declaration

This specification is a **strict continuation** of the Todo system evolved through:

- Phase I — In-Memory Console Todo (Spec-Driven Core CRUD)
- Phase II — Authenticated Full-Stack Web Application
- Phase III — Stateless AI Chatbot using MCP Tools and Agent Runners
- Phase IV — Local Kubernetes Deployment using Helm and AI-Assisted AIOps

All prior specifications, schemas, MCP tools, API contracts, and architectural decisions
remain **valid, binding, and immutable** unless explicitly extended herein.

This phase **extends capability and scale** without breaking backward compatibility.

---

## Phase V Objectives

Deliver a **production-grade, cloud-native, event-driven AI Todo platform** that demonstrates:

- Advanced task intelligence and automation
- Event-driven microservice architecture
- Dapr-based distributed runtime abstraction
- Kubernetes deployment on managed cloud infrastructure
- Fully responsive, mobile-first user experience
- Reusable intelligence suitable for startup-scale systems

---

## Functional Scope Expansion

### Intermediate Features (Required)

#### Task Metadata Enhancements
Each task must support:
- `priority`: low | medium | high
- `tags`: array of user-defined labels
- `due_date`: ISO-8601 datetime
- Searchable text fields (title + description)
- Sortable attributes: due_date, priority, created_at

#### Acceptance Criteria
- Filters, search, and sorting are composable
- REST APIs, MCP tools, and chatbot commands support metadata
- Natural language intent inference works across all task attributes
- Existing API consumers continue to function unchanged

---

### Advanced Features (Required)

#### Recurring Tasks
- Supported recurrence rules: daily, weekly, monthly
- Completion of a recurring task emits a lifecycle event
- Next occurrence is generated asynchronously
- Recurrence logic must not block request/response paths

#### Due Dates & Reminders
- Reminders scheduled relative to due_date
- Reminder evaluation occurs asynchronously
- Notification delivery handled by a separate consumer service
- Reminder failures must not affect core task operations

---

## Event-Driven Architecture Specification

### Kafka Topics (Logical Contracts)

| Topic | Purpose | Producer | Consumers |
|------|--------|---------|----------|
| task-events | Task lifecycle events | Chat API / MCP Tools | Recurrence, Audit |
| reminders | Scheduled reminders | Task Service | Notification Service |
| task-updates | Realtime task sync | Task Service | WebSocket Gateway |

### Canonical Event Schema
```json
{
  "event_type": "created | updated | completed | deleted",
  "task_id": number,
  "user_id": string,
  "task_data": object,
  "timestamp": datetime
}
```

Schema evolution must remain backward compatible.

---

## Dapr Runtime Requirements (Mandatory)

Dapr is treated as a **first-class runtime dependency**, not an optional abstraction.

### Required Building Blocks

* Pub/Sub — Kafka abstraction
* State Store — conversation and task state (where applicable)
* Bindings — cron-based reminder triggers
* Secrets — credentials and API keys
* Service Invocation — frontend to backend calls

### Architectural Constraint

Application services **must not** directly import Kafka clients, secret managers,
or hardcoded service URLs. All infrastructure interactions flow through Dapr APIs.

---

## UI & UX Specification (Mandatory)

### Responsive Design (Non-Negotiable)

The user interface **must be fully responsive and mobile-first**, with no loss of functionality
across devices.

#### Supported Viewports

* Mobile (≤ 640px)
* Tablet (641px – 1024px)
* Desktop (≥ 1025px)
* Large Screens (≥ 1440px)

No horizontal scrolling is permitted at any breakpoint.

---

### UI Architecture Constraints

* Mobile-first layout strategy
* Responsive grid and breakpoint-driven layouts
* Touch-friendly controls (minimum tap target sizing)
* Adaptive menus for filters, sorting, and search
* Consistent UX between task UI and chatbot UI

---

### Chatbot UI Requirements

* Chat interface adapts to viewport height
* Input remains accessible when virtual keyboards are open
* Message bubbles support long text and tool feedback
* Conversation history scrolls smoothly on mobile
* Tool execution feedback is visible but unobtrusive

---

### Task Management UI Requirements

* Mobile: stacked task cards (single column)
* Tablet: condensed list with inline actions
* Desktop: full list/table with visible filters and sorting
* Priority, tags, and due dates remain readable at all sizes
* All advanced features usable on mobile

---

### Accessibility & UX Quality

* Keyboard navigation supported
* Proper focus and hover states
* Adequate color contrast (light and dark modes)
* Clear loading, empty, and error states

Failure to meet responsiveness requirements constitutes an **incomplete Phase V submission**.

---

## Kubernetes & Cloud Deployment

### Target Environments

* Local: Minikube (feature parity)
* Cloud: Managed Kubernetes (production-grade)

### Deployment Requirements

* Helm charts extended from Phase IV
* Environment-specific values files
* Horizontal Pod Autoscaling enabled
* Rolling updates with zero downtime
* External managed Kafka or compatible service

---

## CI/CD Pipeline Specification

### Mandatory Stages

1. Spec validation and linting
2. Container build
3. Image publishing
4. Kubernetes deployment
5. Smoke tests (Chat + MCP tools)

Pipeline must be declarative, reproducible, and environment-aware.

---

## Observability & Operations

### Required

* Structured logging
* Health and readiness probes
* Metrics suitable for autoscaling decisions

### Optional Enhancements

* Event replay capability
* Dead-letter handling for failed consumers

---

## Reusable Intelligence Requirement

At least one reusable intelligence artifact must be present:

* MCP tool reused across services
* Agent skill reused across REST and chat flows
* Infrastructure blueprint reusable across environments

Reusable intelligence must be documented in specs.

---

## Completion Criteria

Phase V is complete when:

* Advanced features work via UI, API, and chatbot
* Event-driven services operate asynchronously
* System scales horizontally without state loss
* Cloud deployment mirrors local behavior
* The system can be regenerated from specs alone

---

## Instruction to Implementing Agent

* Read all prior specifications before modification
* Extend schemas without breaking contracts
* Prefer composition over mutation
* Update specifications before implementation when ambiguity exists
* Optimize for clarity, resilience, and evolvability

Proceed incrementally.
Every change must be spec-justified.
