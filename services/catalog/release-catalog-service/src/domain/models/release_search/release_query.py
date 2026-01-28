from typing import Optional

from dataclasses import dataclass

from monstrino_core.application.pagination import PageSpec

from .release_filters import ReleaseFilters
from .. import IncludeSpec, FieldSelection


@dataclass(frozen=True)
class ReleaseSearchQuery:
    filters:    ReleaseFilters
    # sort:     list[dict[SortFieldEnum, SortSpecEnum]]
    page:       PageSpec    = PageSpec()
    include:    Optional[IncludeSpec] = None
    # fields: FieldSelection