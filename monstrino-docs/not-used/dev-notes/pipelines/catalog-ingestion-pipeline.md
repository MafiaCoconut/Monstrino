---
id: catalog-ingestion-pipeline
title: Catalog Ingestion Pipeline
sidebar_label: Catalog Ingestion
description: Working notes for the catalog ingestion pipeline responsible for discovering and processing external release data.
---

# Catalog Ingestion Pipeline

:::info
Working notes for the pipeline responsible for **discovering external catalog items**, collecting source data, and preparing it for normalized Monstrino catalog storage.
:::

---

## Purpose

The catalog ingestion pipeline reduces manual work needed to create or update release pages by turning external source data into structured internal records.

---

## Main Responsibilities

- discover new release links from supported sources,
- fetch source pages or source APIs,
- extract raw structured and semi-structured fields,
- persist raw or parsed source payloads,
- prepare data for downstream enrichment,
- support later mapping into normalized release, series, character, and related entities.

---

## Why This Pipeline Exists

Monstrino is designed around automated catalog growth. Because sources differ significantly in quality and structure, the platform should not depend on a single synchronous parser.

> The ingestion flow should **preserve raw evidence** and support staged parsing and enrichment.

---

## High-Level Flow

### 1. Source Scanning

A collector or scheduler-driven service checks known catalog sources for new or changed entries.

Examples of source behavior:

- listing pages with product cards,
- product detail pages,
- source APIs,
- structured product feeds,
- source-specific JSON embedded in HTML.

### 2. Candidate Identification

The collector identifies candidate release items using source-specific keys such as:

- canonical URL,
- source release slug,
- external item identifier,
- model number or MPN,
- source platform item ID.

### 3. Raw Item Persistence

Before heavy normalization, the system stores raw discovery information in an ingest-oriented structure.

Typical persisted fields:

| Field | Description |
|---|---|
| `source_name` | which source this came from |
| `source_type` | type classification of the source |
| `source_url` | canonical URL of the item |
| `external_id` | source-specific item identifier |
| `raw_payload` | snapshot of the original data |
| `fetch_time` | when the data was retrieved |
| `hash` | fingerprint for change detection |
| `processing_state` | current lifecycle state |

### 4. Parsing and Field Extraction

A parser extracts initial fields such as:

- title,
- MPN,
- GTIN,
- source description,
- release type,
- vendor or exclusive info,
- image URLs,
- possible series names,
- possible characters.

:::note
At this stage, ambiguity is allowed. The goal is to capture candidate structured values **without pretending they are already canonical**.
:::

### 5. Enrichment and Validation

Optional enrichment steps may run after the initial parsing stage.

Examples:

- AI-assisted validation of extracted fields,
- title cleanup,
- separation of release name vs series name,
- candidate mapping for characters or pets,
- support for subtype and release classification.

### 6. Normalization Handoff

Once enough data is available, the pipeline prepares a normalized representation for downstream services or import use cases.

---

## Likely Service Roles

| Role | Responsibility |
|---|---|
| **source-collector** | discovers new items |
| **parser/enricher** | extracts and improves structured values |
| **catalog-importer** | persists normalized domain records |
| **LLM gateway** | performs controlled AI validation or enrichment |
| **job-scheduler** | triggers periodic work |

---

## Storage Zones

### Ingest Zone

Used for:

- raw external payloads,
- parsed but source-shaped data,
- processing job states,
- traceability metadata.

### Core Catalog Zone

Used for:

- normalized releases,
- canonical series,
- canonical characters,
- normalized relations,
- stable internal identifiers.

### Event / Outbox Zone

Used when ingestion results should notify downstream processors.

---

## Processing State Model

| State | Meaning |
|---|---|
| `init` | item discovered, not yet processed |
| `fetched` | source payload downloaded |
| `parsed` | initial fields extracted |
| `enriched` | optional enrichment completed |
| `imported` | normalized write completed |
| `failed` | terminal failure |
| `retry_pending` | temporary failure, waiting for retry |
| `needs_review` | ambiguity too high for automatic import |

---

## Idempotency Strategy

The pipeline avoids duplicate release creation by relying on stable source references.

Recommended deduplication keys:

- `source + external_id`,
- `source + canonical_url`,
- deterministic content fingerprints,
- relation-level deduplication for images and linked entities.

---

## Failure Cases

:::warning
Typical failures that must be handled:

- source page changed structure,
- transport timeout,
- malformed JSON or HTML,
- duplicate source records,
- ambiguous entity mapping,
- downstream write constraint violation.
:::

Recommended handling:

- retry transient network failures,
- isolate parser failures per source,
- preserve raw payload for debugging,
- **never lose the candidate item** even when normalization fails.

---

## Observability Expectations

Useful logging and metrics should allow developers to answer:

- which source produced the item,
- which external identifier was processed,
- what stage failed,
- whether the item was already known,
- which normalized entities were created or updated.

---

## Future Evolution

- stronger source-specific adapters,
- better diffing between source versions,
- confidence scoring for extracted fields,
- explicit review queues for ambiguous mappings,
- richer AI-assisted validation with deterministic fallbacks.
