---
id: adr-ps-003
title: "ADR-PS-003: Release Archive First for MVP"
sidebar_label: "PS-003: Release Archive MVP"
sidebar_position: 3
tags: [product-strategy, mvp, scope, releases]
description: "Focuses the MVP scope on the release archive first, deferring user-facing social features to validate the catalog foundation before expanding."
---

# ADR-PS-003 — Prioritize Release Archive Over User Features for MVP

| Field      | Value                                                   |
| ---------- | ------------------------------------------------------- |
| **Status** | Accepted                                                |
| **Date**   | 2025-09-15                                              |
| **Author** | @Aleks                                         |
| **Tags**   | `#product-strategy` `#mvp` `#scope` `#releases`        |

## Context

Prior to this decision, development had touched multiple areas simultaneously:

- JWT authentication system
- User collection management
- User profile pages

However, all of these features depend on the existence of a catalog. Without a populated, browsable release archive, user features have no value — there is nothing to collect, track, or display.

## Options Considered

### Option 1: Continue Building User Features in Parallel

Keep working on auth, collections, and profiles alongside the catalog.

- **Pros:** More "complete" product at launch.
- **Cons:** High scope creep, delays the catalog which is the actual product foundation, user features without content are useless.

### Option 2: Release Archive Only for MVP ✅

Defer all user-facing features (auth, collections, profiles) until the release archive is functional and complete enough to be useful.

- **Pros:** Fast MVP, clear focus, delivers the unique value proposition immediately.
- **Cons:** No user personalization at launch.

## Decision

> The **first Monstrino release must contain only the release archive** — a browsable, searchable catalog of Monster High releases. User accounts, collections, and personalization are out of scope for MVP.

## Consequences

### Positive

- Faster path to a usable product.
- Forces focus on the core catalog functionality.
- Easier to validate product-market fit before investing in user features.

### Negative

- No user retention mechanism at launch.
- Community requests for collection tracking must be deferred.

## Related Decisions

- [ADR-PS-002](./adr-ps-002.md) — Automated acquisition as core
- [ADR-PS-005](./adr-ps-005.md) — Image pipeline priority over price collection
