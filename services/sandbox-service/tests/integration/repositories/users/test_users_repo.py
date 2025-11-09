import logging
import pytest
from monstrino_models.dto import User
from integration.repositories.common.test_crud_behavior import BaseCrudRepoTest

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("seed_users_db")
class TestUsersRepo(BaseCrudRepoTest):
    entity_cls = User
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
    unique_field = User.USERNAME
    unique_field_value = "lagoonablue"
    update_field = "role"
    updated_value = "moderator"
