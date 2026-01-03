from dataclasses import dataclass
from typing import Optional

from domain.entities.refs import ExternalRef
from domain.enums.source_key import SourceKey


@dataclass(frozen=True)
class ParseCommand:
    source: SourceKey
    scope: str
    selector_type: str
    external_ref: Optional[ExternalRef] = None

