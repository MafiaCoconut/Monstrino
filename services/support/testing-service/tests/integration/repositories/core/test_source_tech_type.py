import pytest

from integration.common import BaseCrudRepoTest
from monstrino_models.dto import SourceTechType


@pytest.mark.usefixtures("seed_source_tech_type_list")
class TestSourceTechTypeRepo(BaseCrudRepoTest):
    entity_cls = SourceTechType
    repo_attr = "source_tech_type"

    sample_create_data = {
        "code": "api",
        "title": "Public API",
        "description": "REST or GraphQL API based source.",
        "is_enabled": True,
    }

    unique_field = SourceTechType.CODE
    unique_field_value = "api"
    update_field = SourceTechType.TITLE
    updated_value = "Public REST API"