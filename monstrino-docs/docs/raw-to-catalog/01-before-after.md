---
title: Before and After
sidebar_position: 2
description: >
  Three states of the same release across the ingestion pipeline —
  parsed, enriched, and canonical.
---

# Before and After

Same release. Same product. Three states.

---

## Stage 1 — ingest_item.parsed_payload

Produced by `catalog-content-collector`.
Contains everything the source exposes directly — nothing invented.

```python
# ingest_item.parsed_payload → ReleaseParsedContentRef
ReleaseParsedContentRef(
    title="Monster High Skulltimate Secrets Gore-Geous Oasis Playset, Jinafire Long Doll And Accessories",
    mpn="JDR52",
    gtin="0194735288892",
    year=2025,
    content_type=["Doll"],

    gender=None,          # unknown
    characters=None,      # unknown
    pets=None,            # unknown
    series=None,          # unknown
    pack_type=None,       # unknown
    tier_type=None,       # unknown
    exclusive_vendor=None,
    reissue_of=None,
)
```

---

## Stage 2 — ingest_item.enriched_payload

Produced by `catalog-data-enricher` (scripts + AI Orchestrator).
All previously unknown attributes are now resolved.

This is the same `ReleaseParsedContentRef` type as `parsed_payload` —
the difference is that the `None` fields are now filled. These are still
raw strings and lists, not domain objects. Resolver services have not
run yet.

```python
# ingest_item.enriched_payload → ReleaseParsedContentRef
ReleaseParsedContentRef(
    title="Monster High Skulltimate Secrets Gore-Geous Oasis Playset, Jinafire Long Doll And Accessories",
    mpn="JDR52",
    gtin="0194735288892",
    year=2025,
    content_type=["doll-figure", "playset"],

    gender=["ghoul"],
    characters=["Jinafire Long"],
    pets=None,
    series=["Skulltimate Secrets", "Destination: Gore-geous Oasis"],
    pack_type=["1-pack"],
    tier_type="standard",
    exclusive_vendor=None,
    reissue_of=None,
)
```

---

## Stage 3 — canonical domain entry

Produced by `catalog-importer`.
Stored in `catalog.release` and related tables.
Raw string values have been resolved into domain objects by
resolver services.

```python
Release(
    mpn="JDR52",
    gtin="0194735288892",
    title="Monster High Skulltimate Secrets Gore-Geous Oasis Playset",
    year=2025,
    gender=GenderType.GHOUL,
    tier=TierType.STANDARD,

    characters=[Character(name="Jinafire Long", slug="jinafire-long")],
    series=[
        Series(name="Skulltimate Secrets",           slug="skulltimate-secrets"),
        Series(name="Destination: Gore-geous Oasis", slug="destination-gore-geous-oasis"),
    ],
    release_types=[ReleaseType(slug="doll-figure"), ReleaseType(slug="playset")],
    pack_types=[PackType(slug="1-pack")],
    items=[
        ReleaseItem(title="storage case",   category="item"),
        ReleaseItem(title="key_1",          category="item"),
        ReleaseItem(title="key_2",          category="item"),
        ReleaseItem(title="key_3",          category="item"),
        ReleaseItem(title="suitcase_1",     category="clothes"),
        ReleaseItem(title="suitcase_2",     category="clothes"),
    ],
    media=ReleaseMedia(
        primary_image=MediaAsset(
            original_url="https://shopping.mattel.com/cdn/shop/files/ab46c79b5...",
            hosted_url="https://media.monstrino.com/assets/image/sha256/ab/46/ab46c79b5...jpg",
        ),
    ),
)
```

---

For the full pipeline walkthrough see
[From Raw Data to Structured Catalog](./02-raw-to-catalog.md).
