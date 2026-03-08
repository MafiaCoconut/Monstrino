---
id: adr-mp-004
title: "ADR-MP-004: Media Ingestion Jobs Table"
sidebar_label: "MP-004: Media Ingestion Jobs"
sidebar_position: 4
tags: [media-pipeline, jobs, database, async-processing]
---

# ADR-MP-004 — Introduce Media Ingestion Jobs

| Field      | Value                                                           |
| ---------- | --------------------------------------------------------------- |
| **Status** | Accepted                                                        |
| **Date**   | 2025-07-01                                                      |
| **Author** | @monstrino-team                                                 |
| **Tags**   | `#media-pipeline` `#jobs` `#database` `#async-processing`      |

## Context

Downloading and storing product images is a heavyweight I/O operation that cannot happen synchronously with catalog ingestion. There was no structured way to queue media work, track its status, retry failures, or observe the processing backlog.

## Options Considered

### Option 1: Trigger Downloads Inline During Catalog Import

Download images as part of the catalog importer pipeline.

- **Pros:** No additional infrastructure.
- **Cons:** Catalog import becomes slow, failures in image download block catalog updates, no independent retry.

### Option 2: Message Queue for Media Jobs

Use a message broker (Kafka, RabbitMQ) to queue image download tasks.

- **Pros:** Decoupled, scales well.
- **Cons:** Infrastructure overhead, same operational complexity as rejected Kafka pipeline (see ADR-DI-002).

### Option 3: Database `media_ingest_job` Table ✅

A dedicated table stores pending media processing work as records with state tracking, consistent with the project's database-first workflow approach (see ADR-DI-002).

- **Pros:** Same `processing_state` pattern as ingestion, visible state, easy retry, no additional infrastructure.
- **Cons:** Requires polling-based consumption.

## Decision

> A **`media_ingest_job`** table is introduced in the `media` schema:
>
> ```
> media_ingest_job
>   id
>   release_id   (FK → releases)
>   source_url
>   processing_state  (init | processing | processed | error)
>   storage_path
>   created_at
>   updated_at
> ```
>
> The subscriber creates job records; the processor picks them up and updates their state.

## Consequences

### Positive

- Consistent with the established `processing_state` pattern.
- Full operational visibility into download queue through SQL.
- Independent retry of failed jobs.

### Negative

- Requires polling-based job pickup rather than event-driven push.

## Related Decisions

- [ADR-DI-002](../data-ingestion/adr-di-002.md) — Processing state pattern
- [ADR-MP-003](./adr-mp-003.md) — Subscriber/processor service split
- [ADR-MP-002](./adr-mp-002.md) — S3 storage
