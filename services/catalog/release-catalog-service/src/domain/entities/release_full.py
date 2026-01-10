from typing import Optional

from monstrino_core.domain.value_objects import CharacterGender
from pydantic import BaseModel, Field

class RCharacter(BaseModel):
    name:           str
    display_name:   str
    gender:         CharacterGender
    role:           Optional[str]

    standalone_release_id: Optional[int] = Field(default=None)

    description:    Optional[str]
    primary_image:  Optional[str]
    alt_names:    Optional[list[str]] = None
    notes: Optional[str] = None

class RPet(BaseModel):
    name:               str
    display_name:       str
    is_uniq_to_release: bool
    position:           int
    notes:              Optional[str] = None
    description:        Optional[str] = None



class RExclusive(BaseModel):
    name:           str
    display_name:   str
    description:    Optional[str] = None
    image_url:      Optional[str] = None

class RType(BaseModel):
    name:           str
    display_name:   str
    category:       str

class RSeries(BaseModel):
    name: str
    type: str

class RImage(BaseModel):
    url:        str
    is_primary: bool = False

class RRelation(BaseModel):
    related_release_id: int
    relation_type:      str
    note:               str

class ReleaseFull(BaseModel):
    """DTO representing the full details of a release, including associated images."""

    title:          str
    year:           Optional[int] = None
    mpn:            Optional[str] = None
    description:    Optional[str] = None
    text_from_box:  Optional[str] = None

    characters:     Optional[list[RCharacter]] = None
    pets:           Optional[list[RPet]] = None
    images:         Optional[list[dict]] = None
    exclusives:     Optional[list[RExclusive]] = None
    series:         Optional[list[RSeries]] = None
    relations:      Optional[list[RRelation]] = None
    types:          Optional[list[RType]] = None




