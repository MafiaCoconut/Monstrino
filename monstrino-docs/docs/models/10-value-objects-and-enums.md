---
title: Value Objects and Enums
sidebar_position: 11
description: Shared domain enums and value objects used across Monstrino schemas.
---

# Value Objects and Enums

Monstrino uses enums and value objects to keep important domain states and classifications **explicit and centralized**.

---

## Catalog-Related Enums

### Series

| Enum | Values |
|---|---|
| `SeriesKind` | `line`, `subline`, `wave` |
| `SeriesRelationTypes` | `primary`, `secondary` |

These should drive classification logic, navigation, and validation instead of scattered free-form strings.

### Character

The DTOs reference value objects such as `CharacterGender`. Character identity-level fields should continue to rely on centralized value objects where possible.

### Release / Product Semantics

The value object file also contains structured product tags and signals:

| Group | Examples |
|---|---|
| **Reissue / reboot** | reissue hints, reboot type concepts |
| **Content structure** | multipack, playset inclusion |
| **Theme tags** | thematic classification tags |
| **Generation tags** | `g1`, `g2`, `g3` |
| **Rarity / fan signals** | collector-facing discovery tags |

These are ideal candidates for filtering, badges, discovery features, and enrichment outputs.

---

## Media Enums

| Enum | Values |
|---|---|
| `MediaKind` | `image`, `video`, `audio`, `document`, `other` |
| `VariantStatus` | `active`, `generating`, `failed` |
| `AssetSourceType` | `parsed`, `user_upload`, `admin_upload`, `imported` |
| `AssetStatus` | `active`, `deleted`, `quarantined` |
| `AssetVisibility` | `public`, `unlisted`, `private` |
| `AttachmentSourceContext` | `parsed`, `user_upload`, `admin` |
| `ModerationState` | `ok`, `pending`, `rejected` |
| `IngestionJobState` | `init`, `pending`, `claimed`, `retrying`, `completed`, `failed`, `quarantined` |
| `IngestionJobType` | `external_ingest`, `normalize_asset` |

---

## Core and Geography Value Objects

The DTOs reference country-related value objects such as `GeoCountryCode`.

These should remain centralized and reused across:

- source-country mapping,
- market pricing,
- region-aware enrichment,
- storage of external references.

---

## Design Guidelines

:::note
1. Prefer **enum codes over ad-hoc string literals** throughout the codebase.
2. Keep enum ownership close to the relevant domain area.
3. Use human-readable titles in reference data and **machine-stable codes** in enums.
4. Do not duplicate the same classification concept in multiple inconsistent enum families.
5. When AI enrichment returns classification labels, **map them into these controlled vocabularies** instead of persisting arbitrary raw text.
:::

---

## When to Use an Enum vs Reference Data

| Use | When |
|---|---|
| **Enum** | set is code-level and relatively stable; internal to application logic; values are not operator-managed |
| **Reference data** | values need richer metadata; values may be operator-managed; need descriptions, ordering, or UI labels; relations should be normalized |

That distinction explains why Monstrino uses both approaches and why neither should replace the other.

---

## Related Pages

- [Catalog Domain](./catalog-domain)
- [Media Model](./media-model)
- [Ingest Model](./ingest-model)
