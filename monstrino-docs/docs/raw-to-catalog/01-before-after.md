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
    title           = "Monster High Skulltimate Secrets Gore-Geous Oasis Playset, Jinafire Long Doll And Accessories",
    description     = "Reveal a Monster High doll, unlock accessories ..."
    mpn             = "JDR52",
    gtin            = "0194735288892",
    year_raw        = "2025",
    content_type    = ["Doll"],
    images          = ["...", "..."],

    gender              = None,      # unknown
    characters          = None,      # unknown
    pets                = None,      # unknown
    series              = None,      # unknown
    pack_type           = None,      # unknown
    tier_type           = None,      # unknown
    exclusive_vendor    = None,      # unknown
    reissue_of          = None,      # unknown
    items               = None,      # unknown
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
    title           = "Monster High Skulltimate Secrets Gore-Geous Oasis Playset, Jinafire Long Doll And Accessories",
    description     = "Reveal a Monster High doll, unlock accessories ..."
    mpn             = "JDR52",
    gtin            = "0194735288892",
    year_raw        = "2025",
    images          = ["...", "..."],    

    characters      = ["Jinafire Long"],
    pets            = None, 
    gender          = ["ghoul"],
    series          = ["Skulltimate Secrets", "Destination: Gore-geous Oasis"],
    
    content_type    = ["doll-figure", "playset"],
    pack_type       = ["1-pack"],
    tier_type       = "standard",

    exclusive_vendor= None,
    reissue_of      = None,
    items           = [
        { "category": "wearables",    "subcategory": "clothing",    "type": "dress",        "title": "Fashion dress" },
        { "category": "wearables",    "subcategory": "clothing",    "type": "skirt",        "title": "Fashion skirt" },
        { "category": "wearables",    "subcategory": "clothing",    "type": "tank_top",     "title": "Tank top" },
        { "category": "wearables",    "subcategory": "clothing",    "type": "sweater",      "title": "Fashion sweater" },
        { "category": "wearables",    "subcategory": "clothing",    "type": "belt",         "title": "Waist belt" },
        { "category": "wearables",    "subcategory": "clothing",    "type": "breastplate",  "title": "Decorative breastplate armor" },

        { "category": "wearables",    "subcategory": "footwear",    "type": "boots",        "title": "Knee-high boots" },
        { "category": "wearables",    "subcategory": "footwear",    "type": "sandals",      "title": "Platform strappy sandals" },
        { "category": "wearables",    "subcategory": "footwear",    "type": "ankle_boots",  "title": "Cutout ankle boots" },

        { "category": "wearables",    "subcategory": "jewelry",     "type": "earrings",     "title": "Earrings" },
        { "category": "wearables",    "subcategory": "headwear",    "type": "headscarf",    "title": "Head scarf" },


        { "category": "bags",         "subcategory": "bags",        "type": "backpack",     "title": "School backpack" },
        { "category": "bags",         "subcategory": "bags",        "type": "suitcase",     "title": "Travel suitcase" },
        { "category": "bags",         "subcategory": "handbags",    "type": "handbag",      "title": "Fashion handbag" },

        { "category": "accessories",  "subcategory": "glasses",     "type": "glasses",      "title": "Fashion glasses" },
        { "category": "accessories",  "subcategory": "fashion",     "type": "fan",          "title": "Folding hand fan" },


        { "category": "playset",      "subcategory": "storage",             "type": "storage_box",  "title": "Suitcase-shaped storage trunk" },
        { "category": "playset",      "subcategory": "storage_components",  "type": "shelf",        "title": "Storage shelve 1" },
        { "category": "playset",      "subcategory": "storage_components",  "type": "shelf",        "title": "Storage shelve 2" },
        { "category": "playset",      "subcategory": "display_components",  "type": "hanger",       "title": "Clothes hanger 1" },
        { "category": "playset",      "subcategory": "display_components",  "type": "hanger",       "title": "Clothes hanger 2" },

        { "category": "functional",   "subcategory": "keys_and_locks",      "type": "key",          "title": "Trunk box key" },
        { "category": "functional",   "subcategory": "keys_and_locks",      "type": "key",          "title": "Suitcase key" },
        { "category": "functional",   "subcategory": "keys_and_locks",      "type": "key",          "title": "Backpack key" },
        { "category": "functional",   "subcategory": "key_accessories",     "type": "keychain",     "title": "Decorative keychain" }
    ],
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
    title            = "Monster High Skulltimate Secrets Gore-Geous Oasis Playset, Jinafire Long Doll And Accessories",
    description      = "Reveal a Monster High doll, unlock accessories ...",

    mpn              = "JDR52",
    gtin             = "0194735288892",
    year             = 2025,
    gender           = GenderType.GHOUL,
    tier             = TierType.STANDARD,
    exclusive_vendor = None,
    reissue_of       = None,

    characters=[
        Character(name="Jinafire Long", slug="jinafire-long")
    ],

    pets=[],

    series=[
        Series(
            series_kind="line",
            series_tags=[]
            name="Skulltimate Secrets",
            slug="skulltimate-secrets"
        ),
        Series(
            series_kind="subseries",
            series_tags=["beach_theme", "playset_included"],
            name="Destination: Gore-geous Oasis",
            slug="destination-gore-geous-oasis"
        ),
    ],

    release_types=[
        ReleaseType(slug="doll-figure"),
        ReleaseType(slug="playset"),
    ],

    pack_types=[
        PackType(slug="1-pack"),
    ],

    items=[
        ReleaseItem(category="wearables",   subcategory="clothing", type="dress",       title="Fashion dress"               ),
        ReleaseItem(category="wearables",   subcategory="clothing", type="skirt",       title="Fashion skirt"               ),
        ReleaseItem(category="wearables",   subcategory="clothing", type="tank_top",    title="Tank top"                    ),
        ReleaseItem(category="wearables",   subcategory="clothing", type="sweater",     title="Fashion sweater"             ),
        ReleaseItem(category="wearables",   subcategory="clothing", type="belt",        title="Waist belt"                  ),
        ReleaseItem(category="wearables",   subcategory="clothing", type="breastplate", title="Decorative breastplate armor"),

        ReleaseItem(category="wearables",   subcategory="footwear", type="boots",       title="Knee-high boots"             ),
        ReleaseItem(category="wearables",   subcategory="footwear", type="sandals",     title="Platform strappy sandals"    ),
        ReleaseItem(category="wearables",   subcategory="footwear", type="ankle_boots", title="Cutout ankle boots"          ),

        ReleaseItem(category="wearables",   subcategory="jewelry",  type="earrings",    title="Earrings"                    ),
        ReleaseItem(category="wearables",   subcategory="headwear", type="headscarf",   title="Head scarf"                  ),


        ReleaseItem(category="bags",        subcategory="bags",     type="backpack",    title="School backpack"             ),
        ReleaseItem(category="bags",        subcategory="bags",     type="suitcase",    title="Travel suitcase"             ),
        ReleaseItem(category="bags",        subcategory="handbags", type="handbag",     title="Fashion handbag"             ),

        ReleaseItem(category="accessories", subcategory="glasses",  type="glasses",     title="Fashion glasses"             ),
        ReleaseItem(category="accessories", subcategory="fashion",  type="fan",         title="Folding hand fan"            ),


        ReleaseItem(category="playset",     subcategory="storage",               type="storage_box", title="Suitcase-shaped storage trunk"  ),
        ReleaseItem(category="playset",     subcategory="storage_components",    type="shelf",       title="Storage shelve 1"               ),
        ReleaseItem(category="playset",     subcategory="storage_components",    type="shelf",       title="Storage shelve 2"               ),
        ReleaseItem(category="playset",     subcategory="display_components",    type="hanger",      title="Clothes hanger 1"               ),
        ReleaseItem(category="playset",     subcategory="display_components",    type="hanger",      title="Clothes hanger 2"               ),

        ReleaseItem(category="functional",  subcategory="keys_and_locks",        type="key",         title="Trunk box key"                  ),
        ReleaseItem(category="functional",  subcategory="keys_and_locks",        type="key",         title="Suitcase key"                   ),
        ReleaseItem(category="functional",  subcategory="keys_and_locks",        type="key",         title="Backpack key"                   ),
        ReleaseItem(category="functional",  subcategory="key_accessories",       type="keychain",    title="Decorative keychain"            ),
    ],

    media=ReleaseMedia(
        primary_image=MediaAsset(original_url="...", hosted_url=None),
        gallery=[
            MediaAsset(original_url="...", hosted_url=None),
            MediaAsset(original_url="...", hosted_url=None),
            MediaAsset(original_url="...", hosted_url=None),
            MediaAsset(original_url="...", hosted_url=None),
            MediaAsset(original_url="...", hosted_url=None),
        ],
    ),
)
```

---

For the full pipeline walkthrough see
[From Raw Data to Structured Catalog](./02-raw-to-catalog.md).
