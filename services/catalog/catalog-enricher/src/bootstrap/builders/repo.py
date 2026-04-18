from monstrino_repositories.base.factory import MapperFactory, SqlAlchemyRepoFactory
from monstrino_repositories.repositories_impl import *
from monstrino_models.dto import *
from monstrino_models.orm import *
from sqlalchemy.ext.asyncio import AsyncSession

from app.ports import Repositories

mapper_factory = MapperFactory()
repo_factory = SqlAlchemyRepoFactory(mapper_factory)


def build_repositories(session: AsyncSession) -> Repositories:
    """
    Build full repository container for the service.
    Each repo is created through repo_factory.create_domain_repo.
    """

    return Repositories()
