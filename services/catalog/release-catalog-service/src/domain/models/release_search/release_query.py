from typing import Optional

from dataclasses import dataclass
from .release_filters import ReleaseFilters
from .. import PageSpec, IncludeSpec, FieldSelection
from ...enums import SortSpecEnum


@dataclass(frozen=True)
class ReleaseQuery:
    filters:    ReleaseFilters
    # sort:     list[dict[SortFieldEnum, SortSpecEnum]]
    page:       PageSpec    = PageSpec()
    include:    IncludeSpec = IncludeSpec()
    # fields: FieldSelection