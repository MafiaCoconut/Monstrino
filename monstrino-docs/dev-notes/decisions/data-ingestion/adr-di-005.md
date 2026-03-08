---
id: adr-di-005
title: "ADR-DI-005: Parsed Models for Heterogeneous Sources"
sidebar_label: "DI-005: Heterogeneous Parsed Models"
sidebar_position: 5
tags: [data-ingestion, parsed-models, heterogeneous, sources]
---

# ADR-DI-005 — Design Parsed Models for Heterogeneous Source Data

| Field      | Value                                                              |
| ---------- | ------------------------------------------------------------------ |
| **Status** | Accepted                                                           |
| **Date**   | 2025-05-15                                                         |
| **Author** | @monstrino-team                                                    |
| **Tags**   | `#data-ingestion` `#parsed-models` `#heterogeneous` `#sources`    |

## Context

The initial `ParsedRelease` model was designed to match a single source (the first parser built for Monstrino). As new source providers were added, the model's rigid schema conflicted with different field shapes, missing attributes, and alternative taxonomies from other sources.

## Options Considered

### Option 1: Strict Schema Per Source

Create a separate parsed model (and table) for each data source.

- **Pros:** Each model perfectly matches its source.
- **Cons:** Proliferates tables and models, complicates shared importer logic, no unified view across sources.

### Option 2: Single Strict Shared Model

Design one rigid parsed schema that all sources must conform to.

- **Pros:** Uniform structure, simple importer.
- **Cons:** Forces sources into an ill-fitting shape, causes data loss for source-specific fields, makes new source onboarding hard.

### Option 3: Flexible Shared Parsed Models ✅

Use a shared parsed model with nullable / optional fields and an additional `raw_payload` JSON column for source-specific data.

- **Pros:** One model works across sources, source-specific fields are preserved in JSON, easy to add new sources.
- **Cons:** Import logic must handle field presence/absence per source.

## Decision

> Parsed models must be **flexible and source-agnostic**. Fields that are not universal are nullable. Source-specific structured data is preserved in a `raw_payload` JSON column.

## Consequences

### Positive

- New source providers can be integrated without schema migrations.
- Source-specific data is not lost.

### Negative

- Importer logic is more complex — must handle varying field presence per source.

## Related Decisions

- [ADR-DI-001](./adr-di-001.md) — Parsed tables as ingestion boundary
- [ADR-DI-006](./adr-di-006.md) — Replayable JSON storage
