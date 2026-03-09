---
title: Release Model
sidebar_position: 3
description: Detailed documentation of the Release entity and all release-owned relationships.
---

# Release Model

`Release` is the **central aggregate root** of the Monstrino catalog.

A release represents a concrete collectible entry and acts as the main anchor for classification, composition, pricing, and media attachment.

---

## Core DTO

| Field | Description |
|---|---|
| `id` | internal platform identifier |
| `title` | display name |
| `mpn` | manufacturer part number |
| `year` | release year |
| `description` | normalized product description |
| `text_from_box` | raw text extracted from product packaging |
| `code` | internal platform code |
| `slug` | URL-friendly identifier |
| `created_at` / `updated_at` | timestamps |

---

## Why Release Is the Center

Almost every other domain area eventually connects back to a release:

| Connection | Domain |
|---|---|
| Series classify a release | Catalog |
| Release types classify the product kind | Catalog |
| Characters and pets appear inside a release | Catalog |
| Exclusive vendors define special distribution | Catalog |
| Relations connect one release to another | Catalog |
| Market data tracks price and listings | Market |
| Media assets visually represent a release | Media |

---

## Release as an Aggregate Root

![](/img/domain-models/releasemodel-as-aggregate-root.jpg)

---

## Classification

A release is classified through link entities rather than embedded arrays.

### ReleaseTypeLink
Links a release to a `ReleaseType`.

Keeps release type classification normalized and allows one release to support more than one type if the domain ever requires it.

### ReleaseSeriesLink
Links a release to a `Series`.

The link itself carries `relation_type`, meaning the series relationship is semantic, not just structural. Examples include a primary line or a secondary association.

---

## Composition

### ReleaseCharacter
Connects a release to a canonical `Character` and stores release-specific variant details.

| Field | Description |
|---|---|
| `role_id` | character's role in this release |
| `position` | display or packaging position |
| `is_uniq_to_release` | whether this character variant is exclusive to this release |
| body, articulation, finish, face, hair | release-specific physical variant fields |
| `standalone_release_id` | optional pointer to a standalone release |

### ReleasePet
Connects a release to a canonical `Pet` and stores release-specific pet details.

| Field | Description |
|---|---|
| `position` | packaging position |
| `is_uniq_to_release` | whether this pet variant is exclusive to this release |
| `finish_type` | surface finish variant |
| `size_variant` | size classification |
| `pose_variant` | pose classification |
| `colorway` | color scheme |
| `standalone_release_id` | optional pointer to a standalone release |

---

## Distribution and Relationships

### ReleaseExclusiveLink
Associates a release with an `ExclusiveVendor`.

### ReleaseRelationLink
Associates one release to another through a `RelationType`.

Examples: reissue, variant, collection inclusion, related edition.

---

## Invariants

:::note Business Rules
1. `code` and `slug` should consistently identify the canonical release.
2. `mpn` may be absent, but when present it should be treated as important product identity data.
3. Release-specific character or pet properties must live on relation entities, not on canonical identity records.
4. A release can belong to multiple series, but the semantics of each membership must be explicit.
5. Inter-release relationships should always be typed.
:::

---

## Release Identity Strategy

A release is the canonical platform object derived from one or more sources.

It is **not** the same thing as:

| Thing | What it is instead |
|---|---|
| A parsed source page | belongs to **Ingest** |
| A market listing | belongs to **Market** |
| A media asset | belongs to **Media** |
| A raw source payload | belongs to **Ingest** |

Those models orbit around the release.

---

## Related Pages

- [Series Model](./series-model)
- [Character and Pet Model](./character-and-pet-model)
- [Release Relationships](./release-relationships)
- [Market Model](./market-model)
- [Media Model](./media-model)
