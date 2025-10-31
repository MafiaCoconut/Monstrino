from app.dependencies.container_components.repositories import Repositories
from application.use_cases.processing.process_characters_use_case import ProcessCharactersUseCase


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

    async def process_characters(self):
        await self.process_characters_uc.execute()