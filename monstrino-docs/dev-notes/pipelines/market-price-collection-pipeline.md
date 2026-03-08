---
id: market-price-collection-pipeline
title: Market Price Collection Pipeline
sidebar_label: Market Price Collection
description: Working notes for the pipeline that periodically refreshes price information for known market listings.
---

# Market Price Collection Pipeline

:::info
Working notes for the pipeline responsible for **revisiting known market listings** and collecting current pricing information on a recurring basis.
:::

---

## Purpose

The market price collection pipeline builds a growing market dataset over time, including current observations and historical trends.

---

## Main Responsibilities

- iterate over known source release listings,
- fetch fresh market state from each source,
- extract current price-related data,
- persist price snapshots,
- track source availability and listing freshness.

---

## Relationship to Discovery Pipeline

:::note
This pipeline only works well when the system already knows which source listing belongs to which release.
That mapping is expected to come from the [market release discovery pipeline](./market-release-discovery-pipeline).
:::

In simple terms:

| Pipeline | Role |
|---|---|
| **discovery pipeline** | creates the source listing universe |
| **price collection pipeline** | revisits that universe repeatedly |

---

## Typical Trigger

A scheduler runs periodically and processes known active source-release links.

Frequency may depend on:

- source volatility,
- rate limits,
- business importance,
- listing count,
- infrastructure budget.

---

## High-Level Flow

### 1. Select Known Active Market Entries

Load records representing source listings that should be refreshed.

Selection filters may include:

- `active` state,
- `last_checked_at` older than a threshold,
- source is enabled,
- retry window has expired.

### 2. Fetch Listing Data

Retrieve the current source page or API payload for the market listing.

### 3. Parse Price Data

Extract current market information such as:

| Field | Notes |
|---|---|
| `current_price` | current listed price |
| `original_price` | original or MSRP if shown |
| `currency` | ISO currency code |
| `availability` | in stock, sold out, etc. |
| `sale_status` | whether a discount is active |
| `item_condition` | new, used, etc. where applicable |
| `seller_metadata` | marketplace or seller details |
| `observed_at` | timestamp of this observation |

### 4. Persist Snapshot

:::tip
Instead of overwriting the last known value, store **immutable append-only price observations**. This enables:

- historical charts,
- trend analysis,
- price volatility tracking,
- source comparison.
:::

### 5. Update Source Listing Metadata

Update non-price source facts such as:

- `last_seen_at` timestamp,
- listing status,
- parse success flag,
- source health signal.

---

## Suggested Persisted Data

A price snapshot should contain:

| Field | Notes |
|---|---|
| `release_id` | Monstrino release reference |
| `market_source` | which source was queried |
| `source_listing_reference` | URL or external ID of the listing |
| `observed_price` | the price at observation time |
| `currency` | ISO code |
| `observed_at` | timestamp |
| `condition` | item condition if applicable |
| `availability_state` | current availability |
| `raw_payload_hash` | fingerprint of the raw response |
| `parser_version` | version of the parser that extracted this |

---

## State and Retry Handling

The pipeline should distinguish between different types of failures.

| State | Meaning |
|---|---|
| `active` | listing is healthy and being tracked |
| `temporarily_unavailable` | transient source issue |
| `removed` | listing no longer exists on the source |
| `parse_failed` | source structure has drifted |
| `retry_pending` | temporary failure, waiting for retry |

---

## Why Early Collection Matters

:::tip
Because Monstrino may go public later than the start of development, **waiting to collect prices until UI launch would waste historical data**.

Starting collection early gives the platform a stronger dataset from day one.
:::

---

## Failure Cases

:::warning
Typical failures to handle:

- source rate limit reached,
- anti-bot response,
- HTML shape drift,
- currency parsing failure,
- duplicate snapshot insertion,
- stale listing reference.
:::

Recommended handling:

- retry transient fetch errors,
- mark persistent parser issues for review with `parse_failed`,
- keep old snapshots intact — **never overwrite historical observations**,
- avoid collapsing all failures into one generic state.

---

## Future Evolution

- source-specific price normalization,
- region-aware MSRP comparison,
- secondary market analytics,
- moving averages and volatility metrics,
- source trust weighting,
- event-driven price change notifications.
