from sqlalchemy.ext.asyncio import AsyncSession

from app.container import Repositories
from monstrino_repositories.repositories_impl import *


def build_repositories(session: AsyncSession) -> Repositories:
    return Repositories(

        # Character
        character_gender=CharacterGenderRepoImpl(session),
        character=CharacterRepoImpl(session),
        character_pet_link=CharacterPetLinkRepoImpl(session),
        pet=PetRepoImpl(session),

        # Image
        image_reference_origin=ImageReferenceOriginRepoImpl(session),

        # Importer
        image_import_queue=ImageImportQueueRepoImpl(session),

        # Parser
        parsed_character=ParsedCharacterRepoImpl(session),
        parsed_series=ParsedSeriesRepoImpl(session),
        parsed_pet=ParsedPetRepoImpl(session),
        parsed_release=ParsedReleaseRepoImpl(session),
        source=SourceRepoImpl(session),
        source_type=SourceTypeRepoImpl(session),

        # Release
        character_role=CharacterRoleRepoImpl(session),
        exclusive_vendor=ExclusiveVendorRepoImpl(session),
        relation_type=RelationTypeRepoImpl(session),
        release=ReleaseRepoImpl(session),
        release_image=ReleaseImageRepoImpl(session),
        release_type=ReleaseTypeRepoImpl(session),
        series=SeriesRepoImpl(session),

        # Release Link
        release_character_link=ReleaseCharacterLinkRepoImpl(session),
        release_pet_link=ReleasePetLinkRepoImpl(session),
        release_relation_link=ReleaseRelationLinkRepoImpl(session),
        release_series_link=ReleaseSeriesLinkRepoImpl(session),
        release_exclusive_link=ReleaseExclusiveLinkRepoImpl(session),
        release_type_link=ReleaseTypeLinkRepoImpl(session),
    )
