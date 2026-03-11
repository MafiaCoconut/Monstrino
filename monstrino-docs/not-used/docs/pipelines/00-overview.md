---
title: Data Ingestion Overview
sidebar_position: 0
description: How Monstrino transforms external product and media data into a normalized, platform-owned catalog.
---

# Data Ingestion

Data ingestion is the primary mechanism through which Monstrino acquires, processes, and normalizes external information into the platform's canonical domain model.

All external data - product releases, character references, images from retail and archive sources - enters the system through the ingestion layer before it is ever exposed through the platform APIs.

---

## Two Pipelines, One Goal

The ingestion system is split into two independent pipelines that share a common design philosophy:

| Pipeline | What It Processes | Output |
|---|---|---|
| **Catalog Ingestion** | Release records, characters, series, pets - structured product data | Normalized domain entities in the canonical catalog |
| **Media Ingestion** | Image URLs discovered during catalog ingestion | Rehosted, deduplicated, platform-owned media assets |

The pipelines are **loosely coupled**: catalog ingestion emits image references, and media ingestion processes them independently. Neither pipeline blocks the other.

---

## Why Ingestion is Separated from the Catalog

External data is noisy. A release record from one source may use different naming conventions, omit required fields, or represent the same entity differently from another source.

Monstrino addresses this by maintaining a **buffer layer** - parsed tables that store external data in its source-format structure - before normalization runs. This separation means:

- raw source data is always inspectable
- normalization failures do not corrupt the canonical catalog
- re-import can run without re-fetching from external sources
- each stage fails independently and can be retried safely

---

## Ingestion Stages

```text
External Sources
  → Collector (acquisition service)
  → Parsed Tables (buffer layer)
  → Enricher (optional AI step)
  → Importer (normalization)
  → Canonical Domain Entities
```

For catalog data, an optional AI enrichment step runs between parsing and import. It fills in fields - characters, series, content type - that external sources leave blank.

---

## Section Contents

- [Ingestion Architecture](/docs/pipelines/data-ingestion/ingestion-architecture/) - system-level view of both pipelines and their responsibilities
- [Catalog Ingestion Pipeline](/docs/pipelines/data-ingestion/catalog-ingestion-pipeline/) - detailed walk-through of catalog data flow, stages, and service roles
- [Media Ingestion Pipeline](/docs/pipelines/data-ingestion/media-ingestion-pipeline/) - downloading, deduplication, rehosting, and normalization of image assets
