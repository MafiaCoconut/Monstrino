import pytest

from app.ports.parse import ParseCharacterPort, ParsePetPort, ParseSeriesPort, ParseReleasePort
from app.registries.ports_registry import PortsRegistry
from domain.enums.source_key import SourceKey


@pytest.fixture
def registry(adapters):
    registry = PortsRegistry()

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
