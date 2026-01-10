from dataclasses import dataclass
from typing import Optional

from domain.models import RequestContext, OutputSpec
from domain.models.release_search import ReleaseQuery


@dataclass(frozen=True)
class ReleaseSearchQuery:
    query:      ReleaseQuery
    output:     OutputSpec               = OutputSpec()
    context:    Optional[RequestContext] = RequestContext()
