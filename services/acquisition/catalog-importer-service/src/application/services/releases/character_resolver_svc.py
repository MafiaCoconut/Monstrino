from typing import Any
import logging
from icecream import ic
from monstrino_core import NameFormatter, UnitOfWorkInterface, CharacterRole, CharacterParsedButNotFoundError
from monstrino_models.dto import ParsedRelease, ReleaseCharacterLink
from monstrino_testing.fixtures import Repositories

logger = logging.getLogger(__name__)


class CharacterResolverService:
    async def resolve(
            self,
            uow: UnitOfWorkInterface[Any, Repositories],
            release_id: int,
            characters: list

    ) -> None:
        character_count = 0
        for character in characters:
            character_name = character.get('text', None)
            if character_name:
                formatted_name = NameFormatter.format_name(character_name)
                character_id = await uow.repos.character.get_id_by(name=formatted_name)
                if character_id:
                    character_count += 1
                    if character_count == 1:
                        role_name = CharacterRole.MAIN
                    else:
                        role_name = CharacterRole.SECONDARY
                    link = ReleaseCharacterLink(
                        release_id=release_id,
                        character_id=character_id,
                        role_id=await uow.repos.character_role.get_id_by(name=role_name),
                        position=character_count,
                    )
                    await uow.repos.release_character_link.save(link)
            else:
                # TODO: нужно добавить логику добавления персонажа в бд если его нет
                logger.error(
                    f"Character exist in parsed release "
                    f"but not found in character db: {character.get('text')}"
                )
                # raise CharacterParsedButNotFoundError

