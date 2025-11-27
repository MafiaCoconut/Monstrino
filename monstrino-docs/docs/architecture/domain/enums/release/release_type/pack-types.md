---
id: release-type-pack-type-enum
title: ReleaseTypeTierType Enum
tags: [monstrino, service, enum, pack-type, release-type]
created: 2025-11-27
updated: 2025-11-27

sidebar_label: Pack Type Enum
sidebar_position: 3
---

```python
from enum import StrEnum

class ReleaseTypePackCountType(StrEnum):
    SINGLE_PACK  = "1-pack"
    TWO_PACK     = "2-pack"
    THREE_PACK   = "3-pack"
    FOUR_PACK    = "4-pack"
    FIVE_PACK    = "5-pack"
    SIX_PACK     = "6-pack"
    SEVEN_PACK   = "7-pack"
    EIGHT_PACK   = "8-pack"
    NINE_PACK    = "9-pack"
    TEN_PACK     = "10-pack"
    MULTIPACK    = "multipack"

class ReleaseTypePackType(StrEnum):
    DELUXE_PACK             = "deluxe_pack"
    GIFT_PACK               = "gift_pack"
    COLLECTOR_PACK          = "collector_pack"
    LIMITED_EDITION_PACK    = "limited_edition_pack"
    SPECIAL_EDITION_PACK    = "special_edition_pack"
    HOLIDAY_PACK            = "holiday_pack"
    EXCLUSIVE_PACK          = "exclusive_pack"
    SIGNATURE_PACK          = "signature_pack"
    FAMILY_PACK             = "family_pack"
    BUNDLE_PACK             = "bundle_pack"
    GIFT_SET                = "gift-set"


```
