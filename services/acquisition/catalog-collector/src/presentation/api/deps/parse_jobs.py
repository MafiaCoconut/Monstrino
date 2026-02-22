from fastapi import Depends

from app.jobs.parse import *
from bootstrap.container import AppContainer
from presentation.api.deps.container import get_container


# ------------------------------ Parse Characters Jobs Dependencies ------------------------ #
def get_parse_characters_job(container: AppContainer = Depends(get_container)) -> ParseCharactersJob:
    return container.parse_jobs.characters

def get_parse_character_by_external_id_job(container: AppContainer = Depends(get_container)) -> ParseCharacterByExternalIdJob:
    return container.parse_jobs.character_by_external_id

# ------------------------------ Parse Pets Jobs Dependencies ------------------------ #
def get_parse_pets_job(container: AppContainer = Depends(get_container)) -> ParsePetsJob:
    return container.parse_jobs.pets

# ------------------------------ Parse Series Jobs Dependencies ------------------------ #
def get_parse_series_job(container: AppContainer = Depends(get_container)) -> ParseSeriesJob:
    return container.parse_jobs.series

# ------------------------------ Parse Releases Jobs Dependencies ------------------------ #
def get_parse_releases_job(container: AppContainer = Depends(get_container)) -> ParseReleasesJob:
    return container.parse_jobs.releases