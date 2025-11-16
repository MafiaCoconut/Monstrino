
import pytest
from monstrino_core import ProcessingStates

from application.use_cases.processing.releases.process_single_release_use_case import (
    ProcessSingleReleaseUseCase,
)
from application.use_cases.processing.releases.process_releases_batch_use_case import (
    ProcessReleasesBatchUseCase,
)
from application.services.releases.character_resolver_svc import CharacterResolverService
from application.services.releases.series_resolver_svc import SeriesResolverService
from application.services.releases.type_resolver_svc import TypeResolverService
from application.services.releases.exclusive_resolver_svc import ExclusiveResolverService
from application.services.releases.reissue_relation_svc import ReissueRelationService
from application.services.releases.pet_resolver_svc import PetResolverService
from application.services.releases.image_processing_svc import ImageProcessingService
from application.services.common.processing_states_svc import ReleaseProcessingStatesService


@pytest.mark.asyncio
async def test_process_releases_batch_success(
    uow_factory,
    seed_two_parsed_releases_full,
    seed_characters_for_release,
    seed_series_for_release,
    seed_types_for_release,
    seed_exclusives_for_release,
    seed_pets_for_release,
    seed_release_relation_parent,
    seed_image_reference_origin_releases,
):
    single_uc = ProcessSingleReleaseUseCase(
        uow_factory=uow_factory,
        character_resolver_svc=CharacterResolverService(),
        series_resolver_svc=SeriesResolverService(),
        type_resolver_svc=TypeResolverService(),
        exclusive_resolver_svc=ExclusiveResolverService(),
        reissue_relation_svc=ReissueRelationService(),
        pet_resolver_svc=PetResolverService(),
        image_processing_svc=ImageProcessingService(),
        processing_states_svc=ReleaseProcessingStatesService(),
    )
    batch_uc = ProcessReleasesBatchUseCase(
        uow_factory=uow_factory,
        single_uc=single_uc,
        batch_size=10,
    )

    await batch_uc.execute()

    async with uow_factory.create() as uow:
        all_parsed = await uow.repos.parsed_releases.get_all()
        assert all(p.processing_state == ProcessingStates.PROCESSED for p in all_parsed)
