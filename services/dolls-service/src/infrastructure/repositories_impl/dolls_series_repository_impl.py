import logging
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, or_

from application.repositories.dolls_series_repository import DollsSeriesRepository
from domain.entities.dolls.dolls_serie import DollsSeries
from domain.exceptions.db import EntityNotFound, DBConnectionError
from infrastructure.db.base import async_engine, async_session_factory
from infrastructure.db.models.dolls_series_orm import DollsSeriesORM

logger = logging.getLogger(__name__)


class DollsSeriesRepositoryImpl(DollsSeriesRepository):
    @staticmethod
    async def _get_session():
        return AsyncSession(bind=async_engine, expire_on_commit=False)

    async def get_all(self):
        async with async_session_factory() as session:
            query = select(DollsSeriesORM)
            result = await session.execute(query)
            if result:
                dolls_series_orms = result.scalars().all()
                return [self._refactor_orm_to_entity(dolls_series_orm=dolls_series_orm) for dolls_series_orm in dolls_series_orms]
            else:
                logger.error("No doll series found in database")
                raise EntityNotFound("No doll series found")

    async def add(self, name: str, description: str):
        async with async_session_factory() as session:
            dolls_type_orm = DollsSeriesORM(name=name, description=description)
            session.add(dolls_type_orm)
            await session.commit()


    async def get(self, type_id: int):
        async with async_session_factory() as session:
            query = select(DollsSeriesORM).where(DollsSeriesORM.id == type_id)
            result = await session.execute(query)
            if result:
                doll_type_orm = result.scalars().first()
                if doll_type_orm:
                    return self._refactor_orm_to_entity(dolls_series_orm=doll_type_orm)
                else:
                    logger.error(f"Doll series {type_id} was not found")
                    raise EntityNotFound(f"Doll series {type_id} not found")
            else:
                logger.error(f"Error by getting doll series {type_id} from DB")
                raise DBConnectionError(f"Doll series {type_id} was not found")

    @staticmethod
    def _refactor_orm_to_entity(dolls_series_orm: DollsSeriesORM):
        return DollsSeries(
            id=dolls_series_orm.id,
            name=dolls_series_orm.name,
            description=dolls_series_orm.description,
            updated_at=dolls_series_orm.updated_at.isoformat(),
            created_at=dolls_series_orm.created_at.isoformat(),
        )