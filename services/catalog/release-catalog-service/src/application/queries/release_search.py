from dataclasses import dataclass
from typing import Optional

from monstrino_core.application.output import OutputSpec

from domain.models import RequestContext
from domain.models.release_search import ReleaseSearchQuery


@dataclass(frozen=True)
class ReleaseSearchDTO:
    query:      ReleaseSearchQuery
    output:     OutputSpec               = OutputSpec()
    context:    Optional[RequestContext] = RequestContext()
