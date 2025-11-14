import logging

from application.repositories.dolls_release_repository import DollsReleasesRepository

from infrastructure.db.base import async_session_factory
from domain.entities.dolls.dolls_release import DollsRelease
from infrastructure.db.models.release_orm import ReleasesORM

logger = logging.getLogger(__name__)


class DollsReleasesRepositoryImpl(DollsReleasesRepository):
    async def add(self, dto: DollsRelease):
        async with async_session_factory() as session:
            release_orm = self._format_pydantic_to_orm(dto)
            session.add(release_orm)
            await session.commit()
            await session.refresh(release_orm)
            return self._format_orm_to_pydantic(release_orm)

    @staticmethod
    def _format_pydantic_to_orm(pydantic_model: DollsRelease) -> ReleasesORM:
        return ReleasesORM(
            type_id=pydantic_model.type_id,
            name=pydantic_model.name,
            mpn=pydantic_model.mpn,
            series_id=pydantic_model.series_id,
            year=pydantic_model.year,
            description=pydantic_model.description,
            link=pydantic_model.link,
        )

    @staticmethod
    def _format_orm_to_pydantic(orm_model: ReleasesORM) -> DollsRelease:
        return DollsRelease(
            id=orm_model.id,
            type_id=orm_model.type_id,
            name=orm_model.name,
            mpn=orm_model.mpn,
            series_id=orm_model.series_id,
            year=orm_model.year,
            description=orm_model.description,
            link=orm_model.link,
        )

    # async def get_all(self):
    #     async with async_session_factory() as session:
    #         query = select(DollsReleasesORM)
    #         result = await session.execute(query)
    #         if result:
    #             dolls_series_orms = result.scalars().all()
    #             if dolls_series_orms:
    #                 return [self._refactor_orm_to_entity(dolls_series_orm=dolls_series_orm) for dolls_series_orm in dolls_series_orms]
    #             else:
    #                 raise EntityNotFound("No original characters found")
    #         else:
    #             logger.error(f"Error by getting original characters from DB")
    #             raise DBConnectionError(f"Error by getting original characters from DB")
    #
    # async def add(self, name: str, description: str, display_name: str):
    #     async with async_session_factory() as session:
    #         dolls_series_orm = DollsSeriesORM(name=name, description=description, display_name=display_name)
    #         session.add(dolls_series_orm)
    #         await session.commit()
    #
    #
    # async def get(self, type_id: int):
    #     async with async_session_factory() as session:
    #         query = select(DollsSeriesORM).where(DollsSeriesORM.id == type_id)
    #         result = await session.execute(query)
    #         if result:
    #             doll_type_orm = result.scalars().first()
    #             if doll_type_orm:
    #                 return self._refactor_orm_to_entity(dolls_series_orm=doll_type_orm)
    #             else:
    #                 logger.error(f"Doll series {type_id} was not found")
    #                 raise EntityNotFound(f"Doll series {type_id} not found")
    #         else:
    #             logger.error(f"Error by getting doll series {type_id} from DB")
    #             raise DBConnectionError(f"Doll series {type_id} was not found")
