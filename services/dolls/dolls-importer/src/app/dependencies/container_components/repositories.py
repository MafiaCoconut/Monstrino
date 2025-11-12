from dataclasses import dataclass

from monstrino_repositories.repositories import *


@dataclass
class Repositories:
    character_gender: CharacterGendersRepo
    characters: CharactersRepo
    pets: PetRepo

    # Images
    image_reference_origin: ImageReferenceOriginRepo
    parsed_images: ParsedImagesRepo
    release_image: ReleaseImagesRepo

    # Source repositories
    parsed_character: ParsedCharactersRepo
    parsed_series: ParsedSeriesRepo
    parsed_pet: ParsedPetRepo
    parsed_release: ParsedReleasesRepo

    # Releases
    character_role: ReleaseCharacterRolesRepo
    release_character_link: ReleaseCharactersRepo
    exclusive_vendor: ReleaseExclusivesRepo
    release_pet_link: ReleasePetRepo
    relation_type: ReleaseRelationTypesRepo
    release_relation_link: ReleaseRelationsRepo
    release_series: SeriesRepo
    release_type: ReleaseTypesRepo
    release: ReleasesRepo
