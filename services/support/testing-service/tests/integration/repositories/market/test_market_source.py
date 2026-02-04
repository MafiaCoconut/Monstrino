import pytest
from monstrino_models.dto import MarketSource

from integration.common import BaseCrudRepoTest

@pytest.mark.usefixtures("seed_market_source")
class TestMarketSourceRepo(BaseCrudRepoTest):
    entity_cls = MarketSource
    repo_attr = "market_source"

    sample_create_data = {
        "code": "target",
        "name": "Target",
        "homepage_url": "https://www.target.com/",
        "is_active": True,
    }

    unique_field = MarketSource.CODE
    unique_field_value = "target"
    update_field = MarketSource.NAME
    updated_value = "Target (US)"