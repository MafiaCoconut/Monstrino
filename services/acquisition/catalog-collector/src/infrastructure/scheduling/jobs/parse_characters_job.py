from application.use_cases.parse.parse_characters_use_case import ParseCharactersUseCase
from domain.enums.website_key import WebsiteKey


class ParseCharactersCronJob:
    def __init__(self, *, uow_factory, registry, website: WebsiteKey):
        self._uow_factory = uow_factory
        self._registry = registry

        self._website = website
        self._batch_size = 10

    async def run(self) -> None:
        uc = ParseCharactersUseCase(
            uow_factory=self._uow_factory,
            registry=self._registry
        )
        await uc.execute(site=self._website, batch_size=self._batch_size)
