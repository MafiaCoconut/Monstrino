from application.use_cases.parse import ParseSeriesUseCase
from domain.entities.parse_scope import ParseScope
from domain.enums.website_key import SourceKey


class ParseSeriesCronJob:
    def __init__(self, *, uow_factory, registry, source: SourceKey):
        self._uow_factory = uow_factory
        self._registry = registry

        self._source = source
        self._batch_size = 10

    async def run(self, limit: int = 999999) -> None:
        uc = ParseSeriesUseCase(
            uow_factory=self._uow_factory,
            registry=self._registry
        )
        scope = ParseScope()
        await uc.execute(source=self._source, scope=scope, batch_size=self._batch_size, limit=limit)
