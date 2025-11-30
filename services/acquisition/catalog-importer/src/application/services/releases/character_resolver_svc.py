from typing import Any
import logging
from icecream import ic
from monstrino_core.domain.errors import CharacterDataInvalidError
from monstrino_core.domain.services import NameFormatter
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_models.dto import ParsedRelease, ReleaseCharacterLink
from monstrino_core.domain.value_objects import CharacterRoleType
from monstrino_testing.fixtures import Repositories

logger = logging.getLogger(__name__)


class CharacterResolverService:
    async def resolve(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: int,
            characters: list # ["Clawdeen Wolf", "Cleo de Nile", "Draculaura", "Frankie Stein", "Toralei Stripe", "Deuce Gorgon"]

    ) -> None:
        if characters:
            main_role_id = await uow.repos.character_role.get_id_by(name=CharacterRoleType.MAIN)
            secondary_role_id = await uow.repos.character_role.get_id_by(name=CharacterRoleType.SECONDARY)























    # if characters:
        #     main_role_id = await uow.repos.character_role.get_id_by(name=CharacterRoleType.MAIN)
        #     secondary_role_id = await uow.repos.character_role.get_id_by(name=CharacterRoleType.SECONDARY)
        #
        #     character_count = 0
        #     for character_name in characters:
        #         formatted_name = NameFormatter.format_name(character_name)
        #         character_id = await uow.repos.character.get_id_by(name=formatted_name)
        #         if character_id:
        #             if await uow.repos.release_character_link.exists_by(
        #                     release_id=release_id,
        #                     character_id=character_id
        #             ):
        #                 logger.error(f"Character link already exists for release_id={release_id} and character_id={character_id}. Skipping")
        #                 continue
        #
        #             character_count += 1
        #             if character_count == 1:
        #                 role_id = main_role_id
        #             else:
        #                 role_id = secondary_role_id
        #             await uow.repos.release_character_link.save(
        #                 ReleaseCharacterLink(
        #                     release_id=release_id,
        #                     character_id=character_id,
        #                     role_id=role_id,
        #                     position=character_count,
        #                 )
        #             )
        #         else:
        #             # TODO: нужно добавить логику добавления персонажа в бд если его нет
        #             logger.error(
        #                 f"Character found in parsed data, but not found in character db: {character_name}"
        #             )
        #
