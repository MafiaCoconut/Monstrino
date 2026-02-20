from dataclasses import dataclass


@dataclass(frozen=True)
class SortFieldsEnum:
    # TODO : replace with real data
    NAME:       str = "name"
    DATE:       str = "date"
    RELEVANCE:  str = "relevance"
    RATING:     str = "rating"