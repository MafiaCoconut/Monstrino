from monstrino_models.dto import *
from monstrino_models.orm import *
from monstrino_repositories.base.factory import MapperFactory, SqlAlchemyRepoFactory
from sqlalchemy.ext.asyncio import AsyncSession

from monstrino_repositories.repositories_impl import *

from app.ports.repositories import Repositories


mapper_factory = MapperFactory()
repo_factory = SqlAlchemyRepoFactory(mapper_factory)


def build_repositories(session: AsyncSession) -> Repositories:
    return Repositories(
        source_discovery_entry=repo_factory.create_domain_repo(
            repo_impl_cls=SourceDiscoveredEntryRepo,
            session=session,
            orm_model=SourceDiscoveredEntryORM,
            dto_model=SourceDiscoveredEntry,
        ),
        source_payload_snapshot=repo_factory.create_domain_repo(
            repo_impl_cls=SourcePayloadSnapshotRepo,
            session=session,
            orm_model=SourcePayloadSnapshotORM,
            dto_model=SourcePayloadSnapshot,
        ),
        ingest_item=repo_factory.create_domain_repo(
            repo_impl_cls=IngestItemRepo,
            session=session,
            orm_model=IngestItemORM,
            dto_model=IngestItem,
        ),
        ingest_item_step=repo_factory.create_domain_repo(
            repo_impl_cls=IngestItemStepRepo,
            session=session,
            orm_model=IngestItemStepORM,
            dto_model=IngestItemStep,
        ),
        # parsed_pet=repo_factory.create_domain_repo(
        #     repo_impl_cls=ParsedPetRepo,
        #     session=session,
        #     orm_model=ParsedPetORM,
        #     dto_model=ParsedPet,
        # ),
        # parsed_character=repo_factory.create_domain_repo(
        #     repo_impl_cls=ParsedCharacterRepo,
        #     session=session,
        #     orm_model=ParsedCharacterORM,
        #     dto_model=ParsedCharacter,
        # ),
        # parsed_series=repo_factory.create_domain_repo(
        #     repo_impl_cls=ParsedSeriesRepo,
        #     session=session,
        #     orm_model=ParsedSeriesORM,
        #     dto_model=ParsedSeries,
        # ),
        # parsed_release=repo_factory.create_domain_repo(
        #     repo_impl_cls=ParsedReleaseRepo,
        #     session=session,
        #     orm_model=ParsedReleaseORM,
        #     dto_model=ParsedRelease,
        # ),
        source_type=repo_factory.create_domain_repo(
            repo_impl_cls=SourceTypeRepo,
            session=session,
            orm_model=SourceTypeORM,
            dto_model=SourceType,
        ),
        source_tech_type=repo_factory.create_domain_repo(
            repo_impl_cls=SourceTechTypeRepo,
            session=session,
            orm_model=SourceTechTypeORM,
            dto_model=SourceTechType,
        ),
        source=repo_factory.create_domain_repo(
            repo_impl_cls=SourceRepo,
            session=session,
            orm_model=SourceORM,
            dto_model=Source,
        ),

        source_country=repo_factory.create_domain_repo(
            repo_impl_cls=SourceCountryRepo,
            session=session,
            orm_model=SourceCountryORM,
            dto_model=SourceCountry,
        )
    )
