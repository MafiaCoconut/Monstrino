---
id: adr-mp-001
title: "ADR-MP-001: Rehost External Images into Monstrino Storage"
sidebar_label: "MP-001: Image Rehosting"
sidebar_position: 1
tags: [media-pipeline, images, rehosting, s3, storage]
description: "Rehosts all external product images into Monstrino-controlled storage to eliminate broken links, ensure availability, and own image delivery."
---

# ADR-MP-001 — Rehost External Images into Monstrino Storage

| Field      | Value                                                         |
| ---------- | ------------------------------------------------------------- |
| **Status** | Accepted                                                      |
| **Date**   | 2026-01-08                                                    |
| **Author** | @Aleks                                               |
| **Tags**   | `#media-pipeline` `#images` `#rehosting` `#s3` `#storage`    |

## Context

Initial catalog pages referenced images directly from external source URLs (Mattel Shopify, fan sites, retailer CDNs). This approach is unreliable:

- External image URLs change or are removed without notice.
- External sources may have hotlink protection.
- No control over image availability or performance.
- SEO requires images to be served from a stable, owned domain.

## Options Considered

### Option 1: Serve Images Directly from External URLs

Link to the original source image URL in catalog pages.

- **Pros:** Zero storage cost, no download infrastructure needed.
- **Cons:** Broken images when source URLs change, hotlinking restrictions, unreliable UX, poor SEO.

### Option 2: Download and Rehost All Images ✅

Download every external image, store it in Monstrino-controlled S3-compatible storage, and serve it from a stable owned URL.

- **Pros:** Images remain available indefinitely, full control over serving, no external dependencies at runtime.
- **Cons:** Storage cost, download pipeline complexity, must be kept in sync with new releases.

## Decision

> All release images must be:
> 1. **Downloaded** from their external source URL.
> 2. **Stored** in S3-compatible object storage under a Monstrino-controlled path.
> 3. **Referenced** in the catalog via the new stable internal URL.
>
> The original external URL is preserved as metadata only.

## Consequences

### Positive

- Catalog images never break due to external source changes.
- Full control over image performance and delivery.
- Independent of source CDN reliability.

### Negative

- Storage cost for all product images.
- Download pipeline must be maintained and monitored.

## Related Decisions

- [ADR-MP-002](./adr-mp-002.md) — S3-compatible storage
- [ADR-MP-003](./adr-mp-003.md) — Media pipeline subscriber/processor split
- [ADR-MP-004](./adr-mp-004.md) — Media ingestion jobs
