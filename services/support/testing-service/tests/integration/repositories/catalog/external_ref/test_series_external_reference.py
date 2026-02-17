import pytest

from integration.common import BaseCrudRepoTest
from monstrino_models.dto import SeriesExternalReference
from monstrino_testing.fixtures.data.catalog.ids import (
    SERIES_DAY_OUT_ID,
    SOURCE_FANDOM_ID,
    fixture_uuid,
)


@pytest.mark.usefixtures("seed_series_list", "seed_source_list", "seed_series_external_reference_list")
class TestSeriesExternalReferenceRepo(BaseCrudRepoTest):
    entity_cls = SeriesExternalReference
    repo_attr = "series_external_reference"

    sample_create_data = {
        "id": fixture_uuid("test.catalog.series_external_reference.day-out.fandom"),
        "series_id": SERIES_DAY_OUT_ID,
        "source_id": SOURCE_FANDOM_ID,
        "external_id": "fandom:boo-riginal-creeps",
    }

    unique_field = SeriesExternalReference.ID
    unique_field_value = fixture_uuid("test.catalog.series_external_reference.day-out.fandom")
    update_field = SeriesExternalReference.EXTERNAL_ID
    updated_value = "fandom:boo-riginal-creeps-updated"
