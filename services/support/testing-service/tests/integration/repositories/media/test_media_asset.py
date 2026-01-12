import pytest
from monstrino_models.dto import MediaAsset

from integration.common import BaseCrudRepoTest

@pytest.mark.usefixtures("seed_media_asset")
class TestMediaAssetRepo(BaseCrudRepoTest):
    entity_cls = MediaAsset
    repo_attr = "media_asset"

    sample_create_data = {
        "id": "asset_003",
        "provider": "s3",
        "bucket": "monstrino-assets",
        "storage_key": "images/releases/clawdeen/front.jpg",
        "public_url": "https://cdn.example.com/releases/clawdeen/front.jpg",
        "visibility": "public",
        "source_type": "imported",
        "owner_user_id": None,
        "media_kind": "image",
        "content_hash_sha256": "c" * 64,
        "content_type": "image/jpeg",
        "byte_size": 210000,
        "width": 1024,
        "height": 768,
        "duration_ms": None,
        "original_filename": "clawdeen_front.jpg",
        "ingestion_trace": {"source": "manual_upload"},
        "license_code": "CC-BY",
        "license_url": "https://creativecommons.org/licenses/by/4.0/",
        "attribution_text": "Mattel / Monster High",
        "source_url": "https://example.com/original3",
        "status": "active",
        "moderation_state": "approved",
        "moderation_reason": None,
    }

    unique_field = MediaAsset.ID
    unique_field_value = "asset_003"
    update_field = MediaAsset.STATUS
    updated_value = "archived"