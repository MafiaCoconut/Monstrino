---
id: adr-di-003
title: "ADR-DI-003: external_id as Main Ingestion Identifier"
sidebar_label: "DI-003: external_id Identifier"
sidebar_position: 3
tags: [data-ingestion, external-id, identifier, source]
description: "Adopts external_id as the stable primary identifier for ingested records, replacing fragile URL-based keys that are source-specific and mutable."
---

# ADR-DI-003 — Use `external_id` as Main Ingestion Identifier

| Field      | Value                                                     |
| ---------- | --------------------------------------------------------- |
| **Status** | Accepted                                                  |
| **Date**   | 2025-10-08                                                |
| **Author** | @Aleks                                           |
| **Tags**   | `#data-ingestion` `#external-id` `#identifier` `#source` |

## Context

When storing and re-identifying records from external sources, a stable identifier is needed. URLs were initially considered as the natural primary key for scraped records, but they present problems:

- URLs may change due to site restructuring.
- URLs may contain query parameters or tracking suffixes that vary between fetches.
- URLs are not always unique across sources.

## Options Considered

### Option 1: Use URL as Identifier

Store the full scrape URL as the record identifier.

- **Pros:** No extra mapping step, URL is immediately available.
- **Cons:** Unstable — URLs change, contain noise, not unique across sources.

### Option 2: Use `source` + `external_id` Composite Identifier ✅

Each source provides a stable, source-native identifier (product ID, SKU, slug) stored as `external_id`. Combined with `source` name, this forms a stable composite key.

- **Pros:** Stable across URL changes, clean semantics, source-agnostic design.
- **Cons:** Requires sources to provide or derive a usable stable ID.

## Decision

> All ingested records are identified by the composite key: **`source` + `external_id`**.
>
> `external_id` is the source-native stable identifier (e.g., a Shopify product ID, a wiki page slug). `source` is a fixed enumerated value for each data provider.

## Consequences

### Positive

- Records survive URL changes without creating duplicates.
- Supports clean reparsing: the same `source` + `external_id` always maps to the same logical entity.
- Source-agnostic ingestion layer.

### Negative

- Sources without stable native IDs require additional identifier derivation logic.

## Related Decisions

- [ADR-DI-004](./adr-di-004.md) — Idempotency enforcement using this identifier
- [ADR-DI-001](./adr-di-001.md) — Parsed tables boundary
