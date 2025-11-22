import logging
import pytest
from monstrino_models.dto import ProductLine

from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


class TestProductLineRepo(BaseCrudRepoTest):
    entity_cls = ProductLine
    repo_attr = "product_line"

    sample_create_data = {
        "name": "barbie-collection",
        "display_name": "Barbie Collection",
        "alt_names": ["barbie", "barbie toys"],
    }

    unique_field = ProductLine.NAME
    unique_field_value = "barbie-collection"

    update_field = "display_name"
    updated_value = "Barbie Series"
