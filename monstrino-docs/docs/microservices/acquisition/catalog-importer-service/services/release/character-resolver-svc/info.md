---
id: character-resolver-service
title: CharacterResolverService
sidebar_label: Info
---

# CharacterResolverService

:::info
`CharacterResolverService` is responsible for mapping **parsed character data** to existing domain characters and creating relational records in `release_character_link`.
:::

## Overview

This service processes a list of parsed characters for a specific release and creates the corresponding links in the database using a `UnitOfWork` abstraction.  
It ensures role assignment (MAIN/SECONDARY), duplicate prevention, consistent ordering, and error reporting.

## Responsibilities

- Normalize and validate parsed character entries.
- Resolve characters by name via repositories.
- Assign roles based on position:
  - **MAIN** → first character
  - **SECONDARY** → all subsequent characters
- Create `ReleaseCharacterLink` entries.
- Prevent duplicate links.
- Log missing characters for future post‑processing.
- Raise errors on invalid parsed data structure.

## Method: `resolve()`

### Signature

```python
async def resolve(
    uow: UnitOfWorkInterface[Any, Repositories],
    release_id: int,
    characters: list
) -> None:
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `uow` | `UnitOfWorkInterface` | Provides access to repositories and transactional scope. |
| `release_id` | `int` | The release to which characters will be linked. |
| `characters` | `list` | Parsed character objects (typically containing `"text"`). |

---

## Execution Flow

1. **Pre-check**  
   If `characters` is empty → nothing is done.

2. **Load role IDs**  
   - Retrieves IDs for `CharacterRole.MAIN` and `CharacterRole.SECONDARY`.

3. **Iterate through characters**  
   For each parsed character:
   - Extract the `text` field.
   - Normalize with `TitleFormatter.to_code()`.
   - Resolve the character in the database by normalized name.

4. **Character found**  
   - Check if link already exists  
     → if yes, log and skip.
   - Determine role:
     - First character → MAIN
     - Others → SECONDARY
   - Save `ReleaseCharacterLink` with proper position.

5. **Character not found**  
   - Log an error.  
   - (A future extension will auto-create missing characters.)

6. **Invalid character object**  
   - Raise `CharacterDataInvalidError`.

---

## Error Handling

### `CharacterDataInvalidError`
Raised when:
- `character` object lacks a `text` field
- `text` value is `None`

### Logged but not raised:
- Character exists in parsed data but not in database.

---

## Logging

The service logs:
- Duplicate link attempts
- Missing characters
- Any invalid input structures

This is vital for later reconciliation during release post‑processing.

---

## Example Usage

```python
service = CharacterResolverService()

async with uow_factory.create() as uow:
    await service.resolve(
        uow=uow,
        release_id=10,
        characters=[
            {"text": "Frankie Stein"},
            {"text": "Draculaura"}
        ]
    )
```

This will create:
- Frankie Stein → role MAIN → position 1  
- Draculaura → role SECONDARY → position 2

---

## What to Test

### ✔ Role Assignment
- First → MAIN  
- Others → SECONDARY  

### ✔ Correct Link Creation
- `release_character_link` is populated correctly  
- Positions increase sequentially

### ✔ Duplicate Protection
- Existing link is skipped  
- No duplicate insertions

### ✔ Missing Characters
- Logged properly  
- Does not break execution

### ✔ Invalid Data
- Missing `text` → raises `CharacterDataInvalidError`

---

## Future Extensions

A TODO exists in the code:
- Auto-create characters when they appear in parsing but do not exist in DB.

This will integrate with:
- Character import pipelines
- Parser events
- Deferred resolution workflows

---
