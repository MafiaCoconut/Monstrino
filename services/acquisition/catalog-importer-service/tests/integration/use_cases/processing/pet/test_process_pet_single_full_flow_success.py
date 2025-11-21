from unittest.mock import AsyncMock

import pytest
from icecream import ic
from monstrino_core import NameFormatter, ProcessingStates
from monstrino_models.dto import ParsedPet, Character, Pet
from monstrino_repositories.unit_of_work import UnitOfWorkFactory
from monstrino_testing.fixtures import parsed_pet

from app.container_components import Repositories
from application.services.common import PetProcessingStatesService, ImageReferenceService
from application.services.pets import OwnerResolverService
from application.use_cases.processing.pet.process_pet_single_use_case import ProcessPetSingleUseCase


@pytest.mark.asyncio
async def test_process_pet_single_full_flow_success(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_character,
        seed_parsed_pet,
        seed_image_reference_all,
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
        processing_states_svc=PetProcessingStatesService(),
        image_reference_svc=ImageReferenceService(),
        owner_resolver_svc=OwnerResolverService()
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
        assert parsed_pet_after.processing_state == ProcessingStates.PROCESSED

        image_list = await uow.repos.image_import_queue.get_all()
        assert image_list is not None
        assert len(image_list) == 1

