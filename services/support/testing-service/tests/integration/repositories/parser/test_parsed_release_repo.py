import logging
import pytest
from monstrino_models.dto import ParsedRelease
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_parsed_release_db")
class TestParsedReleaseRepo(BaseCrudRepoTest):
    entity_cls = ParsedRelease
    repo_attr = "parsed_release"
    sample_create_data = {
        "name": "Ghoulia Yelps Dead Tired",
        "characters": {"main": ["Ghoulia Yelps"]},
        "series_name": {"name": "Dead Tired"},
        "type_name": {"type": "doll"},
        "gender": {"value": "female"},
        "multi_pack": {"is_multi": False},
        "year": {"value": 2011},
        "description": "Ghoulia’s pajama party doll with sleep mask and zombie slippers.",
        "primary_image": "https://example.com/images/ghoulia_dt.jpg",
        "link": "https://monsterhigh.fandom.com/wiki/Ghoulia_Yelps_(Dead_Tired)",
        "processing_state": "parsed",
        "source": "monsterhigh_fandom",
        "original_html_content": "<html><body>Ghoulia data...</body></html>",
    }
    unique_field = ParsedRelease.NAME
    unique_field_value = "Ghoulia Yelps Dead Tired"
    update_field = "processing_state"
    updated_value = "validated"
