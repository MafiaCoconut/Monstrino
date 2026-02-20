from dataclasses import dataclass
from typing import Optional


@dataclass(frozen=True)
class FieldSelection:
    include: Optional[set[str]] = None
    exclude: Optional[set[str]] = None
