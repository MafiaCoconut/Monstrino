from typing import Any
import logging
from uuid import UUID
from icecream import ic
from monstrino_core.domain.errors import EntityNotFoundError, DuplicateEntityError
from monstrino_core.domain.services import TitleFormatter
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_models.dto import Pet, ParsedPet
from monstrino_models.enums import EntityName

from app.ports import Repositories
from app.services.common import ImageReferenceService
from app.services.common.processing_states_svc import ProcessingStatesService
from app.services.pets import OwnerResolverService

logger = logging.getLogger(__name__)


class ProcessPetSingleUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
            processing_states_svc: ProcessingStatesService,
            image_reference_svc: ImageReferenceService,
            owner_resolver_svc: OwnerResolverService,

    ):
        self.uow_factory = uow_factory
        self.processing_states_svc = processing_states_svc
        self.image_reference_svc = image_reference_svc
        self.owner_resolver_svc = owner_resolver_svc

    """
    1. Fetch a single parsed pet by ID 
    2. Create pet entity
    3. Format title
    4. Save pet
    5. Resolve owner id
    6. Set image to processing
    7. Set parsed pet as processed
    """
    async def execute(self, parsed_pet_id: UUID) -> None:
        try:
            async with self.uow_factory.create() as uow:
                # Step 1: Fetch a single parsed pet by ID
                parsed_pet: ParsedPet = await uow.repos.parsed_pet.get_one_by_id(parsed_pet_id)
                if not parsed_pet:
                    raise EntityNotFoundError

                await self.processing_states_svc.set_processing(uow.repos.parsed_pet, parsed_pet_id)
                logger.info(f"Processing ParsedPet ID {parsed_pet_id}: {parsed_pet.title}")
                # Step 2-3: Create pet entity and format title
                pet = Pet(
                    code=TitleFormatter.to_code(parsed_pet.title),
                    title=parsed_pet.title,
                    slug=TitleFormatter.to_code(parsed_pet.title),
                    description=parsed_pet.description,
                    primary_image=parsed_pet.primary_image,
                )

                # Step 4: Save pet
                existing_pet_id = await uow.repos.pet.get_id_by(**{Pet.TITLE: parsed_pet.title})
                if existing_pet_id:
                    logger.info(f"Pet with title {parsed_pet.title} already exists with ID {existing_pet_id}. Skipping save.")
                    await self.processing_states_svc.set_processed(uow.repos.parsed_pet, parsed_pet_id)
                    # TODO In future here should be checked if new record have values that not in existing one and update accordingly
                    return
                pet = await uow.repos.pet.save(pet)

                # Step 5: Resolve owner id
                await self.owner_resolver_svc.resolve(uow=uow, owner_title=parsed_pet.owner_title, pet_id=pet.id)

                # Step 6: Set image to processing
                await self.image_reference_svc.set_image_to_process(
                    uow=uow, table=EntityName.PET, field=Pet.PRIMARY_IMAGE,
                    image_link=pet.primary_image, record_id=pet.id
                )

                # Step 7: Set parsed pet as processed
                await self.processing_states_svc.set_processed(uow.repos.parsed_pet, parsed_id=parsed_pet_id)
                logger.info(f"Successfully processed ParsedPet ID {parsed_pet_id}: {pet.title}")

        except EntityNotFoundError as e:
            logger.error(f"Entity parsed_pet with ID {parsed_pet_id} not found")
            await self._handle_error(parsed_pet_id)
        except DuplicateEntityError as e:
            logger.error(f"Duplicate entity error for pet ID {parsed_pet_id}: {e}")
            await self._handle_error(parsed_pet_id)
        except Exception as e:
            logger.exception(f"Error processing parsed_pet ID {parsed_pet_id}: {e}", )
            await self._handle_error(parsed_pet_id)

    async def _handle_error(self, parsed_character_id: UUID):
        async with self.uow_factory.create() as uow:
            await self.processing_states_svc.set_with_errors(uow.repos.parsed_pet, parsed_character_id)

