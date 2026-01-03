from dataclasses import dataclass


@dataclass(frozen=True)
class ExternalRef:
    """
    Composite external identifier.

    (system, kind, value, qualifiers) together form
    an external identity key.
    """

    value: str
    qualifiers: dict[str, str]
