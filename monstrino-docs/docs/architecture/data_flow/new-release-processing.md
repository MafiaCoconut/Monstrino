---
title: New Release Processing
tags: [monstrino, data-flow, processing, release]
sidebar_label: New release processing
created: 27.11.2025
---
This document outlines the data flow and processing steps involved
in handling new music releases within the Monstrino platform. It covers
the journey of release data from ingestion to final storage and exposure to end-users.

## Pipeline Orchestration

1. Get parsed release from table where process_state = 'init'
2. Format name
3. Create new entity Release() with fields
4. Save entity to get_id, so processor can link to this release
5. Process characters and genders
6. Process pets
7. Process series
8. Process release types [content_type, pack_type, tier_type]
9. Process exclusive vendors
10. Process reissue_of
11. Process images
12. Set parsed release as processed

## Steps

### Step 1 Get parsed release

Get parsed release by id

```python
parsed_release: ParsedRelease = await uow.repos.parsed_release.get_one_by_id(obj_id=parsed_release_id)
```

### Step 2-3 Create new entity Release and format name

```python
release = Release(
    name=NameFormatter.format_name(parsed_release.name),
    display_name=parsed_release.name,
    year=parsed_release.year,
    mpn=parsed_release.mpn,
    description=parsed_release.description,
    text_from_box=parsed_release.from_the_box_text
)
```

### Step 4 Save new entity

Saving new entity `release` in db threw repository

### Step 5 Resolve characters

