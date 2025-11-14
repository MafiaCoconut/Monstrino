from monstrino_repositories.repositories_impl import ReleasesRepoImpl

from app.container import Repositories
from monstrino_repositories.repositories_impl import *


def build_repositories() -> Repositories:
    return Repositories(
        character_gender=CharacterGendersRepoImpy(),
        characters=CharactersRepoImpl(),
        pets=PetRepoImpl(),

        # Images
        image_reference_origin=ImageReferenceOriginRepoImpl(),
        parsed_images=ParsedImagesRepositoryImpl(),
        release_image=ReleaseImagesRepoImpl(),

        # Source repositories
        parsed_character=ParsedCharactersRepoImpl(),
        parsed_pet=ParsedPetRepoImpl(),
        parsed_series=ParsedSeriesRepoImpl(),
        parsed_release=ParsedReleasesRepoImpl(),

        # Releases
        character_role=ReleaseCharacterRolesRepoImpl(),
        release_character_link=ReleaseCharactersRepoImpl(),
        exclusive_vendor=ReleaseExclusivesRepoImpl(),
        release_pet_link=ReleasePetRepoImpl(),
        relation_type=ReleaseRelationTypesRepoImpl(),
        release_relation_link=ReleaseRelationsRepoImpl(),
        release_series=SeriesRepoImpl(),
        release_type=ReleaseTypesRepoImpl(),
        release=ReleasesRepoImpl()
    )
