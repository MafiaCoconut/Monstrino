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

> Shown: primary dependency chain per package.  
> Each package also inherits transitive dependencies via its direct imports.

## Package Summary

| Package                                                | Layer          | Key Responsibilities                                                                                            |
|--------------------------------------------------------|----------------|-----------------------------------------------------------------------------------------------------------------|
| [monstrino-core](01-monstrino-core.md)                 | Domain         | Value objects, enums, domain errors, ports (Protocol), UoW interface, scheduler port                            |
| [monstrino-models](02-monstrino-models.md)             | Persistence    | SQLAlchemy ORM models, Pydantic DTOs, AutoMapper                                                                |
| [monstrino-repositories](03-monstrino-repositories.md) | Data Access    | Repository interfaces + implementations, CRUD base, Unit of Work, exception translation                         |
| [monstrino-api](04-monstrino-api.md)                   | HTTP Layer     | FastAPI exception handlers, RequestContextMiddleware, ResponseFactory, HttpClientInterface                      |
| [monstrino-contracts](05-monstrino-contracts.md)       | Contracts      | Versioned request/response schemas, acquisition run contracts, catalog API contracts                            |
| [monstrino-infra](06-monstrino-infra.md)               | Infrastructure | HttpClient (circuit breaker), DB config, SchedulerAdapter, collectors (Mattel, MH Archive, Smyths), LLM gateway |
| [monstrino-testing](07-monstrino-testing.md)           | Testing        | Pytest plugin, data fixtures (all domains), real DB fixtures, deterministic UUID builder                        |

## Rules

1. **`monstrino-core`** must never import any other internal package.
2. **`monstrino-models`** may only import `core`.
3. **`monstrino-repositories`** imports only `core`, `models`.и
4. **`monstrino-api`** may only import `core`.
5. **`monstrino-contracts`** imports only `core`, `api`.
6. **`monstrino-infra`** imports `core`, `api`, `contracts`.
7. **`monstrino-testing`** is a `devDependency` only - never added to production service dependencies.
