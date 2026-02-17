from dataclasses import dataclass

from .characters import *
from .pets import *
from .releases import *
from .series import *


@dataclass(frozen=True)
class ParseJobs:
    # Character Parsing Jobs
    characters:                 ParseCharactersJob
    character_by_external_id:   ParseCharacterByExternalIdJob

    # Pet Parsing Jobs
    pets:                   ParsePetsJob
    pets_by_external_id:    ParsePetByExternalIdJob

    # Series Parsing Jobs
    series:                 ParseSeriesJob
    series_by_external_id:  ParseSeriesByExternalIdJob

    # Release Parsing Jobs
    releases:               ParseReleasesJob
    release_by_external_id: ParseReleaseByExternalIdJob