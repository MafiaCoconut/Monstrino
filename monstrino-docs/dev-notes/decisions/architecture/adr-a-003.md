---
id: adr-a-003
title: "ADR-A-003: Restrict ORM Usage to Repositories"
sidebar_label: "A-003: ORM in Repositories Only"
sidebar_position: 2
tags: [architecture, orm, repositories, clean-architecture]
description: "Restricts SQLAlchemy ORM usage exclusively to the repository layer to prevent session state leakage and enforce clean architecture boundaries."
---

# ADR-A-003 - Restrict ORM Usage to Repositories

| Field      | Value                                                             |
| ---------- | ----------------------------------------------------------------- |
| **Status** | Accepted                                                          |
| **Date**   | 2025-10-17                                                        |
| **Author** | @Aleks                                                   |
| **Tags**   | `#architecture` `#orm` `#repositories` `#clean-architecture`     |

## Context

SQLAlchemy ORM objects carry session state, lazy-loading behavior, and persistence metadata. When these objects escape the repository layer and spread into application logic, use cases, or API handlers, it causes:

- Business logic coupled to persistence details.
- Session leaks and unexpected lazy-loading in non-database contexts.
- Difficult and fragile unit tests.

## Options Considered

### Option 1: ORM Objects Everywhere

Allow ORM entities to flow freely through all layers.

- **Pros:** Convenient, less mapping boilerplate.
- **Cons:** Business logic becomes coupled to SQLAlchemy, lazy-loading causes hidden queries, testing requires real database sessions.

### Option 2: ORM Restricted to Repository Layer ✅

ORM objects are used only inside repository implementations. Application and domain layers use DTOs, commands, and plain data structures.

- **Pros:** Clean architecture boundaries, testable business logic without DB, free to change ORM without touching application code.
- **Cons:** Additional DTO mapping layer required.

## Decision

> **SQLAlchemy ORM entities may only be instantiated and used inside repository implementations.** Application layer, use cases, dispatchers, and API handlers must work exclusively with DTOs, commands, and domain data classes.

## Consequences

### Positive

- Application logic is persistence-agnostic and unit-testable.
- ORM schema changes do not propagate into business logic.
- Clean separation of concerns.

### Negative

- Mapping between ORM entities and DTOs introduces boilerplate.

## Related Decisions

- [ADR-A-003](./adr-a-003.md) - Unit of Work and BaseRepo persistence stack
- [ADR-A-001](./adr-a-001.md) - Shared packages for models and repositories
