
import pytest
from monstrino_core.domain.services import NameFormatter
from monstrino_core.shared.enums import ProcessingStates

from application.use_cases.processing.releases.process_single_release_use_case import (
    ProcessSingleReleaseUseCase,
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
async def test_process_single_release_success(
    uow_factory,
    seed_parsed_release_full,
    seed_characters_for_release,
    seed_series_for_release,
    seed_types_for_release,
    seed_exclusives_for_release,
    seed_pets_for_release,
    seed_release_relation_parent,
    seed_image_reference_origin_releases,
):
    parsed = seed_parsed_release_full

    uc = ProcessSingleReleaseUseCase(
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

    await uc.execute(parsed.id)

    async with uow_factory.create() as uow:
        release = await uow.repos.releases.get_one_by_fields_or_none(
            name=NameFormatter.format_name(parsed.name)
        )
        assert release is not None
        assert release.series_id is not None
        assert release.type_ids
        assert release.year == parsed.year

        parsed_after = await uow.repos.parsed_releases.get_one_by_fields_or_none(id=parsed.id)
        assert parsed_after.processing_state == ProcessingStates.PROCESSED
