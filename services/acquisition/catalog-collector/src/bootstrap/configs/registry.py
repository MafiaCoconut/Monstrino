import logging

from bootstrap.container_components.adapters import Adapters
from application.ports.parse import ParseCharacterPort, ParsePetPort, ParseSeriesPort, ParseReleasePort
from application.ports.website_catalog_port import WebsiteCatalogPort
from application.registries.ports_registry import PortsRegistry
from domain.enums.source_key import SourceKey
from infrastructure.adapters.mh_archive_adapter import MHArchiveAdapter

logger = logging.getLogger(__name__)


registry = PortsRegistry()


def registry_config(adapters: Adapters):
    registry.register(
        SourceKey.MHArchive, ParseCharacterPort,
        adapters.mh_archive_parse_characters
    )
    registry.register(
        SourceKey.MHArchive, ParsePetPort,
      adapters.mh_archive_parse_pets
    )
    registry.register(
        SourceKey.MHArchive, ParseSeriesPort,
        adapters.mh_archive_parse_series
    )
    registry.register(
        SourceKey.MHArchive, ParseReleasePort,
        adapters.mh_archive_parse_release
    )

    return registry
