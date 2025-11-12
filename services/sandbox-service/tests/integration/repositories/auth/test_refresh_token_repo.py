import logging
import pytest
from monstrino_models.dto import RefreshToken
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_auth_users_db")
class TestRefreshTokenRepo(BaseCrudRepoTest):
    entity_cls = RefreshToken
    repo_attr = "refresh_token"
    sample_create_data = {
        "user_id": 1,
        "token": "token_new_789",
        "ip_address": "172.16.0.22",
        "user_agent": "Chrome/120.0 (Android 14)",
        "device_name": "Pixel 8",
        "location": "Spain",
        "is_active": True,
        "expires_at": "2030-01-01T00:00:00Z",
    }
    unique_field = RefreshToken.TOKEN
    unique_field_value = "token_new_789"
    update_field = "is_active"
    updated_value = False
