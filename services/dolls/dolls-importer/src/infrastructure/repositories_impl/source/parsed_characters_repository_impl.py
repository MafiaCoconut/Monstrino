import logging
from monstrino_models.dto.parsed_character import ParsedCharacter
from monstrino_models.exceptions.db import DBConnectionError, EntityNotFound
from monstrino_models.orm.parsed_characters_orm import ParsedCharactersORM
from sqlalchemy import select, update, or_

from application.repositories.source.parsed_characters_repository import ParsedCharactersRepository
from infrastructure.db.base import async_session_factory

logger = logging.getLogger(__name__)

class ParsedCharactersRepositoryImpl(ParsedCharactersRepository):
    async def save(self, data):
        async with async_session_factory() as session:
            character_orm = self._format_pydantic_to_orm(data)
            session.add(character_orm)
            await session.commit()

    async def get_unprocessed_characters(self, count: int = 10) -> list[ParsedCharacter] | None:
        async with async_session_factory() as session:
            query = select(ParsedCharactersORM).where(ParsedCharactersORM.process_state=='init').limit(count)
            result = await session.execute(query)
            if result:
                characters_orms = result.scalars().all()
                if characters_orms:
                    return [self._format_orm_to_pydantic(orm) for orm in characters_orms]
                else:
                    logger.error(f"Unprocessed characters were not found")
                    raise EntityNotFound(f"Unprocessed characters were not found")

            else:
                logger.error(f"Error by unprocessed characters from DB")
                raise DBConnectionError(f"Error by unprocessed characters from DB")

    async def set_character_as_processed(self, character_id: int):
        async with async_session_factory() as session:
            try:
                query = select(ParsedCharactersORM).where(ParsedCharactersORM.id == character_id)
                result = await session.execute(query)
                character_orm = result.scalar_one_or_none()

                if not character_orm:
                    logger.error(f"Character with id {character_id} not found in DB")
                    raise EntityNotFound(f"Character with id {character_id} not found")

                character_orm.process_state = "processed"

                await session.commit()

            except EntityNotFound:
                raise
            except Exception as e:
                logger.error(f"Error updating process_state for character {character_id}: {e}")
                raise DBConnectionError(f"Failed to update character {character_id}")


    @staticmethod
    def _format_orm_to_pydantic(data: ParsedCharactersORM):
        return ParsedCharacter(
            id=data.id,
            name=data.name,
            display_name=data.display_name,
            gender=data.gender,
            description=data.description,
            primary_image=data.primary_image,
            link=data.link,
            process_state=data.process_state,
            # original_html_content=data.original_html_content,
        )

    @staticmethod
    def _format_pydantic_to_orm(dto):
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
