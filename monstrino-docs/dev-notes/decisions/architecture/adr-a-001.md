---
id: adr-a-001
title: "ADR-A-001: Complex Architecture Justified by Unstructured External Data"
sidebar_label: "A-001: Complex Architecture"
sidebar_position: 1
tags: [architecture, data-ingestion, data-quality]
description: "Justifies the multi-stage ingestion architecture by documenting the complexity and inconsistency of external data sources that Monstrino must process."
---

# ADR-A-001 - Complex Architecture Justified by Unstructured External Data

| Field      | Value                                                                 |
| ---------- | --------------------------------------------------------------------- |
| **Status** | Accepted                                                              |
| **Date**   | 2025-09-09                                                            |
| **Author** | @Aleks                                                                |
| **Tags**   | `#architecture` `#data-ingestion` `#data-quality`                     |

## Context

The Monstrino platform aggregates information about Monster High releases from many external sources:

- official brand websites
- fan wikis
- online stores
- marketplace listings
- scraped HTML pages
- JSON APIs
- textual descriptions
- images

The main difficulty is that **incoming data is not structured**.

External sources frequently contain:

- incomplete information
- conflicting data
- inconsistent naming
- mixed information inside single text fields
- duplicates of the same release
- different formats for the same entities

The core responsibility of Monstrino is to transform **unstructured and inconsistent external data** into a **clean, normalized canonical catalog**, which includes identifying characters, series, model numbers, release types, deduplicating entries, and collecting historical price data.

### Example 1 — Inconsistent Release Titles

Different sources may describe the same release as:

- `Draculaura Doll`
- `Monster High Draculaura Basic Doll`
- `Original Draculaura (2010)`

All three must resolve to the same product with a canonical title, character, and series.

### Example 2 — Mixed Information Inside Text Blocks

A single store description may embed: release title, characters list, store exclusivity, and model number — all in unstructured prose. The system must extract and normalize each data point automatically.

### Example 3 — Multiple Character Name Variants

`Clawdeen`, `Clawdeen Wolf`, `Clawdeen W.`, `Clawdeen (Monster High)` — all must resolve to a single canonical entity.

### Example 4 — Ambiguous Series Names

`Skulltimate Secrets Draculaura`, `Skulltimate Secrets Series 1 Draculaura`, `SS1 Draculaura` — all correspond to the same series and wave.

### Example 5 — Price Data From Multiple Markets

The same release may appear at different prices across Mattel Shop, Walmart, and eBay secondary market. Prices also vary by region, currency, and shipping. The system must store historical prices, detect MSRP, and differentiate primary from secondary market data.

## Options Considered

### Option 1: Simple Scraper + Direct Database Storage

One service scrapes websites and writes parsed data directly to the main database.

- **Pros:** Simple implementation, faster initial development.
- **Cons:** Difficult to handle ambiguous data, parsing logic tightly coupled with storage, limited scalability, high risk of duplicated or corrupted records.

### Option 2: Multi-Stage Data Ingestion Architecture ✅

Data passes through multiple processing stages: raw ingestion → parsed content → data enrichment → canonical catalog. Each stage performs a single responsibility.

- **Pros:** Isolation of unreliable source data, incremental improvements in parsing logic, safe integration of new sources, controlled normalization into the canonical catalog.
- **Cons:** Increased architectural complexity, more services to operate, higher infrastructure overhead.

## Decision

> We adopt a **multi-stage ingestion architecture** because external data sources are inconsistent, incomplete, and unstructured.
>
> Core pipeline:
> `external sources → data collectors → ingestion pipelines → parsing services → data enrichment services → canonical catalog`

The complexity is justified because **the architecture directly reflects the complexity of the incoming data**.

## Consequences

### Positive

- Resilient processing of low-quality data.
- Easier addition of new data sources.
- Improved testability of ingestion pipelines.
- Ability to evolve parsing algorithms independently.
- Clear separation of responsibilities between services.

### Negative

- More services to operate and monitor.
- Higher infrastructure overhead.
- Risk of overengineering if data volume remains small.

## Related Decisions

- [ADR-A-002](./adr-a-002.md) - Shared packages for cross-service code
- [ADR-A-007](./adr-a-007.md) - Centralize parsers in monstrino-infra