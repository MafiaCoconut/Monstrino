from typing import Protocol, Optional

from domain.entities.refs import ExternalRef
from domain.enums import SourceKey


class ParseCommandInterface(Protocol):
    source: SourceKey
    scope: str
    selector_type: str
    external_ref: Optional[ExternalRef]