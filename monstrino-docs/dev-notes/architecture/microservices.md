---
id: architecture-microservices
title: Microservices Architecture Policy
sidebar_label: Microservices
---

:::info
This document describes the **microservices policy** of Monstrino:
how service boundaries are defined, how data ownership works, and which integration patterns are allowed.

It is not an ADR and does not list alternatives.
Concrete decisions are referenced via ADRs.
:::

---

## Why Microservices in Monstrino

Monstrino is built around a long-lived catalog domain that must evolve safely over time.
Microservices are used to enforce:

- clear responsibility boundaries,
- explicit data ownership,
- controlled evolution of independent parts of the system,
- operational isolation of ingestion and processing workloads.

This architecture is chosen to support **maintainability and change isolation**, not to optimize for raw throughput.

See also:
- ADR-001 (shared packages as a system-wide foundation)
- ADR-002 / ADR-003 (ingestion boundary and processing approach)

---

## What Defines a Service Boundary

A service exists when it has a stable, independent responsibility.

A service boundary is defined by:
- a single primary responsibility,
- clear inputs and outputs,
- ownership of specific data or workflows,
- independent runtime and failure modes.

If a component cannot state what it owns and what it refuses to do, it is not a service yet.

---

## Data Ownership Rules

### Canonical Domain Ownership
Canonical domain tables are owned by the domain layer.
Only services designated as domain writers may mutate them.

### Parsed Data Ownership
Parsed tables are owned by the acquisition pipeline.
They are treated as an ingestion buffer and inspection surface.

### Ownership Principle
If a service does not own the data, it must treat it as read-only.
Cross-service writes are forbidden.

This reduces hidden coupling and makes failures local.

---

## Allowed Integration Patterns

Monstrino uses a hybrid integration approach.

### 1. Synchronous (REST)
Use when:
- a request needs an immediate answer,
- the dependency is internal and stable,
- the call is not part of long-running ingestion.

Avoid using sync calls for ingestion-heavy workflows.

### 2. Asynchronous (Batch Jobs / Schedulers)
Use when:
- processing is long-running,
- external sources are unreliable,
- inspection and retries must be explicit.

This is the preferred pattern for ingestion and domain population.

See:
- ADR-002 (DB state vs Kafka)
- Service Reality: catalog-collector, catalog-importer

---

## Consistency Policy

The system is designed around:

- eventual consistency between ingestion and read layers,
- strong consistency within a single import transaction,
- idempotent processing where possible.

Real-time guarantees are explicitly out of scope at this stage.

---

## How to Avoid a Distributed Monolith

A microservices architecture fails if services are separated but still strongly coupled.

Monstrino avoids that by:

- enforcing strict boundaries (contracts → commands → use cases),
- restricting ORM usage to repositories only,
- keeping shared packages minimal and versioned,
- allowing services to operate even when other services are degraded.

See:
- ADR-007 (contracts/commands/dispatcher boundary)
- architecture/boundaries.md
- tradeoffs.md

---

## What Goes Into Shared Packages vs Services

Shared packages exist to reduce duplication, not to centralize business logic.

### Shared Packages May Contain
- domain primitives and interfaces (monstrino-core)
- persistence abstractions (monstrino-repositories)
- infrastructure helpers (monstrino-infra)
- API conventions (monstrino-api)
- test infrastructure (monstrino-testing)

### Shared Packages Must Not Contain
- service orchestration logic
- business workflows
- domain-specific “one-off” utilities

---

## Service Taxonomy (Current Shape)

Monstrino currently follows a domain-oriented grouping:

- acquisition: external data collection and parsing
- catalog: canonical domain modeling and read access
- media: image ingestion and storage
- platform/support: cross-cutting operational services

This taxonomy is allowed to evolve, but service responsibilities must remain explicit.

---

## When to Introduce a New Service

A new service is justified when at least one is true:

- the responsibility is stable and would otherwise blur boundaries,
- the workload has distinct operational characteristics (cron, heavy IO, long tasks),
- separate deployment and failure isolation provides real value,
- data ownership would otherwise become unclear.

Do not create a new service only to “look microservice-y”.

---

## What This Policy Does Not Promise

- no guarantee that the current service split is final
- no claim that microservices are always better than a modular monolith
- no real-time ingestion guarantees

This policy is a tool for maintainable evolution under real constraints.
