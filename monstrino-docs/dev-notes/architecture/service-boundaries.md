---
id: service-boundaries
title: Service Boundaries
sidebar_label: Service Boundaries
sidebar_position: 3
description: How domain ownership and data boundaries are enforced across Monstrino services.
---

# Service Boundaries

:::info
This document describes how domain boundaries are drawn between services and what each service is and is not allowed to do.
:::

---

## Core Principle

> Each service is responsible for a **clearly defined domain**. It owns its data, its processing logic, and its API surface.
>
> Services do **not** directly manipulate each other's databases.

---

## Domain Separation

The architecture separates concerns across the following domains:

| Domain | Responsibility |
|---|---|
| **Catalog data** | collecting, parsing, normalizing, and exposing release information |
| **Media processing** | ingesting, validating, storing, and linking media assets |
| **Market data** | discovering listings and collecting price snapshots |
| **AI processing** | enrichment, entity extraction, and validation via LLM |

---

## What a Service Owns

Each service owns three things:

| Ownership | Meaning |
|---|---|
| **Its data** | only this service writes to its database tables |
| **Its processing logic** | business rules live inside the service, not in callers |
| **Its API surface** | other services interact through defined interfaces, not direct DB access |

---

## Enforcement in Practice

The service boundary principle is enforced by:

- no shared ORM sessions across service boundaries,
- no direct SQL access to another service's tables,
- inter-service communication via internal HTTP APIs or Kafka events,
- shared read models exposed only through stable API contracts.

:::warning
A service that reads directly from another service's database creates **invisible coupling**. Schema changes in the owned service break the consumer without any signal at the API layer.
:::

---

## Cross-Domain Communication

When one domain needs data from another, the preferred patterns are:

| Pattern | When to Use |
|---|---|
| **Internal HTTP API call** | synchronous request for data from another domain |
| **Kafka event consumption** | reacting to facts produced by another domain |
| **Shared read model** | a stable projection published for consumers (e.g., a catalog query API) |

---

## Related Documents

- [System Context](./system-context) — the overall role of the platform,
- [Container Architecture](./container-architecture) — how services are packaged,
- [Data Flow: Ingestion](./data-flow-ingestion) — how domain boundaries manifest in the ingestion pipeline.
