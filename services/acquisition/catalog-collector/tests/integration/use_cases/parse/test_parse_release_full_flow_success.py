
import pytest
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.container_components.repositories import Repositories
from application.registries.ports_registry import PortsRegistry
from application.use_cases.parse.parse_releases_use_case import ParseReleasesUseCase
from domain.enums.website_key import WebsiteKey


@pytest.mark.asyncio
async def test_parse_character_single(
        uow_factory: UnitOfWorkFactory[Repositories],
        registry: PortsRegistry,
        seed_source_list
):
    uc = ParseReleasesUseCase(
        uow_factory=uow_factory,
        registry=registry
    )
    await uc.execute(WebsiteKey.MHArchive, batch_size=5, limit=70)