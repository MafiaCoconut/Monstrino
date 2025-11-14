import logging
import pytest
from monstrino_models.dto import RelationType
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_relation_type_db")
class TestRelationTypesRepo(BaseCrudRepoTest):
    entity_cls = RelationType
    repo_attr = "relation_type"
    sample_create_data = {
        "name": "crossover",
        "display_name": "Crossover",
        "description": "A collaboration or crossover release between different brands or series.",
    }
    unique_field = RelationType.NAME
    unique_field_value = "crossover"
    update_field = "display_name"
    updated_value = "Crossover Edition"
