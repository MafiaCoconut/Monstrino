from application.ports.logger_port import LoggerPort
from application.registries.ports_registry import PortsRegistry
from application.use_cases.getDollsUseCase import GetDollsUseCase
from application.use_cases.parse_website import ParseWebsiteUseCase
from domain.enums.website_key import WebsiteKey


class ParserService:
    def __init__(self,
                 registry: PortsRegistry,
                 logger: LoggerPort
                 ):
        self.registry = registry
        self.logger = logger
        # self.get_dolls_uc = GetDollsUseCase(registry=self.registry)
        self.parse_website_uc = ParseWebsiteUseCase(registry=registry, logger=logger)


    async def parse(self):
        await self.parse_website_uc.by_year(WebsiteKey.HMArchive, 2024)
