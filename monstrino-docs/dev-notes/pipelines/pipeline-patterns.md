---
id: pipeline-patterns
title: Pipeline Patterns and Conventions
sidebar_label: Patterns and Conventions
description: Cross-cutting implementation and operational patterns recommended for Monstrino pipelines.
---

# Pipeline Patterns and Conventions

:::info
This note captures recurring implementation patterns that should be **reused across all Monstrino pipelines**.
The goal is to keep background processing predictable, maintainable, and operationally understandable.
:::

---

## 1. Prefer Explicit Job Records Over Hidden Background Work

When a pipeline performs meaningful multi-step work, store a job entity in the database rather than keeping all state only in memory.

Benefits:

- retries are easier,
- processing history is visible,
- operators can inspect pending work,
- schedulers and workers stay decoupled.

---

## 2. Keep Triggers Lightweight

Subscribers, schedulers, and controllers should not contain heavy transformation logic.

Recommended split:

| Layer | Responsibility |
|---|---|
| **Trigger component** | discovers or receives work |
| **Use case** | coordinates processing logic |
| **Infrastructure adapters** | perform I/O |
| **Repositories** | persist state |

---

## 3. Model Processing State Explicitly

:::warning
A pipeline without visible state becomes **hard to debug**.
:::

Each job-like workflow should expose a clear lifecycle, for example:

| State | Meaning |
|---|---|
| `init` | work identified, not started |
| `processing` | currently being handled |
| `processed` | completed successfully |
| `failed` | terminal failure |
| `retry_pending` | temporary failure, waiting for retry |

Additional domain-specific states are allowed if they improve clarity.

---

## 4. Use Small, Composable Internal Components

Useful internal components often include:

- **downloader** - fetches external resources,
- **parser** - extracts structured fields from raw data,
- **mapper** - transforms one representation into another,
- **validator** - checks data integrity and plausibility,
- **uploader** - persists files to external storage,
- **deduplicator** - prevents duplicate writes,
- **command dispatcher** - sends internal commands or events.

This keeps use cases testable and avoids giant service classes.

---

## 5. Treat External Data as Untrusted

Every pipeline dealing with third-party sources should validate:

- presence of required fields,
- transport success (correct HTTP status),
- content type matches expectation,
- data format is parseable,
- values are business-plausible.

:::warning
**Never assume that a source stays stable.**
:::

---

## 6. Preserve Raw Evidence When Feasible

When parsing external data, it is often worth storing:

- raw payload bytes or string,
- payload hash for change detection,
- source snapshot reference,
- source URL and fetch timestamp.

> This is critical for debugging parser regressions and replaying failed ingestion.

---

## 7. Design for Idempotency from the Beginning

A pipeline should be safe to rerun on the same input.

Useful idempotency anchors:

- external source ID,
- canonical URL,
- content hash,
- deterministic relation key,
- `source + entity identity` composite key.

---

## 8. Separate Source-Shaped Data from Canonical Domain Data

Do not force raw source values directly into canonical entities too early.

Preferred progression:

```
raw source payload
    → parsed source-shaped representation
        → enriched candidate representation
            → canonical normalized write
```

---

## 9. Distinguish Retryable Failures from Terminal Failures

A strong pipeline should not place every failure into the same bucket.

| Type | Examples |
|---|---|
| **Retryable** | timeout, temporary 5xx, storage unavailable, queue lag |
| **Terminal** | unsupported content type, malformed source identity, impossible field absence, business rule violation that will not change on retry |

---

## 10. Emit Enough Logging Context

Every meaningful pipeline log should ideally include:

| Field | Purpose |
|---|---|
| `pipeline_name` | which pipeline produced this log |
| `job_id` | unique identifier of the work unit |
| `source_name` | which external source was involved |
| `external_id` | the source-side identifier |
| `release_id` | internal release, if known |
| `correlation_id` | traceability across services |
| `processing_stage` | current pipeline step |
| `retry_count` | number of previous attempts |

---

## 11. Prefer Append-Only Historical Facts Where Analytics Matter

For price data and similar time-series style information, **append-only snapshots are better than destructive overwrite**.

Use overwrite only for operational state where history is not the primary asset.

---

## 12. Build with Source Adapters in Mind

Even when only one source exists today, pipeline code should be structured so source-specific logic can move into adapters later.

Typical source-specific concerns that belong in adapters:

- CSS/XPath selectors,
- pagination behavior,
- content extraction strategy,
- source-specific IDs and URL patterns,
- anti-bot or rate-limit handling,
- title cleanup rules.

---

## 13. Keep Docs Stable and Implementation Details Localized

High-level pipeline notes should remain stable. Source-specific volatility should be documented close to the source adapter or implementation note, not copied everywhere.

---

## 14. Checklist for Any New Pipeline

:::tip New Pipeline Checklist
Before adding a new pipeline, confirm you can answer all of these:

- [ ] What is the trigger?
- [ ] What is the exact unit of work?
- [ ] Where is the job state stored?
- [ ] What are the idempotency keys?
- [ ] What is the success output?
- [ ] What is retryable?
- [ ] What is terminal?
- [ ] What metrics and logs are required?
- [ ] What raw evidence should be preserved?
- [ ] Which future downstream pipelines may depend on this output?
:::

---

:::note Final Principle
A good pipeline is not only code that works once.
It is code that can be **rerun safely**, **inspected easily**, and **evolved without losing track of what happened**.
:::
