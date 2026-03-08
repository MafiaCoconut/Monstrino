---
id: adr-a-005
title: "ADR-A-005: Contracts → Command → Dispatcher API"
sidebar_label: "A-005: Contracts/Command/Dispatcher"
sidebar_position: 5
tags: [architecture, api, contracts, dispatcher, clean-architecture]
description: "Establishes a Contracts → Command → Dispatcher API pattern to decouple HTTP concerns from application logic and enable clean, testable handlers."
---

# ADR-A-005 — Introduce Contracts → Command → Dispatcher API Architecture

| Field      | Value                                                                 |
| ---------- | --------------------------------------------------------------------- |
| **Status** | Accepted                                                              |
| **Date**   | 10-12-2025                                                            |
| **Author** | @Aleks                                                       |
| **Tags**   | `#architecture` `#api` `#contracts` `#dispatcher` `#clean-architecture` |

## Context

Early API handlers called business logic directly, coupling HTTP concerns (request parsing, validation, HTTP status codes) to application logic. This made handlers hard to test, hard to reuse logic from non-HTTP contexts, and blurred layer boundaries.

## Options Considered

### Option 1: Direct Handler → Business Logic Calls

HTTP handlers call use cases or service methods directly.

- **Pros:** Simple and fast to write.
- **Cons:** Transport concerns leak into application logic, hard to test without HTTP stack, no reuse from background jobs or CLI.

### Option 2: Contracts → Command → Dispatcher Pipeline ✅

A structured pipeline cleanly separates HTTP concerns from application logic.

- **Pros:** Each layer has a single responsibility, testable in isolation, application logic reusable from any transport.
- **Cons:** More files and abstractions per feature.

## Decision

> API requests flow through the following pipeline:
>
> ```
> HTTP Request
>   → Contract (input validation and deserialization)
>   → Mapper (Contract → Command)
>   → Command (application-level intent)
>   → Dispatcher (routes Command to UseCase)
>   → UseCase (business logic)
> ```
>
> The HTTP layer only handles transport. Business logic is invoked via Commands, unaware of HTTP.

## Consequences

### Positive

- Application logic is fully transport-agnostic.
- Each layer is independently testable.
- Background jobs and CLI can invoke use cases directly through Commands without HTTP.

### Negative

- Each feature requires multiple layers (Contract, Mapper, Command, UseCase).
- More boilerplate per endpoint, potentially over-engineered for simple CRUD operations.

## Related Decisions

- [ADR-A-002](./adr-a-002.md) — ORM restricted to repository layer
- [ADR-A-003](./adr-a-003.md) — UnitOfWork and BaseRepo persistence
