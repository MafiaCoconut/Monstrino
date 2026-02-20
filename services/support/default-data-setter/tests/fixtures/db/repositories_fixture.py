from dataclasses import dataclass

from monstrino_models.dto import *
from monstrino_models.orm import *
from monstrino_repositories.base.factory import MapperFactory, SqlAlchemyRepoFactory
from monstrino_repositories.repositories_interfaces import *
from monstrino_repositories.repositories_impl import *
from sqlalchemy.ext.asyncio import AsyncSession

mapper_factory = MapperFactory()
repo_factory = SqlAlchemyRepoFactory(mapper_factory)


@dataclass
class Repositories:
    # =============== Catalog ===================
    # Catalog - Character
    character:           CharacterRepoInterface
    character_pet_ownership:  CharacterPetOwnershipRepoInterface
    pet:                 PetRepoInterface

    # Catalog - Release
    release: ReleaseRepoInterface

    # Catalog - Release content
    character_role:     CharacterRoleRepoInterface
    release_character:  ReleaseCharacterRepoInterface
    release_pet:        ReleasePetRepoInterface

    # Catalog - Release link
    release_exclusive_link:         ReleaseExclusiveLinkRepoInterface
    release_relation_link:          ReleaseRelationLinkRepoInterface
    release_series_link:            ReleaseSeriesLinkRepoInterface
    release_type_link:              ReleaseTypeLinkRepoInterface

    # Catalog - Release media
    release_image:              ReleaseImageRepoInterface
    release_character_image:    ReleaseCharacterImageRepoInterface
    release_pet_image:          ReleasePetImageRepoInterface

    # Catalog - Release refdata
    exclusive_vendor:           ExclusiveVendorRepoInterface
    relation_type:              RelationTypeRepoInterface
    release_type:               ReleaseTypeRepoInterface

    # Catalog - Release series
    series:                     SeriesRepoInterface

    # Catalog - Release utils
    release_search: ReleaseSearchRepoInterface

    # Catalog - External ref
    character_external_reference:   CharacterExternalReferenceRepoInterface
    pet_external_reference:         PetExternalReferenceRepoInterface
    release_external_reference:     ReleaseExternalReferenceRepoInterface
    series_external_reference:      SeriesExternalReferenceRepoInterface
    # ===========================================

    # Media
    media_asset: MediaAssetRepoInterface
    media_asset_variant: MediaAssetVariantRepoInterface
    media_attachment: MediaAttachmentRepoInterface
    media_ingestion_job: MediaIngestionJobRepoInterface

    # Market
    market_source: MarketSourceRepoInterface
    market_source_country: MarketSourceCountryRepoInterface
    market_product_price_observation: MarketProductPriceObservationRepoInterface
    money_currency: MoneyCurrencyRepoInterface
    geo_country: GeoCountryRepoInterface
    release_market_link: ReleaseMarketLinkRepoInterface
    release_msrp: ReleaseMsrpRepoInterface
    release_msrp_source: ReleaseMsrpSourceRepoInterface

    # Ingest
    parsed_character: ParsedCharacterRepoInterface
    parsed_series:    ParsedSeriesRepoInterface
    parsed_pet:       ParsedPetRepoInterface
    parsed_release:   ParsedReleaseRepoInterface
    source:           SourceRepoInterface
    source_type:      SourceTypeRepoInterface



    # Users
    users: AuthUserRepoInterface
    refresh_token: RefreshTokenRepoInterface


