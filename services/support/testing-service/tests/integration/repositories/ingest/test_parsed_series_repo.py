import logging
import pytest
from monstrino_core.shared.enums import ProcessingStates
from monstrino_models.dto import ParsedSeries
from integration.common import BaseCrudRepoTest
from monstrino_testing.fixtures.data.ingest.ids import SOURCE_FANDOM_ID, fixture_uuid

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_parsed_series_list")
class TestParsedSeriesRepo(BaseCrudRepoTest):
    entity_cls = ParsedSeries
    repo_attr = "parsed_series"
    sample_create_data = {
        "id": fixture_uuid("test.ingest.parsed_series.frights-camera-action"),
        "title": "Frights, Camera, Action!",
        "description": "Movie-themed Monster High series featuring glamorous dolls.",
        "series_type": "dolls",
        "primary_image": "https://example.com/images/fca_series.jpg",
        "url": "https://monsterhigh.fandom.com/wiki/Frights,_Camera,_Action!",
        "processing_state": ProcessingStates.INIT,
        "source_id": SOURCE_FANDOM_ID,
        "external_id": "fandom:frights-camera-action",
        "original_html_content": "<html><body>FCA parsed content...</body></html>",
    }
    unique_field = ParsedSeries.TITLE
    unique_field_value = "Frights, Camera, Action!"
    update_field = ParsedSeries.PROCESSING_STATE
    updated_value = ProcessingStates.INIT
