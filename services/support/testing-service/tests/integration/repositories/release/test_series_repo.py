import logging
import pytest
from monstrino_models.dto import Series
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_series_db")
class TestSeriesRepo(BaseCrudRepoTest):
    entity_cls = Series
    repo_attr = "series"
    sample_create_data = {
        "name": "Frights, Camera, Action!",
        "display_name": "Frights, Camera, Action!",
        "description": "Movie-themed Monster High series featuring star-studded outfits.",
        "series_type": "dolls",
        "primary_image": "https://example.com/images/fca_series.jpg",
    }
    unique_field = Series.NAME
    unique_field_value = "Frights, Camera, Action!"
    update_field = "display_name"
    updated_value = "Frights, Camera, Action! Deluxe"
