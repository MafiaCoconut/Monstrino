import pytest
from monstrino_core.shared.enums import ProcessingStates
from monstrino_repositories.unit_of_work import UnitOfWorkFactory
from monstrino_testing.fixtures import Repositories

from app.services.character import GenderResolverService
from app.services.common import ProcessingStatesService, ImageReferenceService
from app.use_cases.processing.character.process_character_single_use_case import ProcessCharacterSingleUseCase
from app.use_cases.processing.character.process_character_batch_use_case import ProcessCharacterBatchUseCase


@pytest.mark.asyncio
async def test_process_character_batch_success(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_image_reference_origin_list,
        seed_parsed_character_list,
        parsed_character_list,

):
    single_uc = ProcessCharacterSingleUseCase(
        uow_factory,
        gender_resolver_svc=GenderResolverService(),
        processing_states_svc=ProcessingStatesService(),
        image_reference_svc=ImageReferenceService(),
    )
    batch_uc = ProcessCharacterBatchUseCase(
        uow_factory=uow_factory,
        single_uc=single_uc,
        batch_size=len(parsed_character_list)
    )

    await batch_uc.execute()

    async with uow_factory.create() as uow:
        all_characters = await uow.repos.character.get_all()
        assert len(all_characters) == len(parsed_character_list)

        processed = await uow.repos.parsed_character.get_all()
        assert all(pc.processing_state == ProcessingStates.PROCESSED for pc in processed)

        assert set(c.display_name for c in all_characters) == set(pc.name for pc in seed_parsed_character_list)

        assert all(c.gender is not None for c in all_characters)

        queue_items = await uow.repos.image_import_queue.get_all()
        assert len(queue_items) == len(parsed_character_list)
