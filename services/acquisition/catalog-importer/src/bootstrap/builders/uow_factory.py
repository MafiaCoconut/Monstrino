from monstrino_infra.configs import async_session_factory
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from bootstrap.builders.repo import build_repositories
from bootstrap.container_components.repositories import Repositories


def build_uow_factory() -> UnitOfWorkFactory[Repositories]:
    return UnitOfWorkFactory[Repositories](
        session_factory=async_session_factory,
        repo_factory=build_repositories
    )