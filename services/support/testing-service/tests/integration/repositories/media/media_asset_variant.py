from monstrino_models.dto import MediaAssetVariant

from integration.common import BaseCrudRepoTest


class TestMediaAssetVariantRepo(BaseCrudRepoTest):
    entity_cls = MediaAssetVariant
    repo_attr = "media_asset_variant"

    sample_create_data = {
        "id": "variant_003",
        "asset_id": "asset_001",
        "variant_name": "large",
        "transform": {"resize": {"width": 1200, "height": 1200}},
        "provider": "s3",
        "bucket": "monstrino-assets",
        "storage_key": "images/releases/draculaura/large.jpg",
        "public_url": "https://cdn.example.com/releases/draculaura/large.jpg",
        "content_type": "image/jpeg",
        "byte_size": 456789,
        "width": 1200,
        "height": 1200,
        "status": "active",
        "error_message": None,
    }

    unique_field = MediaAssetVariant.ID
    unique_field_value = "variant_003"
    update_field = MediaAssetVariant.STATUS
    updated_value = "archived"