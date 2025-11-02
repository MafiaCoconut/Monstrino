from typing import Optional
import logging

from monstrino_models.dto import Character, ParsedCharacter
from monstrino_models.exceptions.db import EntityNotFound, DBConnectionError
from monstrino_models.orm.characters_orm import CharactersORM
from sqlalchemy import select

from infrastructure.db.base import async_session_factory
from application.repositories.destination.reference.characters_repository import CharactersRepository

logger = logging.getLogger(__name__)

class CharactersRepositoryImpl(CharactersRepository):
    async def save_unprocessed_character(self, character: ParsedCharacter):
        async with async_session_factory() as session:
            character_orm = CharactersORM(
                name=character.name,
                display_name=character.display_name,
                gender_id=character.gender_id,
                description=character.description,
                primary_image=character.primary_image,
            )
            session.add(character_orm)
            await session.commit()
            await session.refresh(character_orm)
            return self._refactor_orm_to_entity(character_orm=character_orm)

    async def get_all(self):
        async with async_session_factory() as session:
            query = select(CharactersORM)
            result = await session.execute(query)
            if result:
                original_characters_orms = result.scalars().all()
                if original_characters_orms:
                    return [self._refactor_orm_to_entity(original_character_orm) for original_character_orm in original_characters_orms]
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
                    return self._refactor_orm_to_entity(original_character_orm)
                else:
                    logger.error(f"Original characters {character_id} was not found")
                    raise EntityNotFound(f"Original characters {character_id} not found")
            else:
                logger.error(f"Error by getting Original characters {character_id} from DB")
                raise DBConnectionError(f"Original characters {character_id} was not found")

    async def get_id_by_name(self, name: str) -> Optional[int]:
        async with async_session_factory() as session:
            try:
                query = select(CharactersORM.id).where(CharactersORM.name == name)
                result = await session.execute(query)
                if result:
                    character_id = result.scalars().first()
                    if not character_id:
                        logger.error(f"Original characters {name} was not found")
                        raise EntityNotFound(f"Original characters {name} not found")

                    return character_id

            except EntityNotFound:
                raise
            except Exception as e:
                    logger.error(f"Error by getting id from character {name}: {e}")
                    raise DBConnectionError(f"Error by getting id from character {name}")

    async def remove_unprocessed_character(self, character_id: int):
        async with async_session_factory() as session:
            try:
                query = select(CharactersORM).where(CharactersORM.id == character_id)
                result = await session.execute(query)
                character_orm = result.scalar_one_or_none()

                if not character_orm:
                    logger.error(f"Character with id {character_id} not found in DB")
                    raise EntityNotFound(f"Character with id {character_id} not found")

                await session.delete(character_orm)
                await session.commit()

            except EntityNotFound:
                raise
            except Exception as e:
                logger.error(f"Error deleting character {character_id}: {e}")
                raise DBConnectionError(f"Failed to delete character {character_id}")


    @staticmethod
    def _refactor_orm_to_entity(character_orm: CharactersORM):
        return Character(
            id=character_orm.id,
            name=character_orm.name,
            display_name=character_orm.display_name,
            gender_id=character_orm.gender_id,
            description=character_orm.description,
            primary_image=character_orm.primary_image,
            alt_names=character_orm.alt_names,
            notes=character_orm.notes,
            updated_at=character_orm.updated_at.isoformat(),
            created_at=character_orm.created_at.isoformat(),
        )