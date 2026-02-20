import os

import pytest
from monstrino_models.orm import Base
from monstrino_repositories.unit_of_work import UnitOfWorkFactory
from monstrino_repositories.unit_of_work.sqlaclhemy_unit_of_work import SqlAlchemyUnitOfWork
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from monstrino_testing.fixtures.db import Repositories, build_repositories

DATABASE_URL = os.getenv("DATABASE_URL")

@pytest.fixture(scope="function")
async def engine():
    eng = create_async_engine(DATABASE_URL, echo=False)
    async with eng.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield eng
    await eng.dispose()


@pytest.fixture
def session_factory(engine):
    return async_sessionmaker(engine, expire_on_commit=False)


@pytest.fixture
def uow_factory_without_reset_db(
        session_factory,
) -> UnitOfWorkFactory[Repositories]:
    return UnitOfWorkFactory[Repositories](
        session_factory=session_factory,
        repo_factory=build_repositories
    )
