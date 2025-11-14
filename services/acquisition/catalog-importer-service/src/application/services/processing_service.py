from app.dependencies.container_components.repositories import Repositories
from application.use_cases.processing.process_characters_use_case import ProcessCharactersUseCase
from application.use_cases.processing.process_pets_use_case import ProcessPetsUseCase
from application.use_cases.processing.process_release_use_case import ProcessReleasesUseCase
from application.use_cases.processing.process_series_use_case import ProcessSeriesUseCase


class ProcessingService:
    def __init__(self, repositories: Repositories):
        self.repositories = repositories
        self.process_characters_uc = ProcessCharactersUseCase(
            parsed_character_repo=repositories.parsed_character,
            characters_repo=repositories.characters,
            characters_genders_repo=repositories.character_gender,
            parsed_images_repo=repositories.parsed_images,
            image_reference_origin_repo=repositories.image_reference_origin
        )
        self.process_series_uc = ProcessSeriesUseCase(
            parsed_series_repo=repositories.parsed_series,
            release_series_repo=repositories.release_series,
            parsed_images_repo=repositories.parsed_images,
            image_reference_origin_repo=repositories.image_reference_origin
        )
        self.process_pets_uc = ProcessPetsUseCase(
            parsed_pet_repo=repositories.parsed_pet,
            pets_repo=repositories.pets,
            parsed_images_repo=repositories.parsed_images,
            image_reference_origin_repo=repositories.image_reference_origin,
            characters_repo=repositories.characters
        )
        self.process_release_uc = ProcessReleasesUseCase(
            parsed_release_repo=repositories.parsed_release,
            characters_repo=repositories.characters,
            pets_repo=repositories.pets,
            character_role_repo=repositories.character_role,
            release_character_link_repo=repositories.release_character_link,
            release_pet_link_repo=repositories.release_pet_link,
            relation_type_repo=repositories.relation_type,
            release_relation_link_repo=repositories.release_relation_link,
            exclusive_vendor_repo=repositories.exclusive_vendor,
            release_type_repo=repositories.release_type,

            release_repo=repositories.release,
            release_series_repo=repositories.release_series,
            parsed_images_repo=repositories.parsed_images,
            image_reference_origin_repo=repositories.image_reference_origin
        )

    async def process_characters(self):
        await self.process_characters_uc.execute()

    async def process_series(self):
        await self.process_series_uc.execute()

    async def process_pets(self):
        await self.process_pets_uc.execute()

    async def process_release(self):
        await self.process_release_uc.execute()
