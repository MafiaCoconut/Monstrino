from infrastructure.db.base import Base, async_engine

from infrastructure.db.models.dolls_orm import DollsORM


class DBUseCase:
    def __init__(self):
        pass

    async def restartDB(self):
        await self.delete_db()
        await self.start_db()

    @staticmethod
    async def delete_db():
        async with async_engine.begin() as conn:
            await conn.run_sync(Base.metadata.drop_all)

    @staticmethod
    async def start_db():
        async with async_engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)

