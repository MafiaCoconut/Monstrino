
from monstrino_core import NameFormatter
from monstrino_models.dto import ParsedRelease


class SeriesResolverService:
    async def resolve(self, uow, parsed: ParsedRelease) -> None:
        if not parsed.series_name:
            parsed.series_id = None
            return
        series_id = await uow.repos.series.get_id_by_name(
            NameFormatter.format_name(parsed.series_name)
        )
        parsed.series_id = series_id
