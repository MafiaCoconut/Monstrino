from dataclasses import dataclass

from infrastructure.parse_jobs import ParseCharactersJob, ParsePetsJob, ParseSeriesJob, ParseReleasesJob, \
    ParseCharacterByExternalIdJob, ParseSeriesByExternalIdJob, ParsePetByExternalIdJob, ParseReleaseByExternalIdJob


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