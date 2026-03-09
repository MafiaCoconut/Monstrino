---
title: API Contracts and Versioning
sidebar_position: 7
description: Rules for contract design, naming, compatibility, and API versioning.
---

# API Contracts and Versioning

Stable APIs do not happen by accident. They require explicit contract discipline.

---

## Contract Design Goals

Monstrino API contracts should be:

- **stable** — do not change field names without versioning
- **explicit** — document nullability, sorting, and pagination
- **easy to consume** — prefer readability over persistence-alignment
- **decoupled from persistence layout** — DTOs and response shapes are different things
- **predictable across endpoint families** — consistent conventions throughout

---

## Naming Rules

| Rule | Convention |
|---|---|
| Resource paths | plural nouns |
| Path parameters | identify the primary resource |
| Query parameters | filtering, sorting, pagination |
| Response field names | consistent across endpoints |
| Externally visible names | prefer clarity over internal abbreviations |

---

## Versioning Strategy

The public-facing API should use **URL versioning**:

```text
/api/v1/...
```

Why this is a good fit:

- simple to document
- easy to route
- easy to deprecate
- works well with gateway policy layers

---

## Compatibility Rules

### Safe Changes

- adding optional fields
- adding new filter values when documented
- adding new endpoints
- improving descriptions or examples

### Breaking Changes

:::warning Breaking changes require a version bump
| Change | Why it's breaking |
|---|---|
| renaming fields | all clients reading that field will fail |
| changing field meaning | clients produce incorrect behavior silently |
| changing field type | deserialization breaks |
| removing fields | any client expecting that field will fail |
| changing pagination contract | clients relying on cursor or page behavior break |
| changing default sorting without documentation | subtle ordering changes in displayed results |
:::

---

## DTOs vs Response Contracts

Shared DTO packages are useful for internal consistency, but **public contracts should not blindly mirror DTO classes**.

| Concern | DTO | Response Contract |
|---|---|---|
| Field stability | internal | public stability required |
| Field naming | internal convenience | clarity and readability |
| Structure | flat, storage-oriented | nested, consumer-oriented |
| Persistence details | can be present | must be hidden |

---

## Example Response Envelope

A consistent response envelope is optional, but when used it should stay simple:

```json
{
  "status": "success",
  "request_id": "req_cee2f468f547",
  "correlation_id": "req_cee2f468f547",
  "trace_id": null,
  "data": {},
  "error": null,
  "meta": {
    "service": "catalog-api-service",
    "version": "v1",
    "timestamp": "2026-03-07T16:14:36.875306Z"
  }
}
```

For detail endpoints, a plain resource response is also acceptable if used consistently.

---

## Pagination Recommendation

For catalog browsing endpoints, support:

| Parameter | Purpose |
|---|---|
| `page` | current page (1-based) |
| `pageSize` | items per page |
| `sort` | sort field and direction |
| endpoint-specific filters | e.g., `series`, `character`, `year`, `type` |

:::tip
Do not invent different pagination contracts for different resources unless there is a strong operational reason.
:::

---

## Deprecation Policy

For public APIs:

1. mark deprecated fields or endpoints in documentation
2. provide replacement guidance
3. keep deprecations available for a defined transition period
4. remove only in a new version or after an explicit migration window

---

## Related Pages

- [Public API Strategy](./04-public-api-strategy.md)
- [Response Shaping](./07-response-shaping.md)
- [API Design Principles](../principles/04-api-design-principles.md)
