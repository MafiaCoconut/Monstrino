---
id: release-type-resolver-service
title: Release type resolver service
tags: [monstrino, service, processing, release, release-type, content-type, tier-type, pack-type, resolver]
#slug: docs/microservices/acquisition/catalog-importer/internal-services/release/type-resolver-service

created: 2025-11-27
updated: 2025-11-27

sidebar_label: Release Type Resolver Service
sidebar_position: 1

#toc_max_heading_level: 4

#owner: ...
#service_tier: ...

---

:::info 
`TypeResolverService` is responsible for mapping content-, pack- and tier- type of release.
:::

## Purpose

`TypeResolverService` resolves content type, pack type and tier type
extracted from a `ParsedRelease` and links them to existing `content_type`, 
`pack_type` and `tier_type` records in the database.
It assigns the appropriate type IDs to the release based on the parsed data.


## Purpose for each Type

### List of types

- [Content Type](docs/architecture/domain/enums/release/release_type/content-types.md)
- [Pack Types](docs/architecture/domain/enums/release/release_type/pack-types.md)
- [Tier Type](docs/architecture/domain/enums/release/release_type/tier-types.md)

### Content Type

Types of releases, which show what properties the set has or what is inside it

### Pack Type

Type of releases, which shows the count of characters inside the set and which properties has packaging

### Tier Type

Type of releases, which shows the quality level of the set and its price range

#### Rules

##### BUDGET

Low-cost type with basic features

##### STANDARD

Default type if no other type is specified

1. If none of the other tier type rules match, then it is `STANDARD` tier type.

##### DELUXE

Mid-range type with enhanced features and packaging

1. If release has deluxe package, then it is `DELUXE` tier type.
2. If release name has this words, then it is `DELUXE` tier type.  
\["deluxe", "special edition", "premium"\]

##### COLLECTOR
High-end type with premium features and packaging

1. If release name has this words, then it is `COLLECTOR` tier type.  
\["collector", "skullector", "haunt_couture", "limited edition", "holiday edition", "signature"\]

2. If release source is `MATTEL_CREATIONS`, then it is `COLLECTOR` tier type.

## Context and Dependencies

### Depends on

[//]: # (- <dependency>)

[//]: # (- <dependency>)

## Input specification

### Method signature

```python
async def resolve(
    self,
    uow: UnitOfWorkInterface[Any, Repositories],
    release_id: int,
    release_name: str,
    release_source: str,

    # Content types
    content_type_list: list[str],

    # Pack types
    pack_type_list: list[str],
    release_character_count: int,

    # Tier types
    tier_type: str,

    # Extra
    has_deluxe_packaging: bool = False,

) -> None: ...
```

### Params
| Name                    | Type                | Description                                                                   |
|-------------------------|---------------------|-------------------------------------------------------------------------------|
| uow                     | UnitOfWorkInterface |                                                                               |
| release_id              | int                 | The release to which types will be linked.                                    |
| release_name            | str                 | The name of the release, used for tier type resolution.                       |
| release_source          | str                 | The source of the release, used for tier type resolution.                     |
| content_type_list       | list[str]           | List of content type names extracted from the parsed release                  |
| pack_type_list          | list[str]           | List of pack type names extracted from the parsed release                     |
| release_character_count | int                 | The number of characters in the release, used for pack type                   |
| tier_type               | str                 | The tier type name extracted from the parsed release                          |
| has_deluxe_packaging    | bool                | Indicates if the release has deluxe packaging, used for tier type resolution. |

### Expected input
```json
{
    "uow": UnitOfWorkInterface,
    "release_id": 10,
    "release_name": "Skullector Edward Scissorhands",
    "release_source": "MATTEL_CREATIONS",
    "content_type_list": ["figure", "doll"],
    "pack_type_list": ["single_pack", "gift_set"],
    "release_character_count": 1,
    "tier_type": "",
    "has_deluxe_packaging": true
}
```

### Validation rules
- rule 1
- rule 2

## Execution Flow

### Content types
1. Call `_resolve_content_type` function
2. Validate if content_type_list is not empty
3. Normalize type names
4. Iterate through types
5. Get type ID from repository
6. If content_type_id not found raise `ReleaseContentTypeNotFoundError`
7. Create entity `ReleaseTypeLink` and save

### Pack types
1. Call `_resolve_pack_type` function
2. Validate if pack_type_list is not empty 
3. Call `ReleaseTypePackTypeResolver` to resolve pack type list
4. Iterate through resolved pack types
5. Get pack_type_id from repository
6. Create entity `ReleaseTypeLink` and save
7. If pack type with count of characters is not processed, use `release_characters_count` value to resolve multipack type 
8. If multipack is not `single-pack` set one more pack type `MULTIPACK`

### Tier types
1. Call `_resolve_tier_type` function
2. If tier_type is provided, and it is in `ReleaseTypeTierType` enum, use it
3. Else, call `ReleaseTypeTierResolver` to resolve tier type
4. Create entity `ReleaseTypeLink` and save

### Mermaid diagram
```text
flowchart TD
    A[Start] --> B[Step]
```

## Error Handling
Describe errors.

## Logging
Describe logs.

## Example usage
```python
type_resolver_service = TypeResolverService()
await type_resolver_service.resolve(
    uow=uow,
    release_id=10,
    release_name="Skullector Edward Scissorhands",
    release_source="MATTEL_CREATIONS",
    content_type_list=["figure", "doll"],
    pack_type_list=["single_pack", "gift_set"],
    release_character_count=1,
    tier_type="",
    has_deluxe_packaging=True,
)
```

## What to Test


## Future Extensions
