import pytest
from integration.common import BaseCrudRepoTest
from monstrino_models.dto import GeoCountry


@pytest.mark.usefixtures("seed_geo_country_list")
class TestGeoCountryRepo(BaseCrudRepoTest):
    entity_cls = GeoCountry
    repo_attr = "geo_country"

    sample_create_data = {
        "code": "FR",
        "name": "France",
        "display_code": "FR",
    }

    unique_field = GeoCountry.CODE
    unique_field_value = "FR"
    update_field = GeoCountry.DISPLAY_CODE
    updated_value = "🇫🇷 FR"
