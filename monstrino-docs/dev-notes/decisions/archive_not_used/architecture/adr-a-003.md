---
id: adr-a-003
title: "ADR-A-003: Shared Packages for Cross-Service Code"
sidebar_label: "A-003: Shared Packages"
sidebar_position: 3
tags: [architecture, packages, code-sharing, monorepo]
---

# ADR-A-003 — Adopt Shared Packages for Cross-Service Models, Repositories, Core Logic, Testing, and Infra

| Field     | Value                                               |
| --------- | --------------------------------------------------- |
| **Status**  | Accepted                                            |
| **Date**    | 2025-07-01                                          |
| **Author**  | @monstrino-team                                     |
| **Tags**    | `#architecture` `#packages` `#code-sharing`         |

## Context

As Monstrino grew from a single service to a multi-service system, significant code duplication emerged:

- **ORM models** were copy-pasted across services, leading to schema drift.
- **Repository patterns** (CRUD operations, session management) were reimplemented inconsistently.
- **Test fixtures and helpers** diverged between services, making integration testing unreliable.
- **Infrastructure utilities** (HTTP clients, parsers, config loaders) were scattered and maintained independently.

This duplication created a maintenance multiplier: every bug fix or schema change required N updates across N services, with no guarantee of consistency.

:::danger Anti-Pattern
Copy-pasting ORM models across services is a **guaranteed source of schema drift**. When one service updates a model and another doesn't, silent data corruption or runtime errors follow.
:::

## Options Considered

### Option 1: Keep Code Duplicated per Service

Each service maintains its own copy of shared code.

- **Pros:** Full independence, no cross-service dependency management.
- **Cons:** Maintenance multiplier, schema drift, inconsistent behavior, no single source of truth.

### Option 2: Git Submodules for Shared Code

Shared code lives in a separate repo and is included via git submodules.

- **Pros:** Versioned, explicit inclusion.
- **Cons:** Notoriously poor developer experience, merge conflicts, complex CI setup, submodule state management overhead.

### Option 3: Internal Versioned Packages ✅

Shared code is organized into dedicated packages (`monstrino-models`, `monstrino-repositories`, `monstrino-core`, `monstrino-testing`, `monstrino-infra`) within the monorepo, published as installable Python packages.

- **Pros:** Single source of truth, versioned, standard Python tooling, clear dependency graphs, independently testable.
- **Cons:** Requires package management discipline, version coordination across consumers.

### Option 4: Shared Library as a Single Package

All shared code in one `monstrino-common` package.

- **Pros:** Simple dependency — one package to install.
- **Cons:** Violates single responsibility, forces services to depend on code they don't need, large blast radius for changes.

## Decision

> We adopt **multiple focused internal packages** for cross-service code, each with a clear responsibility boundary:

| Package                  | Responsibility                                              |
| ------------------------ | ----------------------------------------------------------- |
| `monstrino-models`       | SQLAlchemy ORM entities and database schema definitions     |
| `monstrino-repositories` | Repository implementations and persistence abstractions     |
| `monstrino-core`         | Domain logic, DTOs, commands, shared business utilities     |
| `monstrino-testing`      | Test fixtures, factories, shared test infrastructure        |
| `monstrino-infra`        | HTTP clients, parsers, external service integrations        |
| `monstrino-contracts`    | API contracts, request/response schemas, validation rules   |

Each package is independently versioned and installable. Services declare explicit dependencies on only the packages they need.

## Consequences

### Positive

- **Single source of truth** — ORM models, DTOs, and repositories exist in exactly one place.
- **Reduced maintenance** — bug fixes and schema updates propagate through version bumps.
- **Clear dependency graph** — each service's `pyproject.toml` declares exactly what it uses.
- **Independent testing** — packages have their own test suites.
- **Onboarding clarity** — new developers can understand the architecture through package boundaries.

### Negative

- **Version coordination** — breaking changes in a shared package require coordinated updates across consumers.
- **Development workflow** — local development may require editable installs (`pip install -e`) for rapid iteration.
- **Release discipline** — packages need semantic versioning and changelog maintenance.

### Risks

- Circular dependencies between packages must be strictly prevented through architectural review.
- Over-extraction risk: not every shared utility warrants its own package — keep the package count manageable.
- Package versioning must be automated in CI to prevent "works on my machine" scenarios.

## Related Decisions

- [ADR-A-004](./adr-a-004.md) — ORM restricted to repository layer (defines what goes in `monstrino-models` vs `monstrino-core`)
- [ADR-A-005](./adr-a-005.md) — Standardized persistence stack (shapes `monstrino-repositories`)
- [ADR-IP-004](../infra-platform/adr-ip-004.md) — Standardize Python tooling on `uv` (governs how packages are built and installed)
