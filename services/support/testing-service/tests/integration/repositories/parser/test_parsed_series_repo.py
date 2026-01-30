import logging
import pytest
from monstrino_core.shared.enums import ProcessingStates
from monstrino_models.dto import ParsedSeries
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


# @pytest.mark.usefixtures()
@pytest.mark.usefixtures("seed_parsed_series_list")
class TestParsedSeriesRepo(BaseCrudRepoTest):
    entity_cls = ParsedSeries
    repo_attr = "parsed_series"
    sample_create_data = {
        "name": "Frights, Camera, Action!",
        "description": "Movie-themed Monster High series featuring glamorous dolls.",
        "series_type": "dolls",
        "primary_image": "https://example.com/images/fca_series.jpg",
        "url": "https://monsterhigh.fandom.com/wiki/Frights,_Camera,_Action!",
        "processing_state": ProcessingStates.INIT,
        "source": "monsterhigh_fandom",
        "original_html_content": "<html><body>FCA parsed content...</body></html>",
    }
    unique_field = ParsedSeries.NAME
    unique_field_value = "Frights, Camera, Action!"
    update_field = "processing_state"
    updated_value = ProcessingStates.INIT
