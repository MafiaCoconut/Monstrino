---
id: adr-ps-002
title: "ADR-PS-002: Automated Data Acquisition as Core"
sidebar_label: "PS-002: Automated Acquisition"
sidebar_position: 2
tags: [product-strategy, acquisition, automation, ingestion]
description: "Makes automated data acquisition the core product capability, replacing the manual update model used by existing competing catalog sites."
---

# ADR-PS-002 — Make Automated Data Acquisition the Core Product Capability

| Field      | Value                                                      |
| ---------- | ---------------------------------------------------------- |
| **Status** | Accepted                                                   |
| **Date**   | 2025-05-01                                                 |
| **Author** | @Aleks                                            |
| **Tags**   | `#product-strategy` `#acquisition` `#automation`          |

## Context

The majority of existing collectible catalog sites are updated manually by volunteers. This creates:

- Delayed or missing new release data.
- Inconsistent quality and coverage.
- High maintenance burden with no scalability.

Monstrino has an opportunity to differentiate by building automation as a first-class capability rather than an afterthought.

## Options Considered

### Option 1: Manual Curation

Maintain the catalog through manual editor contributions, similar to fan wikis.

- **Pros:** Simple infrastructure, lower initial cost.
- **Cons:** Doesn't scale, inconsistent quality, requires ongoing volunteer effort.

### Option 2: Automated Acquisition Pipeline ✅

Build a system that automatically discovers new releases, scrapes source data, normalizes it, and updates the catalog without manual intervention.

- **Pros:** Scalable, consistent, provides a permanent competitive advantage.
- **Cons:** Complex ingestion architecture, ongoing maintenance of parsers.

## Decision

> Monstrino must automatically: **discover new releases**, **collect source data**, and **generate catalog entries**. Automation is a core product capability, not an optimization.

## Consequences

### Positive

- High scalability — new releases appear in the catalog without manual work.
- Minimal ongoing labor once parsers are stable.
- Provides a durable competitive advantage over manual sites.

### Negative

- Complex ingestion architecture required from the start.
- Parser maintenance is an ongoing engineering cost.

## Related Decisions

- [ADR-PS-001](./adr-ps-001.md) — Domain selection (Monster High)
- [ADR-DI-001](../data-ingestion/adr-di-001.md) — Parsed tables ingestion boundary
- [ADR-DI-002](../data-ingestion/adr-di-002.md) — Processing state workflow
