---
title: Catalog Domain
sidebar_position: 2
description: Overview of the canonical catalog model - releases, series, characters, pets, and their reference data.
---

# Catalog Domain

The catalog domain is the **canonical business core** of Monstrino. It contains the entities that define the collectible universe independently from any one source page, crawler payload, or media storage implementation.

---

## Main Entities

### Release
`Release` is the central entity of the platform.

A release represents a concrete product or collectible entry, such as a doll, set, fashion pack, or bundle.

Core attributes include:

| Field | Description |
|---|---|
| `title` | display name |
| `code` | internal platform code |
| `slug` | URL-friendly identifier |
| `mpn` | manufacturer part number |
| `year` | release year |
| `description` | normalized product description |
| `text_from_box` | raw text extracted from packaging |

### Series
`Series` groups releases into lines, sublines, or waves.

A series may be **hierarchical** through `parent_id`, which allows structures such as:

- line → subline
- line → wave
- subline → wave

### Character
`Character` represents a canonical Monster High character identity.

It exists **independently from a specific release** and may appear in many releases with different release-specific variants.

### Pet
`Pet` is modeled as a **first-class entity**, not as a text field attached to a character or release.

It can be linked both:
- to a canonical owner via `CharacterPetOwnership`
- to a release via `ReleasePet`

---

## Catalog Reference Data

The catalog depends on explicit reference tables instead of free-form strings.

| Reference Entity | Purpose |
|---|---|
| `ReleaseType` | classifies the product form (doll, set, fashion pack, etc.) |
| `RelationType` | types cross-release relationships (reissue, variant, etc.) |
| `ExclusiveVendor` | normalizes retailer exclusivity |
| `CharacterRole` | classifies character roles within a release |

These keep classification stable and make UI filtering, validation, and analytics reliable.

---

## External References

The canonical catalog can be linked back to source systems through dedicated external reference models:

- `ReleaseExternalReference`
- `SeriesExternalReference`
- `CharacterExternalReference`
- `PetExternalReference`

:::tip
Canonical entities must survive source changes. External references preserve **traceability to origin systems** without letting source IDs leak into canonical identity.
:::

---

## Catalog Relationship Structure

![](/img/domain-models/catalog-relation-structure.jpg)

---

## Modeling Principles

### Canonical first
Catalog entities describe the cleaned business truth as Monstrino understands it - not the raw wording of any one source.

### Stable identity
Each canonical entity has a durable identity that survives re-crawls, source edits, and pipeline retries.

### Explicit links instead of hidden arrays
Many-to-many relations are modeled through dedicated link entities.

:::note Why explicit link entities?
- metadata can live on the relation itself
- history and traceability are preserved
- indexing and querying are straightforward
- future enrichment has a clean attachment point
:::

### Per-release variation belongs on the link
A release-specific appearance of a character or pet is not identical to the canonical base entity. Variant details belong on `ReleaseCharacter` or `ReleasePet`, not on the canonical `Character` or `Pet` records.

---

## What Belongs Outside the Catalog

:::warning
The catalog should **not** own:

- parsed HTML or raw payloads → belongs in **Ingest**
- media storage internals → belongs in **Media**
- pricing history → belongs in **Market**
- scheduler state → belongs in **operational models**
- crawler execution state → belongs in **operational models**
:::

---

## Related Pages

- [Release Model](./release-model)
- [Series Model](./series-model)
- [Character and Pet Model](./character-and-pet-model)
- [Release Relationships](./release-relationships)
