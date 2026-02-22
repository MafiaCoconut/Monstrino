from typing import Any, Optional
import logging
from icecream import ic
from uuid import UUID
from monstrino_api.interface.lllm_gateway_interface import LLMGatewayInterface
from monstrino_core.domain.errors import CharacterDataInvalidError, DuplicateEntityError, ReleaseCharacterIsNotExist, EntityNotFoundError
from monstrino_core.domain.services import TitleFormatter, TitleFormatter
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_models.dto import ReleaseCharacter, Character, CharacterRole, Pet
from monstrino_core.domain.value_objects import CharacterRoleType
from monstrino_testing.fixtures import Repositories

logger = logging.getLogger(__name__)


class CharacterResolverService:
    """
    1. Chech if character list is not empty
    2. Get main and secondary role ids
    3. Iterate over every character
    4. Format character name
    5. Get character id by formatted name
    6. If character id exists, save ReleaseCharacter


    """

    async def resolve(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: UUID,
            # ["Clawdeen Wolf", "Cleo de Nile", "Draculaura", "Frankie Stein", "Toralei Stripe", "Deuce Gorgon"]
            characters: list

    ) -> None:

        if characters:
            main_role_id = await uow.repos.character_role.get_id_by(**{CharacterRole.CODE: CharacterRoleType.MAIN})
            secondary_role_id = await uow.repos.character_role.get_id_by(**{CharacterRole.CODE: CharacterRoleType.SECONDARY})

            character_count = 0

            for character_title in characters:
                character_code = TitleFormatter.to_code(character_title)
                character_id = await uow.repos.character.get_id_by(**{Character.CODE: character_code})
                
                if not character_id:
                    pet_id = await self.check_is_character_pet(uow, character_code)
                    if pet_id:
                        logger.warning(f"Character with code '{character_code}' not found in Character DB, but found in Pet DB with id {pet_id}. Skipping.")
                        return
                    
                    character_specific_id = await self.check_is_character_code_has_gender_prefix(uow, character_code)
                    if not character_specific_id:
                        logger.error(f"Character with code '{character_code}' not found in Character DB with gender prefix")
                        return
                        
                    logger.warning(f"Character with code '{character_code}' found in Character DB with gender prefix")
                    character_id = character_specific_id
                
                if character_id:
                    character_count += 1
                    if character_count == 1:
                        role_id = main_role_id
                    else:
                        role_id = secondary_role_id
                    
                    release_character = ReleaseCharacter(
                        release_id=release_id,
                        character_id=character_id,
                        role_id=role_id,
                        position=character_count,
                        is_uniq_to_release=True if len(
                            characters) == 1 else False,
                    )
                    ic(release_character)
                    try:
                        await uow.repos.release_character.save(release_character)
                    except DuplicateEntityError as e:
                        logger.warning(f"ReleaseCharacter already exists for release_id={release_id} and character_id={character_id}. Skipping. Details: {e}")
                    except ReleaseCharacterIsNotExist as e:
                        logger.warning(f"ReleaseCharacter does not exist for release_id={release_id} and character_id={character_id}")
                else:
                    # TODO: нужно добавить логику добавления персонажа в бд если его нет
                    logger.error(f"Character found in parsed data, but not found in character db: {character_title}")
    
    async def check_is_character_pet(self, uow: UnitOfWorkInterface[Any, Repositories], character_code: str):
        pet_id = await uow.repos.pet.get_id_by(**{Pet.CODE: character_code})
        
        return pet_id
        
    async def check_is_character_code_has_gender_prefix(self, uow: UnitOfWorkInterface[Any, Repositories], character_code: str) -> Optional[UUID]:
        character_g_id = await uow.repos.character.get_id_by(**{Character.CODE: f"g-{character_code}"})
        if character_g_id:
            return character_g_id
        
        character_m_id = await uow.repos.character.get_id_by(**{Character.CODE: f"m-{character_code}"})
        if character_m_id:
            return character_m_id
        
        logger.error(f"Character {character_code} not found in Character DB with gender prefix")
        return None