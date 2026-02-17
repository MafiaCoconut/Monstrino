from domain.entities import ParseJobs
from app.registries.ports_registry import PortsRegistry
from infra.parse_jobs import ParseCharactersJob, ParsePetsJob, ParseSeriesJob, ParseReleasesJob, \
    ParsePetByExternalIdJob, ParseCharacterByExternalIdJob, ParseReleaseByExternalIdJob, ParseSeriesByExternalIdJob
from infra.parse_jobs.characters.parse_by_external_id_job import ParseCharacterByExternalIdJob


def build_parse_jobs(uow_factory, registry: PortsRegistry) -> ParseJobs:
    return ParseJobs(
        # Character Parsing Jobs
        characters= ParseCharactersJob(uow_factory=uow_factory, registry=registry),
        character_by_external_id=ParseCharacterByExternalIdJob(uow_factory=uow_factory, registry=registry),

        # Pets Parsing Jobs
        pets=       ParsePetsJob(uow_factory=uow_factory, registry=registry),
        pets_by_external_id=ParsePetByExternalIdJob(uow_factory=uow_factory, registry=registry),
        # Series Parsing Jobs
        series=     ParseSeriesJob(uow_factory=uow_factory, registry=registry),
        series_by_external_id=ParseSeriesByExternalIdJob(uow_factory=uow_factory, registry=registry),

        # Releases Parsing Jobs
        releases=   ParseReleasesJob(uow_factory=uow_factory, registry=registry),
        release_by_external_id=ParseReleaseByExternalIdJob(uow_factory=uow_factory, registry=registry),
    )