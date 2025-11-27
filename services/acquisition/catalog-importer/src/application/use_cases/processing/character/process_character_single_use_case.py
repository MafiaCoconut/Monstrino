from typing import Any
import logging

from monstrino_core.domain.errors import EntityNotFoundError, DuplicateEntityError
from monstrino_core.domain.services import NameFormatter
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_models.dto import Character, ParsedCharacter
from monstrino_models.enums import EntityName
from monstrino_testing.fixtures import uow_factory

from app.container_components import Repositories
from application.services.character import GenderResolverService
from application.services.common import ImageReferenceService, CharacterProcessingStatesService

logger = logging.getLogger(__name__)

class ProcessCharacterSingleUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any , Repositories],
            gender_resolver_svc: GenderResolverService,
            processing_states_svc: CharacterProcessingStatesService,
            image_reference_svc: ImageReferenceService,

    ):
        self.uow_factory = uow_factory
        self.gender_resolver_svc = gender_resolver_svc
        self.processing_states_svc = processing_states_svc
        self.image_reference_svc = image_reference_svc

    """
    1. Take parsed character
    2. Init character object
    3. Format name
    4. Find gender_id 
    5. Save character to get id
    6. Set image to process with id
    7. Mark parsed character as processed
    8. If any error occurs, mark parsed character as with_errors
    """
    async def execute(self, parsed_character_id: int):
        async with self.uow_factory.create() as uow:
            try:
                # Step 1: Take parsed character
                p_character: ParsedCharacter = await uow.repos.parsed_character.get_one_by_or_raise(id=parsed_character_id)

                # Step 2-3: Init character object and format name
                character = Character(
                    name=NameFormatter.format_name(p_character.name),
                    display_name=p_character.name,
                    description=p_character.description,
                    primary_image=p_character.primary_image,
                )

                # Step 4: Find gender_id
                await self.gender_resolver_svc.resolve(uow, p_character, character)

                # Step 5: Save character to get id
                character = await uow.repos.character.save(character)

                # Step 6: Set image to process with id
                await self.image_reference_svc.set_image_to_process(
                    uow,
                    EntityName.CHARACTER,
                    Character.PRIMARY_IMAGE,
                    p_character.primary_image,
                    character.id
                )

                # Step 7: Mark parsed character as processed
                await self.processing_states_svc.set_processed(uow, parsed_character_id)

            # Step 8: If any error occurs, mark parsed character as with_errors
            except EntityNotFoundError as e:
                logger.error(f"Entity parsed_character with ID {parsed_character_id} not found")
                await self._handle_error(parsed_character_id)
            except DuplicateEntityError as e:
                logger.error(f"Duplicate entity error for character ID {parsed_character_id}: {e}")
                await self._handle_error(parsed_character_id)
            except Exception as e:
                logger.error(f"Error processing character ID {parsed_character_id}: {e}", )
                await self._handle_error(parsed_character_id)

    async def _handle_error(self, parsed_character_id: int):
        async with self.uow_factory.create() as uow:
            await self.processing_states_svc.set_with_errors(uow, parsed_character_id)

