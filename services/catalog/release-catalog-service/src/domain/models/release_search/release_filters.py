from dataclasses import dataclass
from typing import Optional


@dataclass(frozen=True)
class ReleaseFilters:
    release_ids:        Optional[list[int]] = None
    search:             Optional[str]       = None
    series_ids:         Optional[list[int]] = None
    character_ids:      Optional[list[int]] = None
    year_from:          Optional[int]       = None
    year_to:            Optional[int]       = None
    release_type_ids:   Optional[list[int]] = None
    exclusive_ids:      Optional[list[int]] = None
    has_images:         Optional[bool]      = None
    is_reissue:         Optional[bool]      = None
    country_codes:      Optional[list[str]] = None
    date_from:          Optional[str]       = None