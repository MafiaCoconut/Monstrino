from typing import Optional

from monstrino_api.v1.shared.errors import UnsupportedValueInsideExternalRefError
from monstrino_core.domain.value_objects import CharacterGender
from pydantic import BaseModel, ConfigDict, Field

from domain.entities.refs import ExternalRef


class QualifierKeys(BaseModel):
    model_config = ConfigDict(extra="forbid")

    gender: CharacterGender

class CharacterExternalRefValidator:
    def validate(self, external_ref: ExternalRef):
        if external_ref.value == "":
            raise UnsupportedValueInsideExternalRefError(f"Character external_ref.value must be not empty'")
        QualifierKeys(**external_ref.qualifiers)
