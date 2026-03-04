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

        geo_country=repo_factory.create_domain_repo(
            repo_impl_cls=GeoCountryRepo,
            session=session,
            orm_model=GeoCountryORM,
            dto_model=GeoCountry,
        ),
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
        ),

        media_asset=repo_factory.create_domain_repo(
            repo_impl_cls=MediaAssetRepo,
            session=session,
            orm_model=MediaAssetORM,
            dto_model=MediaAsset,
        ),

        media_asset_variant=repo_factory.create_domain_repo(
            repo_impl_cls=MediaAssetVariantRepo,
            session=session,
            orm_model=MediaAssetVariantORM,
            dto_model=MediaAssetVariant,
        ),
        media_attachment=repo_factory.create_domain_repo(
            repo_impl_cls=MediaAttachmentRepo,
            session=session,
            orm_model=MediaAttachmentORM,
            dto_model=MediaAttachment,
        ),
        media_ingestion_job=repo_factory.create_domain_repo(
            repo_impl_cls=MediaIngestionJobRepo,
            session=session,
            orm_model=MediaIngestionJobORM,
            dto_model=MediaIngestionJob,
        ),
    )
