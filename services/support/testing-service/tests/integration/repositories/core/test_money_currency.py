from monstrino_core.shared.enums import RetailAvailability

from integration.common import BaseCrudRepoTest
from monstrino_models.dto import MarketProductPriceObservation


class TestMarketProductPriceObservationRepo(BaseCrudRepoTest):
    entity_cls = MarketProductPriceObservation
    repo_attr = "market_product_price_observation"

    sample_create_data = {
        "release_market_link_id": 1,
        "observed_at": "2025-03-01T12:00:00Z",
        "currency_code": "USD",
        "price_amount_minor": 1999,
        "shipping_amount_minor": 499,
        "availability": RetailAvailability.IN_STOCK,
        "raw_payload": {"price": "19.99", "shipping": "4.99"},
    }

    unique_field = MarketProductPriceObservation.OBSERVED_AT
    unique_field_value = "2025-03-01T12:00:00Z"
    update_field = MarketProductPriceObservation.PRICE_AMOUNT_MINOR
    updated_value = 1799
