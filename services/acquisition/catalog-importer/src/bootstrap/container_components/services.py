from dataclasses import dataclass

from application.services.character import GenderResolverService
from application.services.common import ImageReferenceService, ProcessingStatesService
from application.services.pets import OwnerResolverService
from application.services.releases import SeriesResolverService, PetResolverService, ExclusiveResolverService, \
    CharacterResolverService, ImageProcessingService, ReissueRelationResolverService, ContentTypeResolverService, \
    PackTypeResolverService, TierTypeResolverService
from application.services.series import ParentResolverService


@dataclass(frozen=True)
class CharacterProcessServices:
    gender_resolver: GenderResolverService


@dataclass(frozen=True)
class PetProcessServices:
    owner_resolver: OwnerResolverService


@dataclass(frozen=True)
class SeriesProcessServices:
    parent_resolver: ParentResolverService


@dataclass(frozen=True)
class ReleaseProcessServices:
    character_resolver:             CharacterResolverService
    exclusive_resolver:             ExclusiveResolverService
    image_processing:               ImageProcessingService
    pet_resolver:                   PetResolverService
    reissue_relation_resolver:      ReissueRelationResolverService
    series_resolver:                SeriesResolverService
    content_type_resolver:          ContentTypeResolverService
    pack_type_resolver:             PackTypeResolverService
    tier_type_resolver:             TierTypeResolverService


@dataclass(frozen=True)
class CommonProcessServices:
    image_reference:    ImageReferenceService
    processing_states:  ProcessingStatesService


@dataclass(frozen=True)
class ProcessServices:
    common:     CommonProcessServices
    character:  CharacterProcessServices
    pet:        PetProcessServices
    series:     SeriesProcessServices
    release:    ReleaseProcessServices


@dataclass(frozen=True)
class Services:
    process: ProcessServices
