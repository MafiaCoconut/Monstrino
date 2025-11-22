---
id: exclusive-resolver-tests
title: ExclusiveResolverService — Test Suite
sidebar_label: Tests
---

# ExclusiveResolverService — Test Suite

:::info
This page documents the complete automated test suite for  
**`ExclusiveResolverService`**, responsible for resolving exclusive vendors linked to releases.
:::

These tests validate vendor resolution, duplication rules, error logging, and strict input validation.

---

## 📑 Table of Contents

- [Test Overview](#test-overview)
- [Test Cases](#test-cases)
- [Fixtures Used](#fixtures-used)
- [Entities Involved](#entities-involved)

---

## 🔍 Test Overview

The service receives a list of parsed exclusive vendor objects and:

- Resolves vendors in the database  
- Creates `ReleaseExclusiveLink` entries  
- Validates required fields (`text`)  
- Logs errors for unknown vendors  
- Ensures duplicate prevention logic behaves correctly  

---

# ✅ Test Cases

## 1. `test_exclusive_resolver_svc`

:::tip Goal
Verify that all valid exclusive vendors are linked properly.
:::

**Checks**
- A link is created for each vendor.
- `vendor_id` matches the vendor stored in the DB.

---

## 2. `test_exclusive_resolver_svc_duplicate_link_created`

:::warning Duplicate Prevention Logic
Tests whether duplicate vendor links are prevented.
:::

**Expected Outcome**
- Two calls to `resolve()` with the same input must still result in **only 2 links**, not 4.

<details>
<summary>Why this matters</summary>

Duplicate checks ensure idempotency of release processing, preventing double-insert issues.
</details>

---

## 3. `test_exclusive_resolver_svc_vendor_not_found_in_db`

:::danger Missing Vendor Handling
If vendor parsed from data does not exist in DB, the resolver must:
:::

- Skip link creation  
- Log an error  
- Continue processing remaining vendors  

**Checks**
- Only one valid link created  
- Error logged:  
  `"Exclusive vendor found in parser data, but not found in db with name: NonExistentVendor"`

<details>
<summary>Example logged message</summary>

```
Exclusive vendor found in parser data, but not found in db with name: NonExistentVendor
```
</details>

---

## 4. `test_exclusive_resolver_svc_data_invalid_error`

:::danger Input Validation
Missing required `"text"` field must raise `ExclusiveDataInvalidError`.
:::

**Checks**
- Exception is raised
- Error message contains `"Exclusive vendor"`
- No links are written to DB

---

# 📂 Fixtures Used

```python title="Test Fixtures Overview"
seed_exclusive_vendor_list
seed_release_list
uow_factory
```

**Descriptions**

- `seed_exclusive_vendor_list` — inserts exclusive vendors into DB  
- `seed_release_list` — inserts a release with ID `1`  
- `uow_factory` — async UnitOfWork lifecycle manager  

---

# 🧪 Entities Involved

### `ReleaseExclusiveLink`

```ts title="ReleaseExclusiveLink (DTO)"
id: number
vendor_id: number
release_id: number
```

Used to validate correct linking of exclusive vendors.
