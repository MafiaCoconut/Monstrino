---
id: data-collection-strategy
title: Data Collection Strategy
sidebar_label: Data Collection Strategy
sidebar_position: 2
description: Strategy and rationale for continuous, early data collection across catalog and market sources.
---

# Data Collection Strategy

:::info
This document describes the approach to collecting data across catalog and market sources and why early collection is a strategic priority.
:::

---

## Objective

The goal of the platform is to build the **most complete dataset possible for collectible releases**.

> Data must be collected **as early as possible** because historical data cannot always be reconstructed after the fact.

A release that was listed for sale two years ago and then sold out cannot be retroactively added with accurate pricing context if collection only begins later.

---

## Key Data Sources

| Source Type | Data Provided |
|---|---|
| **Collector websites** | release metadata, images, descriptions |
| **Retailer pages** | product listings, pricing, availability |
| **Secondary market platforms** | resale prices, historical transactions |
| **Community databases** | fan-curated metadata, variant information |

---

## Strategy

The collection strategy is built around three continuous activities:

| Activity | Description |
|---|---|
| **1. Discovery of new releases** | continuously scan sources for newly listed or announced releases |
| **2. Regular price collection** | revisit known listings on a recurring schedule to capture price changes |
| **3. Historical price tracking** | store price observations as append-only snapshots to build trend data |

---

## Why Early Collection Matters

:::tip
The value of a dataset grows over time — but only if collection started early.

Starting market data collection before the platform launches publicly means that:
- day-one users see historical data, not an empty chart,
- price trends are visible from the start,
- rare releases captured early provide data that cannot be recovered later.
:::

---

## Pipeline Relationship

This strategy is implemented by two pipeline categories:

| Pipeline | Role |
|---|---|
| [Market Release Discovery](../pipelines/market-release-discovery-pipeline) | registers new source listings as they are found |
| [Market Price Collection](../pipelines/market-price-collection-pipeline) | revisits known listings and stores fresh price snapshots |

---

## Related Documents

- [Platform Architecture Evolution](./platform-evolution) — where data collection fits in the broader roadmap,
- [Market Release Discovery Pipeline](../pipelines/market-release-discovery-pipeline),
- [Market Price Collection Pipeline](../pipelines/market-price-collection-pipeline).
