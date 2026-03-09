---
id: character-resolver-tests
title: CharacterResolverService - Test Suite
sidebar_label: Tests
---

# CharacterResolverService - Test Suite

:::info
This page documents the complete automated test suite for  
**`CharacterResolverService`**, responsible for resolving character links for releases.
:::

The tests validate correct character linking, role assignment, duplicate prevention, error logging, and strict input validation.

---

## 📑 Table of Contents

- [Test Overview](#test-overview)  
- [Test Cases](#test-cases)  
- [Fixtures Used](#fixtures-used)  
- [Entities Involved](#entities-involved)

---

## 🔍 Test Overview

The service receives a list of parsed characters and:

- Resolves them in the character database  
- Creates `ReleaseCharacterLink` entries  
- Assigns correct roles (`MAIN`, `SECONDARY`)  
- Prevents duplicate character links  
- Logs errors when characters are missing  
- Preserves correct `position` ordering  

---

# ✅ Test Cases

## 1. `test_character_resolver_svc`

:::tip Goal
Ensure that valid characters are linked in correct order with correct roles.
:::

**Checks**
- Two characters produce two links.  
- Positions:  
  - `links[0]` → position **1**  
  - `links[1]` → position **2**  
- Roles:  
  - First character → `MAIN`  
  - Second character → `SECONDARY`

---

## 2. `test_character_resolver_svc_duplicate_character_in_list`

:::warning Duplicate Handling  
The same character appearing multiple times must only generate one character link.
:::

**Expected Outcome**
- Input contains 3 entries, including a duplicate.  
- Output contains **only 2 links**.  
- The first appearance rules the position and the role.

<details>
<summary>Expected result structure</summary>

```
Frankie Stein  -> MAIN (position 1)
Draculaura     -> SECONDARY (position 2)
```
</details>

---

## 3. `test_character_resolver_svc_character_not_found_logs_error`

:::danger Missing Character Handling
If a character exists in parser data but not in the database, the service logs an error.
:::

**Expected Outcome**
- Only existing characters are linked (2 total).  
- `Draculaura` receives:  
  - position **2**  
  - role `SECONDARY`  
- Error log must include:  
  `"Character found in parsed data, but not found in character db: MissingCharacterName"`

<details>
<summary>Logged Message Example</summary>

```
Character found in parsed data, but not found in character db: MissingCharacterName
```
</details>

---

# 📂 Fixtures Used

```python title="Test Fixtures Overview"
seed_character_list
seed_character_role_list
seed_release_list
uow_factory
```

**Descriptions:**

- `seed_character_list` - inserts characters (e.g., Frankie Stein, Draculaura)  
- `seed_character_role_list` - inserts roles (`MAIN`, `SECONDARY`)  
- `seed_release_list` - creates a release with ID 1  
- `uow_factory` - async UnitOfWork lifecycle manager  

---

# 🧪 Entities Involved

### `ReleaseCharacterLink`

```ts title="ReleaseCharacterLink (DTO)"
id: number
character_id: number
role_id: number
position: number
release_id: number
```

Used to assert correct character-role linking behavior.