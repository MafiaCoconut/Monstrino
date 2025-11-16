
import pytest
from monstrino_core import ProcessingStates

from application.use_cases.processing.characters.process_single_character_use_case import (
    ProcessSingleCharacterUseCase,
)
from application.use_cases.processing.characters.process_characters_batch_use_case import (
    ProcessCharactersBatchUseCase,
)
from application.services.characters.gender_resolver_svc import GenderResolverService
from application.services.common.image_reference_svc import ImageReferenceService
from application.services.common.processing_states_svc import CharacterProcessingStatesService


@pytest.mark.asyncio
async def test_process_characters_batch_success(
    uow_factory,
    seed_two_parsed_characters_basic,
    seed_gender_male,
    seed_image_reference_origin_characters,
):
    single_uc = ProcessSingleCharacterUseCase(
        uow_factory=uow_factory,
        gender_resolver_svc=GenderResolverService(),
        image_reference_svc=ImageReferenceService(),
        processing_states_svc=CharacterProcessingStatesService(),
    )
    batch_uc = ProcessCharactersBatchUseCase(
        uow_factory=uow_factory,
        single_uc=single_uc,
        batch_size=10,
    )

    await batch_uc.execute()

    async with uow_factory.create() as uow:
        all_parsed = await uow.repos.parsed_character.get_all()
        assert all(p.processing_state == ProcessingStates.PROCESSED for p in all_parsed)
