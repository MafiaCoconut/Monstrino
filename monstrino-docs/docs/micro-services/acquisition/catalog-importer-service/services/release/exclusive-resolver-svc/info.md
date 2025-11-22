---
id: exclusive-resolver-service
title: ExclusiveResolverService
sidebar_label: Info
---

# ExclusiveResolverService

:::info
`ExclusiveResolverService` resolves exclusive vendor information extracted from parsed release data and creates `release_exclusive_link` records.
:::

## Overview

This service processes parsed exclusive vendor entries for a release.  
It normalizes vendor names, resolves existing vendors in the database, prevents duplicates, and creates associations through the `UnitOfWork` transaction boundary.

## Responsibilities

- Validate parsed exclusive vendor data.
- Normalize input with `NameFormatter`.
- Resolve vendor IDs from the `exclusive_vendor` repository.
- Prevent duplicate vendor-to-release links.
- Create `ReleaseExclusiveLink` entries when appropriate.
- Log missing vendors or invalid structures.

---

# Method: `resolve()`

### Signature

```python
async def resolve(
    uow: UnitOfWorkInterface[Any, Repositories],
    release_id: int,
    exclusive_list: list[dict]
) -> None:
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `uow` | `UnitOfWorkInterface` | Transaction context giving access to repositories. |
| `release_id` | `int` | ID of the release being updated. |
| `exclusive_list` | `list[dict]` | Parsed vendor entries with expected `text` field. |

---

# Execution Flow

## 1. Iterate through parsed vendors
Each item in `exclusive_list` should include a `"text"` key.

If missing → `ExclusiveDataInvalidError` is raised immediately.

## 2. Normalize and resolve vendor name

Vendor names are normalized using:

```python
NameFormatter.format_name(name)
```

The normalized name is looked up via:

```python
vendor_id = await uow.repos.exclusive_vendor.get_id_by(...)
```

## 3. Vendor exists in DB
Proceed to duplicate validation:

```python
await uow.repos.release_exclusive_link.exists_by(release_id, vendor_id)
```

- If link already exists → log and skip.
- Otherwise → create new `ReleaseExclusiveLink`.

## 4. Vendor not found
A warning is logged:

```
Exclusive vendor found in parser data, but not found in db
```

But execution continues for other vendors.

---

# Error Handling

### `ExclusiveDataInvalidError`
Raised when:
- The parsed vendor object does not include `"text"`,
- Or `text = None`.

### Logged but not raised:
- Vendor not found in DB.
- Duplicate link already exists.

---

# Logging

The service logs the following important states:

- Duplicate vendor-to-release links.
- Vendor names missing from database.
- Invalid vendor structures.

Logging ensures traceability of parsing inconsistencies.

---

# Example Usage

```python
service = ExclusiveResolverService()

async with uow_factory.create() as uow:
    await service.resolve(
        uow=uow,
        release_id=99,
        exclusive_list=[
            {"text": "Amazon Exclusive"},
            {"text": "Walmart Exclusive"}
        ]
    )
```

This will:
- Resolve vendor IDs,
- Create non-duplicate `ReleaseExclusiveLink` records,
- Log missing vendors if they are not present in the database.

---

# What to Test

### ✔ Vendor Resolution
- Valid vendor names resolve to correct IDs.

### ✔ Duplicate Protection
- Existing link → log → skip.

### ✔ Missing Vendor in DB
- Error logged, but other vendors continue processing.

### ✔ Invalid Data
- Missing `"text"` → `ExclusiveDataInvalidError`.

### ✔ Correct Link Creation
- Correct release/vendor pairs persisted.

---

# Future Extensions

- Auto-creation of missing exclusive vendors.
- Enhanced duplicate strategies (e.g., merging, prioritization).
- Multi-vendor priority rules for advanced parsing cases.

---
