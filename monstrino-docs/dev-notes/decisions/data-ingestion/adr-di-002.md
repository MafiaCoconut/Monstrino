---
id: adr-di-002
title: "ADR-DI-002: DB Processing State for Ingestion Workflows"
sidebar_label: "DI-002: Processing State"
sidebar_position: 2
tags: [data-ingestion, processing-state, workflow, retry]
description: "Uses a database-tracked processing_state column to manage ingestion workflow state, replacing a previous Kafka-based orchestration approach."
---

# ADR-DI-002 — Use Database `processing_state` for Ingestion Workflows

| Field      | Value                                                         |
| ---------- | ------------------------------------------------------------- |
| **Status** | Accepted                                                      |
| **Date**   | 2025-09-13                                                    |
| **Author** | @Aleks                                               |
| **Tags**   | `#data-ingestion` `#processing-state` `#workflow` `#retry`   |

## Context

An earlier pipeline design used Kafka for orchestrating ingestion workflows. This caused several problems:

- Errors block the queue for downstream consumers.
- Difficult to inspect individual record state.
- No easy manual intervention or retry mechanism.

## Options Considered

### Option 1: Kafka-Based Pipeline

Use message queues to move records through ingestion stages.

- **Pros:** Decoupled producers and consumers, high throughput potential.
- **Cons:** Blocking on errors, poor visibility into per-record state, operational complexity disproportionate to current scale.

### Option 2: Database `processing_state` Field ✅

Each record in parsed tables has a `processing_state` column that is updated as the record moves through the workflow.

- **Pros:** Visible record state at all times, easy retry by resetting state, no queue management needed.
- **Cons:** Requires polling or scheduled jobs instead of event-driven push.

## Decision

> Ingestion workflows are orchestrated through a **`processing_state` field** on database records with the following states:
>
> - `init` — record created, not yet processed
> - `processing` — currently being processed
> - `processed` — successfully imported
> - `error` — failed, requires intervention or retry

## Consequences

### Positive

- Simple retry by resetting state to `init`.
- Full visibility into pipeline state through standard SQL queries.
- Broken records are isolated and do not block others.

### Negative

- Requires scheduler/polling jobs rather than event-driven consumers.
- Concurrent processing requires careful locking to avoid double-processing.

## Related Decisions

- [ADR-DI-001](./adr-di-001.md) — Parsed tables ingestion boundary
- [ADR-DI-004](./adr-di-004.md) — Idempotency enforcement
