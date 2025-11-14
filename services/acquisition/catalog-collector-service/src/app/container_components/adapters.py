from dataclasses import dataclass
from application.ports.kafka_producer_port import KafkaProducerPort
from application.ports.logger_port import LoggerPort
from application.ports.parse.parse_characters_port import ParseCharactersPort
from application.ports.parse.parse_pets_port import ParsePetsPort
from application.ports.parse.parse_release_port import ParseReleasesPort
from application.ports.parse.parse_series_port import ParseSeriesPort
from application.ports.scheduler_port import SchedulerPort
from application.ports.website_catalog_port import WebsiteCatalogPort


@dataclass
class Adapters:
    # MHArchive: WebsiteCatalogPort
    logger: LoggerPort
    kafka_producer: KafkaProducerPort
    scheduler: SchedulerPort
    mh_archive_parse_characters: ParseCharactersPort
    mh_archive_parse_pets: ParsePetsPort
    mh_archive_parse_series: ParseSeriesPort
    mh_archive_parse_release: ParseReleasesPort
