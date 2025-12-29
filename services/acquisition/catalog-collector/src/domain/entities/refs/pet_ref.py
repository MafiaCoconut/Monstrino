from dataclasses import dataclass


@dataclass(frozen=True)
class PetRef:
    external_id: str
    url: str | None = None
