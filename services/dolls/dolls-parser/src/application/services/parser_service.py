from app.container_components.repositories import Repositories
from application.ports.kafka_producer_port import KafkaProducerPort
from application.ports.logger_port import LoggerPort
from application.registries.ports_registry import PortsRegistry
from application.use_cases.getDollsUseCase import GetDollsUseCase
from application.use_cases.parse.parse_characters_use_case import ParseCharactersUseCase
from application.use_cases.parse.parse_pets_use_case import ParsePetsUseCase
from application.use_cases.parse.parse_releases_use_case import ParseReleasesUseCase
from application.use_cases.parse.parse_series_use_case import ParseSeriesUseCase
from application.use_cases.parse_website import ParseWebsiteUseCase
from application.use_cases.publich_kafka_message_use_case import PublishKafkaMessageUseCase
from domain.enums.website_key import WebsiteKey


class ParserService:
    def __init__(self,
                 registry: PortsRegistry,
                 logger: LoggerPort,
                 kafka_producer: KafkaProducerPort,
                 repositories: Repositories
                 ):
        self.registry = registry
        self.logger = logger
        # self.get_dolls_uc = GetDollsUseCase(registry=self.registry)
        self.parse_website_uc = ParseWebsiteUseCase(registry=registry, logger=logger)
        self.kafka_uc = PublishKafkaMessageUseCase(kafka_producer)

        self.parse_characters_uc = ParseCharactersUseCase(
            parsed_characters_repository=repositories.parsed_characters,
            registry=registry,
        )
        self.parse_pets_uc = ParsePetsUseCase(
            parsed_pets_repository=repositories.parsed_pets,
            registry=registry
        )
        self.parse_series_uc = ParseSeriesUseCase(
            parsed_series_repository=repositories.parsed_series,
            registry=registry
        )
        self.parse_releases_uc = ParseReleasesUseCase(
            parsed_releases_repository=repositories.parsed_releases,
            registry=registry
        )


    async def parse(self):
        await self.parse_website_uc.by_year(WebsiteKey.HMArchive, 2024)

    async def publish_message(self, payload: dict):
        await self.kafka_uc.execute(payload)


    async def parse_characters(self,):
        await self.parse_characters_uc.execute(WebsiteKey.HMArchive)

    async def parse_pets(self):
        await self.parse_pets_uc.execute(WebsiteKey.HMArchive)

    async def parse_series(self):
        await self.parse_series_uc.execute(WebsiteKey.HMArchive)

    async def parse_releases(self):
        await self.parse_releases_uc.execute(WebsiteKey.HMArchive)