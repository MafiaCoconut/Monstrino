from charset_normalizer.cd import characters_popularity_compare
from monstrino_models.dto import ParsedCharacter
from monstrino_models.exceptions import SavingParsedRecordWithErrors
from monstrino_models.orm import ParsedCharactersORM
from sqlalchemy.exc import IntegrityError

from application.repositories.parsed_character_repository import ParsedCharactersRepository
from infrastructure.db.base import async_session_factory


class ParsedCharactersRepositoryImpl(ParsedCharactersRepository):
    async def save(self, data: ParsedCharacter):
        async with async_session_factory() as session:
            try:
                character_orm = self._format_pydantic_to_orm(data)
                session.add(character_orm)
                await session.commit()
                # await session.refresh(character_orm)
                # return self._format_orm_to_pydantic(character_orm)
            except IntegrityError as e:
                raise SavingParsedRecordWithErrors(
                    f"Character with name {data.name} already exists")
            except Exception as e:
                raise SavingParsedRecordWithErrors(
                    f"Error saving character {data.name}: {e}") from e

    @staticmethod
    def _format_pydantic_to_orm(dto: ParsedCharacter):
        return ParsedCharactersORM(
            name=dto.name,
            gender=dto.gender,
            description=dto.description,
            primary_image=dto.primary_image,
            link=dto.link,
            processing_state="init",
            source=dto.source,
            original_html_content=dto.original_html_content,
        )
