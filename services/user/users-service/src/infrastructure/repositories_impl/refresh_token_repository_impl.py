
from sqlalchemy import select, delete, text, update, func, cast, or_, and_

from application.repositories.refresh_token_repository import RefreshTokensRepository
from infrastructure.db.base import async_engine
from infrastructure.db.models.refresh_token_orm import RefreshTokensORM


class RefreshTokensRepositoryImpl(RefreshTokensRepository):
    @staticmethod
    async def _get_session():
        return AsyncSession(bind=async_engine, expire_on_commit=False)

    async def set_token(self, user_id: int, refresh_token: str, ip: str = ""):
        session = await self._get_session()
        async with session.begin():
            token_orm = RefreshTokensORM(
                user_id=user_id, token=refresh_token, ip_address=ip)
            session.add(token_orm)
            await session.commit()

    async def update_token(self, user_id: int, refresh_token: str, ip: str = "") -> None:
        session = await self._get_session()
        async with session.begin():
            query = update(RefreshTokensORM).where(
                and_(
                    RefreshTokensORM.user_id == user_id,
                    RefreshTokensORM.ip_address == ip,
                )
            ).values(token=refresh_token)

            # token_orm = RefreshTokensORM(user_id=user_id, token=refresh_token, ip_address=ip)
            await session.execute(query)
            await session.commit()
        pass

    async def validate_token(self, refresh_token: str):
        session = await self._get_session()
        async with session.begin():
            query = select(RefreshTokensORM).where(
                RefreshTokensORM.token == refresh_token)
            result = await session.execute(query)
            token_orm = result.scalars().first()
            if not token_orm:
                return False
            return True

    async def delete_token(self, refresh_token: str):
        session = await self._get_session()
        async with session.begin():
            query = delete(RefreshTokensORM).where(
                RefreshTokensORM.token == refresh_token)
            await session.execute(query)
            await session.commit()

    async def get_all_tokens(self, user_id: int):
        session = await self._get_session()
        async with session.begin():
            query = select(RefreshTokensORM).where(
                RefreshTokensORM.user_id == user_id)
            result = await session.execute(query)
            tokens = result.scalars().all()
            return [{'user_id': user_id, 'token': token.token, 'ip': token.ip_address} for token in tokens]
