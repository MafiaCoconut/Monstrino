---
id: adr-ps-004
title: "ADR-PS-004: Defer Affiliate Monetization"
sidebar_label: "PS-004: Defer Monetization"
sidebar_position: 4
tags: [product-strategy, monetization, positioning, affiliate]
---

# ADR-PS-004 — Defer Affiliate Monetization to Preserve Non-Commercial Positioning

| Field     | Value                                                       |
| --------- | ----------------------------------------------------------- |
| **Status**  | Accepted                                                    |
| **Date**    | 2025-08-30                                                  |
| **Author**  | @monstrino-team                                             |
| **Tags**    | `#product-strategy` `#monetization` `#positioning`         |

## Context

Affiliate marketing programs (e.g., Amazon Associates, Awin, ShareASale) were explored as a potential revenue source for Monstrino. The concept: link catalog release pages to retailer listings with affiliate tags, earning commissions on purchases.

However, this created strategic conflicts:

- **Trust erosion** — affiliate links incentivize promoting products with higher commissions, not the best information.
- **Content bias** — price collection and retailer linking become motivated by revenue rather than user value.
- **Community perception** — the Monster High collector community is sensitive to commercial exploitation of fan-created resources.
- **Legal complexity** — affiliate disclosure requirements, tax implications, and varying program terms across jurisdictions.
- **Premature optimization** — monetizing before product-market fit risks optimizing for revenue before value.

:::warning Strategic Risk
Adding affiliate links before establishing trust would position Monstrino as "yet another affiliate site" rather than a genuine community resource. First impressions matter in niche communities.
:::

## Options Considered

### Option 1: Launch with Affiliate Links

Include affiliate links from the initial release.

- **Pros:** Revenue from day one, simple implementation.
- **Cons:** Trust erosion, perceived commercial bias, legal overhead, community backlash risk.

### Option 2: Defer Monetization Entirely ✅

No monetization in the current product stage. Focus on establishing trust and value first.

- **Pros:** Clean positioning, community trust, reduced legal complexity, focus on product quality.
- **Cons:** No revenue, requires alternative funding (personal investment / hobby project).

### Option 3: Voluntary Donations / Sponsorship

Accept optional donations (Patreon, GitHub Sponsors, Ko-fi).

- **Pros:** Community-supported, no commercial bias, transparent.
- **Cons:** Requires audience size for meaningful revenue, platform fees, ongoing engagement effort.

## Decision

> Affiliate-link-driven price collection and monetization must **not be part of the current product stage**. Monstrino will operate as a non-commercial community resource until product-market fit is established and community trust is earned.

### Positioning Statement

Monstrino is positioned as an **independent, non-commercial catalog and archive** for the Monster High collector community. Revenue considerations are explicitly secondary to:

1. Catalog completeness and accuracy.
2. Community trust and transparency.
3. User experience quality.

### Future Monetization Path (When Ready)

| Stage              | Monetization Approach                            | Prerequisites                        |
| ------------------ | ------------------------------------------------ | ------------------------------------ |
| **Current**        | None (hobby/personal investment)                 | N/A                                  |
| **Post-trust**     | Voluntary donations (Ko-fi, GitHub Sponsors)     | Established community presence       |
| **Post-scale**     | Non-intrusive affiliate links with disclosure    | Large audience, legal setup complete |
| **Post-product**   | Premium features (API access, advanced analytics)| Proven value, clear user segmentation|

## Consequences

### Positive

- **Community trust** — positioning as non-commercial builds genuine goodwill in a niche community.
- **Clean architecture** — no affiliate tracking infrastructure, simpler codebase.
- **Unbiased content** — catalog decisions driven by completeness, not commission potential.
- **Focus** — engineering effort goes entirely into product value, not monetization infrastructure.

### Negative

- **No revenue** — project operates at a personal cost (hosting, time, domain).
- **Sustainability question** — long-term viability depends on maintaining motivation without financial return.
- **Missed early revenue** — traffic that could generate commissions goes unmonetized.

### Risks

- Motivation sustainability: without revenue, the project depends on intrinsic motivation — establish clear personal goals beyond profit.
- Competitor monetization: a competitor could launch with affiliate links and fund development faster — mitigate by focusing on automation advantage.

## Related Decisions

- [ADR-PS-001](./adr-ps-001.md) — Monster High focus (defines the community whose trust matters)
- [ADR-PS-002](./adr-ps-002.md) — Archive-first MVP (prioritizes value over features, including monetization)
- [ADR-PS-005](./adr-ps-005.md) — Catalog over prices (prices deferred partly due to monetization considerations)
