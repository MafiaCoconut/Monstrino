import logging
import pytest
from monstrino_core.domain.value_objects import SeriesRelationTypes
from monstrino_models.dto import ReleaseSeriesLink
from integration.common import BaseCrudRepoTest
from monstrino_testing.fixtures.data.catalog.ids import (
    RELEASE_SKULLECTOR_ALIEN_ID,
    SERIES_DAY_OUT_ID,
    SERIES_MISCELLANEOUS_ID,
    fixture_uuid, SERIES_DAWN_OF_THE_DANCE_ID, SERIES_GHOULS_RULE_ID,
)

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_series_list", "seed_release_series_link_list")
class TestReleaseSeriesLinkRepo(BaseCrudRepoTest):
    entity_cls = ReleaseSeriesLink
    repo_attr = "release_series_link"
    sample_create_data = {
        "id": fixture_uuid("test.catalog.release_series_link.skullector.day-out"),
        "release_id": RELEASE_SKULLECTOR_ALIEN_ID,
        "series_id": SERIES_DAY_OUT_ID,
        "relation_type": SeriesRelationTypes.PRIMARY
    }
    unique_field = ReleaseSeriesLink.ID
    unique_field_value = fixture_uuid("test.catalog.release_series_link.skullector.day-out")
    update_field = ReleaseSeriesLink.SERIES_ID
    updated_value = SERIES_GHOULS_RULE_ID
