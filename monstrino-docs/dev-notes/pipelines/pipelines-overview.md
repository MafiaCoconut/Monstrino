---
id: pipelines-overview
title: Pipelines Overview
sidebar_label: Overview
description: Overview of pipeline patterns, responsibilities, and operational model used in Monstrino.
---

# Pipelines Overview

:::info Engineering Working Notes
This note describes how pipelines are used across Monstrino to ingest, normalize, enrich, validate, and persist data.
It is intentionally focused on **engineering working notes** rather than end-user documentation.
:::

---

## Purpose

A pipeline in Monstrino is a multi-step background processing flow that starts from an external signal or internal scheduled trigger and ends with one of the following outcomes:

- a new raw item is discovered and stored,
- an existing item is enriched or normalized,
- media is downloaded and re-hosted,
- market data is refreshed,
- a downstream service receives a structured event or command.

---

## Core Pipeline Principles

### 1. Pipelines Are Asynchronous by Default

Most heavy or repeatable work should not happen inside synchronous request-response paths. Pipelines run in the background and are usually initiated by one of these mechanisms:

- scheduler-based polling,
- event consumption from Kafka,
- internal service-to-service command dispatch,
- staged processing over records stored in the database.

### 2. Discovery and Processing Are Separated

A pipeline should not mix "find new work" and "fully process work" in one opaque step.

Typical separation:

| Stage | Responsibility |
|---|---|
| **Discovery** | finds new external items or new internal work |
| **Job creation** | persists a processing unit |
| **Processing** | takes queued jobs and performs heavier work |
| **Finalization** | stores results and updates state |

This separation makes retries, observability, and partial recovery much easier.

### 3. Database State Is Part of Orchestration

For Monstrino, orchestration is not only event-driven. **Processing state stored in the database is also a first-class control mechanism.**

Examples of state-driven execution:

| State | Meaning |
|---|---|
| `init` | discovered, not yet processed |
| `processing` | actively being handled |
| `processed` | completed successfully |
| `failed` | terminal failure |
| `retry_pending` | temporary failure, waiting for retry |

Schedulers and processors use these states to identify the next batch of work.

### 4. Idempotency Matters

:::warning
Pipelines must assume that the same source item may be observed **more than once**.
:::

Each pipeline should have a stable deduplication strategy based on one or more of:

- source-specific external ID,
- canonical URL,
- content hash,
- source + entity-type + entity-key,
- deterministic relation key.

### 5. Raw External Data and Normalized Platform Data Must Stay Separated

A pipeline may first store raw or semi-structured source data and only later map it into normalized Monstrino entities. This helps with:

- **traceability** - know where data came from,
- **replayability** - re-run parsers on preserved input,
- **safer parser evolution** - change parsers without losing raw evidence,
- **lower coupling** - collectors stay independent from catalog models.

---

## Common Pipeline Stages

Not every pipeline uses every stage, but this is the general pattern.

### Stage 1 - Trigger

The pipeline starts from a trigger:

- cron/scheduler tick,
- Kafka message,
- internal event,
- administrative reprocess action.

### Stage 2 - Discovery

The system detects a new candidate item or existing stale item.

Examples:

- a source page contains a newly published release link,
- a market source has updated price data,
- a media record appears in a topic,
- an unprocessed ingestion row exists in a staging table.

### Stage 3 - Job Creation

The system stores a dedicated processing job row. This decouples source discovery from heavy work execution.

Typical job metadata:

| Field | Notes |
|---|---|
| `job_id` | unique identifier |
| `source_type` | which source produced this |
| `source_reference` | external reference key |
| `target_entity_type` | what Monstrino entity this maps to |
| `payload` | snapshot or pointer to raw data |
| `processing_state` | current lifecycle state |
| `retry_count` | number of attempts so far |
| `correlation_id` | traceability across systems |
| `timestamps` | created, updated |

### Stage 4 - Processing

A processor service fetches pending jobs and performs the actual work.

Examples:

- download HTML or JSON,
- parse structured product data,
- download external image bytes,
- call AI enrichment service,
- persist normalized records.

### Stage 5 - Persistence

Results are stored in one or more zones:

- **ingest/raw zone** - raw or semi-structured source data,
- **normalized catalog zone** - canonical domain entities,
- **media zone** - hosted media assets,
- **market zone** - price snapshots and listings,
- **event outbox** - downstream event emission.

### Stage 6 - State Transition

The job is marked with the next processing state.

Examples: `processed`, `failed`, `needs_review`, `awaiting_next_stage`

---

## Pipeline Categories

### Catalog Ingestion Pipelines

Responsible for finding, collecting, and structuring catalog-related information:

- release pages,
- source metadata,
- source-specific product identifiers,
- semi-structured descriptive data,
- relations such as character, series, type, or exclusivity.

### Media Ingestion Pipelines

Responsible for image-oriented processing:

- receiving references to external media,
- creating media ingestion jobs,
- downloading files,
- validating file metadata,
- re-hosting files to internal object storage,
- linking hosted media to release or entity records.

### Market Pipelines

Responsible for market-facing data collection:

- detecting new source-market entries,
- collecting secondary market prices,
- refreshing current listing state,
- storing historical and regional price signals.

### AI-Assisted Enrichment Pipelines

Responsible for controlled enrichment or verification using LLM or multimodal models:

- extracting structured facts from semi-structured text,
- validating parsed fields,
- proposing entity links,
- generating intermediate command responses for orchestrated workflows.

---

## Operational Expectations

Every production-grade pipeline should define the following.

### Input Contract

What exactly enters the pipeline - for example:

- source URL,
- parsed source payload,
- Kafka message,
- job table row,
- image URL and metadata.

### Output Contract

What exactly is guaranteed on success - for example:

- new job row,
- normalized entity write,
- stored media asset,
- market price snapshot,
- emitted internal event.

### Failure Strategy

The pipeline should explicitly define:

- retryable failures,
- terminal failures,
- poison item handling,
- dead-letter or review state,
- logging expectations.

### Observability

Each pipeline should expose enough operational visibility to answer:

- what entered the pipeline,
- what stage it reached,
- what failed,
- what was retried,
- how long processing took,
- which source or entity was affected.

---

## Recommended Note Structure for Individual Pipeline Files

:::tip
Each specific pipeline note should generally describe:

1. purpose,
2. trigger,
3. stages,
4. main services or components,
5. storage interactions,
6. state model,
7. retries and failures,
8. future evolution.
:::

---

:::note Scope
This overview is intentionally stable and high-level. Detailed implementation notes belong to individual pipeline files.
:::
