import dataclasses

@dataclasses.dataclass(frozen=True)
class IncludeSpec:
    characters:    bool = True
    pets:          bool = True
    images:        bool = True
    exclusives:    bool = True
    series:        bool = True
    types:         bool = True
    relations:     bool = True
