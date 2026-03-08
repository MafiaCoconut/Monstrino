---
id: adr-a-006
title: "ADR-A-006: Centralize Source Parsers in monstrino-infra"
sidebar_label: "A-006: Parsers in monstrino-infra"
sidebar_position: 6
tags: [architecture, parsers, monstrino-infra, shared-packages]
description: "Centralizes all external source parsers inside the monstrino-infra shared package to eliminate duplication and ensure consistent parsing across services."
---

# ADR-A-006 — Centralize Source Parsers in `monstrino-infra`

| Field      | Value                                                              |
| ---------- | ------------------------------------------------------------------ |
| **Status** | Accepted                                                           |
| **Date**   | 13-02-2026                                                         |
| **Author** | @Aleks                                                    |
| **Tags**   | `#architecture` `#parsers` `#monstrino-infra` `#shared-packages`  |

## Context

Multiple services need to parse the same external sources (e.g., Mattel Shopify, fan sites). When parsers lived inside individual services, the same parsing logic was duplicated or slightly diverged across the codebase, causing inconsistencies when the same source was used in different contexts.

## Options Considered

### Option 1: Parsers Local to Each Service

Each service that needs to parse a source implements its own parser.

- **Pros:** Services are fully self-contained.
- **Cons:** Duplicated parser logic, inconsistent normalization, bugs must be fixed in multiple places.

### Option 2: Centralize Parsers in `monstrino-infra` ✅

All source parsers live in the `monstrino-infra` shared package and are consumed by any service that needs them.

- **Pros:** Single implementation per source, consistent parsing behavior, one place to update when source structure changes.
- **Cons:** `monstrino-infra` becomes a broader dependency for services.

## Decision

> All source-specific parsers are implemented in and distributed through the **`monstrino-infra`** package. Services import and use parser classes from this package; they do not implement their own.

## Consequences

### Positive

- Source structure changes require a fix in exactly one place.
- All services parsing the same source get identical normalized output.
- Easier to test parsers in isolation as a standalone package.

### Negative

- `monstrino-infra` must be updated and re-released when parsers change, requiring coordinated service upgrades.
- 