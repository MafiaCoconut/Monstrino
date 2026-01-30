from dataclasses import dataclass
from typing import Optional


@dataclass(frozen=True)
class ReleaseListItem:
    id:             int
    name:           str
    display_name:   str
    year:           Optional[int]
    primary_image:  Optional[str]
    release_types:  Optional[list[dict]]
