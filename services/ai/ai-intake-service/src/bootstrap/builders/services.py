from bootstrap.container_components import ProcessServices, CharacterProcessServices, \
    ReleaseProcessServices, PetProcessServices, SeriesProcessServices, CommonProcessServices
from bootstrap.container_components.services import Services
from app.services.character import GenderResolverService
from app.services.common import ImageReferenceService
from app.services.common.processing_states_svc import ProcessingStatesService
from app.services.pets import OwnerResolverService
from app.services.releases import SeriesResolverService, PetResolverService, ExclusiveResolverService, \
    CharacterResolverService, ImageProcessingService, ReissueRelationResolverService, ExternalRefResolverService
from app.services.releases.type_resolver_svc import TierTypeResolverService, \
    PackTypeResolverService, ContentTypeResolverService
from app.services.series import ParentResolverService


def build_services() -> Services:
    return Services()