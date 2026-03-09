---
id: adr-ps-005
title: "ADR-PS-005: Image Pipeline Before Price Collection"
sidebar_label: "PS-005: Images Before Prices"
sidebar_position: 5
tags: [product-strategy, mvp, images, prices, priority]
description: "Prioritizes building the image pipeline before price collection to unblock catalog visual completeness and improve user-facing quality sooner."
---

# ADR-PS-005 - Prioritize Image Pipeline Over Price Collection for MVP

| Field      | Value                                                        |
| ---------- | ------------------------------------------------------------ |
| **Status** | Accepted                                                     |
| **Date**   | 2025-02-13                                                   |
| **Author** | @Aleks                                              |
| **Tags**   | `#product-strategy` `#mvp` `#images` `#prices` `#priority`  |

## Context

The catalog roadmap includes two data enrichment tracks beyond the core release data:

1. **Image pipeline** - downloading, rehosting, and serving product images from Monstrino-controlled storage.
2. **Price collection** - tracking MSRP and secondary market prices from sources like Mattel Shopify and third-party retailers.

Both are valuable, but development bandwidth is limited. A priority decision was needed.

## Options Considered

### Option 1: Prioritize Price Collection

Build price tracking infrastructure before the image pipeline.

- **Pros:** Provides comparison value for collectors.
- **Cons:** A catalog without images has poor UX. Prices are less discoverable without good product presentation.

### Option 2: Prioritize Image Pipeline ✅

Get images working first to make the catalog visually useful, then add price tracking.

- **Pros:** Dramatically improves catalog usability and visual quality. Images are the primary way users identify products. Better foundation for SEO.
- **Cons:** Price data delayed.

## Decision

> Development priority order for catalog enrichment:
> 1. **Catalog** - core release data
> 2. **Images** - media rehosting pipeline
> 3. **Prices** - MSRP and market price tracking

## Consequences

### Positive

- Visually compelling catalog accessible earlier.
- Better user experience at launch.
- Cleaner development sequencing - image infrastructure is also needed for price-related product images.

### Negative

- Price data will not be available at initial launch.
