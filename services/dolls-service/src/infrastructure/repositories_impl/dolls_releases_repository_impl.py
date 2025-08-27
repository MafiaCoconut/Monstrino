from application.repositories.dolls_releases_repository import DollsReleasesRepository
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, text, update, func, cast, or_, and_

from infrastructure.db.base import async_engine
from domain.entities.dolls_release import DollsRelease
from infrastructure.db.models.dolls_releases_orm import DollsReleasesORM


class DollsReleasesRepositoryImpl(DollsReleasesRepository):
    @staticmethod
    async def _get_session():
        return AsyncSession(bind=async_engine, expire_on_commit=False)

    async def save(self, release: DollsRelease) -> int:
        session = await self._get_session()
        async with session.begin():
            release_orm = await format_pydantic_to_orm(release)
            session.add(release_orm)
            await session.flush()
            release_id = release_orm.id
            await session.commit()
            return release_id




async def format_pydantic_to_orm(pydantic_model: DollsRelease) -> DollsReleasesORM:
    return DollsReleasesORM(
        type_id=pydantic_model.type_id,
        character_id=pydantic_model.character_id,
        name=pydantic_model.name,
        mpn=pydantic_model.mpn,
        series_id=pydantic_model.series_id,
        year=pydantic_model.year,
        description=pydantic_model.description,
        link=pydantic_model.link,
    )


async def format_orm_to_pydantic(orm_model: DollsReleasesORM) -> DollsRelease:
    return DollsRelease(
        id=orm_model.id,
        type_id=orm_model.type_id,
        character_id=orm_model.character_id,
        name=orm_model.name,
        mpn=orm_model.mpn,
        series_id=orm_model.series_id,
        year=orm_model.year,
        description=orm_model.description,
        link=orm_model.link,
    )