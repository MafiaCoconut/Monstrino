import pytest
from icecream import ic
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.container_components.repositories import Repositories
from infrastructure.parsers import MHArchivePetsParser


@pytest.mark.asyncio
async def test_parse_pet_single(
        uow_factory: UnitOfWorkFactory[Repositories],
):
    parser = MHArchivePetsParser()

    async for batch in parser.parse(batch_size=2, limit=5):
        ic(batch)
