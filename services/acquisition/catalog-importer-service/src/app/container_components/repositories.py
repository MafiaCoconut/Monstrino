from dataclasses import dataclass

from monstrino_repositories.repositories import *


@dataclass
class Repositories:
    # Characters
    character_gender: CharacterGenderRepo
    character: CharacterRepo
    character_pet_link: CharacterPetLinkRepo
    pet: PetRepo

    # Image
    image_reference_origin: ImageReferenceOriginRepo

    # Importer
    image_import_queue: ImageImportQueueRepo

    # Parser
    parsed_character: ParsedCharacterRepo
    parsed_series: ParsedSeriesRepo
    parsed_pet: ParsedPetRepo
    parsed_release: ParsedReleaseRepo
    source: SourceRepo
    source_type: SourceTypeRepo

    # Release
    character_role: CharacterRoleRepo
    exclusive_vendor: ExclusiveVendorRepo
    relation_type: RelationTypeRepo
    release: ReleaseRepo
    release_image: ReleaseImageRepo
    release_type: ReleaseTypeRepo
    series: SeriesRepo

    # Release Link
    release_character_link: ReleaseCharacterLinkRepo
    release_pet_link: ReleasePetLinkRepo
    release_relation_link: ReleaseRelationLinkRepo
    release_series_link: ReleaseSeriesLinkRepo
    release_exclusive_link: ReleaseExclusiveLinkRepo
    release_type_link: ReleaseTypeLinkRepo
