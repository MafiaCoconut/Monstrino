---
title: monstrino-repositories
description: Data access layer — base CRUD repository, domain-specific interfaces, SQLAlchemy implementations, and UnitOfWork.
sidebar_label: monstrino-repositories
sidebar_position: 3
---

# monstrino-repositories

## Purpose

`monstrino-repositories` implements **data access logic** for all Monstrino domains.

It provides both abstract repository interfaces and their SQLAlchemy-based implementations, the Unit of Work pattern, base CRUD infrastructure, and database exception translation utilities.

## Dependencies

| Package |
|---------|
| `sqlalchemy` |
| `asyncpg` |
| `pydantic` |
| `monstrino-core` |
| `monstrino-models` |
| `monstrino-contracts` |

## Actual Structure

```text
monstrino_repositories/
├── base/
│   ├── crud_repo/
│   ├── dto/
│   ├── factory/
│   │   ├── mapper_factory.py  # MapperFactory — builds ORM↔DTO mappers
│   │   └── repo_factory.py    # RepoFactory — constructs repository instances
│   ├── orm_base_repo/
│   │   ├── interfaces/        # BaseRepoInterface
│   │   └── orm_base/          # SqlAlchemyBaseRepo — base async SQLAlchemy repo
│   └── utilities/
│       ├── db_error_handler.py          # Top-level DB error handler
│       ├── repo_exception_translator.py # Translates DB exceptions to domain errors
│       └── sqlalchemy_exception_map.py  # Maps SQLAlchemy errors to domain errors
├── repositories_interfaces/   # Abstract interfaces for each domain entity
│   ├── auth/
│   ├── catalog/
│   ├── community/
│   ├── core/
│   ├── ingest/
│   ├── market/
│   └── media/
├── repositories_impl/ # SQLAlchemy implementations (mirrors interfaces structure)
│   ├── auth/
│   ├── catalog/
│   ├── community/
│   ├── core/
│   ├── ingest/ 
│   ├── market/
│   └── media/
└── unit_of_work/
    ├── sqlaclhemy_unit_of_work.py     # SQLAlchemy async Unit of Work implementation
    └── unit_of_work_factory_impl.py   # Factory that creates UoW instances
```

## Key Concepts

### Base CRUD Infrastructure

`SqlAlchemyBaseRepo` provides generic async CRUD methods. `CrudRepo` composes these with `CrudDelegationMixin` so each concrete repository gets standard `create`, `read`, `update`, `delete`, `list` operations for free, without repetitive code.

### Repository Interfaces vs Implementations

Each domain entity has a clear separation:
- `repositories_interfaces/` — abstract contracts (Protocols / ABCs) that the domain and application layers depend on
- `repositories_impl/` — SQLAlchemy concrete implementations; only the infrastructure layer references these directly

### Exception Translation

The `utilities/` layer translates low-level SQLAlchemy/asyncpg errors
into typed domain exceptions defined in `monstrino-core`
(`ConstraintViolationError`, `DatabaseBaseError`, etc.),
preventing leakage of ORM-specific errors into the domain.

### Unit of Work

`SqlAlchemyUnitOfWork` wraps an `async_sessionmaker` session and aggregates
all repositories under a single transaction. `UnitOfWorkFactoryImpl` creates
fresh UoW instances per operation.

## Architectural Role

Repositories sit between **domain interfaces** (`monstrino-core` ports) and
**persistence models** (`monstrino-models`), providing the concrete data access bridge.
