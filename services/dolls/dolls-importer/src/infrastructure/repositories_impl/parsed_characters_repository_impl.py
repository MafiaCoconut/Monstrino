from application.repositories.source.parsed_characters_repository import ParsedCharactersRepository
from domain.entities.parsed_character_dto import ParsedCharacterDTO
from infrastructure.db.base import async_session_factory
from infrastructure.db.models.parsed_characters import ParsedCharactersORM


class ParsedCharactersRepositoryImpl(ParsedCharactersRepository):
    async def save(self, data: ParsedCharacterDTO):
        async with async_session_factory() as session:
            character_orm = self._format_pydantic_to_orm(data)
            session.add(character_orm)
            await session.commit()
            # await session.refresh(character_orm)
            # return self._format_orm_to_pydantic(character_orm)


    @staticmethod
    def _format_pydantic_to_orm(dto: ParsedCharacterDTO):
        return ParsedCharactersORM(
            name=dto.name,
            display_name=dto.display_name,
            gender=dto.gender,
            description=dto.description,
            primary_image=dto.primary_image,
            link=dto.link,
            process_state="init",
            original_html_content=dto.original_html_content,
        )
