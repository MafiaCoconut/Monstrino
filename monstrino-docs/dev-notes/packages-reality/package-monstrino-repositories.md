---
id: package-monstrino-repositories
title: Package — monstrino-repositories
sidebar_label: monstrino-repositories
---

> **Type:** Shared persistence package  
> **Audience:** Engineering / Architecture review

---

## Responsibility

The **monstrino-repositories** package provides reusable persistence patterns and concrete
repository implementations used across services.

It exists to:
- avoid duplication of repository logic in every service,
- standardize query and persistence behavior,
- provide consistent transaction management helpers.

---

## What This Package Owns

- Base repository building blocks (BaseRepo)
- CRUD-oriented repository layer (CrudRepo)
- Repository interfaces
- Concrete repository implementations
- Transaction and unit-of-work helpers

---

## Guarantees

- Consistent behavior for common persistence operations (get, save, exists, etc.)
- Shared abstractions reduce divergence across services
- Repository implementations encapsulate ORM usage behind stable interfaces
- Unit of Work defines explicit transactional boundaries where used

---

## Non-Guarantees

- No business rules: repositories do not enforce domain invariants beyond persistence constraints
- No service orchestration: repositories do not coordinate multi-aggregate workflows
- No guarantee of zero breaking changes: versioning must be respected by services

---

## Usage Constraints

- ORM models are allowed only inside repository implementations
- Application and use-case layers should rely on DTOs, not ORM
- Avoid service-specific query logic in shared base classes unless it generalizes
- Prefer extending via composition or well-scoped repository methods over copy-paste

---

## Failure Modes (Logical)

- Abstraction drift: BaseRepo becomes too flexible and hides important query intent
- Too-generic APIs: convenience methods enable unsafe, ambiguous usage
- Breaking changes ripple: poorly versioned updates can impact many services

---

## Evolution Notes

:::note
This package is a shared dependency with a large blast radius.
Keep changes additive when possible and document breaking changes via ADR and version bumps.
:::
