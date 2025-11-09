import logging
import pytest
from monstrino_models.dto import ImageImportQueue
from integration.repositories.common.test_crud_behavior import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_image_reference_origin_db")
class TestImageImportQueueRepo(BaseCrudRepoTest):
    entity_cls = ImageImportQueue
    repo_attr = "image_import_queue"
    sample_create_data = {
        "original_link": "https://example.com/images/clawdeen_raw.jpg",
        "new_link": None,
        "origin_reference_id": 1,
        "origin_record_id": 1003,
        "process_state": "pending",
    }
    unique_field = ImageImportQueue.ORIGINAL_LINK
    unique_field_value = "https://example.com/images/clawdeen_raw.jpg"
    update_field = "process_state"
    updated_value = "completed"
