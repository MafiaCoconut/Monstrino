---
id: adr-ps-002
title: "ADR-PS-002: Release Archive First, Social Features Later"
sidebar_label: "PS-002: Archive-First MVP"
sidebar_position: 2
tags: [product-strategy, mvp, prioritization, roadmap]
---

# ADR-PS-002 — Prioritize Release Archive over User and Social Features for MVP

| Field     | Value                                                       |
| --------- | ----------------------------------------------------------- |
| **Status**  | Accepted                                                    |
| **Date**    | 2025-05-15                                                  |
| **Author**  | @monstrino-team                                             |
| **Tags**    | `#product-strategy` `#mvp` `#prioritization`               |

## Context

Monstrino's feature vision includes:

1. **Release archive** — comprehensive, searchable catalog of all Monster High releases.
2. **User collections** — personal collection tracking ("I own this," "I want this").
3. **Social features** — community reviews, wishlists, trading, discussion.
4. **Price tracking** — MSRP history, secondary market prices.

Auth and user account functionality were started early in development because they felt foundational. However, this investment created several problems:

- **Delayed core value** — time spent on auth, user profiles, and account management delayed the release archive.
- **Empty shell problem** — user features without catalog content provided no standalone value.
- **Scope creep** — social features generate unbounded requirements (moderation, notifications, privacy).

:::tip Product Principle
The value of a collectible platform comes from its **catalog completeness and accuracy**, not from social features. Community features enhance an already valuable catalog — they don't replace it.
:::

## Options Considered

### Option 1: Full-Feature MVP (Archive + Users + Social)

Ship everything together for a comprehensive launch.

- **Pros:** Complete product from day one, strong first impression.
- **Cons:** Massive scope, long time-to-market, quality compromised across all features, high risk of shipping nothing.

### Option 2: User-First MVP

Build user accounts, collections, and social features first, add catalog later.

- **Pros:** Engagement features drive retention.
- **Cons:** Collections without a catalog are meaningless, no content to engage with, puts the cart before the horse.

### Option 3: Archive-First MVP ✅

Ship a complete, polished release archive. User features are deferred to a subsequent release.

- **Pros:** Core value delivered quickly, SEO benefits from indexed pages, clear success criteria, manageable scope.
- **Cons:** No user engagement features initially, no personalization, users can only browse.

## Decision

> The first Monstrino release must focus on a **complete, polished release archive**. User collections, social functionality, and account-centered features are deferred.

### MVP Scope

| In Scope (MVP)                          | Deferred (Post-MVP)                      |
| --------------------------------------- | ---------------------------------------- |
| Complete release catalog                | User registration / login                |
| Character pages                         | Personal collection tracking             |
| Doll line / series browsing             | Wishlist management                      |
| Release detail pages with images        | Community reviews and ratings            |
| Search and filtering                    | Discussion / comments                    |
| SEO-optimized pages                     | Price tracking and alerts                |
| Responsive design                       | Trading / marketplace features           |

### Success Criteria for MVP

| Metric                              | Target                               |
| ----------------------------------- | ------------------------------------ |
| Release coverage                    | ≥ 80% of known Monster High releases|
| Image coverage                      | ≥ 70% of releases with images       |
| Page load time                      | < 2 seconds for release pages        |
| Search engine indexing              | Release pages indexed by Google      |
| Mobile responsiveness               | Full functionality on mobile         |

## Consequences

### Positive

- **Faster time-to-market** — shipping a catalog is achievable with current resources.
- **SEO foundation** — indexed release pages build organic traffic before user features exist.
- **Clear scope** — well-defined deliverables reduce scope creep risk.
- **Validation** — community feedback on the archive informs which user features to build next.
- **Reduced infrastructure** — no auth, sessions, or user data management in V1.

### Negative

- **No engagement loop** — users visit to browse but have no reason to return regularly.
- **No monetization path** — user accounts are required for most monetization strategies.
- **Competitive vulnerability** — a competitor could launch with user features and capture engagement.

### Risks

- Traffic without retention: plan post-MVP user features to convert visitors into returning users.
- Content completeness: if the archive is incomplete at launch, the core value proposition is undermined — set clear coverage thresholds.

## Related Decisions

- [ADR-PS-001](./adr-ps-001.md) — Monster High focus (defines the catalog domain)
- [ADR-PS-003](./adr-ps-003.md) — Automated acquisition (how the archive gets populated)
- [ADR-PS-005](./adr-ps-005.md) — Catalog and images over prices (MVP content priorities)
- [ADR-FD-001](../frontend-delivery/adr-fd-001.md) — Next.js migration (SEO capability for archive pages)
