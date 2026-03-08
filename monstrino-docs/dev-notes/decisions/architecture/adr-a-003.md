---
id: adr-a-003
title: "ADR-A-003: UnitOfWork and BaseRepo Persistence"
sidebar_label: "A-003: UnitOfWork & BaseRepo"
sidebar_position: 3
tags: [architecture, persistence, unit-of-work, repository-pattern]
description: "Defines a UnitOfWork and BaseRepository pattern to manage database session lifecycle consistently across all services."
---

# ADR-A-003 — Introduce UnitOfWork and BaseRepo Persistence Architecture

| Field      | Value                                                                   |
| ---------- | ----------------------------------------------------------------------- |
| **Status** | Accepted                                                                |
| **Date**   | 30-10-2025                                                              |
| **Author** | @Aleks                                                         |
| **Tags**   | `#architecture` `#persistence` `#unit-of-work` `#repository-pattern`   |

## Context

Earlier versions of the codebase created a new database session per operation, leading to:

- Inconsistent transaction management.
- Duplicated session handling code across use cases.
- No shared transaction scope across multiple repository operations within a single use case.

## Options Considered

### Option 1: Per-Operation Sessions

Each repository method opens and closes its own session.

- **Pros:** Simple to implement locally.
- **Cons:** No shared transaction, inconsistent rollback behavior, duplicated boilerplate everywhere.

### Option 2: UnitOfWork + BaseRepo Pattern ✅

A `UnitOfWork` context manager owns the session lifecycle and is shared across all repository operations within a use case. `BaseRepo` provides generic low-level DB access, `CrudRepo` adds common reusable operations.

- **Pros:** Atomic multi-repository operations, clean transaction control, reduced boilerplate.
- **Cons:** Requires upfront investment in the persistence infrastructure.

## Decision

> All database access follows a unified persistence stack:
>
> - **`UnitOfWork`** — context manager owning the session, commit, and rollback lifecycle.
> - **`BaseRepo`** — low-level generic repository for raw session access.
> - **`CrudRepo`** — higher-level reusable repository with `save`, `get_one`, `get_many`, `exists`, etc.
>
> Use cases receive a `UnitOfWork` instance and access repositories through it.

## Consequences

### Positive

- Multiple repository operations in one use case participate in a single transaction.
- Rollback behavior is consistent and centralized.
- Reusable CRUD operations reduce boilerplate across all repositories.

### Negative

- Initial infrastructure investment to implement the pattern.
- Developers must understand the UoW pattern to work with the persistence layer.

## Related Decisions

- [ADR-A-002](./adr-a-002.md) — ORM restricted to repositories
- [ADR-A-001](./adr-a-001.md) — Shared packages (monstrino-repositories)
