from monstrino_models.orm.parsed_pets import ParsedPetsORM

from application.repositories.source.parsed_pets_repository import ParsedPetsRepository
from infrastructure.db.base import async_session_factory


class ParsedPetsRepositoryImpl(ParsedPetsRepository):
    async def save(self, data):
        async with async_session_factory() as session:
            character_orm = self._format_pydantic_to_orm(data)
            session.add(character_orm)
            await session.commit()
            # await session.refresh(character_orm)
            # return self._format_orm_to_pydantic(character_orm)


    @staticmethod
    def _format_pydantic_to_orm(dto):
        return ParsedPetsORM(
            name=dto.name,
            display_name=dto.display_name,
            owner_name=dto.owner_name,
            description=dto.description,
            primary_image=dto.primary_image,
            link=dto.link,
            process_state="init",
            original_html_content=dto.original_html_content,
        )
