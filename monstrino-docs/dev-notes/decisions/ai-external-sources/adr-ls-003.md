---
id: adr-ls-003
title: "ADR-LS-003: Mattel Shopify as Primary MSRP Source"
sidebar_label: "LS-003: Mattel Shopify MSRP"
sidebar_position: 3
tags: [external-sources, mattel, shopify, msrp, prices]
description: "Uses official Mattel Shopify stores as the primary authoritative source for MSRP price data, ensuring pricing accuracy and consistency."
---

# ADR-LS-003 — Use Official Mattel Shopify Sources for MSRP Prices

| Field      | Value                                                          |
| ---------- | -------------------------------------------------------------- |
| **Status** | Accepted                                                       |
| **Date**   | 2026-01-28                                                     |
| **Author** | @Aleks                                                |
| **Tags**   | `#external-sources` `#mattel` `#shopify` `#msrp` `#prices`    |

## Context

Monstrino's price tracking capability requires a reliable, authoritative source for MSRP (manufacturer suggested retail price) data. Candidate sources include third-party retailer listings, secondary market data, and official Mattel online stores.

Mattel's official retail sites (e.g., `mattel.com`, regional Mattel shops) are built on the Shopify platform, which exposes a structured product JSON API at predictable endpoints.

## Options Considered

### Option 1: Scrape Third-Party Retailer Listings

Collect MSRP from Amazon, Target, Walmart, and similar retailers.

- **Pros:** Wide coverage.
- **Cons:** Prices may differ from MSRP, retailer markup or discount is not MSRP, inconsistent formats across retailers.

### Option 2: Secondary Market Data (eBay, etc.)

Use resale prices as a proxy for value.

- **Pros:** Reflects actual market value.
- **Cons:** Not MSRP — this is secondary market pricing, noisy data.

### Option 3: Official Mattel Shopify Stores ✅

Parse MSRP directly from Mattel's official Shopify-based stores using the Shopify JSON product API.

- **Pros:** Authoritative MSRP source, structured JSON data, consistent format, official product information.
- **Cons:** Only covers active products on Mattel's store, discontinued products may be removed.

## Decision

> **Mattel's official Shopify-based stores** are used as the primary source for MSRP prices. The Shopify JSON product API provides structured, reliable price data in a consistent format.

## Consequences

### Positive

- Authoritative, official pricing data.
- Structured Shopify API reduces parsing complexity.
- Consistent format across regions.

### Negative

- Coverage limited to products currently listed on Mattel's store.
- Discontinued products may not be available.

## Related Decisions

- [ADR-A-006](../architecture/adr-a-006.md) — Parsers centralized in monstrino-infra
- [ADR-PS-005](../product-strategy/adr-ps-005.md) — Prices deprioritized until after image pipeline
