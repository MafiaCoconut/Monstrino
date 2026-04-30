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

    return Repositories(
        ai_job=repo_factory.create_domain_repo(
            repo_impl_cls=AIJobRepo,
            session=session,
            orm_model=AIJobORM,
            dto_model=AIJob,
        ),
        ai_job_intake_log=repo_factory.create_domain_repo(
            repo_impl_cls=AIJobIntakeLogRepo,
            session=session,
            orm_model=AIJobIntakeLogORM,
            dto_model=AIJobIntakeLog,
        ),
        ai_text_job=repo_factory.create_domain_repo(
            repo_impl_cls=AITextJobRepo,
            session=session,
            orm_model=AITextJobORM,
            dto_model=AITextJob,
        ),
        ai_image_job=repo_factory.create_domain_repo(
            repo_impl_cls=AIImageJobRepo,
            session=session,
            orm_model=AIImageJobORM,
            dto_model=AIImageJob,
        ),
    )
