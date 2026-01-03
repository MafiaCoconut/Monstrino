from bootstrap.container_components import Adapters, Services, Repositories, ProcessServices, CharacterProcessServices, \
    ReleaseProcessServices, PetProcessServices, SeriesProcessServices, CommonProcessServices
from application.services.character import GenderResolverService
from application.services.common import ImageReferenceService
from application.services.common.processing_states_svc import ProcessingStatesService
from application.services.pets import OwnerResolverService
from application.services.releases import SeriesResolverService, PetResolverService, ExclusiveResolverService, \
    CharacterResolverService, ImageProcessingService, ReissueRelationResolverService
from application.services.releases.type_resolver_svc import TierTypeResolverService, \
    PackTypeResolverService, ContentTypeResolverService
from application.services.series import ParentResolverService


def build_services() -> Services:
    return Services(
        process=ProcessServices(
            common=CommonProcessServices(
                image_reference=ImageReferenceService(),
                processing_states=ProcessingStatesService()
            ),
            character=CharacterProcessServices(
                gender_resolver=GenderResolverService()
            ),
            pet=PetProcessServices(
                owner_resolver=OwnerResolverService()
            ),
            series=SeriesProcessServices(
                parent_resolver=ParentResolverService()
            ),
            release=ReleaseProcessServices(
                character_resolver=CharacterResolverService(),
                exclusive_resolver=ExclusiveResolverService(),
                image_processing=ImageProcessingService(),
                pet_resolver=PetResolverService(),
                reissue_relation_resolver=ReissueRelationResolverService(),
                series_resolver=SeriesResolverService(),
                content_type_resolver=ContentTypeResolverService(),
                pack_type_resolver=PackTypeResolverService(),
                tier_type_resolver=TierTypeResolverService()
            )
        )
    )