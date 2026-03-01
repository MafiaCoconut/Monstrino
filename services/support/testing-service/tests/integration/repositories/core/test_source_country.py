import pytest
from integration.common import BaseCrudRepoTest
from monstrino_models.dto import MarketSourceCountry

@pytest.mark.usefixtures("seed_market_source_country")
class TestMarketSourceCountryRepo(BaseCrudRepoTest):
    entity_cls = MarketSourceCountry
    repo_attr = "market_source_country"

    sample_create_data = {
        "source_id": 1,
        "country_code": "GB",
        "base_url": "https://www.amazon.co.uk",
        "is_active": True,
    }

    unique_field = MarketSourceCountry.COUNTRY_CODE
    unique_field_value = "GB"
    update_field = MarketSourceCountry.BASE_URL
    updated_value = "https://www.amazon.co.uk/store"
