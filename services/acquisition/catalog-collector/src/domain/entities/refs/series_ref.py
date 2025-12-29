from dataclasses import dataclass
from typing import Optional


@dataclass(frozen=True)
class SeriesRef:
    external_id: str
    url: Optional[str] = None
