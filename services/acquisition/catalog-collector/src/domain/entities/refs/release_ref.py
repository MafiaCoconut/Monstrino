from dataclasses import dataclass


@dataclass(frozen=True)
class ReleaseRef:
    external_id: str
    # source: SourceKey
    url: str | None = None
    year: int | None = None
