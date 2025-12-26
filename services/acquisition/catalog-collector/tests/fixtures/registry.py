import pytest

from application.ports.parse import ParseCharacterPort, ParsePetPort, ParseSeriesPort, ParseReleasePort
from application.registries.ports_registry import PortsRegistry
from domain.enums.website_key import WebsiteKey


@pytest.fixture
def registry(adapters):
    registry = PortsRegistry()

    registry.register(
        WebsiteKey.MHArchive, ParseCharacterPort,
        adapters.mh_archive_parse_characters
    )
    registry.register(
        WebsiteKey.MHArchive, ParsePetPort,
      adapters.mh_archive_parse_pets
    )
    registry.register(
        WebsiteKey.MHArchive, ParseSeriesPort,
        adapters.mh_archive_parse_series
    )
    registry.register(
        WebsiteKey.MHArchive, ParseReleasePort,
        adapters.mh_archive_parse_release
    )
    return registry
