from application.repositories.dolls_series_repository import DollsSeriesRepository
from application.repositories.original_characters_repository import OriginalCharactersRepository


class ManageOriginalCharactersUseCase:
    def __init__(self, original_characters_repo: OriginalCharactersRepository):
        self.original_characters_repo = original_characters_repo

    async def add_original_character(self, doll_series_name: str, description: str):
        return await self.original_characters_repo.add(doll_series_name, description)

    async def get_original_character(self, doll_series_id: int):
        return await self.original_characters_repo.get(doll_series_id)

    async def get_original_characters(self):
        return await self.original_characters_repo.get_all()
