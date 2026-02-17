import logging
import pytest
from monstrino_models.dto import ExclusiveVendor
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_exclusive_vendor_list")
class TestExclusiveVendorRepo(BaseCrudRepoTest):
    entity_cls = ExclusiveVendor
    repo_attr = "exclusive_vendor"
    sample_create_data = {
        "code": "amazon1",
        "title": "Amazon1",
        "description": "Exclusive release available only on Amazon online store.",
        "image_url": "https://example.com/images/amazon_exclusive.jpg",
    }
    unique_field = ExclusiveVendor.CODE
    unique_field_value = "amazon1"
    update_field = ExclusiveVendor.TITLE
    updated_value = "Amazon Exclusive"
