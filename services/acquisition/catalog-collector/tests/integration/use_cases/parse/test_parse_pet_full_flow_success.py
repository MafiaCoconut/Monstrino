
import pytest
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.container_components.repositories import Repositories
from application.registries.ports_registry import PortsRegistry
from application.use_cases.parse.parse_pets_use_case import ParsePetsUseCase
from domain.enums.website_key import WebsiteKey


@pytest.mark.asyncio
async def test_parse_pet_single(
        uow_factory: UnitOfWorkFactory[Repositories],
        registry: PortsRegistry
):
    uc = ParsePetsUseCase(
        uow_factory=uow_factory,
        registry=registry
    )
    await uc.execute(WebsiteKey.MHArchive, batch_size=2, limit=1)