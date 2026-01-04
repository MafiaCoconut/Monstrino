from dataclasses import dataclass

from monstrino_core.scheduler import SchedulerPort

from application.ports.kafka_producer_port import KafkaProducerPort
from application.ports.parse.parse_character_port import ParseCharacterPort
from application.ports.parse.parse_pet_port import ParsePetPort
from application.ports.parse.parse_release_port import ParseReleasePort
from application.ports.parse.parse_series_port import ParseSeriesPort
from application.ports.website_catalog_port import WebsiteCatalogPort


@dataclass
class Adapters:
    # MHArchive: WebsiteCatalogPort
    # kafka_producer: KafkaProducerPort
    scheduler: SchedulerPort
    mh_archive_parse_characters: ParseCharacterPort
    mh_archive_parse_pets: ParsePetPort
    mh_archive_parse_series: ParseSeriesPort
    mh_archive_parse_release: ParseReleasePort
