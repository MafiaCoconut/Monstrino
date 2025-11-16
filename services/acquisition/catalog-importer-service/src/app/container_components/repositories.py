from dataclasses import dataclass

from monstrino_repositories.repositories_interfaces import *


@dataclass
class Repositories:
    # Characters
    character_gender: CharacterGenderRepoInterface
    character: CharacterRepoInterface
    character_pet_link: CharacterPetLinkRepoInterface
    pet: PetRepoInterface

    # Image
    image_reference_origin: ImageReferenceOriginRepoInterface

    # Importer
    image_import_queue: ImageImportQueueRepoInterface

    # Parser
    parsed_character: ParsedCharacterRepoInterface
    parsed_series: ParsedSeriesRepoInterface
    parsed_pet: ParsedPetRepoInterface
    parsed_release: ParsedReleaseRepoInterface
    source: SourceRepoInterface
    source_type: SourceTypeRepoInterface

    # Release
    character_role: CharacterRoleRepoInterface
    exclusive_vendor: ExclusiveVendorRepoInterface
    relation_type: RelationTypeRepoInterface
    release: ReleaseRepoInterface
    release_image: ReleaseImageRepoInterface
    release_type: ReleaseTypeRepoInterface
    series: SeriesRepoInterface

    # Release Link
    release_character_link: ReleaseCharacterLinkRepoInterface
    release_pet_link: ReleasePetLinkRepoInterface
    release_relation_link: ReleaseRelationLinkRepoInterface
    release_series_link: ReleaseSeriesLinkRepoInterface
    release_exclusive_link: ReleaseExclusiveLinkRepoInterface
    release_type_link: ReleaseTypeLinkRepoInterface
