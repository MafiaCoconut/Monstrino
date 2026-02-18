
import pytest
from monstrino_core.shared.enums import ProcessingStates
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.ports import Repositories
from app.services.common import ImageReferenceService
from app.use_cases.processing.releases.process_release_single_use_case import ProcessReleaseSingleUseCase
from app.use_cases.processing.releases.process_release_batch_use_case import (
    ProcessReleasesBatchUseCase,
)
from app.services.releases.character_resolver_svc import CharacterResolverService
from app.services.releases.series_resolver_svc import SeriesResolverService
from app.services.releases.type_resolver_svc import TypeResolverService, ContentTypeResolverService, \
    PackTypeResolverService, TierTypeResolverService
from app.services.releases.exclusive_resolver_svc import ExclusiveResolverService
from app.services.releases.reissue_relation_resolver_svc import ReissueRelationResolverService
from app.services.releases.pet_resolver_svc import PetResolverService
from app.services.releases.image_processing_svc import ImageProcessingService
from app.services.common.processing_states_svc import ProcessingStatesService


@pytest.mark.asyncio
async def test_process_releases_batch_success(
    uow_factory: UnitOfWorkFactory[Repositories],
    seed_parsed_release_default,
    seed_character_draculaura,
    seed_character_role_list,
    seed_series_ghouls_rule,
    seed_release_type_list,
    seed_relation_type_list,
    seed_parsed_release_pack_two,
    seed_character_cleo_de_nile,
    seed_character_deuce_gordon,
    seed_series_boo_york,

):
    single_uc = ProcessReleaseSingleUseCase(
        uow_factory=uow_factory,
        processing_states_svc=ProcessingStatesService(),
        image_reference_svc=ImageReferenceService(),

        character_resolver_svc=CharacterResolverService(),
        series_resolver_svc=SeriesResolverService(),
        exclusive_resolver_svc=ExclusiveResolverService(),
        pet_resolver_svc=PetResolverService(),
        reissue_relation_svc=ReissueRelationResolverService(),

        image_processing_svc=ImageProcessingService(),

        content_type_resolver_svc=ContentTypeResolverService(),
        pack_type_resolver_svc=PackTypeResolverService(),
        tier_type_resolver_svc=TierTypeResolverService(),
    )
    batch_uc = ProcessReleasesBatchUseCase(
        uow_factory=uow_factory,
        single_uc=single_uc,
        batch_size=10,
    )

    await batch_uc.execute()

    async with uow_factory.create() as uow:
        all_parsed = await uow.repos.parsed_release.get_all()
        assert all(p.processing_state == ProcessingStates.PROCESSED for p in all_parsed)
