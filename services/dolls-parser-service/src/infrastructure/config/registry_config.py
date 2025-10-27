import logging

from application.ports.parse.parse_characters_port import ParseCharactersPort
from application.ports.website_catalog_port import WebsiteCatalogPort
from application.registries.ports_registry import PortsRegistry
from domain.enums.website_key import WebsiteKey
from infrastructure.adapters.mh_archive_adapter import MHArchiveAdapter
from infrastructure.adapters.adapters_config import Adapters

logger = logging.getLogger(__name__)


registry = PortsRegistry()

def config(adapters: Adapters):
    registry.register(WebsiteKey.HMArchive, ParseCharactersPort, adapters.parse_characters)


    return registry
