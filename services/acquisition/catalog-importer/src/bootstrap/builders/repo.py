from monstrino_repositories.base.factory import MapperFactory, SqlAlchemyRepoFactory
from monstrino_repositories.repositories_impl import *
from monstrino_models.dto import *
from monstrino_models.orm import *
from sqlalchemy.ext.asyncio import AsyncSession

from application.ports import Repositories

mapper_factory = MapperFactory()
repo_factory = SqlAlchemyRepoFactory(mapper_factory)


def build_repositories(session: AsyncSession) -> Repositories:
    """
    Build full repository container for the service.
    Each repo is created through repo_factory.create_domain_repo.
    """

    return Repositories(

        # ------------------------------------------------------------------
        # Characters
        # ------------------------------------------------------------------
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
        # Release
        # ------------------------------------------------------------------
        character_role=repo_factory.create_domain_repo(
            repo_impl_cls=CharacterRoleRepo,
            session=session,
            orm_model=CharacterRoleORM,
            dto_model=CharacterRole,
        ),
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
        release=repo_factory.create_domain_repo(
            repo_impl_cls=ReleaseRepo,
            session=session,
            orm_model=ReleaseORM,
            dto_model=Release,
        ),
        release_external_reference=repo_factory.create_domain_repo(
            repo_impl_cls=ReleaseExternalReferenceRepo,
            session=session,
            orm_model=ReleaseExternalReferenceORM,
            dto_model=ReleaseExternalReference
        ),
        release_type=repo_factory.create_domain_repo(
            repo_impl_cls=ReleaseTypeRepo,
            session=session,
            orm_model=ReleaseTypeORM,
            dto_model=ReleaseType,
        ),
        series=repo_factory.create_domain_repo(
            repo_impl_cls=SeriesRepo,
            session=session,
            orm_model=SeriesORM,
            dto_model=Series,
        ),

        # ------------------------------------------------------------------
        # Release Items
        # ------------------------------------------------------------------

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

        # ------------------------------------------------------------------
        # Release Images
        # ------------------------------------------------------------------
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

        # ------------------------------------------------------------------
        # Release Links
        # ------------------------------------------------------------------
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
        release_exclusive_link=repo_factory.create_domain_repo(
            repo_impl_cls=ReleaseExclusiveLinkRepo,
            session=session,
            orm_model=ReleaseExclusiveLinkORM,
            dto_model=ReleaseExclusiveLink,
        ),
        release_type_link=repo_factory.create_domain_repo(
            repo_impl_cls=ReleaseTypeLinkRepo,
            session=session,
            orm_model=ReleaseTypeLinkORM,
            dto_model=ReleaseTypeLink,
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
