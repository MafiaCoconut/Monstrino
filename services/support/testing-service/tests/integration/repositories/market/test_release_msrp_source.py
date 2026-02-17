import pytest
from integration.common import BaseCrudRepoTest
from monstrino_models.dto import ReleaseMsrpSource
from monstrino_core.shared.enums import MsrpSourceType


@pytest.mark.usefixtures("seed_release_msrp_list", "seed_release_msrp_source_list")
class TestReleaseMsrpSourceRepo(BaseCrudRepoTest):
    entity_cls = ReleaseMsrpSource
    repo_attr = "release_msrp_source"

    sample_create_data = {
        "release_msrp_id": 1,
        "url": "https://www.target.com/p/monster-high-draculaura/-/A-000000",
        "source_type": MsrpSourceType.RETAILER,
        "confidence": 75,
        "captured_at": "2025-02-12T09:00:00Z",
        "note": "Supporting retailer listing for MSRP validation.",
    }

    unique_field = ReleaseMsrpSource.URL
    unique_field_value = "https://www.target.com/p/monster-high-draculaura/-/A-000000"
    update_field = ReleaseMsrpSource.CONFIDENCE
    updated_value = 85
