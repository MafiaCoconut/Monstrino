import pytest
from integration.common import BaseCrudRepoTest
from monstrino_models.dto import ReleaseMarketLink

@pytest.mark.usefixtures("seed_release_market_link")
class TestReleaseMarketLinkRepo(BaseCrudRepoTest):
    entity_cls = ReleaseMarketLink
    repo_attr = "release_market_link"

    sample_create_data = {
        "release_id": 2,
        "source_country_id": 1,
        "url": "https://www.amazon.de/dp/B0EXAMPLE02",
        "external_id": "B0EXAMPLE02",
        "is_primary": False,
    }

    unique_field = ReleaseMarketLink.URL
    unique_field_value = "https://www.amazon.de/dp/B0EXAMPLE02"
    update_field = ReleaseMarketLink.IS_PRIMARY
    updated_value = True
