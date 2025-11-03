import logging
from monstrino_models.dto import ParsedImage
from monstrino_models.dto import ParsedCharacter
from monstrino_models.exceptions import EntityNotFound, DBConnectionError
from monstrino_models.exceptions import GenderNotExistError

from application.repositories import (
    ParsedCharactersRepo, CharactersRepo, ParsedImagesRepo, CharacterGendersRepo, \
    ImageReferenceOriginRepo
)
from domain.formatters.name_formatter import NameFormatter

logger = logging.getLogger(__name__)


class ProcessCharactersUseCase:
    def __init__(self,
                 parsed_characters_repo: ParsedCharactersRepo,
                 characters_repo: CharactersRepo,
                 characters_genders_repo: CharacterGendersRepo,
                 parsed_images_repo: ParsedImagesRepo,
                 image_reference_origin_repo: ImageReferenceOriginRepo
                 ):
        self.parsed_characters_repo = parsed_characters_repo
        self.characters_repo = characters_repo
        self.characters_genders_repo = characters_genders_repo
        self.parsed_images_repo = parsed_images_repo
        self.image_reference_origin_repo = image_reference_origin_repo

    async def execute(self):
        try:
            unprocessed_characters = await self._get_unprocessed_characters(150)
        except Exception as e:
            logger.error(f"Unexpected error during fetching unprocessed characters: {e}")
            return

        if not unprocessed_characters:
            logger.info(f"No unprocessed characters found")

        for unprocessed_character in unprocessed_characters:
            logger.info(f"Processing character {unprocessed_character.name} (ID: {unprocessed_character.id})")
            try:
                # ------------- Set gender id from name -----------------
                logger.info(f"Setting gender id for character {unprocessed_character.name} (ID: {unprocessed_character.id})")
                await self._set_gender_id(character=unprocessed_character)

                logger.info(f"Processing name for character {unprocessed_character.name} (ID: {unprocessed_character.id})")
                await self._process_name(unprocessed_character)


                # ------------- Save unprocessed character -----------------
                logger.info(f"Saving character {unprocessed_character.name} (ID: {unprocessed_character.id})")
                character = await self.characters_repo.save_unprocessed_character(unprocessed_character)
                logger.info(f"Character {unprocessed_character.name} saved (ID: {unprocessed_character.id})")
                try:

                    # ------------- Set image to processing -----------------
                    logger.info(f"Setting image to process for character {unprocessed_character.id}")
                    await self._set_image_to_process(character)
                    logger.info(f"Image set to process for character {unprocessed_character.id}")

                    # ------------- Set process_state to processed-----------------
                    logger.info(f"Settings parsed character {unprocessed_character.name} as processed")
                    await self.parsed_characters_repo.set_character_as_processed(unprocessed_character.id)
                    logger.info(f"Character {unprocessed_character.name} marked as processed")

                except Exception as e:
                    logger.error(f"Error by processing {unprocessed_character.id}: {e}")
                    logger.error(f"Removing saved character {unprocessed_character.id} due to image processing error")
                    await self.characters_repo.remove_unprocessed_character(character.id)
                    logger.error(f"Settings parsed character {unprocessed_character.name} as processed with errors")
                    await self.parsed_characters_repo.set_character_as_processed_with_errors(unprocessed_character.id)

            except GenderNotExistError as e:
                logger.error(e)
            except Exception as e:
                logger.error(f"Error saving character {unprocessed_character.id}: {e}")
                logger.error(f"Settings parsed character {unprocessed_character.name} as processed with errors")
                await self.parsed_characters_repo.set_character_as_processed_with_errors(unprocessed_character.id)

        return

    async def _get_unprocessed_characters(self, count: int) -> list[ParsedCharacter] | None:
        try:
            unprocessed_characters = await self.parsed_characters_repo.get_unprocessed_characters(count)
            return unprocessed_characters
        except EntityNotFound:
            raise
        except DBConnectionError:
            raise
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

    @staticmethod
    async def _process_name(character: ParsedCharacter):
        character.display_name = character.name
        character.name = NameFormatter.format_name(character.name)
