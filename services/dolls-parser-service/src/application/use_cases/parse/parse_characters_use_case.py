from application.ports.logger_port import LoggerPort
from application.ports.parse.parse_characters_port import ParseCharactersPort
from application.registries.ports_registry import PortsRegistry
from application.repositories.parsed_characters_repository import ParsedCharactersRepository
from domain.enums.website_key import WebsiteKey


class ParseCharactersUseCase(ParseCharactersPort):
    def __init__(self,

                 parsed_characters_repository: ParsedCharactersRepository,
                 parser: ParseCharactersPort,
                 registry: PortsRegistry,
                 logger: LoggerPort
                 ):
        self.parsed_characters_repository = parsed_characters_repository
        self._r = registry
        self._l = logger

    async def execute(self, site: WebsiteKey):
        port: ParseCharactersPort = self._r.get(site, ParseCharactersPort)
        await port.parse()

