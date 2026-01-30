import pytest
from monstrino_models.dto import MediaAttachment

from integration.common import BaseCrudRepoTest

@pytest.mark.usefixtures("seed_media_attachment_list")
class TestMediaAttachmentRepo(BaseCrudRepoTest):
    entity_cls = MediaAttachment
    repo_attr = "media_attachment"

    sample_create_data = {
        "id": "att_003",
        "asset_id": "asset_001",
        "owner_service": "catalog",
        "owner_type": "character",
        "owner_id": "2",
        "owner_ref": "catalog:character:2",
        "role": "avatar",
        "sort_order": 0,
        "caption": "Character avatar",
        "alt_text": "Frankie Stein portrait",
        "source_context": "user_upload",
        "is_active": True,
        "created_by_user_id": "user_001",
    }

    unique_field = MediaAttachment.ID
    unique_field_value = "att_003"
    update_field = MediaAttachment.ROLE
    updated_value = "gallery"