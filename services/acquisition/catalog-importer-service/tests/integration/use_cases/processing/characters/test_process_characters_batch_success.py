#
# import pytest
# from monstrino_core import ProcessingStates
#
# from application.services.common import ImageReferenceService
# from application.use_cases.processing.characters.process_single_character_use_case import (
#     ProcessSingleCharacterUseCase,
# )
# from application.use_cases.processing.characters.process_characters_batch_use_case import (
#     ProcessCharactersBatchUseCase,
# )
# from application.services.character.gender_resolver_svc import GenderResolverService
# from application.services.common.processing_states_svc import CharacterProcessingStatesService
#
#
# @pytest.mark.asyncio
# async def test_process_characters_batch_success(
#     uow_factory,
#     seed_two_parsed_characters_basic,
#     seed_gender_male,
#     seed_image_reference_origin_characters,
# ):
#     single_uc = ProcessSingleCharacterUseCase(
#         uow_factory=uow_factory,
#         gender_resolver_svc=GenderResolverService(),
#         image_reference_svc=ImageReferenceService(),
#         processing_states_svc=CharacterProcessingStatesService(),
#     )
#     batch_uc = ProcessCharactersBatchUseCase(
#         uow_factory=uow_factory,
#         single_uc=single_uc,
#         batch_size=10,
#     )
#
#     await batch_uc.execute()
#
#     async with uow_factory.create() as uow:
#         all_parsed = await uow.repos.parsed_character.get_all()
#         assert all(p.processing_state == ProcessingStates.PROCESSED for p in all_parsed)



import pytest
from monstrino_core import ProcessingStates
from monstrino_repositories.unit_of_work import UnitOfWorkFactory
from monstrino_testing.fixtures import Repositories

from application.services.character import GenderResolverService
from application.services.common import CharacterProcessingStatesService, ImageReferenceService
from application.use_cases.processing.characters.process_character_single_use_case import ProcessCharacterSingleUseCase
from application.use_cases.processing.characters.process_characters_batch_use_case import ProcessCharacterBatchUseCase


@pytest.mark.asyncio
async def test_process_character_batch_success(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_character_gender_list,
        seed_image_reference_all,
        seed_parsed_character_list,
        character_list,

):
    single_uc = ProcessCharacterSingleUseCase(
        uow_factory,
        gender_resolver_svc=GenderResolverService(),
        processing_states_svc=CharacterProcessingStatesService(),
        image_reference_svc=ImageReferenceService(),
    )
    batch_uc = ProcessCharacterBatchUseCase(
        uow_factory=uow_factory,
        single_uc=single_uc,
        batch_size=len(character_list)
    )

    await batch_uc.execute()

    async with uow_factory.create() as uow:
        all_characters = await uow.repos.character.get_all()
        assert len(all_characters) == len(character_list)

        processed = await uow.repos.parsed_character.get_all()
        assert all(pc.processing_state == ProcessingStates.PROCESSED for pc in processed)

        assert set(c.display_name for c in all_characters) == set(pc.name for pc in seed_parsed_character_list)

        assert all(c.gender_id is not None for c in all_characters)

        queue_items = await uow.repos.image_import_queue.get_all()
        assert len(queue_items) == len(character_list)
