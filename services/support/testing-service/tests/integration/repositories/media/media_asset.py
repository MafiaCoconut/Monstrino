from typing import Optional, ClassVar
from pydantic import BaseModel, Field
from datetime import datetime


class MediaAsset(BaseModel):
    id: str

    provider: str
    bucket: str
    storage_key: str

    public_url: Optional[str]

    visibility: str
    source_type: str

    owner_user_id: Optional[str]

    media_kind: str

    content_hash_sha256: Optional[str]
    content_type: str
    byte_size: int

    width: Optional[int]
    height: Optional[int]
    duration_ms: Optional[int]

    original_filename: Optional[str]

    ingestion_trace: Optional[dict]

    license_code: Optional[str]
    license_url: Optional[str]
    attribution_text: Optional[str]

    source_url: Optional[str]

    status: str
    moderation_state: str
    moderation_reason: Optional[str]

    created_at: Optional[datetime | str] = Field(default=None)
    updated_at: Optional[datetime | str] = Field(default=None)

    # Field constants
    ID: ClassVar[str] = "id"
    PROVIDER: ClassVar[str] = "provider"
    BUCKET: ClassVar[str] = "bucket"
    STORAGE_KEY: ClassVar[str] = "storage_key"
    PUBLIC_URL: ClassVar[str] = "public_url"
    VISIBILITY: ClassVar[str] = "visibility"
    SOURCE_TYPE: ClassVar[str] = "source_type"
    OWNER_USER_ID: ClassVar[str] = "owner_user_id"
    MEDIA_KIND: ClassVar[str] = "media_kind"
    CONTENT_HASH_SHA256: ClassVar[str] = "content_hash_sha256"
    CONTENT_TYPE: ClassVar[str] = "content_type"
    BYTE_SIZE: ClassVar[str] = "byte_size"
    WIDTH: ClassVar[str] = "width"
    HEIGHT: ClassVar[str] = "height"
    DURATION_MS: ClassVar[str] = "duration_ms"
    ORIGINAL_FILENAME: ClassVar[str] = "original_filename"
    INGESTION_TRACE: ClassVar[str] = "ingestion_trace"
    LICENSE_CODE: ClassVar[str] = "license_code"
    LICENSE_URL: ClassVar[str] = "license_url"
    ATTRIBUTION_TEXT: ClassVar[str] = "attribution_text"
    SOURCE_URL: ClassVar[str] = "source_url"
    STATUS: ClassVar[str] = "status"
    MODERATION_STATE: ClassVar[str] = "moderation_state"
    MODERATION_REASON: ClassVar[str] = "moderation_reason"
    CREATED_AT: ClassVar[str] = "created_at"
    UPDATED_AT: ClassVar[str] = "updated_at"
