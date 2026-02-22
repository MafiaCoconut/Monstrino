from dataclasses import dataclass

from monstrino_repositories.repositories_interfaces import *


@dataclass
class Repositories:

    # Media
    media_asset:            MediaAssetRepoInterface
    media_asset_variant:    MediaAssetVariantRepoInterface
    media_attachment:       MediaAttachmentRepoInterface
    media_ingestion_job:    MediaIngestionJobRepoInterface

    # Characters
    # character:           CharacterRepoInterface
    # character_pet_ownership:  CharacterPetOwnershipRepoInterface
    # pet:                 PetRepoInterface
    #
    # # Release
    # character_role:             CharacterRoleRepoInterface
    # exclusive_vendor:           ExclusiveVendorRepoInterface
    # relation_type:              RelationTypeRepoInterface
    # release:                    ReleaseRepoInterface
    # release_external_reference: ReleaseExternalReferenceRepoInterface
    # release_type:               ReleaseTypeRepoInterface
    # series:                     SeriesRepoInterface
    #
    # # Release item
    # release_character:  ReleaseCharacterRepoInterface
    # release_pet:        ReleasePetRepoInterface
    #
    # # Release image
    # release_image:              ReleaseImageRepoInterface
    # release_character_image:    ReleaseCharacterImageRepoInterface
    # release_pet_image:          ReleasePetImageRepoInterface
    #
    # # Release Link
    # release_relation_link:          ReleaseRelationLinkRepoInterface
    # release_series_link:            ReleaseSeriesLinkRepoInterface
    # release_exclusive_link:         ReleaseExclusiveLinkRepoInterface
    # release_type_link:              ReleaseTypeLinkRepoInterface
    #    #

