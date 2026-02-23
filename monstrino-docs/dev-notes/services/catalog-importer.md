---
id: service-catalog-importer
title: Service — catalog-importer
sidebar_label: catalog-importer
---

> **Type:** Backend service  
> **Domain:** Data ingestion & domain population  
> **Audience:** Engineering / Architecture review

---

## Responsibility

The **catalog-importer** service is responsible for transforming validated parsed data
into canonical domain entities.

It acts as the **only gateway** through which external data is allowed to enter
the core domain tables.

The service ensures that:
- parsed records are processed deterministically,
- domain invariants are enforced,
- invalid or partial data never pollutes canonical tables.

---

## Non-Goals

This service explicitly does **not**:

- fetch or parse data from external sources,
- expose user-facing APIs,
- provide real-time processing guarantees,
- resolve authentication or authorization concerns,
- perform UI-related logic.

---

## Processing Model

The service operates in **batch-oriented, asynchronous processing cycles**.

### Scheduled Execution

- Runs automatically **once per day** at a fixed time.
- Executes **four independent cron jobs**:
  - character processing
  - series processing
  - pet processing
  - release processing

Each job operates independently and can succeed or fail without blocking others.

---

### Manual Triggering

Processing jobs can also be triggered **on-demand via API**.
This allows immediate reprocessing without waiting for the next scheduled run.

---

## Data Flow

```text
Parsed Tables (parsed_*)
      ↓
Batch Selection (unprocessed only)
      ↓
Async Batch Processing (size = 10)
      ↓
Use Case Execution (per record)
      ↓
Domain Services (type, names, images, relations)
      ↓
Canonical Domain Tables
      ↓
parsed_* record marked as processed
```

---

## Batch & Concurrency Model

- Records are fetched in **batches of 10**
- Batches are processed **asynchronously in parallel**
- Each record is processed independently via a single use case invocation
- Failures in one record do not block processing of others

This design balances throughput with controlled error isolation.

---

## Use Case Orchestration

For each parsed record:

1. A dedicated **use case** is invoked.
2. The use case coordinates multiple domain services, each responsible for a
   specific aspect of the record:
   - type resolution
   - naming and normalization
   - image handling
   - relationship resolution
3. Each domain service persists its own data within the same transaction scope.
4. Upon successful completion, the parsed record is marked as processed.

---

## Data Ownership & Invariants

The service **owns the transformation logic**, but not the parsed tables themselves.

Guaranteed invariants:
- Canonical domain tables contain only validated and fully processed data.
- Parsed records with errors are never partially imported.
- Each parsed record is processed **at most once** per successful run.

---

## Guarantees

- Deterministic processing per record
- Idempotent behavior for already-processed records
- Transactional integrity within a single record’s processing
- Safe parallel execution across batches

---

## Non-Guarantees

- No real-time or near-real-time guarantees
- No ordering guarantees across different domain types
- No guarantee that all records will be processed in a single run
- No automatic correction of malformed external data

---

## Dependencies

- Parsed tables produced by catalog-collector
- Shared domain packages:
  - monstrino-models
  - monstrino-repositories
  - monstrino-core
- Database availability
- Scheduler infrastructure

---

## Failure Modes

- Individual record failures result in:
  - the record remaining unprocessed or marked with error state,
  - no impact on other records in the batch.
- Database unavailability prevents processing and leaves parsed records unchanged.
- Partial failures never affect canonical domain consistency.

---

## Operational Notes

:::note
The service is designed for **operational transparency**.

Operators can:
- inspect unprocessed parsed records directly,
- trigger processing jobs manually,
- re-run failed jobs after corrective actions.
:::