from dataclasses import dataclass

from monstrino_repositories.repositories_interfaces import (
    ParsedCharacterRepoInterface, ParsedPetRepoInterface, ParsedSeriesRepoInterface, ParsedReleaseRepoInterface,
    SourceRepoInterface, SourceTypeRepoInterface
)
@dataclass
class Repositories:
    parsed_character: ParsedCharacterRepoInterface
    parsed_pet: ParsedPetRepoInterface
    parsed_series: ParsedSeriesRepoInterface
    parsed_release: ParsedReleaseRepoInterface

    source: SourceRepoInterface
    source_type: SourceTypeRepoInterface
