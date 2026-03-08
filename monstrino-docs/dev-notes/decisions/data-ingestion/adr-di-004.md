---
id: adr-di-004
title: "ADR-DI-004: Idempotency via source + external_id"
sidebar_label: "DI-004: Idempotency"
sidebar_position: 4
tags: [data-ingestion, idempotency, deduplication, external-id]
description: "Enforces idempotency in the ingestion pipeline using a compound unique constraint on source + external_id to prevent duplicate records across repeated runs."
---

# ADR-DI-004 — Enforce Idempotency Using `source` + `external_id`

| Field      | Value                                                            |
| ---------- | ---------------------------------------------------------------- |
| **Status** | Accepted                                                         |
| **Date**   | 2025-10-14                                                       |
| **Author** | @Aleks                                                  |
| **Tags**   | `#data-ingestion` `#idempotency` `#deduplication` `#external-id` |

## Context

The ingestion pipeline is designed to run repeatedly — re-scraping sources on a schedule, re-processing records after errors, and replaying historical data. Without a deduplication mechanism, repeated runs would create duplicate parsed records for the same real-world entity.

## Options Considered

### Option 1: No Deduplication

Insert every ingested record without checking for existing entries.

- **Pros:** Simplest write path.
- **Cons:** Unbounded duplicate records, corrupted catalog state, unusable data over time.

### Option 2: URL-Based Deduplication

Use the source URL as a unique key.

- **Pros:** Immediately available from the scrape.
- **Cons:** URLs are unstable — this would fail to deduplicate reparsed records after URL changes.

### Option 3: `source` + `external_id` Uniqueness Constraint ✅

Apply a database-level unique constraint on `(source, external_id)` in parsed tables.

- **Pros:** Simple, enforced at the database level, robust to URL changes, supports upsert semantics.
- **Cons:** Requires `external_id` derivation logic per source.

## Decision

> A **database-level unique constraint** is placed on `(source, external_id)` in all parsed tables. Inserting a record that already exists results in an upsert (update) rather than a duplicate insert.

## Consequences

### Positive

- Prevents duplicate records regardless of how many times a source is re-scraped.
- Safe to run ingestion jobs repeatedly without side effects.
- Enables clean replay — re-running a parser updates existing records in place.

### Negative

- Upsert semantics need to be explicitly handled in the parser write path.

## Related Decisions

- [ADR-DI-003](./adr-di-003.md) — external_id as identifier definition
- [ADR-DI-002](./adr-di-002.md) — Processing state workflow
