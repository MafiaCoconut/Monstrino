---
title: Custom Packages Overview
description: All 7 internal Python packages at a glance - architectural layers, responsibilities, and dependency graph.
sidebar_label: Overview
sidebar_position: 0
---

# Custom Packages Overview

Monstrino is composed of **7 internal Python packages**, each owning a distinct architectural layer.
All packages are versioned independently and distributed via private Git sources.

## Package Dependency Graph

![](/img/architecture/custom-packages-dependencies-diagram.jpg)

## Package Summary

| Package | Layer | Key Responsibilities |
|---------|-------|---------------------|
| [monstrino-core](01-monstrino-core.md) | Domain | Value objects, enums, domain errors, ports (Protocol), UoW interface, scheduler port |
| [monstrino-models](02-monstrino-models.md) | Persistence | SQLAlchemy ORM models, Pydantic DTOs, AutoMapper |
| [monstrino-repositories](03-monstrino-repositories.md) | Data Access | Repository interfaces + implementations, CRUD base, Unit of Work, exception translation |
| [monstrino-api](04-monstrino-api.md) | HTTP Layer | FastAPI exception handlers, RequestContextMiddleware, ResponseFactory, HttpClientInterface |
| [monstrino-contracts](05-monstrino-contracts.md) | Contracts | Versioned request/response schemas, acquisition run contracts, catalog API contracts |
| [monstrino-infra](06-monstrino-infra.md) | Infrastructure | HttpClient (circuit breaker), DB config, SchedulerAdapter, collectors (Mattel, MH Archive, Smyths), LLM gateway |
| [monstrino-testing](07-monstrino-testing.md) | Testing | Pytest plugin, data fixtures (all domains), real DB fixtures, deterministic UUID builder |

## Architectural Layers

```
┌──────────────────────────────────────────────────────────────────────┐
│  Services (monstrino-acquisition, catalog, media, …)                 │
├──────────────────────────────────────────────────────────────────────┤
│  monstrino-contracts      (inter-service data contracts)             │
├──────────────────────────────────────────────────────────────────────┤
│  monstrino-api            (HTTP: middleware, errors, serialization)  │
├──────────────────────────────────────────────────────────────────────┤
│  monstrino-infra          (adapters, clients, scrapers)              │
├──────────────────────────────────────────────────────────────────────┤
│  monstrino-repositories   (data access, UoW)                         │
├──────────────────────────────────────────────────────────────────────┤
│  monstrino-models         (ORM + DTOs)                               │
├──────────────────────────────────────────────────────────────────────┤
│  monstrino-core           (pure domain - no external deps)           │
└──────────────────────────────────────────────────────────────────────┘
```

## Rules

1. **`monstrino-core`** must never import any other internal package.
2. **`monstrino-models`** may only import `monstrino-core`.
3. **`monstrino-contracts`** may only import `monstrino-core`.
4. **`monstrino-api`** has no internal Monstrino dependencies.
5. **`monstrino-repositories`** imports `core`, `models`, `contracts`.
6. **`monstrino-infra`** imports `core`, `api` - never `models` or `repositories` directly.
7. **`monstrino-testing`** is a `devDependency` only - never added to production service dependencies.
