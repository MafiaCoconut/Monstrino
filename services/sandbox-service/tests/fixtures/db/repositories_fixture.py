from dataclasses import dataclass

from monstrino_repositories.repositories import *
from monstrino_repositories.repositories_impl import *
from sqlalchemy.ext.asyncio import AsyncSession


@dataclass
class Repositories:
    character_genders: CharacterGendersRepo
    characters: CharactersRepo
    pets: PetsRepo

    # Images
    image_reference_origin: ImageReferenceOriginRepo
    parsed_images: ParsedImagesRepo
    release_images: ReleaseImagesRepo

    # Source repositories
    parsed_characters: ParsedCharactersRepo
    parsed_series: ParsedSeriesRepo
    parsed_pets: ParsedPetsRepo
    parsed_releases: ParsedReleasesRepo

    # Releases
    release_character_roles: ReleaseCharacterRolesRepo
    release_characters: ReleaseCharactersRepo
    release_exclusives: ReleaseExclusivesRepo
    release_pets: ReleasePetsRepo
    release_relation_types: ReleaseRelationTypesRepo
    release_relations: ReleaseRelationsRepo
    release_series: SeriesRepo
    release_types: ReleaseTypesRepo
    releases: ReleasesRepo



def build_repositories(session: AsyncSession) -> Repositories:
    return Repositories(
        character_genders=CharacterGendersRepoImpy(session),
        characters=CharactersRepoImpl(session),
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
        release_series=SeriesRepoImpl(session),
        release_types=ReleaseTypesRepoImpl(),
        releases=ReleasesRepoImpl()
    )