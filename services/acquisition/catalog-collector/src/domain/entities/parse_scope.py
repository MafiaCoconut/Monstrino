from datetime import datetime
from dataclasses import dataclass
from typing import Optional


@dataclass(frozen=True)
class ParseScope:
    # year: int = datetime.now().year - 1
    year: int = datetime.now().year - 16
