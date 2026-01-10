import pytest
from icecream import ic
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from application.queries.get_release_by_id import GetReleaseByIdQuery
from src.application.ports import Repositories
from src.application.use_cases.get_release_by_id import GetReleaseByIdUseCase

def get_uc(
        uow_factory: UnitOfWorkFactory[Repositories],
) -> GetReleaseByIdUseCase:
    return GetReleaseByIdUseCase(uow_factory=uow_factory)



@pytest.mark.asyncio
async def test_simple_release(
        uow_factory: UnitOfWorkFactory[Repositories],
):
    use_case = get_uc(uow_factory)
    query = GetReleaseByIdQuery(
        release_id=21,
    )
    result = await use_case.execute(query)
    ic(result)