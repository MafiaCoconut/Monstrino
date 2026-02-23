---
id: architecture-boundaries
title: Architectural Boundaries
sidebar_label: Boundaries
---

:::info
This document defines **explicit boundaries** between architectural layers.
These boundaries exist to reduce coupling and prevent accidental misuse.
:::

---

## External Boundary

- External data sources are untrusted
- No external data may write directly to canonical domain tables
- All external data must pass through parsed tables

---

## Transport vs Application Boundary

- Contracts (DTOs) live at the transport boundary
- Contracts must not leak into application logic
- Mapping is required between contracts and commands

---

## Application vs Persistence Boundary

- Use cases operate on DTOs and domain concepts
- ORM models are restricted to repository implementations
- Repositories expose behavior, not database structure

---

## Package Boundaries

- monstrino-core contains only domain-level primitives
- monstrino-infra contains only infrastructure helpers
- monstrino-repositories owns persistence abstractions
- Cross-package imports must respect dependency direction

---

## Boundary Violations (Explicitly Forbidden)

- Using ORM models in use cases
- Writing to canonical tables from parsers
- Embedding business logic in infrastructure helpers

---

:::note
Boundaries are not theoretical.
They are enforced through package structure and review discipline.
:::