from unittest.mock import AsyncMock

import pytest
from icecream import ic
from monstrino_core import NameFormatter, ProcessingStates
from monstrino_models.dto import ParsedPet, Character, Pet
from monstrino_repositories.unit_of_work import UnitOfWorkFactory
from monstrino_testing.fixtures import parsed_pet

from app.container_components import Repositories
from application.use_cases.processing.pet.process_pet_single_use_case import ProcessPetSingleUseCase


@pytest.mark.asyncio
async def test_process_pet_single_success(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_character,
        seed_parsed_pet,
        image_reference_svc_mock: AsyncMock,
        processing_states_svc_mock: AsyncMock,
        owner_resolver_svc_mock: AsyncMock,
):
    """
    1. Seed pre data
    2. Init use case
    3. Execute use case
    4. Verify pet is saved
    """

    # Step 1: Seed pre data
    parsed_pet: ParsedPet = seed_parsed_pet
    character: Character = seed_character

    # Step 2: Init use case
    uc = ProcessPetSingleUseCase(
        uow_factory=uow_factory,
        processing_states_svc=processing_states_svc_mock,
        image_reference_svc=image_reference_svc_mock,
        owner_resolver_svc=owner_resolver_svc_mock
    )

    # Step 3: Execute use case
    await uc.execute(parsed_pet.id)

    # Step 4: Verify pet is saved
    async with uow_factory.create() as uow:
        pet = await uow.repos.pet.get_one_by(display_name=parsed_pet.name)

        assert pet is not None
        assert pet.name == NameFormatter.format_name(parsed_pet.name)
        assert pet.display_name == parsed_pet.name
        assert pet.primary_image == parsed_pet.primary_image
        assert pet.description == parsed_pet.description

        parsed_pet_after = await uow.repos.parsed_pet.get_one_by_id(parsed_pet.id)

        assert parsed_pet_after is not None
        # assert parsed_pet_after.processing_state == ProcessingStates.PROCESSED

    image_reference_svc_mock.set_image_to_process.assert_called_once()
    processing_states_svc_mock.set_processed.assert_called_once()
    owner_resolver_svc_mock.resolve.assert_called_once()