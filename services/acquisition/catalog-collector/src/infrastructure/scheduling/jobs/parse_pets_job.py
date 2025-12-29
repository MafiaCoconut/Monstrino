from application.use_cases.parse import ParsePetsUseCase
from domain.entities.parse_scope import ParseScope
from domain.enums.website_key import SourceKey


class ParsePetsCronJob:
    def __init__(self, *, uow_factory, registry, website: SourceKey):
        self._uow_factory = uow_factory
        self._registry = registry

        self._website = website
        self._batch_size = 10

    async def run(self, limit: int = 9999999) -> None:
        uc = ParsePetsUseCase(
            uow_factory=self._uow_factory,
            registry=self._registry
        )
        scope = ParseScope()
        await uc.execute(source=self._website, scope=scope, batch_size=self._batch_size, limit=limit)
