import logging
from icecream import ic
from monstrino_models.dto import ParsedImage
from monstrino_models.dto import ParsedPet

from monstrino_models.exceptions.db import EntityNotFound, DBConnectionError
from monstrino_models.exceptions.post_parser_processing.exceptions import SavingParsedRecordWithErrors, \
    SettingProcessStateError

from application.repositories.destination.parsed_images_repo import ParsedImagesRepository
from application.repositories.destination.pets_repository import PetsRepository
from application.repositories.destination.reference.characters_repository import CharactersRepository
from application.repositories.destination.reference.image_reference_origin_repository import \
    ImageReferenceOriginRepository
from application.repositories.source.parsed_pets_repository import ParsedPetsRepository

logger = logging.getLogger(__name__)


class ProcessPetsUseCase:
    def __init__(self,
                 parsed_pets_repo: ParsedPetsRepository,
                 pets_repo: PetsRepository,
                 parsed_images_repo: ParsedImagesRepository,
                 image_reference_origin_repo: ImageReferenceOriginRepository,
                 characters_repo: CharactersRepository,
                 ):
        self.parsed_pets_repo = parsed_pets_repo
        self.pets_repo = pets_repo
        self.parsed_images_repo = parsed_images_repo
        self.image_reference_origin_repo = image_reference_origin_repo
        self.characters_repo = characters_repo



    async def execute(self):
        try:
            unprocessed_pets = await self._get_unprocessed_pets(1)
        except Exception as e:
            logger.error(f"Unexpected error during fetching unprocessed pets: {e}")
            return

        if not unprocessed_pets:
            return

        logger.info(f"============== Starting processing of {len(unprocessed_pets)} pets ==============")
        for i, unprocessed_pet in enumerate(unprocessed_pets):
            try:
                logger.info(f"Processing pet {unprocessed_pet.name} (ID: {unprocessed_pet.id})")
                try:
                    owner_id = await self.characters_repo.get_id_by_name(unprocessed_pet.owner_name)
                    unprocessed_pet.owner_id = owner_id
                except Exception as e:
                    logger.error(f"Owner of pet not found: {e}")

                try:
                    logger.info(f"Saving pet {unprocessed_pet.name} (ID: {unprocessed_pet.id})")
                    pet = await self.pets_repo.save_unprocessed_pet(unprocessed_pet)
                    logger.info(f"Pet {unprocessed_pet.name} saved (ID: {unprocessed_pet.id})")


                except Exception as e:
                    logger.error(f"Error by saving pet {unprocessed_pet.name} (ID: {unprocessed_pet.id}): {e}")
                    continue

                try:
                    ...
                    # logger.info(f"Setting image to process for pet {unprocessed_pet.id}")
                    # await self._set_image_to_process(pet)
                    # logger.info(f"Image set to process for pet {unprocessed_pet.id}")
                    #
                    #
                    # logger.info(f"Setting parsed pet {unprocessed_pet.name} as processed")
                    # await self.parsed_pets_repo.set_pet_as_processed(unprocessed_pet.id)
                    # logger.info(f"Pet {unprocessed_pet.name} marked as processed")
                except Exception as e:
                    logger.error(f"Error processing pet {unprocessed_pet.name} (ID: {unprocessed_pet.id}): {e}")
                    logger.error(f"Removing saved pet {unprocessed_pet.id} due some error")
                    await self.pets_repo.remove_unprocessed_pet(pet.id)
                    logger.info(f"Settings parsed pet {unprocessed_pet.name} as processed with errors")
                    await self.parsed_pets_repo.set_pet_as_processed_with_errors(unprocessed_pet.id)

            except Exception as e:
                logger.error(f"Unexpected error during processing pet {unprocessed_pet.name} (ID: {unprocessed_pet.id}): {e}")
        return

    async def _get_unprocessed_pets(self, count: int) -> list[ParsedPet] | None:
        try:
            return await self.parsed_pets_repo.get_unprocessed_pets(count)
        except EntityNotFound as e:
            logger.error(e)
        except DBConnectionError as e:
            logger.error(e)
        except Exception as e:
            logger.error(f"Unexpected error during processing characters: {e}")
        return None

    async def _set_image_to_process(self, pet: ParsedPet):
        try:
            origin_reference_id = await self.image_reference_origin_repo.get_id_by_table_and_column(table="pets", column="primary_image")
            if origin_reference_id:
                if pet.primary_image:
                    await self.parsed_images_repo.set(
                        ParsedImage(
                            original_link=pet.primary_image,
                            origin_reference_id=origin_reference_id,
                            origin_record_id=pet.id
                        )
                    )
        except EntityNotFound:
            raise
        except Exception as e:
            logger.error(f"Unexpected error during setting image reference origin: {e}")
            raise