def build_repositories(session: AsyncSession) -> Repositories:
    """
    Build full repository container for the service.
    Each repo is created through repo_factory.create_domain_repo.
    """

    return Repositories(

        # =============== Catalog ===================
        # Catalog - Character
        character=repo_factory.create_domain_repo(
            repo_impl_cls=CharacterRepo,
            session=session,
            orm_model=CharacterORM,
            dto_model=Character,
        ),
        character_pet_ownership=repo_factory.create_domain_repo(
            repo_impl_cls=CharacterPetOwnershipRepo,
            session=session,
            orm_model=CharacterPetOwnershipORM,
            dto_model=CharacterPetOwnership,
        ),
        pet=repo_factory.create_domain_repo(
            repo_impl_cls=PetRepo,
            session=session,
            orm_model=PetORM,
            dto_model=Pet,
        ),

        # Catalog - Release
        release=repo_factory.create_domain_repo(
            repo_impl_cls=ReleaseRepo,
            session=session,
            orm_model=ReleaseORM,
            dto_model=Release,
        ),

        # Catalog - Release content
        character_role=repo_factory.create_domain_repo(
            repo_impl_cls=CharacterRoleRepo,
            session=session,
            orm_model=CharacterRoleORM,
            dto_model=CharacterRole,
        ),
        release_character=repo_factory.create_domain_repo(
            repo_impl_cls=ReleaseCharacterRepo,
            session=session,
            orm_model=ReleaseCharacterORM,
            dto_model=ReleaseCharacter,
        ),
        release_pet=repo_factory.create_domain_repo(
            repo_impl_cls=ReleasePetRepo,
            session=session,
            orm_model=ReleasePetORM,
            dto_model=ReleasePet,
        ),

        # Catalog - Release link
        release_exclusive_link=repo_factory.create_domain_repo(
            repo_impl_cls=ReleaseExclusiveLinkRepo,
            session=session,
            orm_model=ReleaseExclusiveLinkORM,
            dto_model=ReleaseExclusiveLink,
        ),
        release_relation_link=repo_factory.create_domain_repo(
            repo_impl_cls=ReleaseRelationLinkRepo,
            session=session,
            orm_model=ReleaseRelationLinkORM,
            dto_model=ReleaseRelationLink,
        ),
        release_series_link=repo_factory.create_domain_repo(
            repo_impl_cls=ReleaseSeriesLinkRepo,
            session=session,
            orm_model=ReleaseSeriesLinkORM,
            dto_model=ReleaseSeriesLink,
        ),
        release_type_link=repo_factory.create_domain_repo(
            repo_impl_cls=ReleaseTypeLinkRepo,
            session=session,
            orm_model=ReleaseTypeLinkORM,
            dto_model=ReleaseTypeLink,
        ),

        # Catalog - Release media
        release_image=repo_factory.create_domain_repo(
            repo_impl_cls=ReleaseImageRepo,
            session=session,
            orm_model=ReleaseImageORM,
            dto_model=ReleaseImage,
        ),
        release_character_image=repo_factory.create_domain_repo(
            repo_impl_cls=ReleaseCharacterImageRepo,
            session=session,
            orm_model=ReleaseCharacterImageORM,
            dto_model=ReleaseCharacterImage,
        ),
        release_pet_image=repo_factory.create_domain_repo(
            repo_impl_cls=ReleasePetImageRepo,
            session=session,
            orm_model=ReleasePetImageORM,
            dto_model=ReleasePetImage,
        ),

        # Catalog - Release refdata
        exclusive_vendor=repo_factory.create_domain_repo(
            repo_impl_cls=ExclusiveVendorRepo,
            session=session,
            orm_model=ExclusiveVendorORM,
            dto_model=ExclusiveVendor,
        ),
        relation_type=repo_factory.create_domain_repo(
            repo_impl_cls=RelationTypeRepo,
            session=session,
            orm_model=RelationTypeORM,
            dto_model=RelationType,
        ),
        release_type=repo_factory.create_domain_repo(
            repo_impl_cls=ReleaseTypeRepo,
            session=session,
            orm_model=ReleaseTypeORM,
            dto_model=ReleaseType,
        ),
        # Catalog - Release series
        series=repo_factory.create_domain_repo(
            repo_impl_cls=SeriesRepo,
            session=session,
            orm_model=SeriesORM,
            dto_model=Series,
        ),

        # Catalog - Release utils
        release_search=repo_factory.create_domain_repo(
            repo_impl_cls=ReleaseSearchRepo,
            session=session,
            orm_model=Release,
            dto_model=Release,
        ),

        # Catalog - External ref
        character_external_reference=repo_factory.create_domain_repo(
            repo_impl_cls=CharacterExternalReferenceRepo,
            session=session,
            orm_model=CharacterExternalReferenceORM,
            dto_model=CharacterExternalReference
        ),
        pet_external_reference=repo_factory.create_domain_repo(
            repo_impl_cls=PetExternalReferenceRepo,
            session=session,
            orm_model=PetExternalReferenceORM,
            dto_model=PetExternalReference
        ),
        release_external_reference=repo_factory.create_domain_repo(
            repo_impl_cls=ReleaseExternalReferenceRepo,
            session=session,
            orm_model=ReleaseExternalReferenceORM,
            dto_model=ReleaseExternalReference
        ),
        series_external_reference=repo_factory.create_domain_repo(
            repo_impl_cls=SeriesExternalReferenceRepo,
            session=session,
            orm_model=SeriesExternalReferenceORM,
            dto_model=SeriesExternalReference
        ),

        # ===========================================

        # ------------------------------------------------------------------
        # Media
        # ------------------------------------------------------------------
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

        # ------------------------------------------------------------------
        # Market
        # ------------------------------------------------------------------
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
        market_product_price_observation=repo_factory.create_domain_repo(
            repo_impl_cls=MarketProductPriceObservationRepo,
            session=session,
            orm_model=MarketProductPriceObservationORM,
            dto_model=MarketProductPriceObservation,
        ),
        money_currency=repo_factory.create_domain_repo(
            repo_impl_cls=MoneyCurrencyRepo,
            session=session,
            orm_model=MoneyCurrencyORM,
            dto_model=MoneyCurrency,
        ),
        geo_country=repo_factory.create_domain_repo(
            repo_impl_cls=GeoCountryRepo,
            session=session,
            orm_model=GeoCountryORM,
            dto_model=GeoCountry,
        ),
        release_market_link=repo_factory.create_domain_repo(
            repo_impl_cls=ReleaseMarketLinkRepo,
            session=session,
            orm_model=ReleaseMarketLinkORM,
            dto_model=ReleaseMarketLink,
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
        ),

        # ------------------------------------------------------------------
        # Parser
        # ------------------------------------------------------------------
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
        parsed_pet=repo_factory.create_domain_repo(
            repo_impl_cls=ParsedPetRepo,
            session=session,
            orm_model=ParsedPetORM,
            dto_model=ParsedPet,
        ),
        parsed_release=repo_factory.create_domain_repo(
            repo_impl_cls=ParsedReleaseRepo,
            session=session,
            orm_model=ParsedReleaseORM,
            dto_model=ParsedRelease,
        ),
        source=repo_factory.create_domain_repo(
            repo_impl_cls=SourceRepo,
            session=session,
            orm_model=SourceORM,
            dto_model=Source,
        ),
        source_type=repo_factory.create_domain_repo(
            repo_impl_cls=SourceTypeRepo,
            session=session,
            orm_model=SourceTypeORM,
            dto_model=SourceType,
        ),

        # ------------------------------------------------------------------
        # Users / Auth
        # ------------------------------------------------------------------
        users=repo_factory.create_domain_repo(
            repo_impl_cls=AuthUserRepo,
            session=session,
            orm_model=AuthUserORM,
            dto_model=AuthUser,
        ),
        refresh_token=repo_factory.create_domain_repo(
            repo_impl_cls=RefreshTokenRepo,
            session=session,
            orm_model=RefreshTokenORM,
            dto_model=RefreshToken,
        ),
    )
