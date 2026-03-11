---
id: adr-a-002
title: "ADR-A-002: Shared Packages for Cross-Service Code"
sidebar_label: "A-002: Shared Packages"
sidebar_position: 1
tags: [architecture, packages, shared-code, monorepo]
description: "Introduces shared Python packages across microservices to eliminate code duplication and establish a monorepo-style shared library foundation."
---

# ADR-A-002 - Introduce Shared Packages for Cross-Service Code

| Field      | Value                                                        |
| ---------- | ------------------------------------------------------------ |
| **Status** | Accepted                                                     |
| **Date**   | 2025-10-01                                                   |
| **Author** | @Aleks                                                       |
| **Tags**   | `#architecture` `#packages` `#shared-code` `#monorepo`       |

## Context

As the number of microservices grew, the same classes were being duplicated across services:

- ORM models for `releases`, `characters`, etc.
- Repository interfaces and base implementations.
- Infrastructure helpers (DB session management, S3 clients, HTTP clients).
- Test fixtures and factories.

Maintaining identical code in multiple services made refactoring expensive and introduced drift between implementations.

## Options Considered

### Option 1: Copy Code Between Services

Keep all code local to each service, accept duplication.

- **Pros:** No inter-service dependency, independent deployability.
- **Cons:** High maintenance cost, diverging implementations, bug fixes must be applied in multiple places.

### Option 2: Shared Internal Packages ✅

Extract shared code into versioned internal packages consumed by all services.

- **Pros:** Single source of truth, shared bug fixes, consistent interfaces across services.
- **Cons:** Introduces inter-package dependency, packaging and versioning complexity.

## Decision

> Shared code is extracted into internal packages:
>
> - `monstrino-models` - ORM and domain models
> - `monstrino-repositories` - repository interfaces and base implementations
> - `monstrino-core` - application-layer utilities
> - `monstrino-testing` - shared test fixtures and factories
> - `monstrino-infra` - infrastructure clients (DB, S3, HTTP, parsers)

## Consequences

### Positive

- One change propagates to all services consuming the package.
- Consistent domain model across the entire system.
- Reduces total lines of code to maintain.

### Negative

- Package versioning and release process adds engineering overhead.
- Breaking changes in shared packages require coordinated upgrades across services.

## Related Decisions

- [ADR-A-002](./adr-a-002.md) - ORM restricted to repository layer
- [ADR-A-006](./adr-a-006.md) - Centralize parsers in monstrino-infra
