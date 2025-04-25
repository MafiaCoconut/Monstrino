from icecream import ic
from pydantic.v1 import NoneIsNotAllowedError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, text, update, func, cast
from sqlalchemy.dialects.postgresql import JSONB
from datetime import datetime, timezone
from application.repositories.users_repository import UsersRepository
from domain.new_user import NewUser
from domain.user import User, UserRegistration, UserBaseInfo

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
            first_name  = user.firstName,
            last_name   = user.lastName,
            updated_at  = user.updated_at.astimezone(timezone.utc).replace(tzinfo=None) if user.updatedAt else None,
            created_at  = user.created_at.astimezone(timezone.utc).replace(tzinfo=None) if user.updatedAt else None,
        )

    @staticmethod
    async def _refactor_new_user_pydantic_to_orm(new_user: UserRegistration):
        return UserORM(
            username = new_user.username,
            email = new_user.email,
            password = new_user.password,
        )

    async def set_user(self, user: UserRegistration) -> int:
        session = await self._get_session()
        async with session.begin():
            user_orm = await self._refactor_new_user_pydantic_to_orm(user)
            session.add(user_orm)
            await session.flush()  # ⬅️ ID будет доступен после этого
            user_id = user_orm.id
            await session.commit()
            return user_id

    async def get_user(self, user_id: int):
        session = await self._get_session()
        async with session.begin():
            pass

    async def get_user_base_info(self, user_id: int) -> UserBaseInfo | None:
        session = await self._get_session()
        async with session.begin():
            query = select(UserORM).where(UserORM.id == user_id)
            result = await session.execute(query)
            user_orm: UserORM = result.scalars().first()
            if user_orm:
                user = UserBaseInfo(
                    id = user_orm.id,
                    username = user_orm.username,
                    email = user_orm.email,
                    updated_at = user_orm.updated_at,
                    created_at = user_orm.created_at,
                )
                return user
            return None


    async def update_username(self, user_id: int, new_username: str):
        session = await self._get_session()
        async with session.begin():
            query = update(UserORM).where(UserORM.id == user_id).values(username=new_username)
            await session.execute(query)
            await session.commit()

    async def update_refresh_token(self, user_id: int, new_refresh_token: str) -> None:
        session = await self._get_session()
        async with session.begin():
            query = update(UserORM).where(UserORM.id == user_id).values(refresh_token=new_refresh_token)
            await session.execute(query)
            await session.commit()
