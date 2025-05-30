from application.repositories.dolls_repository import DollsRepository
from domain.doll import Doll
from domain.new_doll import NewDoll
from infrastructure.db.base import async_engine

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, text, update, func, cast
from sqlalchemy.dialects.postgresql import JSONB
from datetime import datetime, timezone

from infrastructure.db.models.dolls_orm import DollsORM


class DollsRepositoryImpl(DollsRepository):
    @staticmethod
    async def _get_session():
        return AsyncSession(bind=async_engine, expire_on_commit=False)

    @staticmethod
    async def _refactor_pydantic_to_orm(doll: Doll):
        return DollsORM(
            id=doll.id,
            owner_id=doll.owner_id,
            name=doll.name,
            series=doll.series,
            description=doll.description,
            images=doll.images,
            updated_at=doll.updated_at,
            created_at=doll.created_at,
        )

    @staticmethod
    async def _refactor_orm_to_pydantic(doll: DollsORM):
        return Doll(
            id=doll.id,
            owner_id=doll.owner_id,
            name=doll.name,
            series=doll.series,
            description=doll.description,
            images=doll.images,
            updated_at=doll.updated_at,
            created_at=doll.created_at,
        )

    @staticmethod
    async def _refactor_new_doll_to_orm(new_doll: NewDoll):
        return DollsORM(
            owner_id=new_doll.owner_id,
            name=new_doll.name,
            series=new_doll.series,
            description=new_doll.description,
            images=new_doll.images,
        )

    async def set_doll(self, doll: NewDoll):
        session = await self._get_session()
        async with session.begin():
            doll_orm = await self._refactor_new_doll_to_orm(doll)
            session.add(doll_orm)
            await session.commit()


    async def get_doll(self, doll_id: int):
        session = await self._get_session()
        async with session.begin():
            query = select(DollsORM).where(DollsORM.id == doll_id)
            result = await session.execute(query)
            doll_orm = result.scalars().first()
            if doll_orm:
                return await self._refactor_orm_to_pydantic(doll_orm)
            return None
