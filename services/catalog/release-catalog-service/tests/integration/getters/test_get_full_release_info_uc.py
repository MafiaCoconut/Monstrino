from typing import Optional
from unittest.mock import AsyncMock, Mock

import pytest
from icecream import ic
from monstrino_core.application.pagination import PageSpec, Page
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from application.queries.get_release_by_id import GetReleaseByIdDTO
from application.queries.release_search import ReleaseSearchDTO
from domain.models.release_search import ReleaseSearchQuery, ReleaseListItem
from domain.models.release_search.release_filters import ReleaseFilters
from src.application.ports import Repositories
from src.application.use_cases.get_release_by_id import GetReleaseByIdUseCase
from src.application.use_cases.release_search import ReleaseSearchUseCase

def get_uc(
        uow_factory: UnitOfWorkFactory[Repositories],
) -> GetReleaseByIdUseCase:
    return GetReleaseByIdUseCase(uow_factory=uow_factory)


@pytest.mark.asyncio
async def test_simple_release(
        uow_factory: UnitOfWorkFactory[Repositories],
):
    use_case = get_uc(uow_factory)
    query = GetReleaseByIdDTO(
        release_id=21,
    )
    result = await use_case.execute(query)
    ic(result)

