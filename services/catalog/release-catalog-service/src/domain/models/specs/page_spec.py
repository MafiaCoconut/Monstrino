from dataclasses import dataclass


@dataclass(frozen=True)
class PageSpec:
    limit:  int = 30
    offset: int = 0
