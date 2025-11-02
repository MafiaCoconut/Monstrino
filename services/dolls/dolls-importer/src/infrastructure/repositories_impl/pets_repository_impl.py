from typing import Optional
import logging

from monstrino_models.dto import Pet
from monstrino_models.dto import ParsedPet
from monstrino_models.exceptions import EntityNotFound, DBConnectionError, EntityAlreadyExists
from monstrino_models.exceptions import SavingParsedRecordWithErrors
from monstrino_models.orm import PetsORM
from sqlalchemy import select, and_
from sqlalchemy.exc import IntegrityError

from application.repositories.destination.pets_repository import PetsRepository
from infrastructure.db.base import async_session_factory


logger = logging.getLogger(__name__)


class PetsRepositoryImpl(PetsRepository):
    async def save_unprocessed_pet(self, pet: ParsedPet) -> Pet:
        async with async_session_factory() as session:
            try:
                pet_orm = PetsORM(
                    name=pet.name,
                    display_name=pet.display_name,
                    description=pet.description,
                    owner_id=pet.owner_id,
                    primary_image=pet.primary_image
                )
                session.add(pet_orm)
                await session.commit()
                await session.refresh(pet_orm)
                return self._refactor_orm_to_entity(pet_orm)
            except IntegrityError as e:
                raise EntityAlreadyExists(F"Pet with name {pet.name} already exists")
            except Exception as e:
                raise SavingParsedRecordWithErrors(f"Error saving pet {pet.name}: {e}") from e

    async def remove_unprocessed_pet(self, pet: ParsedPet):
        async with async_session_factory() as session:
            try:
                query = select(PetsORM).where(
                    and_(PetsORM.name == pet.name, PetsORM.owner_id == pet.owner_id, PetsORM.display_name == pet.display_name
                ))
                result = await session.execute(query)
                pet_orm = result.scalar_one_or_none()

                if not pet_orm:
                    raise EntityNotFound(f"Pet with id {pet.name} not found")

                await session.delete(pet_orm)
                await session.commit()

            except EntityNotFound:
                raise
            except Exception as e:
                raise DBConnectionError(f"Failed to delete pet {pet.name}")

    async def remove_unprocessed_pet_by_id(self, pet_id: int):
        async with async_session_factory() as session:
            try:
                query = select(PetsORM).where(PetsORM.id == pet_id)
                result = await session.execute(query)
                pet_orm = result.scalar_one_or_none()

                if not pet_orm:
                    raise EntityNotFound(f"Pet with id {pet_id} not found")

                await session.delete(pet_orm)
                await session.commit()

            except EntityNotFound:
                raise
            except Exception as e:
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