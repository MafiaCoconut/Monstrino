
import pytest
from monstrino_core import NameFormatter, ProcessingStates

from application.use_cases.processing.pets.process_single_pet_use_case import (
    ProcessSinglePetUseCase,
)
from application.services.pets.owner_resolver_svc import OwnerResolverService
from application.services.common.image_reference_svc import ImageReferenceService
from application.services.common.processing_states_svc import PetProcessingStatesService


@pytest.mark.asyncio
async def test_process_single_pet_success(
    uow_factory,
    seed_parsed_pet_with_owner,
    seed_owner_character,
    seed_image_reference_origin_pets,
):
    parsed = seed_parsed_pet_with_owner

    uc = ProcessSinglePetUseCase(
        uow_factory=uow_factory,
        owner_resolver_svc=OwnerResolverService(),
        image_reference_svc=ImageReferenceService(),
        processing_states_svc=PetProcessingStatesService(),
    )

    await uc.execute(parsed.id)

    async with uow_factory.create() as uow:
        pet = await uow.repos.pets.get_one_by_fields_or_none(
            name=NameFormatter.format_name(parsed.name)
        )
        assert pet is not None
        assert pet.owner_id == seed_owner_character.id

        parsed_after = await uow.repos.parsed_pets.get_one_by_fields_or_none(id=parsed.id)
        assert parsed_after.processing_state == ProcessingStates.PROCESSED
