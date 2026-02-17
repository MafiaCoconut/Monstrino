import pytest
from integration.common import BaseCrudRepoTest
from monstrino_models.dto import ReleaseMsrp


@pytest.mark.usefixtures(
    "seed_release_list",
    "seed_geo_country_list",
    "seed_money_currency_list",
    "seed_release_msrp_list",
)
class TestReleaseMsrpRepo(BaseCrudRepoTest):
    entity_cls = ReleaseMsrp
    repo_attr = "release_msrp"

    sample_create_data = {
        "release_id": 2,
        "country_code": "GB",
        "currency_code": "GBP",
        "msrp_amount_minor": 2799,
        "valid_from": "2024-03-01",
        "valid_to": None,
        "source_note": "UK MSRP",
        "confidence": 88,
    }

    unique_field = ReleaseMsrp.MSRP_AMOUNT_MINOR
    unique_field_value = 2799
    update_field = ReleaseMsrp.CONFIDENCE
    updated_value = 92
