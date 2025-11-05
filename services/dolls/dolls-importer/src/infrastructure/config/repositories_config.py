from monstrino_repositories.repositories_impl import ReleasesRepoImpl

from app.container import Repositories
from monstrino_repositories.repositories_impl import *



def build_repositories() -> Repositories:
    return Repositories(
        character_genders=CharacterGendersRepoImpy(),
        characters=CharactersRepoImpl(),
        pets=PetsRepoImpl(),

        # Images
        image_reference_origin=ImageReferenceOriginRepoImpl(),
        parsed_images=ParsedImagesRepositoryImpl(),
        release_images=ReleaseImagesRepoImpl(),

        # Source repositories
        parsed_characters=ParsedCharactersRepoImpl(),
        parsed_pets=ParsedPetsRepoImpl(),
        parsed_series=ParsedSeriesRepoImpl(),
        parsed_releases=ParsedReleasesRepoImpl(),

        # Releases
        release_character_roles=ReleaseCharacterRolesRepoImpl(),
        release_characters=ReleaseCharactersRepoImpl(),
        release_exclusives=ReleaseExclusivesRepoImpl(),
        release_pets=ReleasePetsRepoImpl(),
        release_relation_types=ReleaseRelationTypesRepoImpl(),
        release_relations=ReleaseRelationsRepoImpl(),
        release_series=SeriesRepoImpl(),
        release_types=ReleaseTypesRepoImpl(),
        releases=ReleasesRepoImpl()
    )