from dataclasses import dataclass

from monstrino_repositories.repositories_interfaces import *


@dataclass
class Repositories:

    # Characters
    character:           CharacterRepoInterface
    character_pet_ownership:  CharacterPetOwnershipRepoInterface
    pet:                 PetRepoInterface

    # Image
    image_reference_origin: ImageReferenceOriginRepoInterface

    # Importer
    image_import_queue: ImageImportQueueRepoInterface

    # Parser
    parsed_character: ParsedCharacterRepoInterface
    parsed_series:    ParsedSeriesRepoInterface
    parsed_pet:       ParsedPetRepoInterface
    parsed_release:   ParsedReleaseRepoInterface
    source:           SourceRepoInterface
    source_type:      SourceTypeRepoInterface

    # Release
    character_role:             CharacterRoleRepoInterface
    exclusive_vendor:           ExclusiveVendorRepoInterface
    relation_type:              RelationTypeRepoInterface
    release:                    ReleaseRepoInterface
    release_external_reference: ReleaseExternalReferenceRepoInterface
    release_type:               ReleaseTypeRepoInterface
    series:                     SeriesRepoInterface

    # Release item
    release_character:  ReleaseCharacterRepoInterface
    release_pet:        ReleasePetRepoInterface

    # Release image
    release_image:              ReleaseImageRepoInterface
    release_character_image:    ReleaseCharacterImageRepoInterface
    release_pet_image:          ReleasePetImageRepoInterface

    # Release Link
    release_relation_link:          ReleaseRelationLinkRepoInterface
    release_series_link:            ReleaseSeriesLinkRepoInterface
    release_exclusive_link:         ReleaseExclusiveLinkRepoInterface
    release_type_link:              ReleaseTypeLinkRepoInterface



    # Users
    users: AuthUserRepoInterface
    refresh_token: RefreshTokenRepoInterface

