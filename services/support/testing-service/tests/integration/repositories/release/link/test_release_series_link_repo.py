import logging
import pytest
from monstrino_core.domain.value_objects import SeriesRelationTypes
from monstrino_models.dto import ReleaseSeriesLink
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_release_series_link_list")
class TestReleaseSeriesLinkRepo(BaseCrudRepoTest):
    entity_cls = ReleaseSeriesLink
    repo_attr = "release_series_link"
    sample_create_data = {
        "release_id": 3,
        "series_id": 2,
        "relation_type": SeriesRelationTypes.PRIMARY
    }
    unique_field = ReleaseSeriesLink.RELEASE_ID
    unique_field_value = 1
    update_field = "series_id"
    updated_value = 1
