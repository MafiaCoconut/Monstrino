import logging
import pytest
from monstrino_models.dto import ReleaseSeriesLink
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_release_series_link_db")
class TestReleaseSeriesLinkRepo(BaseCrudRepoTest):
    entity_cls = ReleaseSeriesLink
    repo_attr = "release_series_link"
    sample_create_data = {
        "release_id": 1,
        "series_id": 2,
        "relation_type": "collection_inclusion",
    }
    unique_field = ReleaseSeriesLink.RELEASE_ID
    unique_field_value = 1
    update_field = "relation_type"
    updated_value = "reissue"
