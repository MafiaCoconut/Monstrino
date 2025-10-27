from dataclasses import dataclass
from application.ports.kafka_producer_port import KafkaProducerPort
from application.ports.logger_port import LoggerPort
from application.ports.parse.parse_characters_port import ParseCharactersPort
from application.ports.parse.parse_pets_port import ParsePetsPort
from application.ports.scheduler_port import SchedulerPort
from application.ports.website_catalog_port import WebsiteCatalogPort

@dataclass
class Adapters:
    # MHArchive: WebsiteCatalogPort
    logger: LoggerPort
    kafka_producer: KafkaProducerPort
    scheduler: SchedulerPort
    parse_characters: ParseCharactersPort
    parse_pets: ParsePetsPort
