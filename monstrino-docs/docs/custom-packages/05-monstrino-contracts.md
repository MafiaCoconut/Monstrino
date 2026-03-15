---
title: monstrino-contracts
description: Versioned inter-service data exchange contracts - request/response schemas, command models, and cross-service DTOs under the v1/ namespace.
sidebar_label: monstrino-contracts
sidebar_position: 5
---

# monstrino-contracts

## Purpose

`monstrino-contracts` defines **versioned data exchange contracts** used across Monstrino services.

It is the **shared language** between services: all request/response schemas, command models, enums, and cross-service DTOs live here.

## Dependencies

| Package |
|---------|
| `pydantic` |
| `monstrino-core` |

## Actual Structure

```text
monstrino_contracts/
├── templates/
│   └── service_folder_structure/
│      ├── contracts/
│      ├── models/
│      └── responses/
│
└── v1/
    ├── channels/       # Event channel definitions (reserved)
    ├── common/
    │   ├── enums/
    │   ├── models/
    │   └── specs/
    │
    ├── domains/
    │   ├── acquisition/
    │   │   ├── catalog_collector/
    │   │   │
    │   │   ├── review_collector/
    │   │   │
    │   │   ├── market_release_discovery/
    │   │   └── market_price_collector/
    │   │
    │   ├── catalog/
    │   │   ├── catalog-data-enricher/
    │   │   ├── catalog_importer/
    │   │   └── catalog_api_service/
    │   │
    │   ├── media/
    │   │   ├── media_rehosting_processor/
    │   │   ├── media_normalization/
    │   │   └── media_api_service/
    │   │
    │   ├── market/
    │   │   └── market_api_service/
    │   │
    │   ├── review/
    │   │   └── review_api_service/
    │   │
    │   └── platform/
    │       └── ai_orchestrator/
    │
    ├── meta/           # Package meta information
    └── service_maps/   # Service name → topic/route maps
```

## Key Concepts

### RunParseContract (Acquisition)

The main contract for triggering a parse run in `catalog_collector`:

```python
class RunParseContract(BaseModel):
    scope:    RunScopeEnum   # "job" (full scheduled run) | "targets" (selective)
    mode:     RunModeEnum    # "run_once"
    system:   str            # e.g. "mattel_creations", "mh_archive"
    kind:     ParseKindEnum  # "character" | "pet" | "series" | "release"
    selector: Optional[SelectorIn]  # required when scope="targets"
```

Validation ensures: `scope="job"` → `selector=None`, `scope="targets"` → `selector` required.

### ReleaseSearchRequest (Catalog)

Standardised search contract used by `catalog_api_service`:

```python
class ReleaseSearchRequest(BaseModel):
    query:   ReleaseSearchQuery
    output:  OutputSpec      # what fields to return
    context: RequestContext  # caller context (locale, etc.)
```

**Example request:**

```json
{
  "query": {
    "filters": { "mpn": "CHX98" },
    "page": { "limit": 10, "offset": 0 },
    "include": { "id": true, "mpn": true }
  },
  "context": { "locale": "en" }
}
```

### Versioning Convention

All contracts are namespaced under `v1/` - future breaking changes will introduce `v2/` without removing `v1/`.

### Templates

`templates/service_folder_structure/` provides empty namespace packages as scaffolding for new service contracts packages.

## Must NOT Contain

- SQLAlchemy ORM models
- business logic
- repository logic

Contracts define **data format and shape**, not behavior.
