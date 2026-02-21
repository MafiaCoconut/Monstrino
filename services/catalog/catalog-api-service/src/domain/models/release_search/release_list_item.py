from dataclasses import dataclass
from typing import Optional


@dataclass(frozen=True)
class ReleaseListItem:
    id:             str
    code:           Optional[str]
    slug:           Optional[str]
    title:          Optional[str]
    mpn:            Optional[str]
    description:    Optional[str]
    text_from_box:  Optional[str]
    year:           Optional[int]

    primary_image:  Optional[str]
    characters_display_name: Optional[list[str]]
    release_types:  Optional[list[dict]]
