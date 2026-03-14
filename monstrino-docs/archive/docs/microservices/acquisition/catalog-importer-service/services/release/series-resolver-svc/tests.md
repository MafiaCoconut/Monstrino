---
id: series-resolver-tests
title: SeriesResolverService - Test Suite
sidebar_label: Tests
---

# SeriesResolverService - Test Suite

:::info
This page documents the complete automated test suite for  
**`SeriesResolverService`**, used during release processing.
:::

The tests verify hierarchy resolution, duplicate handling, ordering rules, and validation of incoming parsed series.

---

## 📑 Table of Contents

- [Test Overview](#test-overview)  
- [Test Cases](#test-cases)  
- [Fixtures Used](#fixtures-used)  
- [Entities Involved](#entities-involved)

---

## 🔍 Test Overview

The service receives a list of parsed series (with `text` and `link`) and:

- Resolves them via repository lookups  
- Creates `ReleaseSeriesLink` entries  
- Applies correct relation types:
  - `PRIMARY`
  - `SECONDARY`
- Ensures parent–child hierarchy consistency  
- Prevents duplicates  
- Validates required fields  

---

# ✅ Test Cases

## 1. `test_series_resolver_svc_single_series`

:::tip Goal
Processing a list with a single series should create one link.
:::

**Checks**
- 1 `ReleaseSeriesLink` is created.

---

## 2. `test_series_resolver_svc_parent_and_child_series`

:::tip Goal
Both parent and child series must be processed independently.
:::

**Checks**
- Number of DB links equals number of provided series.

---

## 3. `test_series_resolver_svc_only_child_series`

:::info Why this matters
Even if only a child series is passed, the parent must still be linked as `PRIMARY`.
:::

**Expected Outcome**
- Total links: **2**
- Relation types:
  - `PRIMARY` for the parent  
  - `SECONDARY` for the child

<details>
<summary>Click to view expected link ordering</summary>

```
links[0] -> PRIMARY  
links[1] -> SECONDARY
```

</details>

---

## 4. `test_series_resolver_svc_duplicate_series_in_list`

:::warning Duplicate Handling
If the same series name appears multiple times in input, only one DB link must be created.
:::

**Checks**
- Input contains exact duplicate entries.
- Output contains **1** link.

---

## 5. `test_series_resolver_svc_child_then_parent_series`

:::info Purpose
Validates **order-independent hierarchy resolution**.
Child appears first, parent second.
:::

**Checks**
- Total links: **2**
- Exactly:
  - **1 PRIMARY**
  - **1 SECONDARY**

<details>
<summary>Correct grouping of links</summary>

```text
PRIMARY: 1  
SECONDARY: 1
```
</details>

---

## 6. `test_series_resolver_svc_invalid_input_data`

:::danger Validation
Missing required field `"text"` must raise `SeriesDataInvalidError`.
:::

**Checks**
- Exception is thrown
- No links are created after failure

---

# 📂 Fixtures Used

```python title="Test Fixtures Overview"
seed_series
seed_series_parent_and_child
seed_release_list
uow_factory
```

**Descriptions:**

- `seed_series` - inserts a sample series into DB
- `seed_series_parent_and_child` - inserts parent and child series into DB  
- `seed_release_list` - inserts releases into DB  
- `uow_factory` - manages async UoW lifecycle  

---

# 🧪 Entities Involved

### `ReleaseSeriesLink`

```ts title="ReleaseSeriesLink (DTO)"
id: int
release_id: int
series_id: int
relation_type: SeriesRelationTypes
```

Used to verify created relations in tests.