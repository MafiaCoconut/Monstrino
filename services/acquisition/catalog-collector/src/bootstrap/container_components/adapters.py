from dataclasses import dataclass

from monstrino_core.scheduler import SchedulerPort

from app.ports.kafka_producer_port import KafkaProducerPort
from app.ports.parse.parse_character_port import ParseCharacterPort
from app.ports.parse.parse_pet_port import ParsePetPort
from app.ports.parse.parse_release_port import ParseReleasePort
from app.ports.parse.parse_series_port import ParseSeriesPort
from app.ports.website_catalog_port import WebsiteCatalogPort


@dataclass
class Adapters:
    # MHArchive: WebsiteCatalogPort
    # kafka_producer: KafkaProducerPort
    scheduler: SchedulerPort
    mh_archive_parse_characters: ParseCharacterPort
    mh_archive_parse_pets: ParsePetPort
    mh_archive_parse_series: ParseSeriesPort
    mh_archive_parse_release: ParseReleasePort
