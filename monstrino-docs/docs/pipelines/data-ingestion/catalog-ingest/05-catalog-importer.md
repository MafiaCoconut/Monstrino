---
title: Catalog Importer
sidebar_position: 6
description: >
  How catalog-importer converts enriched ingest items into canonical
  catalog entities and emits media processing events.
---

# Catalog Importer

The `catalog-importer` stage converts an enriched `ingest_item` into
canonical catalog entities and publishes media processing events.

The importer acts as the authoritative write boundary between the
ingestion pipeline and the canonical catalog domain.

The primary business identifier used during import is **MPN**, which
uniquely identifies each release.

---

## High-Level Architecture

```mermaid
flowchart LR
    Collector[Catalog Collector]
    Enricher[Catalog Data Enricher]
    Importer[Catalog Importer]
    Catalog[(Canonical Catalog DB)]
    Kafka[(Kafka Media Topic)]
    MediaService[Media Rehosting Service]

    Collector --> Enricher
    Enricher --> Importer
    Importer --> Catalog
    Importer --> Kafka
    Kafka --> MediaService
```

The importer consumes enriched ingest items, synchronizes canonical
catalog data, and triggers the downstream media pipeline.

---

## Core Concepts

The importer works with three primary objects.

```mermaid
flowchart TD
    ingest_item[ingest_item]
    parsed_payload[parsed_payload]
    enriched_payload[enriched_payload]
    result_model[result_model]

    ingest_item --> parsed_payload
    ingest_item --> enriched_payload
    ingest_item --> result_model
```

### `parsed_payload`

Original data parsed from external sources.

### `enriched_payload`

Normalized and improved version produced by the enrichment stage.

### `result_model`

Result of catalog import including:

- canonical release ID
- import mode (created / updated)
- synchronized relations
- media event payload summary

---

## Service Responsibility

The catalog importer performs two responsibilities.

```mermaid
flowchart LR
    Importer[Catalog Importer]

    CatalogSync[Catalog Synchronization]
    MediaDispatch[Media Event Dispatch]

    Importer --> CatalogSync
    Importer --> MediaDispatch
```

### Catalog Synchronization

Creates or updates canonical releases and relations.

### Media Event Dispatch

Publishes image metadata events for downstream media processing.

---

## Import Processing Flow

```mermaid
sequenceDiagram
    participant Scheduler
    participant Importer
    participant DB as Catalog Database
    participant Kafka

    Scheduler->>Importer: Trigger import batch
    Importer->>DB: Fetch ingest_item_step ready for import
    Importer->>DB: Load ingest_item
    Importer->>Importer: Validate MPN
    Importer->>DB: Find Release by MPN
    Importer->>DB: Create or update Release
    Importer->>DB: Synchronize relations
    Importer->>Kafka: Publish media event
    Importer->>DB: Store result_model
    Importer->>DB: Mark step completed
```

This sequence ensures that the catalog state is synchronized and media
ingestion is triggered in a controlled manner.

---

## MPN Identity Resolution

The importer uses MPN as the primary business key.

```mermaid
flowchart TD
    Start[Importer Reads ingest_item]
    CheckMPN{MPN Present?}
    FindRelease[Find Release by MPN]
    CreateRelease[Create New Release]
    UpdateRelease[Update Existing Release]

    Start --> CheckMPN
    CheckMPN -- No --> Error[Fail Import]
    CheckMPN -- Yes --> FindRelease
    FindRelease -->|Not Found| CreateRelease
    FindRelease -->|Found| UpdateRelease
```

This guarantees deterministic matching and avoids fuzzy duplicate
detection.

---

## Domain Synchronization

Once the canonical release target is determined, the importer
synchronizes domain relationships.

```mermaid
flowchart TD
    Release[Canonical Release]
    Characters[Characters]
    Series[Series]
    Pets[Pets]
    Types[Release Types]
    Exclusives[Exclusive Vendors]
    Reissues[Reissue Relations]

    Release --> Characters
    Release --> Series
    Release --> Pets
    Release --> Types
    Release --> Exclusives
    Release --> Reissues
```

Each relation is resolved through dedicated synchronization services.

---

## Media Processing Flow

Image processing is handled by a separate media pipeline.

```mermaid
sequenceDiagram
    participant Importer
    participant Kafka
    participant MediaService
    participant Storage

    Importer->>Kafka: Publish media ingestion event
    Kafka->>MediaService: Consume image metadata
    MediaService->>Storage: Download image
    MediaService->>Storage: Normalize / rehost image
    MediaService->>Storage: Store variants
```

This architecture keeps catalog synchronization independent from media
processing workloads.

---

## Import Result Model

After the importer finishes processing, the result is stored inside
`ingest_item.result_model`.

Example structure:

```json
{
  "mode": "created",
  "canonical_release_id": "uuid",
  "mpn": "HXH12",
  "relations_synced": [
    "characters",
    "series",
    "pets"
  ],
  "media_events_emitted": 3,
  "warnings": []
}
```

This provides traceability and debugging visibility across the pipeline.

---

## Failure Handling

Failures are categorized into three groups.

```mermaid
flowchart TD
    Error[Import Error]
    Retryable[Retryable Error]
    NonRetryable[Non-Retryable Error]
    Conflict[Domain Conflict]

    Error --> Retryable
    Error --> NonRetryable
    Error --> Conflict
```

Retryable errors may be retried automatically, while domain conflicts
require manual review.

---

## Final Output

After successful execution the importer produces:

- canonical `Release`
- release-character relations
- release-series relations
- release-pet relations
- release type classifications
- exclusive vendor links
- reissue relations
- media ingestion events
- import result model

---

## Summary

The `catalog-importer` stage transforms enriched ingestion data into
normalized catalog state.

Key characteristics:

- deterministic identity resolution using MPN
- idempotent canonical synchronization
- resolver-based domain relation synchronization
- Kafka-driven media processing pipeline
- full traceability through `result_model` snapshots
