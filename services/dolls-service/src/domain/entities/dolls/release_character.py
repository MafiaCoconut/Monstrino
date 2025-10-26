from datetime import datetime
from pydantic import BaseModel, Field

from infrastructure.db.models.enums import CharacterRole


class ReleaseCharacter(BaseModel):
    release_id:   int | None = Field(default=None)
    character_id:        str = Field()
    role:                str = Field()
    position:            str = Field()

    updated_at: datetime | str | None = Field(default=None)
    created_at: datetime | str | None = Field(default=None)

class SaveReleaseCharacter(BaseModel):
    character_id:        int = Field()
    role:      CharacterRole = Field()
    position:            int = Field()

class ReceiveReleaseCharacter(BaseModel):
    character_name:      str = Field()
    role:      CharacterRole = Field()
    position:            int = Field()