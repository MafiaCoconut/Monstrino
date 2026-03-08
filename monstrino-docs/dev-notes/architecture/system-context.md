---
id: system-context
title: System Context
sidebar_label: System Context
sidebar_position: 1
description: High-level overview of the Monstrino platform, its actors, and its role in the broader ecosystem.
---

# System Context

:::info Engineering Working Notes
This document describes what Monstrino is, who interacts with it, and what role it plays in the broader data ecosystem.
:::

---

## Overview

Monstrino is a **data platform focused on collecting, processing, and presenting information about collectible releases**.

The core value of the system is in the data: collecting it reliably from fragmented external sources, normalizing it into a consistent structure, and making it available to consumers through stable APIs.

---

## System Interactions

The platform interacts with four categories of actors:

| Actor | Role |
|---|---|
| **External catalog sources** | websites and feeds providing product and release data |
| **Market platforms** | sources providing pricing and secondary market data |
| **Internal AI services** | enrich and validate ingested data |
| **Frontend applications** | consume catalog APIs to present data to end users |

---

## External Sources

External sources are the origin of all raw data entering the system.

Typical source types:

- collector and hobbyist websites,
- retailer product pages,
- community databases,
- structured product feeds.

:::warning
External sources are **untrusted by default**. Data coming from them is inconsistent, incomplete, and subject to change without notice. The ingestion architecture reflects this assumption.
:::

---

## System Role

Monstrino plays three roles simultaneously:

| Role | Description |
|---|---|
| **Data aggregation platform** | collects data from multiple heterogeneous sources |
| **Data normalization pipeline** | transforms raw source data into consistent internal entities |
| **Catalog API** | exposes validated data to frontend and downstream services |

---

## What the System Does Not Do

- It does not trust external data structures to remain stable.
- It does not write source data directly into canonical domain tables.
- It does not expose raw ingestion artifacts to end users.

See [Service Boundaries](./service-boundaries) for the isolation principles that enforce these constraints.

---

## Related Documents

- [Container Architecture](./container-architecture) — how services are packaged and deployed,
- [Service Boundaries](./service-boundaries) — domain separation and data ownership,
- [Data Flow: Ingestion](./data-flow-ingestion) — how data moves from sources into the platform.
