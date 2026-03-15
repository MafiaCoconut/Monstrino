---
title: Catalog Content Collector
sidebar_position: 4
description: >
  Acquisition-stage worker that claims eligible discovered entries, fetches
  source payloads through source-specific ports, and creates ingest work units.
---

# Catalog Content Collector

`catalog-content-collector` converts discovered entries into durable ingest
objects. It claims eligible entries, fetches source content, stores snapshots,
and creates downstream `ingest_item` work units.

---

## Responsibilities

The service:

- reads `source_discovered_entry` with
  `collection_status = READY_FOR_FETCH` and `domain_decision = ELIGIBLE`
- claims entries atomically (`claimed_by`, `claimed_at`)
- resolves source-specific `ParseReleasePort` from `PortsRegistry`
- fetches and parses source payload into `ReleaseParsedContentRef`
- creates `source_payload_snapshot`
- creates `ingest_item` with `parsed_payload`
- creates initial `ingest_item_step`
- marks discovered entry as fetched when successful

The service does not:

- discover new links
- own source-country traversal strategy
- perform attribute enrichment

---

## Inputs and Outputs

| Inputs | Outputs |
| --- | --- |
| eligible `source_discovered_entry` records | `source_payload_snapshot`, `ingest_item`, initial `ingest_item_step` |

---

## Processing Flow

```mermaid
flowchart TD
    A[READY_FOR_FETCH + ELIGIBLE entry] --> B[catalog-content-collector]
    B --> C[Atomic claim]
    C --> D[Resolve ParseReleasePort from PortsRegistry]
    D --> E{Port exists?}
    E -->|No| F[Persist config error + alert]
    E -->|Yes| G[Fetch and parse source payload]
    G --> H{Fetch success?}
    H -->|No| I[Persist collection failure + alert]
    H -->|Yes| J[Create source_payload_snapshot]
    J --> K[Create ingest_item parsed_payload]
    K --> L[Create first ingest_item_step]
```

---

## Claiming and Concurrency

Collector workers must claim entries atomically before fetch to prevent
duplicate processing by multiple workers.

Typical claim-related fields:

- `collection_status`
- `claimed_by`
- `claimed_at`
- `collection_attempt_count`

---

## Ports and Source Adapters

Payload fetching is delegated to source-specific adapters resolved through
`PortsRegistry` by `(source, ParseReleasePort)`.

If no adapter is registered for the source, collector treats it as configuration
error, persists failure state, and sends alert signal for operator review.

---

## Boundary and Ownership

- Domain role: bridge from discovery lifecycle to ingest work lifecycle
- Persistence ownership: snapshot and ingest work creation
- Handoff contract: `ingest_item.parsed_payload` consumed by
  `catalog-data-enricher`

---

## Related Services

| Service | Relationship |
| --- | --- |
| `catalog-source-discovery` | produces discovered entries for this service |
| `catalog-data-enricher` | consumes `ingest_item` produced by this service |
| `catalog-importer` | downstream after enrichment completion |
