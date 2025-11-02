from typing import Optional
import logging

from monstrino_models.dto import Character, ParsedCharacter
from monstrino_models.exceptions import SavingParsedRecordWithErrors
from monstrino_models.exceptions import EntityNotFound, DBConnectionError
from monstrino_models.orm import CharactersORM
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from infrastructure.db.base import async_session_factory
from application.repositories.destination.reference.characters_repository import CharactersRepository

logger = logging.getLogger(__name__)

class CharactersRepositoryImpl(CharactersRepository):
    async def save_unprocessed_character(self, character: ParsedCharacter):
        try:
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
        except IntegrityError as e:
            raise SavingParsedRecordWithErrors(F"Character with name {character.name} already exists")

        except Exception as e:
            raise SavingParsedRecordWithErrors(f"Error saving Character {character.name}: {e}") from e


    async def get_id_by_display_name(self, name: str) -> Optional[int]:
        async with async_session_factory() as session:
            try:
                query = select(CharactersORM.id).where(CharactersORM.display_name == name)
                result = await session.execute(query)
                if result:
                    character_id = result.scalars().first()
                    if not character_id:
                        raise EntityNotFound(f"Original characters {name} not found")

                    return character_id

            except EntityNotFound:
                raise
            except Exception as e:
                    raise DBConnectionError(f"Error by getting id from character {name}: {e}")

    async def get_id_by_name(self, name: str) -> Optional[int]:
        async with async_session_factory() as session:
            try:
                query = select(CharactersORM.id).where(CharactersORM.name == name)
                result = await session.execute(query)
                if result:
                    character_id = result.scalars().first()
                    if not character_id:
                        raise EntityNotFound(f"Original characters {name} not found")

                    return character_id

            except EntityNotFound:
                raise
            except Exception as e:
                    raise DBConnectionError(f"Error by getting id from character {name}: {e}")

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