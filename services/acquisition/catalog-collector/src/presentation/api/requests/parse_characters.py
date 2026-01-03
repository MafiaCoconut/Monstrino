from monstrino_core.domain.value_objects import CharacterGender
from pydantic import BaseModel, Field

from domain.entities.refs import ExternalRef


class ParseCharactersRequest(BaseModel):
    batch_size: int = Field(default=10)
    limit:      int = Field(default=9999999)

class ParseCharacterByExternalIdRequest(BaseModel):
    external_ref: ExternalRef = Field()
    external_id:        str = Field()
    gender: CharacterGender = Field()