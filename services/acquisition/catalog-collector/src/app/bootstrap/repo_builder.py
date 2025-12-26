from monstrino_models.dto import ParsedPet, ParsedCharacter, ParsedRelease, ParsedSeries
from monstrino_models.orm import ParsedPetORM, ParsedCharacterORM, ParsedReleaseORM, ParsedSeriesORM
from monstrino_repositories.base.factory import MapperFactory, SqlAlchemyRepoFactory
from sqlalchemy.ext.asyncio import AsyncSession

from app.container import Repositories
from monstrino_repositories.repositories_impl import ParsedPetRepo, ParsedCharacterRepo, ParsedSeriesRepo, \
    ParsedReleaseRepo

mapper_factory = MapperFactory()
repo_factory = SqlAlchemyRepoFactory(mapper_factory)


def build_repositories(session: AsyncSession) -> Repositories:
    return Repositories(
        parsed_pet=repo_factory.create_domain_repo(
            repo_impl_cls=ParsedPetRepo,
            session=session,
            orm_model=ParsedPetORM,
            dto_model=ParsedPet,
        ),
        parsed_character=repo_factory.create_domain_repo(
            repo_impl_cls=ParsedCharacterRepo,
            session=session,
            orm_model=ParsedCharacterORM,
            dto_model=ParsedCharacter,
        ),
        parsed_series=repo_factory.create_domain_repo(
            repo_impl_cls=ParsedSeriesRepo,
            session=session,
            orm_model=ParsedSeriesORM,
            dto_model=ParsedSeries,
        ),
        parsed_release=repo_factory.create_domain_repo(
            repo_impl_cls=ParsedReleaseRepo,
            session=session,
            orm_model=ParsedReleaseORM,
            dto_model=ParsedRelease,
        )
    )
