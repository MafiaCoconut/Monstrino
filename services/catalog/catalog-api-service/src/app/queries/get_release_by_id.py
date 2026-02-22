from dataclasses import dataclass
from typing import Optional

from domain.models import RequestContext, FieldSelection, IncludeReleaseSpec
from domain.models.specs.field_selection_spec import FieldSelection
from domain.models.specs.include_spec import IncludeReleaseSpec


@dataclass(frozen=True)
class GetReleaseByIdDTO:
    release_id:         int

    include: Optional[IncludeReleaseSpec]    = IncludeReleaseSpec()
    # fields:  Optional[FieldSelection] = FieldSelection()
    context: Optional[RequestContext] = RequestContext()
