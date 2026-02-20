from monstrino_api.v1.shared.errors import UnsupportedValueInsideExternalRefError
from monstrino_core.domain.value_objects import CharacterGender
from pydantic import BaseModel, ConfigDict

from domain.entities.refs import ExternalRef


class QualifierKeys(BaseModel):
    model_config = ConfigDict(extra="forbid")

    gender: CharacterGender

class PetExternalRefValidator:
    def validate(self, external_ref: ExternalRef):
        if external_ref.value == "":
            raise UnsupportedValueInsideExternalRefError(f"Pet external_ref.value must be not empty'")

