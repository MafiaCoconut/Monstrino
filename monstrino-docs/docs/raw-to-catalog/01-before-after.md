---
title: Before and After
sidebar_position: 2
description: Side-by-side comparison of a release before and after the ingestion pipeline.
---

# Before and After

Same release. Same product. Two states.

---

## Before — raw parsed data (ingest schema)

```python
ReleaseParsedContentRef(
    title="Monster High Skulltimate Secrets Gore-Geous Oasis Playset, Jinafire Long Doll And Accessories",
    mpn="JDR52",
    gtin="0194735288892",
    year=2025,
    content_type=["Doll"],

    gender=None,
    characters=None,
    pets=None,
    series=None,
    pack_type=None,
    tier_type=None,
    exclusive_vendor=None,
    reissue_of=None,
)
```

---

## After — canonical domain entry (catalog schema)

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

For the full pipeline walkthrough see [From Raw Data to Structured Catalog](./02-raw-to-catalog.md).
