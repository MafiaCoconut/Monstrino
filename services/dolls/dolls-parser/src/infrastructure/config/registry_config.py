import logging

from application.ports.parse.parse_characters_port import ParseCharactersPort
from application.ports.parse.parse_pets_port import ParsePetsPort
from application.ports.parse.parse_releases_port import ParseReleasesPort
from application.ports.parse.parse_series_port import ParseSeriesPort
from application.ports.website_catalog_port import WebsiteCatalogPort
from application.registries.ports_registry import PortsRegistry
from domain.enums.website_key import WebsiteKey
from infrastructure.adapters.mh_archive_adapter import MHArchiveAdapter
from infrastructure.adapters.adapters_config import Adapters

logger = logging.getLogger(__name__)


registry = PortsRegistry()

def config(adapters: Adapters):
    registry.register(WebsiteKey.HMArchive, ParseCharactersPort, adapters.mh_archive_parse_characters)
    registry.register(WebsiteKey.HMArchive, ParsePetsPort, adapters.mh_archive_parse_pets)
    registry.register(WebsiteKey.HMArchive, ParseSeriesPort, adapters.mh_archive_parse_series)
    registry.register(WebsiteKey.HMArchive, ParseReleasesPort, adapters.mh_archive_parse_releases)



    return registry
