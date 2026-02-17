from dataclasses import dataclass


@dataclass(frozen=True)
class ReleaseMarketRef:
    title: str
    external_id: str
    # url: str | None = None
    price: str