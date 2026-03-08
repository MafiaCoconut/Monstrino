---
id: adr-di-001
title: "ADR-DI-001: Separate Ingestion from Canonical Catalog"
sidebar_label: "DI-001: Parsed Tables Boundary"
sidebar_position: 1
tags: [data-ingestion, catalog, parsed-tables, boundary]
description: "Separates raw ingestion data into parsed tables, decoupling external source formats from the canonical catalog schema to allow safe re-ingestion."
---

# ADR-DI-001 — Separate Ingestion Data from Canonical Catalog Data

| Field      | Value                                                          |
| ---------- | -------------------------------------------------------------- |
| **Status** | Accepted                                                       |
| **Date**   | 2025-09-10                                                     |
| **Author** | @Aleks                                                |
| **Tags**   | `#data-ingestion` `#catalog` `#parsed-tables` `#boundary`     |

## Context

Source data collected from external providers is inconsistent, incomplete, and varies in format. Writing directly into canonical catalog tables would couple source formats to production schema, making changes dangerous and re-ingestion impossible.

## Options Considered

### Option 1: Direct Write to Canonical Tables

Parsers write normalized data directly into `releases`, `characters`, etc.

- **Pros:** Simpler pipeline, fewer moving parts.
- **Cons:** No audit trail, no replay capability, source changes corrupt live data, no independent schema evolution.

### Option 2: Parsed Tables as Ingestion Boundary ✅

All external data lands in `parsed_*` staging tables first. A dedicated importer service transforms and loads into canonical tables.

- **Pros:** Hard boundary between untrusted and canonical data, full replayability, safe schema migration, multi-source support.
- **Cons:** Additional storage and processing step.

## Decision

> **Two data zones** are used:
>
> **Parsed tables (ingestion zone)**
> - `parsed_releases`
> - `parsed_series`
> - `parsed_characters`
> - `parsed_pets`
>
> **Canonical tables (catalog zone)**
> - `releases`
> - `series`
> - `characters`
> - `pets`
>
> Parsers write **only** to parsed tables. The `catalog-importer` service transfers data into canonical tables.

## Consequences

### Positive

- Raw source data is preserved and auditable.
- Parsed records can be re-imported after schema changes without re-scraping.
- Canonical tables are protected from malformed source data.

### Negative

- Additional storage overhead from staging tables.
- Two-step pipeline adds latency between collection and catalog availability.

## Related Decisions

- [ADR-DI-002](./adr-di-002.md) — Processing state as ingestion workflow
- [ADR-DI-003](./adr-di-003.md) — external_id as ingestion identifier
- [ADR-DI-006](./adr-di-006.md) — Replayable JSON storage
