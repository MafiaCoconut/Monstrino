import logging
from icecream import ic
from monstrino_models.dto.parsed_character import ParsedCharacter
from monstrino_models.exceptions.db import EntityNotFound, DBConnectionError
from monstrino_models.exceptions.post_parser_processing.exceptions import GenderNotExistError

# from application.repositories.destination.reference.character_genders_repository import CharacterGendersRepository
# from application.repositories.destination.reference.original_characters_repository import CharactersRepository
# from application.repositories.source.parsed_characters_repository import ParsedCharactersRepository

logger = logging.getLogger(__name__)


class ProcessCharactersUseCase:
    def __init__(self,
                 parsed_characters_repo,
                 characters_repo,
                 characters_genders_repo,
                 ):
        self.parsed_characters_repo = parsed_characters_repo
        self.characters_repo = characters_repo
        self.characters_genders_repo = characters_genders_repo

    async def execute(self):

        unprocessed_characters = await self._get_unprocessed_characters(1)

        if not unprocessed_characters:
            return None

        for unprocessed_character in unprocessed_characters:
            try:
                await self._set_gender_id(character=unprocessed_character)
                await self.characters_repo.save_unprocessed_character(unprocessed_character)
                await self.parsed_characters_repo.set_character_as_processed(unprocessed_character.id)
                logger.info(f"Character {unprocessed_character.display_name} marked as processed")
            except GenderNotExistError as e:
                logger.error(e)
            except Exception as e:
                logger.error(f"Error saving character {unprocessed_character.id}: {e}")

        return None

    async def _get_unprocessed_characters(self, count: int) -> list[ParsedCharacter] | None:
        try:
            unprocessed_characters = await self.parsed_characters_repo.get_unprocessed_characters(count)
            return unprocessed_characters
        except EntityNotFound:
            ...
        except DBConnectionError:
            ...
        except Exception as e:
            logger.error(f"Unexpected error during processing characters: {e}")

        return None

    async def _set_gender_id(self, character: ParsedCharacter):
        gender_id = await self.characters_genders_repo.get_id_by_name(character.gender)
        if gender_id:
            character.gender_id = gender_id
        else:
            raise GenderNotExistError(f"Unknown gender id {character.gender}")
