---
id: adr-di-006
title: "ADR-DI-006: Parsed Content as Replayable JSON"
sidebar_label: "DI-006: Replayable JSON"
sidebar_position: 6
tags: [data-ingestion, json, replayability, raw-payload]
description: "Stores the full raw parsed payload as replayable JSON alongside structured columns to prevent data loss across schema migrations."
---

# ADR-DI-006 — Store Parsed Content as Replayable JSON

| Field      | Value                                                         |
| ---------- | ------------------------------------------------------------- |
| **Status** | Accepted                                                      |
| **Date**   | 2026-02-18                                                    |
| **Author** | @Aleks                                               |
| **Tags**   | `#data-ingestion` `#json` `#replayability` `#raw-payload`    |

## Context

The parsed table schema changes frequently as new sources are added, normalization rules evolve, and edge cases are discovered. Relying purely on structured columns in parsed tables means that schema migrations can permanently lose data that was previously captured but didn't yet have a column to store it in.

Additionally, there are operational scenarios where re-processing existing parsed records (without re-scraping) is valuable.

## Options Considered

### Option 1: Structured Columns Only

Store all parsed data in typed database columns.

- **Pros:** Queryable, type-safe, easy to validate.
- **Cons:** Schema changes cause data loss, backfills require re-scraping if a new field was not previously captured.

### Option 2: JSON Raw Payload Alongside Structured Columns ✅

Store the complete raw parsed payload as a JSON column in addition to structured fields. Structured columns are populated from the JSON at parse time.

- **Pros:** Full source representation is always preserved, schema changes can be backfilled from existing JSON, supports replay without re-scraping.
- **Cons:** Storage overhead, JSON may diverge from structured fields if not kept in sync.

## Decision

> Parsed records store the **complete raw source payload as JSON** in a `raw_payload` column. This JSON is the source of truth for replay, backfill, and manual correction workflows. Structured columns are derived from this payload.

### Use Cases Enabled

- **Replay** — re-run importer logic on existing records without re-scraping.
- **Backfill** — extract new fields from previously captured data.
- **Manual edit** — inspect and correct raw data without losing original context.

## Consequences

### Positive

- Parsed records are a complete, replayable snapshot of source data.
- Schema changes don't require re-scraping.
- Backfill operations become cheap.

### Negative

- Storage overhead from JSON duplication.
- Need to keep structured columns in sync with the JSON payload.

## Related Decisions

- [ADR-DI-001](./adr-di-001.md) — Parsed tables boundary
- [ADR-DI-005](./adr-di-005.md) — Heterogeneous parsed models
