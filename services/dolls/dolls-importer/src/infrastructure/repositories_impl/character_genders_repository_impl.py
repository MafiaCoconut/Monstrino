import logging

from monstrino_models.exceptions.db import EntityNotFound, DBConnectionError
from monstrino_models.orm import CharacterGendersORM
from sqlalchemy import select

from application.repositories.destination.reference.character_genders_repository import CharacterGendersRepository
from infrastructure.db.base import async_session_factory

logger = logging.getLogger(__name__)

class CharacterGendersRepositoryImpl(CharacterGendersRepository):
    async def get_id_by_name(self, name: str) -> int | None:
        async with async_session_factory() as session:
            query = select(CharacterGendersORM.id).where(CharacterGendersORM.name == name)
            result = await session.execute(query)
            if result:
                gender_id = result.scalars().first()
                if gender_id:
                    return gender_id
                else:
                    logger.error(f"Gender with name {name} was not found")
                    raise EntityNotFound(f"Gender with name {name} not found")
            else:
                logger.error(f"Error by getting gender id by name '{name}' from DB")
                raise DBConnectionError(f"Error by getting gender id by name '{name}' from DB")

    @staticmethod
    def _refactor_orm_to_entity(character_gender_orm: CharacterGendersORM):
        ...


