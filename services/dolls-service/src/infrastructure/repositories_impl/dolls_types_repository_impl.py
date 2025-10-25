import logging
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, or_

from application.repositories.dolls_types_repository import DollsTypesRepository
from domain.entities.dolls.dolls_type import DollsType
from domain.exceptions.db import EntityNotFound
from infrastructure.db.base import async_engine
from infrastructure.db.models.dolls_types_orm import DollsTypesORM

logger = logging.getLogger(__name__)

class DollsTypesRepositoryImpl(DollsTypesRepository):
    @staticmethod
    async def _get_session():
        return AsyncSession(bind=async_engine, expire_on_commit=False)

    async def get_all(self):
        session = await self._get_session()
        async with session.begin():
            query = select(DollsTypesORM)
            result = await session.execute(query)
            if result:
                dolls_types_orms = result.scalars().all()
                return [self._refactor_orm_to_entity(doll_type_orm=doll_type_orm) for doll_type_orm in dolls_types_orms]
            else:
                logger.error("No doll types found in database")
                raise EntityNotFound("No doll types found")

    async def add(self, name: str, display_name: str):
        session = await self._get_session()
        async with session.begin():
            dolls_type_orm = DollsTypesORM(name=name, display_name=display_name)
            session.add(dolls_type_orm)
            await session.commit()


    async def get(self, type_id: int):
        session = await self._get_session()
        async with session.begin():
            query = select(DollsTypesORM).where(DollsTypesORM.id == type_id)
            result = await session.execute(query)
            if result:
                doll_type_orm = result.scalars().first()
                return self._refactor_orm_to_entity(doll_type_orm=doll_type_orm)
            else:
                logger.error(f"Doll type {type_id} was not found")
                raise EntityNotFound(f"Doll type {type_id} was not found")

    @staticmethod
    def _refactor_orm_to_entity(doll_type_orm: DollsTypesORM):
        return DollsType(
            id=doll_type_orm.id,
            name=doll_type_orm.name,
            display_name=doll_type_orm.display_name,
            updated_at=doll_type_orm.updated_at.isoformat(),
            created_at=doll_type_orm.created_at.isoformat(),
        )