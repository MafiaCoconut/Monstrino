import pytest
from monstrino_core import NameFormatter, ProcessingStates
from monstrino_repositories.unit_of_work import UnitOfWorkFactory
from monstrino_testing.fixtures import Repositories

from application.use_cases.processing.characters.process_character_single_use_case import ProcessCharacterSingleUseCase


@pytest.mark.asyncio
async def test_process_character_single_success(
        uow_factory: UnitOfWorkFactory[Repositories],
        processing_states_svc_mock,
        image_reference_svc_mock,
        parsed_character,
):
    async with uow_factory.create() as uow:
        async with uow:
            parsed_character = await uow.repos.parsed_character.save(parsed_character)

    uc = ProcessCharacterSingleUseCase(
        uow_factory=uow_factory,
        processing_states_svc=processing_states_svc_mock,
        image_reference_svc=image_reference_svc_mock,
    )

    await uc.execute(parsed_character_id=parsed_character.id)

    async with uow_factory.create() as uow:
        character = await uow.repos.character.get_one_by(display_name=parsed_character.name)
        assert character is not None
        assert character.name == NameFormatter.format_name(parsed_character.name)
        assert character.display_name == parsed_character.name
        assert character.description == parsed_character.description
        assert character.primary_image == parsed_character.primary_image
        assert character.alt_names == parsed_character.alt_names
        assert character.notes == parsed_character.notes

        parsed_character_after = await uow.repos.parsed_character.get_one_by(id=parsed_character.id)
        assert parsed_character_after is not None
        assert parsed_character_after.processing_state == ProcessingStates.PROCESSED

    image_reference_svc_mock.set_image_to_process.assert_called_once()
    processing_states_svc_mock.set_processed.assert_called_once()