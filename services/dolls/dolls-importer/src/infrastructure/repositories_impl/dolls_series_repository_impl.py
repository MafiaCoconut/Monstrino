import logging

from monstrino_models.exceptions.db import EntityNotFound, DBConnectionError
from monstrino_models.orm.release_series_orm import ReleaseSeriesORM
from sqlalchemy import select

from application.repositories.destination.dolls_series_repository import DollsSeriesRepository
from infrastructure.db.base import async_session_factory

logger = logging.getLogger(__name__)


class DollsSeriesRepositoryImpl(DollsSeriesRepository):
    async def get_all(self):
        async with async_session_factory() as session:
            query = select(ReleaseSeriesORM)
            result = await session.execute(query)
            if result:
                dolls_series_orms = result.scalars().all()
                if dolls_series_orms:
                    return [self._refactor_orm_to_entity(dolls_series_orm=dolls_series_orm) for dolls_series_orm in dolls_series_orms]
                else:
                    raise EntityNotFound("No original characters found")
            else:
                logger.error(f"Error by getting original characters from DB")
                raise DBConnectionError(f"Error by getting original characters from DB")

    async def add(self, name: str, description: str, display_name: str):
        async with async_session_factory() as session:
            dolls_series_orm = ReleaseSeriesORM(name=name, description=description, display_name=display_name)
            session.add(dolls_series_orm)
            await session.commit()

    async def get(self, series_id: int):
        async with async_session_factory() as session:
            query = select(ReleaseSeriesORM).where(ReleaseSeriesORM.id == series_id)
            result = await session.execute(query)
            if result:
                doll_series_orm = result.scalars().first()
                if doll_series_orm:
                    return self._refactor_orm_to_entity(dolls_series_orm=doll_series_orm)
                else:
                    logger.error(f"Doll series {series_id} was not found")
                    raise EntityNotFound(f"Doll series {series_id} not found")
            else:
                logger.error(f"Error by getting doll series {series_id} from DB")
                raise DBConnectionError(f"Doll series {series_id} was not found")

    async def get_by_name(self, name: int):
        async with async_session_factory() as session:
            query = select(ReleaseSeriesORM).where(ReleaseSeriesORM.name == name)
            result = await session.execute(query)
            if result:
                doll_series_orm = result.scalars().first()
                if doll_series_orm:
                    return self._refactor_orm_to_entity(dolls_series_orm=doll_series_orm)
                else:
                    logger.error(f"Doll series {name} was not found")
                    raise EntityNotFound(f"Doll series {name} not found")
            else:
                logger.error(f"Error by getting doll series {name} from DB")
                raise DBConnectionError(f"Doll series {name} was not found")

    # @staticmethod
    # def _refactor_orm_to_entity(dolls_series_orm: ReleaseSeriesORM):
    #     return DollsSeries(
    #         id=dolls_series_orm.id,
    #         name=dolls_series_orm.name,
    #         description=dolls_series_orm.description,
    #         updated_at=dolls_series_orm.updated_at.isoformat(),
    #         created_at=dolls_series_orm.created_at.isoformat(),
    #     )