import pytest
from icecream import ic
from monstrino_core.domain.value_objects import CharacterGender, SeriesTypes
from monstrino_core.shared.enums import ProcessingStates
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.container_components.repositories import Repositories
from infrastructure.parsers import MHArchiveSeriesParser


@pytest.mark.asyncio
async def test_parse_series_single(
        uow_factory: UnitOfWorkFactory[Repositories],
):
    parser = MHArchiveSeriesParser()

    batch_size=2
    limit = 7
    async for batch in parser.parse(batch_size=batch_size, limit=limit):
        assert(len(batch) == batch_size or len(batch) == limit % batch_size)
        for series_list in batch:
            for series in series_list:
                ic(series.name, series.series_type, series.parent_name)
                assert series.name is not None
                assert series.name != ""
                assert series.series_type == SeriesTypes.PRIMARY or series.series_type == SeriesTypes.SECONDARY
                if series.series_type == SeriesTypes.SECONDARY:
                    assert series.parent_name == series_list[0].name
                assert series.link is not None
                assert series.processing_state == ProcessingStates.INIT
                assert series.source != ""
                # assert series.original_html_content != ""
