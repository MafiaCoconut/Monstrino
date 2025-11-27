from unittest.mock import AsyncMock

import pytest
from monstrino_core.domain.services import NameFormatter
from monstrino_core.shared.enums import ProcessingStates
from monstrino_models.dto import ParsedCharacter
from monstrino_repositories.unit_of_work import UnitOfWorkFactory
from monstrino_testing.fixtures import Repositories

from application.use_cases.processing.character.process_character_single_use_case import ProcessCharacterSingleUseCase


@pytest.mark.asyncio
async def test_process_character_single_success(
        uow_factory: UnitOfWorkFactory[Repositories],
        gender_resolver_svc_mock: AsyncMock,
        processing_states_svc_mock: AsyncMock,
        image_reference_svc_mock: AsyncMock,
        parsed_character: ParsedCharacter,
):

    async with uow_factory.create() as uow:
        async with uow:
            parsed_character = await uow.repos.parsed_character.save(parsed_character)

    uc = ProcessCharacterSingleUseCase(
        uow_factory=uow_factory,
        processing_states_svc=processing_states_svc_mock,
        image_reference_svc=image_reference_svc_mock,
        gender_resolver_svc=gender_resolver_svc_mock,
    )

    await uc.execute(parsed_character_id=parsed_character.id)

    async with uow_factory.create() as uow:
        character = await uow.repos.character.get_one_by(display_name=parsed_character.name)
        assert character is not None
        assert character.name == NameFormatter.format_name(parsed_character.name)
        assert character.display_name == parsed_character.name
        assert character.description == parsed_character.description
        assert character.primary_image == parsed_character.primary_image

        parsed_character_after = await uow.repos.parsed_character.get_one_by(id=parsed_character.id)
        assert parsed_character_after is not None
        # assert parsed_character_after.processing_state == ProcessingStates.PROCESSED

    image_reference_svc_mock.set_image_to_process.assert_called_once()
    processing_states_svc_mock.set_processed.assert_called_once()
    gender_resolver_svc_mock.resolve.assert_called_once()