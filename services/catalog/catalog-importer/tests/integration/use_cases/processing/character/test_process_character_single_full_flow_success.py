from unittest.mock import AsyncMock

import pytest
from monstrino_core.domain.services import TitleFormatter, TitleFormatter
from monstrino_core.shared.enums import ProcessingStates
from monstrino_infra.debug import ic_model
from monstrino_models.dto import ParsedCharacter
from monstrino_repositories.unit_of_work import UnitOfWorkFactory
from monstrino_testing.fixtures import Repositories

from app.services.character import GenderResolverService
from app.services.common import ProcessingStatesService, ImageReferenceService
from app.use_cases.processing.character.process_character_single_use_case import ProcessCharacterSingleUseCase


@pytest.mark.asyncio
async def test_process_character_single_full_flow_success(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_source_list,
        parsed_character: ParsedCharacter,
):
    ic_model(parsed_character)
    async with uow_factory.create() as uow:
        async with uow:
            parsed_character = await uow.repos.parsed_character.save(parsed_character)

    uc = ProcessCharacterSingleUseCase(
        uow_factory=uow_factory,
        processing_states_svc=ProcessingStatesService(),
        image_reference_svc=ImageReferenceService(),
        gender_resolver_svc=GenderResolverService(),
    )

    await uc.execute(parsed_character_id=parsed_character.id)

    async with uow_factory.create() as uow:
        character = await uow.repos.character.get_one_by(**{ParsedCharacter.TITLE: parsed_character.title})
        assert character is not None
        assert character.code == TitleFormatter.to_code(parsed_character.title)
        assert character.title == parsed_character.title
        assert character.description == parsed_character.description
        assert character.primary_image == parsed_character.primary_image
        assert character.gender is not None

        parsed_character_after = await uow.repos.parsed_character.get_one_by(id=parsed_character.id)
        assert parsed_character_after is not None
        assert parsed_character_after.processing_state == ProcessingStates.PROCESSED
