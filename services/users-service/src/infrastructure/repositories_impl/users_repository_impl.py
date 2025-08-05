from icecream import ic
from pydantic.v1 import NoneIsNotAllowedError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, text, update, func, cast, or_
from sqlalchemy.dialects.postgresql import JSONB
from datetime import datetime, timezone
from application.repositories.users_repository import UsersRepository
from domain.new_user import NewUser
from domain.user import User, UserRegistration, UserBaseInfo

from infrastructure.config.logs_config import log_decorator
from infrastructure.db.base import async_engine
from infrastructure.db.models.dolls_collection_orm import DollsCollectionORM
from infrastructure.db.models.user_orm import UserORM
from infrastructure.db.models_reformater import models_reformater


class UsersRepositoryImpl(UsersRepository):
    @staticmethod
    async def _get_session():
        return AsyncSession(bind=async_engine, expire_on_commit=False)

    async def set_user(self, user: UserRegistration) -> int:
        session = await self._get_session()
        async with session.begin():
            user_orm = await models_reformater.refactor_new_user_pydantic_to_orm(user)
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
                user = await models_reformater.refactor_orm_to_base_user_info(user_orm=user_orm)
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

    async def login(self, email: str, password: str) -> UserBaseInfo | None:
        session = await self._get_session()
        async with session.begin():
            query = select(UserORM).where(UserORM.email == email, UserORM.password == password)
            result = await session.execute(query)
            user_orm = result.scalars().first()
            if user_orm:
                return await models_reformater.refactor_orm_to_base_user_info(user_orm=user_orm)
            else:
                return None

    async def check_user_exist(self, username: str = None, email: str = None) -> bool:
        session = await self._get_session()
        async with session.begin():
            query = select(UserORM).where(
                or_(
                    (UserORM.email == email) if email is not None else False,
                    (UserORM.username == username) if username is not None else False,
                )
            )
            result = await session.execute(query)
            user_orm: UserORM = result.scalars().first()
            if user_orm:
                return True
            return False
