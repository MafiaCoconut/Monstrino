from icecream import ic
from pydantic.v1 import NoneIsNotAllowedError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, text, update, func, cast
from sqlalchemy.dialects.postgresql import JSONB

from application.repositories.UsersRepository import UsersRepository

from infrastructure.config.logs_config import log_decorator
from infrastructure.db.base import async_engine
from infrastructure.db.models.DollsCollectionORM import DollsCollectionORM
from infrastructure.db.models.UserORM import UserORM 

class UsersRepositoryImpl(UsersRepository):
    @staticmethod
    async def _getSession():
        return AsyncSession(bind=async_engine, expire_on_commit=False)

    # async def setUser(self, ):
    #     session = await self._getSession()
    #     async with session.begin():
    #         pass
    #
    # async def getUser(self, userId: int):
    #     session = await self._getSession()
    #     async with session.begin():
    #         pass

        
