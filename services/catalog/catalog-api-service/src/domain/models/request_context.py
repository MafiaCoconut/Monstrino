from dataclasses import dataclass


@dataclass(frozen=True)
class RequestContext:
    locale:     str  = "en"
    timezone:   str  = "UTC"
