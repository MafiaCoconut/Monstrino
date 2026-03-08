---
id: adr-ps-001
title: "ADR-PS-001: Focus on Monster High"
sidebar_label: "PS-001: Monster High Focus"
sidebar_position: 1
tags: [product-strategy, domain, niche, monster-high]
---

# ADR-PS-001 — Focus Monstrino on Monster High Rather Than LEGO or Funko

| Field     | Value                                                       |
| --------- | ----------------------------------------------------------- |
| **Status**  | Accepted                                                    |
| **Date**    | 2025-05-01                                                  |
| **Author**  | @monstrino-team                                             |
| **Tags**    | `#product-strategy` `#domain` `#niche` `#monster-high`     |

## Context

Monstrino was conceived as a **collectible catalog and tracking platform**. Several collectible domains were evaluated:

- **LEGO** — massive market, strong collector community, well-documented sets.
- **Funko POP** — huge SKU count, active secondary market, broad demographics.
- **Monster High (Mattel)** — passionate niche community, under-served by tooling, complex release structure, 2022 relaunch (G3) created renewed interest.

The goal was to find a domain where automated data collection provides meaningful competitive advantage and where existing tooling is insufficient.

## Options Considered

### Option 1: LEGO Sets Catalog

Build a catalog and price tracking platform for LEGO sets.

- **Pros:** Massive audience, established market, structured data available (BrickLink, Rebrickable).
- **Cons:** Heavily saturated — BrickLink, BrickSet, Rebrickable, and BrickEconomy already provide comprehensive coverage. Very difficult to differentiate.

### Option 2: Funko POP Catalog

Build a Funko POP tracking and collection platform.

- **Pros:** Large market, active trading community, broad product range.
- **Cons:** Saturated — Pop Price Guide, Hobbydb, CardMavin already dominate. Funko provides official tracking via their app. SKU count (10,000+) makes differentiation expensive.

### Option 3: Monster High Catalog ✅

Build a comprehensive release archive and catalog for Monster High dolls.

- **Pros:** Passionate niche community, no comprehensive automated archive exists, complex release structure creates value for automation, manageable SKU count (~500-2000 releases), G3 relaunch drives renewed interest.
- **Cons:** Smaller total addressable market, niche audience may limit growth ceiling.

## Decision

> Monstrino will target the **Monster High collectible ecosystem** as its primary domain. The catalog structure, source parsers, and domain model will be designed around Monster High's release taxonomy (doll lines, characters, editions, waves).

### Competitive Landscape Analysis

| Competitor / Tool        | Coverage      | Automation | Completeness | UX Quality    |
| ------------------------ | ------------- | ---------- | ------------ | ------------- |
| Monster High Wiki (fan)  | Broad         | None       | Medium       | Poor          |
| Instagram/Reddit tracking| Current only  | None       | Low          | N/A           |
| Retailer listings        | Current only  | N/A        | Low          | Varies        |
| **Monstrino (goal)**     | **Full archive** | **Full** | **High**     | **Modern**    |

### Domain Fit for Automation

| Characteristic                        | Implication for Monstrino                       |
| ------------------------------------- | ----------------------------------------------- |
| Multiple official sources (Mattel, retailers) | Multiple parsers needed → automation value |
| Inconsistent release naming           | LLM normalization provides edge                 |
| Historical releases poorly documented | Backfill pipeline creates unique archive         |
| Active new releases (G3)              | Ongoing ingestion justifies platform investment  |
| Image-heavy products                  | Media pipeline adds significant value            |

## Consequences

### Positive

- **Clear niche** — under-served market with room for a differentiated product.
- **Automation ROI** — inconsistent source data makes automated collection and normalization highly valuable.
- **Manageable scope** — SKU count is large enough to be useful but small enough for one developer to achieve coverage.
- **Community demand** — fan community actively seeks better tooling and information sources.

### Negative

- **Niche audience** — smaller total addressable market compared to LEGO or Funko.
- **Domain expertise required** — understanding Monster High release taxonomy requires deep domain knowledge.
- **Single-domain risk** — if interest in Monster High declines, the platform's value is affected.

### Risks

- Market risk: Mattel could discontinue Monster High again (mitigated by building a reusable platform architecture).
- Expansion consideration: architecture should remain domain-flexible enough to support adjacent collectible domains in the future.

## Related Decisions

- [ADR-PS-002](./adr-ps-002.md) — MVP prioritization (what to build first in this domain)
- [ADR-PS-003](./adr-ps-003.md) — Automated acquisition as core capability
- [ADR-PS-006](./adr-ps-006.md) — Mattel/Shopify as primary data sources
