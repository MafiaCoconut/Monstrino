from typing import Optional

from application.repositories.dolls_releases_repository import DollsReleasesRepository
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, text, update, func, cast, or_, and_

from infrastructure.db.base import async_engine
from application.repositories.original_mh_characters_repository import OriginalMHCharactersRepository
from infrastructure.db.models.original_mh_characters_orm import OriginalMHCharactersORM


class OriginalMHCharactersRepositoryImpl(OriginalMHCharactersRepository):
    @staticmethod
    async def _get_session():
        return AsyncSession(bind=async_engine, expire_on_commit=False)

    async def get_id_by_name(self, name: str) -> Optional[int]:
        session = await self._get_session()
        async with session.begin():
            query = select(OriginalMHCharactersORM).where(OriginalMHCharactersORM.name == name)
            result = await session.execute(query)
            character_orm: OriginalMHCharactersORM = result.scalars().first()
            if character_orm:
                return character_orm.id
            return None