from unittest.mock import AsyncMock

import pytest
from icecream import ic
from monstrino_core.domain.services import TitleFormatter, TitleFormatter
from monstrino_core.shared.enums import ProcessingStates
from monstrino_models.dto import ParsedPet, Character, Pet
from monstrino_repositories.unit_of_work import UnitOfWorkFactory
from monstrino_testing.fixtures import parsed_pet

from app.ports import Repositories
from app.services.common import ProcessingStatesService, ImageReferenceService
from app.services.pets import OwnerResolverService
from app.use_cases.processing.pet.process_pet_single_use_case import ProcessPetSingleUseCase


@pytest.mark.asyncio
async def test_process_pet_single_full_flow_success(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_character_frankie_stein,
        seed_parsed_pet,
):
    """
    1. Seed pre data
    2. Init use case
    3. Execute use case
    4. Verify pet is saved
    """

    # Step 1: Seed pre data
    parsed_pet: ParsedPet = seed_parsed_pet
    character: Character = seed_character_frankie_stein

    # Step 2: Init use case
    uc = ProcessPetSingleUseCase(
        uow_factory=uow_factory,
        processing_states_svc=ProcessingStatesService(),
        image_reference_svc=ImageReferenceService(),
        owner_resolver_svc=OwnerResolverService()
    )

    # Step 3: Execute use case
    await uc.execute(parsed_pet.id)

    # Step 4: Verify pet is saved
    async with uow_factory.create() as uow:
        pet = await uow.repos.pet.get_one_by(title=parsed_pet.title)

        assert pet is not None
        assert pet.code == TitleFormatter.to_code(parsed_pet.title)
        assert pet.title == parsed_pet.title
        assert pet.primary_image == parsed_pet.primary_image
        assert pet.description == parsed_pet.description

        parsed_pet_after = await uow.repos.parsed_pet.get_one_by_id(parsed_pet.id)

        assert parsed_pet_after is not None
        assert parsed_pet_after.processing_state == ProcessingStates.PROCESSED

        # image_list = await uow.repos.image_import_queue.get_all()
        # assert image_list is not None
        # assert len(image_list) == 1
