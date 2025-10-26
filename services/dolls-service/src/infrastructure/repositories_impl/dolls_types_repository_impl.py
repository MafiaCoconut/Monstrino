import logging
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, or_

from application.repositories.dolls_types_repository import DollsTypesRepository
from domain.entities.dolls.dolls_type import DollsType
from domain.exceptions.db import EntityNotFound, DBConnectionError
from infrastructure.db.base import async_engine, async_session_factory
from infrastructure.db.models.dolls_types_orm import DollsTypesORM

logger = logging.getLogger(__name__)

class DollsTypesRepositoryImpl(DollsTypesRepository):
    @staticmethod
    async def _get_session():
        return AsyncSession(bind=async_engine, expire_on_commit=False)

    async def get_all(self):
        async with async_session_factory() as session:
            query = select(DollsTypesORM)
            result = await session.execute(query)
            if result:
                dolls_types_orms = result.scalars().all()
                if dolls_types_orms:
                    return [self._refactor_orm_to_entity(doll_type_orm=doll_type_orm) for doll_type_orm in dolls_types_orms]
                else:
                    raise EntityNotFound("No doll types found")
            else:
                    logger.error(f"Error by getting dolls types from DB")
                    raise DBConnectionError(f"Error by getting dolls types from DB")

    async def add(self, name: str, display_name: str):
        async with async_session_factory() as session:
            dolls_type_orm = DollsTypesORM(name=name, display_name=display_name)
            session.add(dolls_type_orm)
            await session.commit()


    async def get(self, type_id: int):
        async with async_session_factory() as session:
            query = select(DollsTypesORM).where(DollsTypesORM.id == type_id)
            result = await session.execute(query)
            if result:
                doll_type_orm = result.scalars().first()
                if doll_type_orm:
                    return self._refactor_orm_to_entity(doll_type_orm=doll_type_orm)
                else:
                    raise EntityNotFound("No doll types found")
            else:
                logger.error(f"Error by getting doll type {type_id} from DB")
                raise DBConnectionError(f"Doll type {type_id} was not found")

    async def get_by_name(self, name: str):
        async with async_session_factory() as session:
            query = select(DollsTypesORM).where(DollsTypesORM.name == name)
            result = await session.execute(query)
            if result:
                doll_type_orm = result.scalars().first()
                if doll_type_orm:
                    return self._refactor_orm_to_entity(doll_type_orm=doll_type_orm)
                else:
                    raise EntityNotFound("No doll types found")
            else:
                logger.error(f"Error by getting doll type {name} from DB")
                raise DBConnectionError(f"Doll type {name} was not found")

    @staticmethod
    def _refactor_orm_to_entity(doll_type_orm: DollsTypesORM):
        return DollsType(
            id=doll_type_orm.id,
            name=doll_type_orm.name,
            display_name=doll_type_orm.display_name,
            updated_at=doll_type_orm.updated_at.isoformat(),
            created_at=doll_type_orm.created_at.isoformat(),
        )