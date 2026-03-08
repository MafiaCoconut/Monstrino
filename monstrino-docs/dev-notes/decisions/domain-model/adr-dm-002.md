---
id: adr-dm-002
title: "ADR-DM-002: Release External Reference System"
sidebar_label: "DM-002: Release External References"
sidebar_position: 2
tags: [domain-model, releases, external-references, sources]
---

# ADR-DM-002 — Add Release External Reference System

| Field      | Value                                                             |
| ---------- | ----------------------------------------------------------------- |
| **Status** | Accepted                                                          |
| **Date**   | 2025-07-10                                                        |
| **Author** | @monstrino-team                                                   |
| **Tags**   | `#domain-model` `#releases` `#external-references` `#sources`    |

## Context

A single canonical release in the catalog may have been discovered from — and be verifiable through — multiple external sources (Mattel Shopify, fan wikis, retailer listings, etc.). There was no structured way to record this many-to-one relationship between sources and canonical releases.

Previously, a single `source_url` field on the release was used, which could only capture one reference and made multi-source traceability impossible.

## Options Considered

### Option 1: Single `source_url` Field on Release

Keep one URL field on the `releases` table.

- **Pros:** Simple, no joins needed.
- **Cons:** Only one source can be recorded, loses traceability from multiple sources to the same canonical entity.

### Option 2: Dedicated `release_external_reference` Table ✅

Create a separate table linking canonical releases to all known external source records.

- **Pros:** Unlimited sources per release, preserves full provenance, supports cross-source validation.
- **Cons:** Additional join when querying release sources.

## Decision

> A **`release_external_reference`** table is added to the catalog schema:
>
> ```
> release_external_reference
>   release_id  (FK → releases)
>   source
>   external_id
>   url
>   created_at
> ```
>
> Each row links a canonical release to one external source record.

## Consequences

### Positive

- Full provenance chain: canonical release → all source records.
- Supports cross-source validation and reconciliation.
- Multi-source releases are first-class citizens.

### Negative

- Slightly more complex insert and query logic during import.

## Related Decisions

- [ADR-DI-001](../data-ingestion/adr-di-001.md) — Ingestion boundary with parsed tables
- [ADR-DI-003](../data-ingestion/adr-di-003.md) — external_id as ingestion identifier
