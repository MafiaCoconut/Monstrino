---
id: adr-ps-004
title: "ADR-PS-004: Defer Affiliate Monetization"
sidebar_label: "PS-004: Defer Affiliate"
sidebar_position: 4
tags: [product-strategy, monetization, affiliate]
---

# ADR-PS-004 — Defer Affiliate Monetization

| Field      | Value                                                   |
| ---------- | ------------------------------------------------------- |
| **Status** | Accepted                                                |
| **Date**   | 2025-06-01                                              |
| **Author** | @monstrino-team                                         |
| **Tags**   | `#product-strategy` `#monetization` `#affiliate`       |

## Context

Affiliate links (e.g., Amazon Associates, Mattel Shop referral programs) are a natural monetization path for a product catalog. However, introducing affiliate links changes the nature of the product:

- The site stops being a neutral catalog and becomes a commercial referral engine.
- Trust with the community may be affected if monetization is perceived as the primary motivation.
- SEO and UX complexity increases when links need attribution tracking.

## Options Considered

### Option 1: Integrate Affiliate Links from the Start

Add affiliate-tracked purchase links to release pages as part of the initial catalog build.

- **Pros:** Revenue from day one, low marginal effort if added during catalog construction.
- **Cons:** Changes product positioning, risk of community distrust, adds tracking complexity, may complicate data sourcing relationships.

### Option 2: Defer Affiliate Model ✅

Build the catalog as a neutral, reference-quality archive first. Revisit monetization once the product has established credibility and audience.

- **Pros:** Cleaner product positioning, community trust, no tracking complexity at MVP.
- **Cons:** No revenue at launch, opportunity cost.

## Decision

> **Affiliate monetization is deferred.** Monstrino will launch as a neutral catalog without affiliate tracking. Monetization strategy will be revisited as a separate initiative after establishing product credibility.

## Consequences

### Positive

- Cleaner product identity as a reference catalog.
- Simpler architecture — no affiliate parameter injection or tracking.
- Better trust positioning with the community.

### Negative

- No revenue path for the initial period.

## Related Decisions

- [ADR-PS-003](./adr-ps-003.md) — MVP scope prioritization
