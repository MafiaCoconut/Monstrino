from typing import Any
import logging
from uuid import UUID
from icecream import ic
from monstrino_core.domain.errors import EntityNotFoundError, DuplicateEntityError
from monstrino_core.domain.services import TitleFormatter
from monstrino_core.domain.services.catalog import CharacterTitleFormatter
from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_models.dto import Character, ParsedCharacter
from monstrino_models.enums import EntityName
from monstrino_testing.fixtures import uow_factory

from app.ports import Repositories
from app.services.character import GenderResolverService
from app.services.common import ImageReferenceService
from app.services.common.processing_states_svc import ProcessingStatesService

logger = logging.getLogger(__name__)

class ProcessCharacterSingleUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any , Repositories],
            gender_resolver_svc: GenderResolverService,
            processing_states_svc: ProcessingStatesService,
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
    4. Resolve gender
    5. Save character to get id
    6. Set image to process with id
    7. Mark parsed character as processed
    8. If any error occurs, mark parsed character as with_errors
    """
    async def execute(self, parsed_character_id: UUID):
        async with self.uow_factory.create() as uow:
            try:
                # Step 1: Take parsed character and check if character already exists
                p_character: ParsedCharacter = await uow.repos.parsed_character.get_one_by_or_raise(id=parsed_character_id)
                if not p_character:
                    raise EntityNotFoundError(f"ParsedCharacter with ID {parsed_character_id} not found")

                await self.processing_states_svc.set_processing(uow.repos.parsed_character, parsed_character_id)
                logger.info(f"Processing ParsedCharacter ID {parsed_character_id}: {p_character.title}")

                # Step 2-3: Init character object and format name
                character = Character(
                    code=TitleFormatter.to_code(p_character.title),
                    title=p_character.title,
                    slug=TitleFormatter.to_code(p_character.title),
                    description=p_character.description,
                    primary_image=p_character.primary_image,
                )

                # Step 4: Resolve gender
                await self.gender_resolver_svc.resolve(p_character, character)


                # Step 5: Save character to get id
                existing_character_id = await uow.repos.character.get_id_by(**{Character.CODE: character.code})
                if existing_character_id:
                    exist_cha = await uow.repos.character.get_one_by_id(existing_character_id)
                    if exist_cha.gender == character.gender:
                        logger.info(f"Character with title {character.title} already exists with ID {existing_character_id}. Skipping saving.")
                        await self.processing_states_svc.set_processed(uow.repos.parsed_character, parsed_character_id)
                        # TODO In future here should be checked if new record have values that not in existing one and update accordingly
                        return

                    else:
                        exist_cha.code = f"{exist_cha.gender[0]}-{exist_cha.code}"
                        character.code = f"{character.gender[0]}-{character.code}"

                        await uow.repos.character.update({Character.ID: exist_cha.id}, {Character.CODE: exist_cha.code})

                character.slug = CharacterTitleFormatter.to_slug(character.title, character.gender)

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
                await self.processing_states_svc.set_processed(uow.repos.parsed_character, parsed_character_id)
                logger.info(f"Successfully processed ParsedCharacter ID {parsed_character_id}: {character.title}")

            # Step 8: If any error occurs, mark parsed character as with_errors
            except EntityNotFoundError as e:
                logger.error(f"Entity parsed_character with ID {parsed_character_id} not found")
                await self._handle_error(parsed_character_id)
            except DuplicateEntityError as e:
                logger.error(f"Duplicate entity error for character ID {parsed_character_id}: {e}")
                await self._handle_error(parsed_character_id)
            except Exception as e:
                logger.exception(f"Error processing character ID {parsed_character_id}: {e}")
                await self._handle_error(parsed_character_id)

    async def _handle_error(self, parsed_character_id: UUID):
        async with self.uow_factory.create() as uow:
            await self.processing_states_svc.set_with_errors(uow.repos.parsed_character, parsed_character_id)

