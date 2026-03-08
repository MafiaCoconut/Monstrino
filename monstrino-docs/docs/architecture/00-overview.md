---
title: Architecture Overview
sidebar_position: 0
description: How Monstrino is structured — from system boundaries and communication patterns to deployment, storage, and observability.
---

# Architecture

This section documents the architecture of the Monstrino platform at multiple levels of detail, following the **C4 model** (Context → Container) and expanding into cross-cutting concerns.

The architecture is driven by a consistent set of priorities: **data integrity over throughput**, **explicit service boundaries**, and **dependency inversion at every layer**. These principles are not aspirational — they are reflected in every structural decision documented here.

---

## How to Read This Section

Architecture documentation here is organized from high-level to low-level:

| Document | What It Covers |
|---|---|
| [Architecture Overview](/docs/architecture/architecture-overview/) | Full system map — all services, their roles, and primary interactions |
| [System Context](/docs/architecture/system-context/) | C4 Level 1 — external actors, systems, and top-level boundaries |
| [Container Architecture](/docs/architecture/container-architecture/) | C4 Level 2 — deployable units, entry points, and internal service layout |
| [Storage Architecture](/docs/architecture/storage-architecture/) | Databases, object storage, schema ownership, and data residency |
| [Service Communication](/docs/architecture/service-communication/) | Synchronous and asynchronous integration patterns between services |
| [Security Boundaries](/docs/architecture/security-boundaries/) | Network isolation, auth enforcement points, and trust zones |
| [Deployment Architecture](/docs/architecture/deployment-architecture/) | Kubernetes topology, namespacing, and infrastructure dependencies |
| [Scalability Strategy](/docs/architecture/scalability-strategy/) | Horizontal scaling, workload isolation, and stateless service design |
| [Observability](/docs/architecture/observability/) | Logging, metrics, and traceability approach across the platform |

---

## Code Organization

Beyond runtime architecture, this section also covers the code-level structure that keeps services consistent:

- **[Custom Packages](/docs/architecture/custom-packages/overview/)** — the 7 internal Python libraries that form the platform foundation
- **[Architecture Patterns](/docs/architecture/patterns/overview/)** — clean architecture, repository pattern, unit of work, and dependency inversion as applied in Monstrino

---

## Key Architectural Properties

**Clean Architecture throughout**  
Business logic lives in `monstrino-core` and service use-case layers. It has no dependency on frameworks, databases, or HTTP. Infrastructure adapts to domain interfaces — not the other way around.

**Services own their data**  
Each service has its own database or schema. Cross-domain access always goes through the owning service's API. There are no shared databases between services.

**Ingestion is decoupled from the catalog**  
The pipeline that collects external data writes to parsed tables. Import processes normalize that data into the canonical domain model. These two stages are separated by design to allow independent failure, retry, and evolution.

**AI is a quality layer, not a system dependency**  
LLM-based enrichment runs as an optional quality step. If `ai-orchestrator` is unavailable, ingestion and the catalog API continue unaffected.
