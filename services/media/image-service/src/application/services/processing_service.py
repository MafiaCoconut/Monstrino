from app.dependencies.container_components.repositories import Repositories
from application.use_cases.processing.process_characters_use_case import ProcessCharactersUseCase
from application.use_cases.processing.process_images_use_case import ProcessImagesUseCase


class ProcessingService:
    def __init__(self, repositories: Repositories):
        self.repositories = repositories

        self.process_images_uc = ProcessImagesUseCase(
            parsed_images_repo=repositories.parsed_images
        )

    async def process_images(self):
        await self.process_images_uc.execute()