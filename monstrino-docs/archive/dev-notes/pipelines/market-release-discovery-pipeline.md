---
id: market-release-discovery-pipeline
title: Market Release Discovery Pipeline
sidebar_label: Market Release Discovery
description: Working notes for the pipeline that detects new release listings on market-related sources.
---

# Market Release Discovery Pipeline

:::info
Working notes for the pipeline responsible for **scanning market-oriented sources** and identifying newly observed release entries.
:::

---

## Purpose

The market release discovery pipeline scans market-oriented sources and registers newly observed release listings. Its role is **not** to collect detailed price history immediately, but first to register that a source now exposes a release listing relevant to Monstrino.

This pipeline is especially useful when the platform launch is still in progress and **historical market data needs to start accumulating as early as possible**.

---

## Main Responsibilities

- periodically scan market sources,
- detect newly observed listing pages or product references,
- persist the fact that a given source now contains a given release,
- avoid duplicate registration of the same source-release relationship,
- provide input for downstream price collection.

---

## Core Idea

This pipeline answers a specific question:

> **"Has this source published or exposed a listing for this release?"**

This is intentionally different from the price collection pipeline, which answers:

> **"What is the current or recent price state of this already-known listing?"**

---

## Typical Trigger

A scheduler periodically starts the discovery flow for each configured market source.

Examples of cadence:

- every hour,
- several times per day,
- source-specific cadence depending on rate limits and volatility.

---

## High-Level Flow

### 1. Load Source Configuration

The pipeline loads the set of market sources that support discovery.

Configuration may include:

| Field | Description |
|---|---|
| `source_base_url` | entry point for the source |
| `discovery_path` | path to listing pages or API |
| `pagination_rules` | how to navigate multiple pages |
| `source_type` | classification of the source |
| `rate_limit_settings` | request throttling config |
| `parser_strategy` | selector or adapter to use |

### 2. Fetch Source Pages or Source API

The collector downloads the relevant listing data from each source.

### 3. Extract Candidate Market Entries

For each discovered candidate, the pipeline extracts source-facing identifiers:

- listing URL,
- external item ID,
- source product title,
- optional price hint,
- optional release reference hint,
- observed timestamp.

### 4. Match or Associate with Release Identity

The pipeline attempts to associate the candidate listing with a Monstrino release or a pending release reference.

Matching may rely on:

- known source identifiers,
- MPN,
- GTIN,
- canonical title heuristics,
- AI-assisted candidate support,
- manually reviewed source mappings.

### 5. Persist Source-Release Discovery Record

If the entry is new, the pipeline stores a durable relationship indicating that the source contains that release.

### 6. Mark for Downstream Price Collection

Discovered entries become input for the separate [market price collection pipeline](./market-price-collection-pipeline).

---

## Suggested Persisted Data

| Field | Description |
|---|---|
| `market_source` | which source was scanned |
| `source_listing_url` | URL of the specific listing |
| `source_external_item_id` | source-specific identifier |
| `release_id` | internal Monstrino release ID (if resolved) |
| `unresolved_reference` | raw hint when release is not yet matched |
| `first_seen_at` | when this entry was first observed |
| `last_seen_at` | most recent observation timestamp |
| `processing_status` | current lifecycle state |
| `deduplication_key` | stable key for idempotency |
| `source_payload_snapshot` | optional raw snapshot for debugging |

---

## State Model

| State | Meaning |
|---|---|
| `init` | discovered, not yet matched |
| `matched` | successfully associated with a Monstrino release |
| `unresolved` | no match found, requires review |
| `active` | matched and currently tracked for price collection |
| `hidden` | delisted or no longer visible |
| `failed` | processing error |

---

## Why This Pipeline Should Be Separate

Separating discovery from price refresh provides a cleaner design.

| Benefit | Notes |
|---|---|
| Lower coupling | discovery changes don't affect price collection |
| Simpler retries | each stage fails independently |
| Easier source onboarding | new sources only affect this pipeline initially |
| Better historical coverage | first-seen dates tracked independently |
| Cleaner tracking | active vs unresolved listings are explicit |

---

## Failure Cases

:::warning
Typical failures to handle:

- source layout changed,
- parsing failure,
- duplicate listing identity,
- release match ambiguity,
- temporary source outage.
:::

Recommended handling:

- preserve unresolved entries for later review,
- retry fetch failures,
- do **not** block the full pipeline because one item could not be matched,
- log source-specific parser errors with enough context.

---

## Future Evolution

- explicit review queue for unresolved listings,
- confidence-based release association,
- source-specific adapters,
- batch diffing to detect removed entries,
- event emission to notify downstream market processors.
