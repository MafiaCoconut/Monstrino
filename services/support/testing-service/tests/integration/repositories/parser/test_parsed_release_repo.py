import logging
import pytest
from monstrino_core import ProcessingStates
from monstrino_models.dto import ParsedRelease
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_source_list", "seed_parsed_release_list")
class TestParsedReleaseRepo(BaseCrudRepoTest):
    entity_cls = ParsedRelease
    repo_attr = "parsed_release"
    sample_create_data = {
        "name":"Clawdeen Wolf",
        "mpn":"MPN999",
        "year_raw":"2013",
        "year":2013,
        "gender_raw":"ghoul",
        "multi_pack_raw":"single",
        "characters_raw":["clawdeen"],
        "series_raw":["Howleen"],
        "type_raw":["doll"],
        "exclusive_vendor_raw":["amazon"],
        "pet_names_raw":["crescent"],
        "reissue_of_raw":{"name":"none"},
        "extra":{},
        "primary_image":"https://img",
        "images":{},
        "images_link":"https://all",
        "description_raw":"desc",
        "from_the_box_text_raw":"box",
        "link":"https://link",
        "source_id":1,
        "source_item_id":"src",
        "original_html_content":"<h>",
        "raw_payload":{},
        "content_hash":"hash",
        "processing_state":"pending",
        "processing_error_code":None,
    }
    unique_field = "name"
    unique_field_value = "Clawdeen Wolf"
    update_field = "mpn"
    updated_value = "UPDATED123"