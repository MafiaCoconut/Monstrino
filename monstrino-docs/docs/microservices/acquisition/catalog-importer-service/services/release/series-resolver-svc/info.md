---
id: series-resolver-service
title: SeriesResolverService
sidebar_label: Info
---

# SeriesResolverService

:::info
`SeriesResolverService` resolves parsed series information for a release, determines correct primary/secondary relationships, and persists them as `release_series_link` records.
:::

## Overview

This service receives a list of series extracted from a parsed release and links them to an existing release using a `UnitOfWork`.  
It handles logical validation, hierarchy resolution, duplicate protection, and role assignment according to the domain rules of the Monstrino catalog.

## Responsibilities

- Normalize and validate parsed series entries.
- Resolve series by formatted name.
- Attach series to a release depending on its type:
  - **PRIMARY series** → create a direct relation to the release.
  - **SECONDARY series** → link both the parent series (as PRIMARY) and the secondary series (as SECONDARY).
- Ensure no duplicate relations are created.
- Log invalid or missing series data.

---

## Method: `resolve()`

### Signature

```python
async def resolve(
    uow: UnitOfWorkInterface[Any, Repositories],
    release_id: int,
    series_list: list[dict]
) -> None:
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `uow` | `UnitOfWorkInterface` | Provides database access and transaction context. |
| `release_id` | `int` | Release being enriched with series information. |
| `series_list` | `list[dict]` | Parsed series objects, each expected to contain a `text` field. |

---

# Execution Flow

## 1. Iterate through parsed series
For each entry:
- Extract `text` value.
- If missing → raise `SeriesDataInvalidError`.

## 2. Normalize and resolve series
Series names are normalized via:

```python
NameFormatter.format_name(name)
```

Then the service loads the matching series from DB.

## 3. Determine series type and apply logic

### PRIMARY series
If `series.series_type == SeriesTypes.PRIMARY`:
- Create a PRIMARY relation directly:
```python
relation_type=SeriesRelationTypes.PRIMARY
```

### SECONDARY series
If `series.series_type == SeriesTypes.SECONDARY`:
- Fetch its parent series (`series.parent_id`).
- If parent exists:
  1. Link parent as PRIMARY.
  2. Link the series itself as SECONDARY.
- If parent not found → log error.

### Invalid series type
If series type is unknown → logged and skipped.

---

# Internal Methods

## `_set_series_relation()`

Persists the relation **only if** it does not already exist.

```python
async def _set_series_relation(...):
    if not await self._validate_series_exist(...):
        await uow.repos.release_series_link.save(...)
```

## `_validate_series_exist()`

Checks whether a relation with the same `(release_id, series_id, relation_type)` already exists.

```python
return await uow.repos.release_series_link.exists_by(...)
```

---

# Error Handling

### `SeriesDataInvalidError`
Thrown when:
- parsed series object does not contain a `text` field,
- or `text` is `None`.

### Logged but not raised:
- Series not found in database.
- Secondary series missing parent.
- Invalid series type.

---

# Logging

This service logs key incorrect states:
- Missing series in DB.
- Missing parent series.
- Duplicate relation attempt.
- Unknown/invalid series type.

Logs help validate and refine parsing strategies.

---

# Example Usage

```python
service = SeriesResolverService()

async with uow_factory.create() as uow:
    await service.resolve(
        uow=uow,
        release_id=42,
        series_list=[
            {"text": "Ghouls Alive"},
            {"text": "Ghouls Alive Wave 2"}
        ]
    )
```

This will:
1. Link `Ghouls Alive` as PRIMARY.
2. Link its child `Ghouls Alive Wave 2` as SECONDARY (and implicitly ensure parent exists as PRIMARY).

---

# What to Test

### ✔ PRIMARY series linking
- Correct creation of a PRIMARY relation.
- Duplicate protection (relation exists → skip).

### ✔ SECONDARY series linking
- Parent is linked as PRIMARY.
- Child is linked as SECONDARY.
- Both skip creation on duplicates.

### ✔ Missing parent
- Log error but continue gracefully.

### ✔ Invalid series data
- Missing `text` → raise `SeriesDataInvalidError`.

### ✔ Invalid series type
- Logged, relation not created.

---

# Future Extensions

- Improved handling when parser produces multiple series of mixed types.
- Full replacement logic for releases with outdated series relations.
- Automatic creation of missing series in DB.

---
