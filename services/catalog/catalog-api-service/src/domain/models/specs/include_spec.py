import dataclasses

@dataclasses.dataclass(frozen=True)
class IncludeReleaseSpec:
    id:             bool = False
    mpn:            bool = False
    title:          bool = False
    code:           bool = False
    slug:           bool = False
    description:    bool = False
    year:           bool = False
    text_from_box:  bool = False
    characters:     bool = False
    pets:           bool = False
    primary_image:  bool = False
    images:         bool = False
    release_types:  bool = False
    exclusives:     bool = False
    series:         bool = False
    types:          bool = False
    relations:      bool = False

    # Groups settings
    all:            bool = False
    base_info:      bool = False