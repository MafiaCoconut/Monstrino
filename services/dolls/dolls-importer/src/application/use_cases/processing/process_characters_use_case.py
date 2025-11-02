import logging
from icecream import ic
from monstrino_models.dto import ParsedImage
from monstrino_models.dto import ParsedCharacter
from monstrino_models.exceptions.db import EntityNotFound, DBConnectionError
from monstrino_models.exceptions.post_parser_processing.exceptions import GenderNotExistError

from application.repositories.destination.parsed_images_repo import ParsedImagesRepository
from application.repositories.destination.reference.character_genders_repository import CharacterGendersRepository
from application.repositories.destination.reference.image_reference_origin_repository import \
    ImageReferenceOriginRepository
from application.repositories.destination.reference.characters_repository import CharactersRepository
from application.repositories.source.parsed_characters_repository import ParsedCharactersRepository

logger = logging.getLogger(__name__)


class ProcessCharactersUseCase:
    def __init__(self,
                 parsed_characters_repo: ParsedCharactersRepository,
                 characters_repo: CharactersRepository,
                 characters_genders_repo: CharacterGendersRepository,
                 parsed_images_repo: ParsedImagesRepository,
                 image_reference_origin_repo: ImageReferenceOriginRepository
                 ):
        self.parsed_characters_repo = parsed_characters_repo
        self.characters_repo = characters_repo
        self.characters_genders_repo = characters_genders_repo
        self.parsed_images_repo = parsed_images_repo
        self.image_reference_origin_repo = image_reference_origin_repo

    async def execute(self):

        unprocessed_characters = await self._get_unprocessed_characters(1)

        if not unprocessed_characters:
            return None

        for unprocessed_character in unprocessed_characters:
            logger.info(f"Processing character {unprocessed_character.display_name} (ID: {unprocessed_character.id})")
            try:
                await self._set_gender_id(character=unprocessed_character)
                logger.info(f"Saving character {unprocessed_character.display_name} (ID: {unprocessed_character.id})")
                character = await self.characters_repo.save_unprocessed_character(unprocessed_character)
                logger.info(f"Character {unprocessed_character.display_name} saved (ID: {unprocessed_character.id})")
                try:
                    logger.info(f"Setting image to process for character {unprocessed_character.id}")
                    await self._set_image_to_process(character)
                    logger.info(f"Image set to process for character {unprocessed_character.id}")

                    logger.info(f"Settings parsed character {unprocessed_character.display_name} as processed")
                    await self.parsed_characters_repo.set_character_as_processed(unprocessed_character.id)
                    logger.info(f"Character {unprocessed_character.display_name} marked as processed")

                except Exception as e:
                    logger.error(f"Error by processing {unprocessed_character.id}: {e}")
                    logger.error(f"Removing saved character {unprocessed_character.id} due to image processing error")
                    await self.characters_repo.remove_unprocessed_character(character.id)
                    logger.error(f"Settings parsed character {unprocessed_character.display_name} as processed with errors")
                    await self.parsed_characters_repo.set_character_as_processed_with_errors(unprocessed_character.id)

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



    async def _set_image_to_process(self, character: ParsedCharacter):
        try:
            origin_reference_id = await self.image_reference_origin_repo.get_id_by_table_and_column(table="characters", column="primary_image")
        except EntityNotFound:
            raise
        except Exception as e:
            logger.error(f"Unexpected error during getting image reference origin id: {e}")
            raise

        if origin_reference_id:
            if character.primary_image:
                await self.parsed_images_repo.set(
                    ParsedImage(
                        original_link=character.primary_image,
                        origin_reference_id=origin_reference_id,
                        origin_record_id=character.id
                    )
                )


