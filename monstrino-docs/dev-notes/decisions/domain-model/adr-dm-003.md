---
id: adr-dm-003
title: "ADR-DM-003: Character Variant Concept"
sidebar_label: "DM-003: Character Variants"
sidebar_position: 3
tags: [domain-model, characters, variants, catalog]
---

# ADR-DM-003 — Introduce Character Variant Concept

| Field      | Value                                                     |
| ---------- | --------------------------------------------------------- |
| **Status** | Accepted                                                  |
| **Date**   | 2025-07-15                                                |
| **Author** | @monstrino-team                                           |
| **Tags**   | `#domain-model` `#characters` `#variants` `#catalog`     |

## Context

Some characters in the Monster High universe exist across multiple distinct franchise contexts. For example:

- **Wednesday Addams** appears in both the classic *Addams Family* movie lineup and the modern *Wednesday* TV series.
- **Draculaura** appears in both Generation 1 and Generation 3 of Monster High.

Modeling each version as a fully separate and unrelated character loses the conceptual relationship between them. Treating them as one character ignores meaningful distinctions in the catalog (different visual design, franchise, release context).

## Options Considered

### Option 1: Flat Character List

Each version of a character is a separate, unrelated `Character` record.

- **Pros:** Simple model.
- **Cons:** No way to understand that two entries are versions of the same character, poor catalog navigability.

### Option 2: Single Character With Metadata

One `Character` record with metadata fields for franchise and generation.

- **Pros:** Simple grouping.
- **Cons:** Becomes complex when a character has many versions with significantly different attributes; metadata fields do not scale.

### Option 3: Character + CharacterVariant ✅

A `Character` represents the canonical identity (the person/creature), and `CharacterVariant` represents a specific version within a franchise or context.

- **Pros:** Preserves identity across versions, supports franchise-specific filtering, models the domain accurately.
- **Cons:** More complex model, queries must join through variants.

## Decision

> The domain model introduces a two-level character structure:
>
> - **`Character`** — the canonical identity (e.g., "Wednesday Addams").
> - **`CharacterVariant`** — a specific version within a franchise or generation (e.g., "Wednesday Addams — Wednesday TV Series").
>
> Releases reference `CharacterVariant`, not `Character` directly.

## Consequences

### Positive

- Catalog accurately represents multi-franchise characters.
- Users can browse all versions of a character from a single canonical page.
- Supports current and future franchise expansions.

### Negative

- More complex domain model requiring join queries.
- Import logic must determine which variant a parsed release corresponds to.

## Related Decisions

- [ADR-DM-001](./adr-dm-001.md) — Database domain schema structure
- [ADR-DI-001](../data-ingestion/adr-di-001.md) — Separated parsed and canonical tables
