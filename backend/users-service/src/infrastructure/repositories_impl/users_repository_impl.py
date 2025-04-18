from icecream import ic
from pydantic.v1 import NoneIsNotAllowedError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, text, update, func, cast
from sqlalchemy.dialects.postgresql import JSONB
from datetime import datetime, timezone
from application.repositories.users_repository import UsersRepository
from domain.new_user import NewUser
from domain.user import User

from infrastructure.config.logs_config import log_decorator
from infrastructure.db.base import async_engine
from infrastructure.db.models.dolls_collection_orm import DollsCollectionORM
from infrastructure.db.models.user_orm import UserORM

class UsersRepositoryImpl(UsersRepository):
    @staticmethod
    async def _get_session():
        return AsyncSession(bind=async_engine, expire_on_commit=False)

    @staticmethod
    async def _refactor_orm_to_pydantic(user_orm: UserORM):
        return User(
            id         =user_orm.id,
            username   =user_orm.username,
            firstName  =user_orm.firstName,
            lastName   =user_orm.lastName,
            updatedAt  =user_orm.updatedAt,
            createdAt  =user_orm.createdAt,
        )

    @staticmethod
    async def _refactor_pydantic_to_orm(user: User):
        return UserORM(
            id         = user.id,
            username   = user.username,
            firstName  = user.firstName,
            lastName   = user.lastName,
            updatedAt  = user.updatedAt.astimezone(timezone.utc).replace(tzinfo=None) if user.updatedAt else None,
            createdAt  = user.createdAt.astimezone(timezone.utc).replace(tzinfo=None) if user.updatedAt else None,
        )

    @staticmethod
    async def _refactor_new_user_pydantic_to_orm(new_user: NewUser):
        return UserORM(
            username = new_user.username,
            firstName = new_user.firstName,
            lastName = new_user.lastName,
        )

    async def set_user(self, user: NewUser):
        session = await self._get_session()
        async with session.begin():
            user_orm = await self._refactor_new_user_pydantic_to_orm(user)
            session.add(user_orm)
            await session.commit()

    async def get_user(self, user_id: int):
        session = await self._get_session()
        async with session.begin():
            pass

    async def update_username(self, user_id: int, new_username: str):
        session = await self._get_session()
        async with session.begin():
            query = update(UserORM).where(UserORM.id == user_id).values(username=new_username)
            await session.execute(query)
            await session.commit()
        
