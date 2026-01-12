from integration.repositories.common.test_crud_behavior import BaseCrudRepoTest


class TestMediaIngestionJobRepo(BaseCrudRepoTest):
    entity_cls = MediaIngestionJob
    repo_attr = "media_ingestion_job"

    sample_create_data = {
        "id": "job_003",
        "job_type": "image_import",
        "idempotency_key": "import:catalog:character:2:avatar",
        "source_url": "https://example.com/avatar.jpg",
        "upload_session_id": None,
        "owner_service": "catalog",
        "owner_type": "character",
        "owner_id": "2",
        "owner_ref": "catalog:character:2",
        "role": "avatar",
        "sort_order": 0,
        "state": "pending",
        "attempts": 0,
        "max_attempts": 10,
        "next_retry_at": None,
        "lease_owner": None,
        "lease_until": None,
        "result_asset_id": None,
        "result_attachment_id": None,
        "content_hash_sha256": None,
        "content_type": None,
        "byte_size": None,
        "error_code": None,
        "error_message": None,
    }

    unique_field = MediaIngestionJob.ID
    unique_field_value = "job_003"
    update_field = MediaIngestionJob.STATE
    updated_value = "completed"