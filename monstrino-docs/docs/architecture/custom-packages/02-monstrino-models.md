---
title: monstrino-models
description: SQLAlchemy ORM models and Pydantic DTOs for all domains, plus an AutoMapper layer to convert between them.
sidebar_label: monstrino-models
sidebar_position: 2
---

# monstrino-models

## Purpose

`monstrino-models` contains **database persistence models and their corresponding DTOs**.

It defines how entities are represented in the database (ORM layer) and provides Pydantic-based DTO counterparts for safe data transfer between layers.

## Dependencies

| Package |
|---------|
| `sqlalchemy` |
| `pydantic` |
| `monstrino-core` |

## Actual Structure

```text
monstrino_models/
├── orm/
│   ├── base/
│   └── schemas/        # SQLAlchemy ORM models, organized by domain
│       ├── auth/
│       ├── catalog/
│       ├── community/
│       ├── core/
│       ├── event/
│       ├── ingest/
│       ├── market/
│       └── media/
├── dto/
│   └── schemas/        # Pydantic DTOs mirroring every ORM schema (identical domain tree)
│       ├── auth/
│       ├── catalog/
│       ├── community/
│       ├── core/
│       ├── event/
│       ├── ingest/
│       ├── market/
│       └── media/
├── mappers/
│   └── auto_mapper.py  # AutoMapper - automated ORM ↔ DTO conversion
├── enums/
└── test/               # Empty test namespace packages (auth, character, release, etc.)
```

## Key Concepts

### ORM Layer (`orm/`)

SQLAlchemy 2.x declarative models. Each model extends `DeclarativeBase` and
typically uses the `default_columns` mixin that injects common audit fields.
The structure mirrors the business domain exactly.

### DTO Layer (`dto/`)

Pydantic models that mirror the ORM schemas 1-to-1.
Used to safely pass data across service boundaries without exposing SQLAlchemy sessions.

### AutoMapper (`mappers/auto_mapper.py`)

Provides automated bidirectional mapping between ORM models and their DTO counterparts, reducing repetitive converter code.

## Covered Domains

| Domain | ORM tables | DTOs |
|--------|-----------|------|
| `auth` | AuthUser, RefreshToken | ✓ |
| `catalog/character` | Character, Pet, CharacterPetOwnership | ✓ |
| `catalog/external_ref` | 4 external reference tables | ✓ |
| `catalog/release` | Release + 10 relation/media/refdata tables | ✓ |
| `core` | GeoCountry, MoneyCurrency, Source, SourceType, … | ✓ |
| `event` | EventOutbox | ✓ |
| `ingest` | ParsedCharacter, ParsedPet, ParsedRelease, ParsedSeries | ✓ |
| `market` | MSRP, market links, price observations | ✓ |
| `media` | MediaAsset, Variant, Attachment, IngestionJob | ✓ |

## Must NOT Contain

-   HTTP request models or API schemas
-   business logic
-   database queries or repository logic

This layer is strictly about **database representation and data transfer structure**.
