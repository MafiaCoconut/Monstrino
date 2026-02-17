from monstrino_repositories.base.factory import MapperFactory, SqlAlchemyRepoFactory
from monstrino_repositories.repositories_impl import *
from monstrino_models.orm import *
from monstrino_models.dto import *
from sqlalchemy.ext.asyncio import AsyncSession

from app.ports.repositories import Repositories

mapper_factory = MapperFactory()
repo_factory = SqlAlchemyRepoFactory(mapper_factory)


def build_repositories(session: AsyncSession) -> Repositories:
    return Repositories(
        geo_country=repo_factory.create_domain_repo(
            repo_impl_cls=GeoCountryRepo,
            session=session,
            orm_model=GeoCountryORM,
            dto_model=GeoCountry,
        ),
        money_currency=repo_factory.create_domain_repo(
            repo_impl_cls=MoneyCurrencyRepo,
            session=session,
            orm_model=MoneyCurrencyORM,
            dto_model=MoneyCurrency,
        ),
        market_source=repo_factory.create_domain_repo(
            repo_impl_cls=MarketSourceRepo,
            session=session,
            orm_model=MarketSourceORM,
            dto_model=MarketSource,
        ),
        market_source_country=repo_factory.create_domain_repo(
            repo_impl_cls=MarketSourceCountryRepo,
            session=session,
            orm_model=MarketSourceCountryORM,
            dto_model=MarketSourceCountry,
        ),
        release_market_link=repo_factory.create_domain_repo(
            repo_impl_cls=ReleaseMarketLinkRepo,
            session=session,
            orm_model=ReleaseMarketLinkORM,
            dto_model=ReleaseMarketLink,
        ),
        market_product_price_observation=repo_factory.create_domain_repo(
            repo_impl_cls=MarketProductPriceObservationRepo,
            session=session,
            orm_model=MarketProductPriceObservationORM,
            dto_model=MarketProductPriceObservation,
        ),
        release_msrp=repo_factory.create_domain_repo(
            repo_impl_cls=ReleaseMsrpRepo,
            session=session,
            orm_model=ReleaseMsrpORM,
            dto_model=ReleaseMsrp,
        ),
        release_msrp_source=repo_factory.create_domain_repo(
            repo_impl_cls=ReleaseMsrpSourceRepo,
            session=session,
            orm_model=ReleaseMsrpSourceORM,
            dto_model=ReleaseMsrpSource,
        )
    )
