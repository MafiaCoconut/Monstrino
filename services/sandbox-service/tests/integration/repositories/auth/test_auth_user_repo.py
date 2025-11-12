import logging
import pytest
from monstrino_models.dto import AuthUser
from integration.common import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_auth_users_db")
class TestUsersRepo(BaseCrudRepoTest):
    entity_cls = AuthUser
    repo_attr = "users"
    sample_create_data = {
        "username": "lagoonablue",
        "first_name": "Lagoona",
        "last_name": "Blue",
        "email": "lagoona@monsterhigh.com",
        "password_hash": "hashed_password_987",
        "is_verified": True,
        "status": "active",
        "role": "user",
    }
    unique_field = AuthUser.USERNAME
    unique_field_value = "lagoonablue"
    update_field = "role"
    updated_value = "moderator"
