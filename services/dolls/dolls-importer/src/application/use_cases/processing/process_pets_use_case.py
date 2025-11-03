import logging
from monstrino_models.dto import ParsedImage, Pet
from monstrino_models.dto import ParsedPet

from monstrino_models.exceptions import EntityNotFound, DBConnectionError, EntityAlreadyExists

from application.repositories import (
    ImageReferenceOriginRepo, ParsedImagesRepo, ParsedPetsRepo, PetsRepo, \
    CharactersRepo
)
from domain.formatters.name_formatter import NameFormatter

logger = logging.getLogger(__name__)


class ProcessPetsUseCase:
    def __init__(self,
                 parsed_pets_repo: ParsedPetsRepo,
                 pets_repo: PetsRepo,
                 parsed_images_repo: ParsedImagesRepo,
                 image_reference_origin_repo: ImageReferenceOriginRepo,
                 characters_repo: CharactersRepo,
                 ):
        self.parsed_pets_repo = parsed_pets_repo
        self.pets_repo = pets_repo
        self.parsed_images_repo = parsed_images_repo
        self.image_reference_origin_repo = image_reference_origin_repo
        self.characters_repo = characters_repo



    async def execute(self):
        try:
            unprocessed_pets = await self._get_unprocessed_pets(2)
        except Exception as e:
            logger.error(f"Unexpected error during fetching unprocessed pets: {e}")
            return

        if not unprocessed_pets:
            return

        logger.info(f"============== Starting processing of {len(unprocessed_pets)} pets ==============")
        for i, unprocessed_pet in enumerate(unprocessed_pets):
            logger.info(f"Processing pet {unprocessed_pet.name} (ID: {unprocessed_pet.id})")

            try:
                await self._process_name(unprocessed_pet)

                await self._process_owner(unprocessed_pet)

                pet = await self._save_pet(unprocessed_pet)

                try:
                    await self._set_image_to_process(unprocessed_pet)

                    await self.set_pet_as_processed(unprocessed_pet)

                except Exception as e:
                    logger.error(f"Error processing pet {unprocessed_pet.name} (ID: {unprocessed_pet.id}): {e}")
                    await self.set_pet_as_processed_with_errors(unprocessed_pet)

                    if pet:
                        logger.error(f"Removing saved pet {pet.id} due some error")
                        await self.pets_repo.remove_unprocessed_pet_by_id(pet.id)

            except EntityAlreadyExists as e:
                logger.error(f"Pet {unprocessed_pet.name} (ID: {unprocessed_pet.id}) already exists: {e}")
                await self.set_pet_as_already_exists(unprocessed_pet)
            except Exception as e:
                logger.error(f"Unexpected error during processing pet {unprocessed_pet.name} (ID: {unprocessed_pet.id}): {e}")
                await self.set_pet_as_processed_with_errors(unprocessed_pet)
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



    @staticmethod
    async def _process_name(pet: ParsedPet):
        logger.debug(f"Processing pets name {pet.name} (ID: {pet.id})")
        pet.display_name = pet.name
        pet.name = NameFormatter.format_name(pet.name)

    async def _process_owner(self, pet: ParsedPet):
        logger.debug(f"Setting pets owner ID {pet.name} (ID: {pet.id})")
        try:
            owner_id = await self.characters_repo.get_id_by_name(NameFormatter.format_name(pet.owner_name))
            pet.owner_id = owner_id
        except Exception as e:
            logger.error(f"Owner of pet not found: {e}")

    async def _save_pet(self, pet: ParsedPet) -> Pet:
        logger.debug(f"Saving pet {pet.name} (ID: {pet.id})")
        return await self.pets_repo.save_unprocessed_pet(pet)

    async def _set_image_to_process(self, pet: ParsedPet):
        logger.debug(f"Setting image to process for pet {pet.id}")
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
            raise

    async def set_pet_as_already_exists(self, pet: ParsedPet):
        logger.debug(f"Setting parsed pet {pet.name} as 'already_exists'")
        await self.parsed_pets_repo.set_pet_as_already_exists(pet.id)

    async def set_pet_as_processed(self, pet: ParsedPet):
        logger.debug(f"Setting parsed pet {pet.name} as 'processed'")
        await self.parsed_pets_repo.set_pet_as_processed(pet.id)

    async def set_pet_as_processed_with_errors(self, pet: ParsedPet):
        logger.error(f"Setting parsed pet {pet.name} as 'processed_with_errors'")
        await self.parsed_pets_repo.set_pet_as_processed_with_errors(pet.id)