---
id: adr-ps-001
title: "ADR-PS-001: Focus on Monster High"
sidebar_label: "PS-001: Monster High Focus"
sidebar_position: 1
tags: [product-strategy, domain, niche, monster-high]
description: "Narrows the product domain to Monster High collectibles, rejecting broader markets to enable deep, high-quality catalog coverage in a well-defined niche."
---

# ADR-PS-001 - Focus the Product Domain on Monster High Instead of LEGO or Funko

| Field      | Value                                                      |
| ---------- | ---------------------------------------------------------- |
| **Status** | Accepted                                                   |
| **Date**   | 2025-05-01                                                 |
| **Author** | @Aleks                                            |
| **Tags**   | `#product-strategy` `#domain` `#niche` `#monster-high`    |

## Context

Monstrino was initially conceived as a collectible catalog. Several domains were evaluated:

- **LEGO** - massive market, well-documented, catalogues exist in abundance (BrickLink, BrickSet, Rebrickable).
- **Funko POP** - large SKU count, active secondary market, dominated by Pop Price Guide and Hobbydb.
- **Monster High (Mattel)** - passionate niche community, majority of fan sites are maintained manually with no automation.

The goal was to find a domain where automated data collection provides meaningful value and where existing tooling is insufficient.

## Options Considered

### Option 1: LEGO Sets Catalog

- **Pros:** Massive audience, established market, structured data available.
- **Cons:** Heavily saturated - very difficult to differentiate.

### Option 2: Funko POP Catalog

- **Pros:** Large market, active trading community.
- **Cons:** Saturated - Funko provides official tracking via their own app.

### Option 3: Monster High Catalog ✅

- **Pros:** Passionate niche community, no comprehensive automated archive exists, complex release structure creates automation value, G3 relaunch drives renewed interest.
- **Cons:** Smaller total addressable market.

## Decision

> Monstrino will target the **Monster High collectible ecosystem** as its primary domain. The catalog structure, source parsers, and domain model will be designed around Monster High's release taxonomy.

## Consequences

### Positive

- Less competitive niche with room for a differentiated product.
- Inconsistent source data makes automated collection and normalization highly valuable.
- Manageable SKU scope for a lean team.

### Negative

- Smaller total addressable market compared to LEGO or Funko.
- Domain expertise required to model release taxonomy correctly.

### Risks

- Mattel could discontinue Monster High again - mitigated by building a reusable platform architecture.

## Related Decisions

- [ADR-PS-002](./adr-ps-002.md) - Automated acquisition as core capability
- [ADR-PS-003](./adr-ps-003.md) - MVP scope prioritization
