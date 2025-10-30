from typing import Optional
import logging

from sqlalchemy import select

from domain.entities.dolls.original_character import OriginalCharacter
from domain.exceptions.db import DBConnectionError, EntityNotFound
from infrastructure.db.base import async_session_factory
from application.repositories.destination.reference.original_characters_repository import OriginalCharactersRepository
from infrastructure.db.models.characters_orm import CharactersORM

logger = logging.getLogger(__name__)

class OriginalCharactersRepositoryImpl(OriginalCharactersRepository):

    async def get_all(self):
        async with async_session_factory() as session:
            query = select(CharactersORM)
            result = await session.execute(query)
            if result:
                original_characters_orms = result.scalars().all()
                if original_characters_orms:
                    return [self._refactor_orm_to_entity(original_character_orm=original_character_orm) for original_character_orm in original_characters_orms]
                else:
                    raise EntityNotFound("No original characters found")
            else:
                logger.error(f"Error by getting original characters from DB")
                raise DBConnectionError(f"Error by getting original characters from DB")

    async def add(self, name: str, description: str, alt_names: Optional[list] = None, notes: Optional[str] = None):
        async with async_session_factory() as session:
            character_orm = CharactersORM(name=name, description=description, alt_names=alt_names, notes=notes)
            session.add(character_orm)
            await session.commit()


    async def get(self, character_id: int):
        async with async_session_factory() as session:
            query = select(CharactersORM).where(CharactersORM.id == character_id)
            result = await session.execute(query)
            if result:
                original_character_orm = result.scalars().first()
                if original_character_orm:
                    return self._refactor_orm_to_entity(original_character_orm=original_character_orm)
                else:
                    logger.error(f"Original characters {character_id} was not found")
                    raise EntityNotFound(f"Original characters {character_id} not found")
            else:
                logger.error(f"Error by getting Original characters {character_id} from DB")
                raise DBConnectionError(f"Original characters {character_id} was not found")

    async def get_by_name(self, name: str):
        async with async_session_factory() as session:
            query = select(CharactersORM).where(CharactersORM.name == name)
            result = await session.execute(query)
            if result:
                original_character_orm = result.scalars().first()
                if original_character_orm:
                    return self._refactor_orm_to_entity(original_character_orm=original_character_orm)
                else:
                    logger.error(f"Original characters {name} was not found")
                    raise EntityNotFound(f"Original characters {name} not found")
            else:
                logger.error(f"Error by getting Original characters {name} from DB")
                raise DBConnectionError(f"Original characters {name} was not found")

    @staticmethod
    def _refactor_orm_to_entity(original_character_orm: CharactersORM):
        return OriginalCharacter(
            id=original_character_orm.id,
            name=original_character_orm.name,
            display_name=original_character_orm.display_name,
            description=original_character_orm.description,
            alt_names=original_character_orm.alt_names,
            notes=original_character_orm.notes,
            updated_at=original_character_orm.updated_at.isoformat(),
            created_at=original_character_orm.created_at.isoformat(),
        )