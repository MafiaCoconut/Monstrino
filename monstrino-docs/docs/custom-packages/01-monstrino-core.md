---
title: monstrino-core
description: Domain foundation - ports (Protocols), value objects, domain errors, and the UnitOfWork interface. No framework dependencies.
sidebar_label: monstrino-core
sidebar_position: 1
---

# monstrino-core

## Purpose

`monstrino-core` is the **domain foundation package** of the Monstrino platform.

It contains the pure domain layer: value objects, enums, domain exceptions, interfaces (ports), application-level primitives, and scheduler abstractions.

This package must remain **independent from infrastructure, persistence, and transport layers**.

## Dependencies

| Package |
|---------|
| `pydantic` |
| `lxml` |

No internal Monstrino packages are depended upon - this package is the root of the dependency tree.

## Actual Structure

```text
monstrino_core/
├── domain/
│   ├── errors/           # Domain exceptions: DB, parsing, API, release-type errors
│   ├── refs/             # Entity references: parse refs, parsed content refs, market refs
│   ├── rules/            # Business rules for release classification (content type, tier)
│   ├── scopes/           # ParseScope - acquisition scope definition
│   ├── services/         # Domain services: formatters, resolvers
│   │   ├── gtin_formatter.py
│   │   ├── name_formatter.py
│   │   └── title_formatter.py
│   └── value_objects/    # Enums and immutable domain concepts
│       ├── catalog/      # Release type, series, character, pet value objects
│       ├── core/         # GeoCountryCode, Sources
│       ├── media/        # Asset status, ingestion state, media kind enums
│       └── shared/
│           └── downloaded_file.py
├── interfaces/           # Abstract contracts: UoW interface, API client interface
├── ports/                # Protocol-based ports for acquisition (catalog + market parsers)
├── scheduler/            # Scheduler port and Job dataclass
│   ├── job.py
│   └── port.py
└── shared/
    └── enums/            # Cross-cutting enums: ParseTypeEnum, DatabaseOrderByTypes
```

## Key Concepts

### Ports (Protocol-based interfaces)
Ports define parsing contracts via Python `Protocol`. Each acquisition domain has a dedicated port:

```python
class ParseReleasePort(Protocol):
    async def get_refs(self, base_url, country_code, scope, batch_size) -> list[ParseReleaseRef]: ...
    def parse_refs(self, refs, parse_type, batch_size, limit) -> AsyncGenerator: ...
    async def parse_content_by_external_id(self, base_url, external_id, country_code): ...
    def parse_year_range(self, year_start, year_end, ...) -> AsyncGenerator: ...
```

### Value Objects
Enums cover the full business taxonomy: `ReleaseTypeContentType` (doll-figure, pet-figure, vinyl-figure, playset, fashion-pack, funko-pop, …), `TierType`, `CategoryEnum`, `SeriesTypesEnum`, `GeoCountryCode`, media states, etc.

### Unit of Work Interface
`UnitOfWorkInterface` is a generic async context manager with `commit()`, `rollback()`, and `savepoint()` - completely ORM-agnostic.

## Must NOT Contain

-   SQLAlchemy ORM models
-   database queries
-   HTTP clients
-   web frameworks (FastAPI, etc.)
-   API request/response schemas

## Architectural Role

`monstrino-core` is the **root of the entire dependency tree** - all other Monstrino packages depend on it, but it depends on none of them.
