from typing import Optional
import logging

from monstrino_models.dto import Pet
from monstrino_models.dto import ParsedPet
from monstrino_models.exceptions.db import EntityNotFound, DBConnectionError
from monstrino_models.exceptions.post_parser_processing.exceptions import SavingParsedRecordWithErrors
from monstrino_models.orm import PetsORM
from sqlalchemy import select

from application.repositories.destination.pets_repository import PetsRepository
from infrastructure.db.base import async_session_factory


logger = logging.getLogger(__name__)


class PetsRepositoryImpl(PetsRepository):
    async def save_unprocessed_pet(self, pets: ParsedPet):
        try:
            async with async_session_factory() as session:
                pet_orm = PetsORM(
                    name=pets.name,
                    display_name=pets.display_name,
                    description=pets.description,
                    owner_id=pets.owner_id,
                    primary_image=pets.primary_image
                )
                session.add(pet_orm)
                await session.commit()
                await session.refresh(pet_orm)
                return self._refactor_orm_to_entity(pet_orm)
        except Exception as e:
            raise SavingParsedRecordWithErrors(f"Error saving pet {pets.name}: {e}") from e

    async def remove_unprocessed_pet(self, pet_id: int):
        async with async_session_factory() as session:
            try:
                query = select(PetsORM).where(PetsORM.id == pet_id)
                result = await session.execute(query)
                pet_orm = result.scalar_one_or_none()

                if not pet_orm:
                    logger.error(f"Pet with id {pet_id} not found in DB")
                    raise EntityNotFound(f"Pet with id {pet_id} not found")

                await session.delete(pet_orm)
                await session.commit()

            except EntityNotFound:
                raise
            except Exception as e:
                logger.error(f"Error deleting pet {pet_id}: {e}")
                raise DBConnectionError(f"Failed to delete pet {pet_id}")

    @staticmethod
    def _refactor_orm_to_entity(data: PetsORM) -> Pet:
        return Pet(
            id=data.id,
            name=data.name,
            display_name=data.display_name,
            description=data.description,
            owner_id=data.owner_id,
            primary_image=data.primary_image
        )