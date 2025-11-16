
import pytest
from monstrino_core import NameFormatter, ProcessingStates

from application.services.character import GenderResolverService
from application.services.common import ImageReferenceService
from application.use_cases.processing.characters.process_single_character_use_case import (
    ProcessSingleCharacterUseCase,
)
from application.services.common.processing_states_svc import CharacterProcessingStatesService


@pytest.mark.asyncio
async def test_process_single_character_success(
    uow_factory,
    seed_parsed_character,
    seed_character_gender_ghoul,
    # seed_image_reference_origin_characters,
):
    parsed = seed_parsed_character
    gender_obj = seed_character_gender_ghoul

    uc = ProcessSingleCharacterUseCase(
        uow_factory=uow_factory,
        gender_resolver_svc=GenderResolverService(),
        image_reference_svc=ImageReferenceService(),
        processing_states_svc=CharacterProcessingStatesService(),
    )

    await uc.execute(parsed.id)

    async with uow_factory.create() as uow:
        character = await uow.repos.get_character.get_one_by(
            name=NameFormatter.format_name(parsed.name)
        )
        assert character is not None
        assert character.gender_id == gender_obj.id

        parsed_after = await uow.repos.parsed_character.get_one_by(id=parsed.id)
        assert parsed_after.processing_state == ProcessingStates.PROCESSED
