
import pytest
from monstrino_core import ProcessingStates

from application.use_cases.processing.pets.process_single_pet_use_case import (
    ProcessSinglePetUseCase,
)
from application.use_cases.processing.pets.process_pets_batch_use_case import (
    ProcessPetsBatchUseCase,
)
from application.services.pets.owner_resolver_svc import OwnerResolverService
from application.services.common.image_reference_svc import ImageReferenceService
from application.services.common.processing_states_svc import PetProcessingStatesService


@pytest.mark.asyncio
async def test_process_pets_batch_success(
    uow_factory,
    seed_two_parsed_pets_with_owners,
    seed_owner_character,
    seed_image_reference_origin_pets,
):
    single_uc = ProcessSinglePetUseCase(
        uow_factory=uow_factory,
        owner_resolver_svc=OwnerResolverService(),
        image_reference_svc=ImageReferenceService(),
        processing_states_svc=PetProcessingStatesService(),
    )
    batch_uc = ProcessPetsBatchUseCase(
        uow_factory=uow_factory,
        single_uc=single_uc,
        batch_size=10,
    )

    await batch_uc.execute()

    async with uow_factory.create() as uow:
        all_parsed = await uow.repos.parsed_pets.get_all()
        assert all(p.processing_state == ProcessingStates.PROCESSED for p in all_parsed)
