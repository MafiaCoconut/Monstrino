from unittest.mock import AsyncMock

import pytest
from icecream import ic
from monstrino_core.shared.enums import ProcessingStates
from monstrino_models.dto import ParsedPet, Character, Pet
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from application.ports import Repositories
from application.services.common import ProcessingStatesService, ImageReferenceService
from application.services.pets import OwnerResolverService
from application.use_cases.processing.pet.process_pet_single_use_case import ProcessPetSingleUseCase
from application.use_cases.processing.pet.process_pet_batch_use_case import ProcessPetBatchUseCase


@pytest.mark.asyncio
async def test_process_pet_batch_success(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_character_list,
        seed_parsed_pet_list,
        seed_image_reference_origin_list,
):
    """
    1. Seed pre data
    2. Init use cases
    3. Execute use case
    4. Verify pet is saved
    """

    all_parsed_pets = seed_parsed_pet_list

    uc_single = ProcessPetSingleUseCase(
        uow_factory=uow_factory,
        processing_states_svc=ProcessingStatesService(),
        image_reference_svc=ImageReferenceService(),
        owner_resolver_svc=OwnerResolverService()
    )

    uc_batch = ProcessPetBatchUseCase(
        uow_factory=uow_factory,
        single_uc=uc_single,
        batch_size=len(all_parsed_pets)
    )

    await uc_batch.execute()

    async with uow_factory.create() as uow:
        all_pets = await uow.repos.pet.get_all()
        assert len(all_pets) == 2

        processed_pet_list = await uow.repos.parsed_pet.get_all()
        assert all(pc.processing_state == ProcessingStates.PROCESSED for pc in processed_pet_list)

        assert set(c.display_name for c in all_pets) == set(pc.name for pc in all_parsed_pets)

        queue_items = await uow.repos.image_import_queue.get_all()
        assert len(queue_items) == len(all_parsed_pets)
