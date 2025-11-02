from app.dependencies.container_components.repositories import Repositories
from application.use_cases.processing.process_characters_use_case import ProcessCharactersUseCase
from application.use_cases.processing.process_pets_use_case import ProcessPetsUseCase
from application.use_cases.processing.process_series_use_case import ProcessSeriesUseCase


class ProcessingService:
    def __init__(self, repositories: Repositories):
        self.repositories = repositories
        self.process_characters_uc = ProcessCharactersUseCase(
            parsed_characters_repo=repositories.parsed_characters,
            characters_repo=repositories.characters,
            characters_genders_repo=repositories.character_genders,
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
            parsed_pets_repo=repositories.parsed_pets,
            pets_repo=repositories.pets,
            parsed_images_repo=repositories.parsed_images,
            image_reference_origin_repo=repositories.image_reference_origin,
            characters_repo=repositories.characters
        )

    async def process_characters(self):
        await self.process_characters_uc.execute()

    async def process_series(self):
        await self.process_series_uc.execute()

    async def process_pets(self):
        await self.process_pets_uc.execute()