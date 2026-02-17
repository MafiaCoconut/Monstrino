import logging
import pytest
from monstrino_models.dto import Series
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_series_list")
class TestSeriesRepo(BaseCrudRepoTest):
    entity_cls = Series
    repo_attr = "series"
    sample_create_data = {
        "slug": "frights-camera-action",
        "title": "Frights, Camera, Action!",
        "code": "frights-camera-action",
        "name": "frights-camera-action",
        "display_name": "Frights, Camera, Action!",
        "description": "Movie-themed Monster High series featuring star-studded outfits.",
        "series_type": "dolls",
        "primary_image": "https://example.com/images/fca_series.jpg",
    }
    unique_field = Series.SLUG
    unique_field_value = "frights-camera-action"
    update_field = "title"
    updated_value = "Frights, Camera, Action! Deluxe"
