import pytest
from monstrino_models.orm import *


@pytest.fixture(scope="function")
async def reset_db(engine):
    """Удаляет и пересоздаёт все таблицы перед тестом."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    yield  # тест выполняется после этого

