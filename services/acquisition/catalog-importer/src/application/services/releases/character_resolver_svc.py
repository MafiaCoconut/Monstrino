from typing import Any
import logging
from icecream import ic
from monstrino_api.interface.lllm_gateway_interface import LLMGatewayInterface
from monstrino_core.domain.errors import CharacterDataInvalidError
from monstrino_core.domain.services import NameFormatter
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_models.dto import ReleaseCharacter
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
            release_id: int,
            characters: list # ["Clawdeen Wolf", "Cleo de Nile", "Draculaura", "Frankie Stein", "Toralei Stripe", "Deuce Gorgon"]

    ) -> None:

        if characters:
            main_role_id = await uow.repos.character_role.get_id_by(name=CharacterRoleType.MAIN)
            secondary_role_id = await uow.repos.character_role.get_id_by(name=CharacterRoleType.SECONDARY)

            character_count = 0

            for character_name in characters:

                formatted_name = NameFormatter.format_name(character_name)
                character_id = await uow.repos.character.get_id_by(name=formatted_name)

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
                        name=formatted_name,
                        display_name=character_name,
                        is_uniq_to_release=True if len(characters) == 1 else False,
                    )
                    ic(release_character)
                    await uow.repos.release_character.save(release_character)
                else:
                    # TODO: нужно добавить логику добавления персонажа в бд если его нет
                    logger.error(
                        f"Character found in parsed data, but not found in character db: {character_name}"
                    )
