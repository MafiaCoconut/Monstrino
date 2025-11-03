from dataclasses import dataclass

from monstrino_repositories.repositories import *

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
    release_series: ReleaseSeriesRepo
    release_types: ReleaseTypesRepo
    releases: ReleasesRepo
